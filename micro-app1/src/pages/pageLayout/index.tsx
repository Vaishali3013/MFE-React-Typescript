/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import {
    BellOutlined,
    UserOutlined,
    UnlockOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import BraboFooterLogo from 'assets/icons/braboFooterLogo.svg';
import { Breadcrumb, Layout, Divider, Popover, Image, Button } from 'antd';
import Sidebar from 'components/layouts/sideBar';
import './index.scss';
import { getSideNavMenu } from 'utils/sideMenuFunction';
import {
    findParentMenuIds,
    getObjectsById,
    sideNavSearchFilter,
} from 'utils/sideNavSearchFunction';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllowedMenuList,
    getSidenavMenuList,
} from 'redux/actions/SideNavActions/sidenavAction';
import SideNavRoutes from 'routes';
import { LogOutuser } from 'redux/actions/AuthAction/authAction';
import {
    dashboardEmbeddedUuid,
    getLoggedInUserDetails,
} from 'redux/actions/UserManagementActions/usersAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { capitalizeWords, getApiServiceName } from 'utils/commonFunction';
import { serviceNameLogoData } from 'json/logo';
import { ReportsMenuName, UseCasesMenu, expiresCookies } from 'types/enums';
import { ReactComponent as Reports } from 'assets/icons/dashboardReport.svg';
import { getReportingListAction } from 'redux/actions/DataExplorer/DashboardReportingActions';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getBreadcrumbItem = (array: any[]): any => {
    // NOTE: slicing the array because getting this from url and only first 2 items are relevant for Breadcrumb.
    return array?.slice(0, 2).map((num) => {
        return { breadcrumbName: capitalizeWords(num) };
    });
};

const PageLayout: React.FC = () => {
    const navigate = useNavigate();
    const { Header, Content, Sider } = Layout;
    const [collapsed, setCollapsed] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [menuData, setMenuData] = useState([]);
    const [paramsArray, setParamsArray] = useState<any>();
    const dispatch = useDispatch();
    const pathParams = useParams();

    const sideNavMenuList = useSelector(
        (state: any) => state.root.sideNavMenuList
    );
    const reportList = useSelector(
        (state: any) => state?.dataExplorer?.dashboardReporting?.reportingList
    );
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const rememberCred = useSelector((state: any) => state.login.rememberMe);
    const allowedTabList = useSelector(
        (state: any) => state.root.allowedMenuList
    );

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (loggedInUserDetails) {
            dispatch(getSidenavMenuList());
        }
        const updatedList = sideNavMenuList?.map((itemOne: any) => {
            if (itemOne.name === UseCasesMenu.Configure) {
                const nestedOne = itemOne?.children?.map((itemTwo: any) => {
                    if (itemTwo?.name === UseCasesMenu.DashboardReporting) {
                        const nestedTwo = itemTwo?.children?.map(
                            (itemThree: any) => {
                                if (itemThree.name === UseCasesMenu.Reports) {
                                    const childList = reportList?.map(
                                        (item: any) => {
                                            return {
                                                id: item?.id,
                                                name: item?.menuName,
                                                breadcrumb: item?.menuName,
                                                key: item?.menuName,
                                                icon: <Reports />,
                                            };
                                        }
                                    );
                                    return {
                                        ...itemThree,
                                        children: childList,
                                    };
                                }

                                return itemThree;
                            }
                        );
                        return {
                            ...itemTwo,
                            children: nestedTwo,
                        };
                    }
                    if (itemTwo.name === UseCasesMenu.DashboardBuilder) {
                        const childLists = {
                            ...itemTwo,
                            disabled: !loggedInUserDetails.admin,
                        };
                        return {
                            ...childLists,
                        };
                    }
                    return itemTwo;
                });
                return {
                    ...itemOne,
                    children: nestedOne,
                };
            }
            return itemOne;
        });
        const dashboardUpdatedMenuList = updatedList?.map((itemOne: any) => {
            if (itemOne.name === UseCasesMenu.Dashboards) {
                const childList = loggedInUserDetails?.dashboardEntries?.map(
                    (item: any) => {
                        return {
                            id: item?.id,
                            path: '/dashboards',
                            name: item?.dashboard_title,
                            breadcrumb: item?.dashboard_title,
                            key: item?.id,
                            icon: <Reports />,
                        };
                    }
                );
                return {
                    ...itemOne,
                    children: childList?.length ? childList : [],
                };
            }
            return itemOne;
        });
        setItems(getSideNavMenu(dashboardUpdatedMenuList));
    }, [
        sideNavMenuList,
        reportList,
        loggedInUserDetails,
        cookies,
        allowedTabList,
    ]);

    useEffect(() => {
        const breadcrumbArray = pathParams['*']?.split('/');
        setParamsArray(breadcrumbArray);
    }, [pathParams]);

    const onCollapse = (sidebarCollapse: any): any => {
        setCollapsed(sidebarCollapse);
    };

    useEffect(() => {
        sideNavSearchFilter(
            getObjectsById(items, findParentMenuIds(items, allowedTabList)),
            searchValue,
            setMenuData
        );
    }, [searchValue]);

    useEffect(() => {
        dispatch(getAllowedMenuList(user?.UserId));
    }, [dispatch]);

    const user = parseJwt();
    useEffect(() => {
        if (user) dispatch(getLoggedInUserDetails(user.UserId));
    }, []);

    const logouthandler = (): void => {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        document.cookie = `session=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `isAdmin=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `authToken=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `loggedInUserDashboardEmbeddedUuid=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        dispatch(dashboardEmbeddedUuid(''));
        dispatch(LogOutuser(rememberCred));
        navigate('/login');
    };

    const menuItem = (): any => {
        if (loggedInUserDetails.admin) {
            return menuData.length > 0 ? menuData : items;
        } else {
            return menuData.length > 0
                ? menuData
                : getObjectsById(
                      items,
                      findParentMenuIds(items, allowedTabList)
                  );
        }
    };

    const getReportingDashboards = (items?: any): any => {
        const dashboardItem = items?.filter(
            (item: any) => item?.menuIds === UseCasesMenu.Dashboards
        );
        return dashboardItem;
    };

    useEffect(() => {
        if (loggedInUserDetails?.admin === false) {
            if (
                allowedTabList?.includes('Reports') &&
                allowedTabList?.length > 0
            ) {
                dispatch(
                    getReportingListAction({
                        parentName: ReportsMenuName.menuName,
                    })
                );
            }
        }
    }, [allowedTabList, loggedInUserDetails]);

    const content = (
        <div className="user-profile-popover-content">
            <p>
                {' '}
                <div className="popover-content">
                    <Image width={70} src={loggedInUserDetails?.profileImage} />
                    <div>
                        {loggedInUserDetails?.firstName}{' '}
                        {loggedInUserDetails?.lastName}
                    </div>
                    <div>{loggedInUserDetails?.email}</div>
                </div>
                <Divider />
                <div>
                    <div>
                        {/* Note: here 1 refers to user profile tab, 2 to user preference and 3 to change password
            To be replaced with string in routes */}
                        <Link
                            to="/account-settings/user-profile"
                            className="profile-setting"
                        >
                            <UserOutlined /> User Profile
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/account-settings/user-preferences"
                            className="profile-setting"
                        >
                            <SettingOutlined /> User Preferences
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/account-settings/change-password"
                            className="profile-setting"
                        >
                            <UnlockOutlined /> Change Password
                        </Link>
                    </div>
                </div>
                <Divider />
            </p>
            <p className="signOut">
                <Button onClick={logouthandler}>Sign Out</Button>
            </p>
        </div>
    );
    const [updatedMenuItem, setUpdatedMenuItem] = useState(menuItem());
    useEffect(() => {
        if (loggedInUserDetails.admin) setUpdatedMenuItem(menuItem());
    }, [localStorage.getItem('isAdmin'), loggedInUserDetails, allowedTabList]);

    const [updatedDashboardMenuList, setUpdatedDashboardMenuList] =
        useState<any>(menuItem());

    useEffect(() => {
        // for non-admin user and having access of Dashboards menu 
        if (allowedTabList.includes('Dashboards') && menuItem()) {
            setUpdatedDashboardMenuList([
                ...menuItem()?.filter(
                    (item: any) => item.menuIds !== UseCasesMenu.Dashboards
                ),
                getReportingDashboards(items)?.[0],
            ]);
        } else {
            setUpdatedDashboardMenuList(menuItem());
        }
    }, [allowedTabList, loggedInUserDetails, menuItem()]);

    return (
        <>
            <Layout className="layoutWrapper">
                <Sider
                    className={collapsed ? 'collapsed' : 'expand'}
                    theme="light"
                    collapsible
                    trigger={null}
                    collapsed={collapsed}
                    onCollapse={(value: boolean) => {
                        setCollapsed(value);
                    }}
                >
                    <Sidebar
                        collapsed={collapsed}
                        menu={
                            !loggedInUserDetails?.admin
                                ? updatedDashboardMenuList
                                : updatedMenuItem
                        }
                        changeSideBar={onCollapse}
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                    />
                    <div className="empty-space"></div>
                    {!collapsed ? (
                        <div className="switch-module">
                            <img src={BraboFooterLogo} alt="icon" />
                        </div>
                    ) : (
                        ''
                    )}
                </Sider>
                <Layout className="site-layout">
                    <Header className="header">
                        <Breadcrumb
                            key={pathParams['*']}
                            separator=">"
                            routes={getBreadcrumbItem(paramsArray)}
                        />
                        <div className="header-setting-container">
                            <div className="customer-container">
                                <img
                                    src={getApiServiceName(
                                        window.location.hostname,
                                        serviceNameLogoData
                                    )}
                                    alt="customer-logo"
                                />
                            </div>
                            <Divider type="vertical" />
                            <div className="profile-container customer-container">
                                <div>
                                    <BellOutlined />
                                </div>
                                <Popover content={content}>
                                    {loggedInUserDetails?.profileImage ? (
                                        <img
                                            style={{ width: 30 }}
                                            src={
                                                loggedInUserDetails?.profileImage
                                            }
                                            alt="logo"
                                        />
                                    ) : (
                                        <UserOutlined />
                                    )}
                                </Popover>
                            </div>
                        </div>
                    </Header>
                    <Content className="site-layout-content">
                        <SideNavRoutes />{' '}
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default PageLayout;
