import React, { useEffect, useState } from 'react';
import './index.scss';
import { Col, Row } from 'antd';
import CountAnalytics from 'components/common/CountAnalytics';
import TabsComponent from 'components/common/TabsComponent';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import Users from './Users';
import Groups from './Groups';
import Roles from './Roles';
import CreateRole from './Roles/CreateRole';
import EditRole from './Roles/EditRoles';
import { useDispatch, useSelector } from 'react-redux';
import { ROLETYPE, USERSTAB, resourceName } from 'types/enums';
import {
    getCountAnalyticsDeatils,
    getUserDetails,
} from 'redux/actions/UserManagementActions/usersAction';
import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { hasTabPermission } from 'utils/commonFunction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { getObjectByResourceName } from 'utils/rbacFunction';
import { useTranslation } from 'react-i18next';

const UserManagement: React.FC<{ activate: any }> = ({ activate }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const { currentTab = 'users' } = useParams();
    const navigate = useNavigate();
    const [activeTabKey, setActiveTabKey] = useState(currentTab);

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    useEffect(() => {
        setActiveTabKey(currentTab);
    }, [currentTab]);

    const user = parseJwt();
    useEffect(() => {
        if (user) dispatch(getUserDetails(user.UserId));
    }, []);

    useEffect(() => {
        navigate(`/user-management/${activeTabKey}`, { replace: true });
    }, [activeTabKey]);

    const editRoleState = useSelector(
        (state: any) => state.userManagement.roles.editRoleState
    );

    const allowedTabList = useSelector(
        (state: any) => state.root.allowedMenuList
    );

    const tabItems = [
        {
            id: 1,
            permissionKey: 'Users',
            key: 'users',
            label: `Users`,
            children: <Users />,
        },
        {
            id: 2,
            permissionKey: 'Resource Groups',
            key: 'groups',
            label: `Groups`,
            children: <Groups />,
        },
        {
            id: 3,
            permissionKey: 'Roles',
            key: 'roles',
            label: `Roles`,
            children:
                editRoleState === ROLETYPE.create ? (
                    <CreateRole />
                ) : editRoleState === ROLETYPE.edit ? (
                    <EditRole />
                ) : editRoleState === ROLETYPE.view ? (
                    <Roles />
                ) : (
                    ''
                ),
        },
    ];

    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserRolePermission = getObjectByResourceName(
        resourceName.roles,
        loggedInUserPermissionData
    );
    const loggedInUserPermission = getObjectByResourceName(
        resourceName.users,
        loggedInUserPermissionData
    );

    useEffect(() => {
        if (
            loggedInUserRolePermission?.permission?.length ||
            loggedInUserDetails?.admin ||
            loggedInUserPermission?.permission?.length
        ) {
            dispatch(getCountAnalyticsDeatils(activeTabKey));
        }
    }, [
        activeTabKey,
        loggedInUserPermission,
        loggedInUserDetails,
        loggedInUserRolePermission,
    ]);

    const countDetails = useSelector(
        (state: any) => state.userManagement?.users?.countDetails
    );
    let CountAnalyticsDetails: any = [];
    let title = '';
    let icon: any = null;
    switch (activeTabKey) {
        case USERSTAB.roles:
            CountAnalyticsDetails =
                countDetails &&
                Object?.entries(countDetails)?.map(([key, value]: any) => {
                    if (key === 'activeCount') {
                        title = t('roles.activeRoles');
                        icon = <ActiveUserIcon />;
                    } else if (key === 'inActiveCount') {
                        title = t('roles.inactiveRoles');
                        icon = <DeactivateUserIcon />;
                    }
                    return {
                        title,
                        count: value?.toString(),
                        icon,
                    };
                });
            break;
        case USERSTAB.groups:
            CountAnalyticsDetails =
                countDetails &&
                Object?.entries(countDetails)?.map(([key, value]: any) => {
                    if (key === 'activeCount') {
                        title = t('groups.activeGroups');
                        icon = <ActiveUserIcon />;
                    } else if (key === 'inActiveCount') {
                        title = t('groups.inactiveGroups');
                        icon = <DeactivateUserIcon />;
                    }
                    return {
                        title,
                        count: value?.toString(),
                        icon,
                    };
                });
            break;

        default:
            CountAnalyticsDetails =
                countDetails &&
                Object?.entries(countDetails)?.map(([key, value]: any) => {
                    if (key === 'activeCount') {
                        title = t('commonStr.activeUsers');
                        icon = <ActiveUserIcon />;
                    } else if (key === 'inActiveCount') {
                        title = t('commonStr.inactiveUsers');
                        icon = <DeactivateUserIcon />;
                    }
                    return {
                        title,
                        count: value?.toString() || 0,
                        icon,
                    };
                });
    }

    return (
        <>
            <div className="userManagement">
                <Row className="userManagement__headerWrapper">
                    <Col span={16}>
                        <ScreenNameHeading
                            heading={t('users.userManagement')}
                            subHeading={t('users.userManagementDescription')}
                        />
                    </Col>
                    <Col span={8}>
                        <CountAnalytics countDetails={CountAnalyticsDetails} />
                    </Col>
                </Row>
                <Row className="usermanagement__tabswrapper fw-500 fs-16">
                    <Col span={24}>
                        <TabsComponent
                            tabItem={
                                loggedInUserDetails?.admin
                                    ? tabItems
                                    : hasTabPermission(tabItems, allowedTabList)
                            }
                            setTabKey={activate}
                            setActiveTabKey={setActiveTabKey}
                            activeTabKey={activeTabKey}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default UserManagement;
