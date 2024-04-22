import { type SidebarProps } from 'types/interfaces/PropsInterfaces';
import { ReactComponent as ExpandIcon } from 'assets/icons/expand.svg';
import { ReactComponent as CollapseIcon } from 'assets/icons/collapse.svg';
import { Input, Menu } from 'antd';
import './index.scss';
import { SearchOutlined } from '@ant-design/icons';
import BraboLogo from 'assets/icons/braboLogo.svg';
import { ROLETYPE, UseCasesMenu } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAddBlaState,
    setBlaId,
    setDeviceId,
    setSidebarNavigate,
} from 'redux/actions/DeviceManagementActions/blasAction';
import { setAddDeviceState } from 'redux/actions/DeviceManagementActions/deviceAction';
import { baseUrlSetter } from 'utils/commonFunction';
import { dashboardEmbeddedUuid } from 'redux/actions/UserManagementActions/usersAction';

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    menu,
    changeSideBar,
    setSearchValue,
    searchValue,
}) => {
    const dispatch = useDispatch();
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const reportList = useSelector(
        (state: any) => state?.dataExplorer?.dashboardReporting?.reportingList
    );

    const toggleCollapse = (): any => {
        changeSideBar(!collapsed);
    };

    const redirectionUrlHandler = (e: any): any => {
        dispatch(setSidebarNavigate(true));
        dispatch(setAddBlaState(ROLETYPE.view));
        dispatch(setBlaId(null));
        dispatch(setDeviceId(null));
        dispatch(setAddDeviceState(false));
        const commonRawServiceUrl =
            '{service-name}.{environment}.solulever.com/';
        const applicationUrl = window.location.hostname;

        if (e?.key === UseCasesMenu.AssetModeller) {
            const splittedUrlArray = applicationUrl.split('.');
            const generatedUrl = commonRawServiceUrl
                .replace('{service-name}', 'brabo-config')
                .replace('{environment}', splittedUrlArray[1]);
            window.open('https://' + generatedUrl + 'dataModel', '_blank');
        }
        if (e?.key === UseCasesMenu.BoilerMonitoring) {
            window.open('https://brabo-platform.nocil.solulever.com/login');
        }
        if (e?.key === UseCasesMenu.CPGMonitoring) {
            window.open('https://mesukprd.upl-ltd.com/');
        }
        if (e?.key === UseCasesMenu.DashboardBuilder) {
            const url =
                baseUrlSetter('reportConfigurator') + '/superset/welcome/';
            window.open(url, '_blank');
        }
        if (reportList?.length) {
            reportList?.map((item: any) => {
                if (e?.key === item?.menuName) {
                    window.open(item?.externalUrl, '_blank');
                }
            });
        }
        if (e.keyPath.includes('Dashboards')) {
            dispatch(dashboardEmbeddedUuid(e.key));
        } else {
            dispatch(dashboardEmbeddedUuid(null));
        }

        // Note: breakign chnage , working on it
        // else {
        //     const splittedUrlArray = applicationUrl.split('.');
        //     const generatedUrl = commonRawServiceUrl
        //         .replace('{service-name}', splittedUrlArray[0])
        //         .replace('{environment}', splittedUrlArray[1]);
        //     window.open(generatedUrl, '_blank');
        // }
    };

    return (
        <>
            <div className="switch-module-icon">
                <img src={BraboLogo} alt="icon" />
            </div>
            <div className="filter-navigator">
                {!collapsed ? (
                    <>
                        <Input
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            className="filter-search"
                            prefix={<SearchOutlined />}
                            placeholder="Search Menu"
                            disabled={!loggedInUserDetails.admin}
                        />
                    </>
                ) : (
                    ''
                )}
                {collapsed ? (
                    <ExpandIcon onClick={toggleCollapse} />
                ) : (
                    <CollapseIcon onClick={toggleCollapse} />
                )}
            </div>

            <div
                className={
                    collapsed
                        ? 'sider-container-collapsed'
                        : 'side-menu-tabs-expanded'
                }
            >
                <Menu
                    onClick={redirectionUrlHandler}
                    mode="vertical"
                    items={menu}
                />
            </div>
        </>
    );
};

export default Sidebar;
