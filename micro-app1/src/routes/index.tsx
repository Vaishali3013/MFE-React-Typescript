import AccountSettings from 'pages/AccountSettings/UserProfile';
import CalenderConfigurator from 'pages/CalenderConfigurator';
import Configure from 'pages/Configure';
import ReportConfigurator from 'pages/DataExplorer/DashboardReporting/ReportConfigurator';
import DataVisualization from 'pages/DataExplorer/DataVisualization';
import DeviceManagement from 'pages/DeviceManagement';
import Home from 'pages/Home';
import KpiImplementation from 'pages/Kpis/KpiImplementation';
import Implementation from 'pages/Implementation';
import ManualEntry from 'pages/ManualEntry';
import NocilDashboard from 'pages/NocilDashboard';
import AssumptionsAndFormulae from 'pages/NocilDashboard/components/AssumptionsAndFormulae';
import OperatorEntry from 'pages/OperatorEntry';
import ReportingDashboard from 'pages/ReportingDashboards';
import ReasonCode from 'pages/ReasonCode';
import UserManagement from 'pages/UserManagement';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BraboAssistant from 'pages/BraboAssistant';

const SideNavRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/home" element={<Home />}></Route>
                <Route path="add-new-device" element="devices"></Route>
                <Route path="connection-list" element="connection-list"></Route>
                <Route
                    path="add-new-connection"
                    element="add-new-connection"
                ></Route>
                <Route
                    path="/brabo-assistant"
                    element={<BraboAssistant />}
                />
                <Route
                    path="device-management"
                    element={<DeviceManagement activate="1" />}
                >
                    <Route
                        index
                        element={<DeviceManagement activate="1" />}
                    ></Route>
                    <Route
                        path=":currentTab/:paramState/:paramBlaId?/:paramDeviceId?"
                        element={<DeviceManagement activate="1" />}
                    ></Route>
                </Route>
                <Route
                    path="user-management"
                    element={<UserManagement activate="1" />}
                >
                    <Route
                        index
                        element={<UserManagement activate="1" />}
                    ></Route>
                    <Route
                        path=":currentTab"
                        element={<UserManagement activate="1" />}
                    ></Route>
                </Route>
                <Route
                    path="/configure/data-dictionary"
                    element={<Configure activate="1" />}
                >
                    <Route index element={<Configure activate="1" />}></Route>
                    <Route
                        path=":currentTab"
                        element={<Configure activate="1" />}
                    ></Route>
                </Route>
                <Route
                    path="configure/kpis/kpi-implementation"
                    element={<KpiImplementation />}
                />
                <Route
                    path="device-management"
                    element={<DeviceManagement activate="1" />}
                >
                    <Route
                        index
                        element={<DeviceManagement activate="1" />}
                    ></Route>
                    <Route
                        path=":currentTab"
                        element={<DeviceManagement activate="1" />}
                    ></Route>
                </Route>

                <Route path="account-settings">
                    <Route
                        index
                        element={<AccountSettings activate="1" />}
                    ></Route>
                    <Route
                        path=":currentTab"
                        element={<AccountSettings activate="1" />}
                    ></Route>
                </Route>
                <Route
                    path="/data-visualization/trending"
                    element={<DataVisualization />}
                />
                <Route
                    path="/data-visualization/data-table"
                    element={<DataVisualization />}
                />
                <Route
                    path="/report-configurator"
                    element={<ReportConfigurator />}
                />
                <Route
                    path="/nocil/nocil-dashboard"
                    element={<NocilDashboard />}
                ></Route>
                <Route
                    path="/nocil/nocil-dashboard/assumptions"
                    element={<AssumptionsAndFormulae />}
                ></Route>
                <Route
                    path="/nocil/manual-entry"
                    element={<ManualEntry />}
                ></Route>
                <Route
                    path="/nocil/operator-entry"
                    element={<OperatorEntry />}
                ></Route>
                <Route
                    path="*"
                    element={<Navigate to="/home" replace={true} />}
                />
                <Route
                    path="/settings/calendar-configurator"
                    element={<CalenderConfigurator />}
                />
                <Route path="/dashboards" element={<ReportingDashboard />} />
                <Route
                    path="/configure/implementation"
                    element={<Implementation activate="1" />}
                >
                    <Route
                        index
                        element={<Implementation activate="1" />}
                    ></Route>
                    <Route
                        path=":currentTab"
                        element={<Implementation activate="1" />}
                    ></Route>
                </Route>
                <Route
                    path="/manual-forms/reason-code"
                    element={<ReasonCode />}
                ></Route>
            </Routes>
        </>
    );
};

export default SideNavRoutes;
