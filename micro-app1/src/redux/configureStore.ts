import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from "redux/saga/index";
import sideNavReducer from "redux/reducers/sidenavReducer";
import loginReducer from "redux/reducers/AuthReducers/authReducer";
import userManagementReducer from "redux/reducers/UserManagementReducers/userManagementReducers";
import deviceManagementReducer from "redux/reducers/DeviceManagementReducers/deviceManagementReducers";
import nocilDashboardReducer from "redux/reducers/NocilDashboardReducers/nocilDashboardReducers";
import dataVisualizationReducer from "redux/reducers/DataVisualizationReducers";
import manualEntryReducer from "redux/reducers/ManualEntryReducers/manualEntryReducer";
import calendarConfiguratorReducer from "redux/reducers/CalendarConfiguratorReducers";
import operatorEntryReducer from "redux/reducers/OperatorEntryReducers/operatorEntryReducer";
import dashboardReportingReducers from "redux/reducers/DataExplorerReducers/DashboardReportingReducers";
import configureReducer from "redux/reducers/ConfigureReducers/configureReducer";
import kpiReducer from "redux/reducers/KpisReducers/kpiReducers";
import implementationReducer from "redux/reducers/ImplementationReducers/ImplementationReducers";
import reasonCodeReducer from "redux/reducers/ReasonCodeReducers/reasonCodeReducer";
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    root: sideNavReducer,
    login: loginReducer,
    userManagement: userManagementReducer,
    deviceManagement: deviceManagementReducer,
    nocilDashboard: nocilDashboardReducer,
    dataVisualization: dataVisualizationReducer,
    manualEntry: manualEntryReducer,
    calendarConfigurator: calendarConfiguratorReducer,
    operatorEntry: operatorEntryReducer,
    dataExplorer: dashboardReportingReducers,
    configure: configureReducer,
    kpi: kpiReducer,
    implementation: implementationReducer,
    reasonCode: reasonCodeReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
