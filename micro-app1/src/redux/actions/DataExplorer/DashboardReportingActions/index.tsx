import * as types from 'redux/types/dashboardReportingTypes';

export const getReportingListAction = (payload?: any): any => ({
    type: types.GET_REPORTING_LIST,
    payload: payload,
});

export const addDashboardUrlAction = (payload: any): any => ({
    type: types.ADD_DASHBOARD_URL,
    payload: payload,
});

export const updateDashboardUrlAction = (payload: any): any => ({
    type: types.UPDATE_DASHBOARD_URL,
    payload: payload,
});

export const deleteDashboardUrlAction = (payload: any): any => ({
    type: types.DELETE_DASHBOARD_URL,
    payload: payload,
});
