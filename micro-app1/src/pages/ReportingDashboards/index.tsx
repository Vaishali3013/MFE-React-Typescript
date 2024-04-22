import { useEffect } from 'react';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { useSelector } from 'react-redux';
import './index.scss';
import Cookies from 'universal-cookie';

const ReportingDashboard: React.FC = () => {
    const cookies = new Cookies();
    const loggedInUserDashboardEmbeddedUuid = useSelector(
        (state: any) => state.userManagement.users?.dashboardEmbeddedUuid
    );

    useEffect(() => {
        document.cookie = `loggedInUserDashboardEmbeddedUuid=${loggedInUserDashboardEmbeddedUuid}; domain=solulever.com; path=/`;
    }, [cookies, loggedInUserDashboardEmbeddedUuid]);

    const commonRawDashboardUrl =
        'https://dashboard-builder.{environment}test.solulever.com';
    const applicationUrl = window.location.hostname;
    const generatedSupersetDomainUrl = (): any => {
        const environment = applicationUrl.split('.')[1];
        return commonRawDashboardUrl.replace('{environment}', environment);
    };

    useEffect(() => {
        const embed = async (payload?: any): Promise<any> => {
            embedDashboard({
                id: cookies.get('loggedInUserDashboardEmbeddedUuid'),
                supersetDomain: generatedSupersetDomainUrl(),
                mountPoint: document.getElementById('dashboard') as any,
                fetchGuestToken: (): any => cookies.get('session'),
                dashboardUiConfig: {
                    hideTitle: true,
                    hideChartControls: true,
                    hideTab: true,
                },
            });
        };
        if (document.getElementById('dashboard')) {
            embed();
        }
    }, [loggedInUserDashboardEmbeddedUuid]);

    return (
        <>
            <div id="dashboard" />
        </>
    );
};

export default ReportingDashboard;
