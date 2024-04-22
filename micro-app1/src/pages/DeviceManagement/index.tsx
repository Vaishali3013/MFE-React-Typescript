import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Col, Row } from 'antd';
import CountAnalytics from 'components/common/CountAnalytics';
import TabsComponent from 'components/common/TabsComponent';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import AddBla from '../../pages/DeviceManagement/Blas/AddBla/index';
import Blas from '../../pages/DeviceManagement/Blas/index';
import Devices from 'pages/DeviceManagement/Devices';
import Tags from 'pages/DeviceManagement/Tags';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import {
    setAddBlaState,
    setBlaId,
    setDeviceId,
    setSidebarNavigate,
} from 'redux/actions/DeviceManagementActions/blasAction';
import { setAddDeviceState } from 'redux/actions/DeviceManagementActions/deviceAction';
import { hasTabPermission } from 'utils/commonFunction';
import { useTranslation } from 'react-i18next';

const DeviceManagement: React.FC<{ activate: any }> = ({ activate }) => {
    const { currentTab, paramState, paramBlaId, paramDeviceId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTabKey, setActiveTabKey] = useState('');
    const { t } = useTranslation('translation');
    const blaTableDataList = useSelector(
        (state: any) => state.deviceManagement.blas.blasList
    );

    const sidebarNavigate = useSelector(
        (state: any) => state.deviceManagement.blas.sidebarNavigate
    );

    const deviceTableDataList = useSelector(
        (state: any) => state.deviceManagement.devices.deviceList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    const tagTableDataList = useSelector(
        (state: any) => state.deviceManagement.tags.tagsList
    );
    const addBlaState = useSelector(
        (state: any) => state.deviceManagement.blas.addBlaState
    );
    const addDeviceState = useSelector(
        (state: any) => state.deviceManagement.devices.addDeviceState
    );
    const blaId = useSelector(
        (state: any) => state.deviceManagement.blas.blaId
    );
    const deviceId = useSelector(
        (state: any) => state.deviceManagement.blas.deviceId
    );
    const allowedTabList = useSelector(
        (state: any) => state.root.allowedMenuList
    );

    useEffect(() => {
        currentTab && setActiveTabKey(currentTab);
        paramBlaId && dispatch(setBlaId(parseInt(paramBlaId)));
        paramDeviceId && dispatch(setDeviceId(parseInt(paramDeviceId)));
        if (paramState === 'add') {
            currentTab === 'blas' && dispatch(setAddBlaState(paramState));
            currentTab === 'devices' && dispatch(setAddDeviceState(true));
        }
    }, [currentTab, paramState, paramBlaId, paramDeviceId]);

    useEffect(() => {
        if (activeTabKey && !sidebarNavigate) {
            // check for add state in bla and device tab
            if (addBlaState === 'add' || addDeviceState) {
                // check for step 2 of add wizard i.e, contains Bla Id
                if (blaId) {
                    // check for step 3 of add wizard i.e, contains Bla Id and Device Id
                    if (deviceId) {
                        navigate(
                            `/device-management/${activeTabKey}/add/${blaId}/${deviceId}`,
                            { replace: true }
                        );
                    } else {
                        navigate(
                            `/device-management/${activeTabKey}/add/${blaId}`,
                            { replace: true }
                        );
                    }
                } else {
                    navigate(`/device-management/${activeTabKey}/add`);
                }
            } else {
                navigate(`/device-management/${activeTabKey}`, {
                    replace: true,
                });
            }
        }
        dispatch(setSidebarNavigate(false));
    }, [addDeviceState, activeTabKey, addBlaState, blaId, deviceId]);
    const getCountAnalyticsDetails = (): any => {
        switch (activeTabKey) {
            case 'devices':
                return [
                    {
                        title: t('deviceMang.devices.activeDevices'),
                        count: deviceTableDataList?.activeDeviceCount
                            ? `${deviceTableDataList?.activeDeviceCount}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('deviceMang.devices.inactiveDevices'),
                        count: deviceTableDataList?.inActiveDeviceCount
                            ? `${deviceTableDataList?.inActiveDeviceCount}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            case 'tags':
                return [
                    {
                        title: t('deviceMang.tags.activeTags'),
                        count: tagTableDataList?.activeTagsCount
                            ? `${tagTableDataList?.activeTagsCount}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('deviceMang.tags.inactiveTags'),
                        count: tagTableDataList?.inActiveTagsCount
                            ? `${tagTableDataList?.inActiveTagsCount}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            default:
                return [
                    {
                        title: t('deviceMang.bla.activeBlas'),
                        count: blaTableDataList?.activeBlaCount
                            ? `${blaTableDataList?.activeBlaCount}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('deviceMang.bla.inactiveBlas'),
                        count: blaTableDataList?.inActiveBlaCount
                            ? `${blaTableDataList?.inActiveBlaCount}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
        }
    };

    const tabItems = [
        {
            id: 4,
            permissionKey: 'BLA',
            key: 'blas',
            label: `BLAs`,
            children:
                addBlaState === 'add' ? (
                    <AddBla />
                ) : addBlaState === 'view' ? (
                    <Blas />
                ) : (
                    ''
                ),
        },
        {
            id: 5,
            permissionKey: 'Devices',
            key: 'devices',
            label: `Devices`,
            children: <Devices />,
        },
        {
            id: 6,
            permissionKey: 'Tags',
            key: 'tags',
            label: `Tags`,
            children: <Tags />,
        },
    ];

    return (
        <>
            <div className="deviceManagement">
                <Row className="deviceManagement__headerWrapper">
                    <Col span={18}>
                        <ScreenNameHeading
                            heading={t('deviceMang.deviceManagement')}
                            subHeading={t('deviceMang.viewEditBla')}
                        />
                    </Col>
                    <Col span={6}>
                        <CountAnalytics
                            countDetails={getCountAnalyticsDetails()}
                        />
                    </Col>
                </Row>
                <Row className="deviceManagement__tabswrapper fw-500 fs-16">
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

export default DeviceManagement;
