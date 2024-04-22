import {
    GET_ALL_OPERATOR_ENTRY_PARAMS,
    GET_ALL_SUPERVISOR_PARAMS,
    GET_OPERATOR_LAST_SHIFT_DATA,
    SET_OPERATOR_ENTRY_VALUE_PARAMS,
} from 'redux/types/nocilDashboardTypes';

export const getAllSupervisorParamsAction = (payload?: any): any => ({
    type: GET_ALL_SUPERVISOR_PARAMS,
    payload: payload,
});
export const getAllOperatorParamsAction = (payload?: any): any => ({
    type: GET_ALL_OPERATOR_ENTRY_PARAMS,
    payload: payload,
});

export const setOperatorParamsValueAction = (payload?: any): any => ({
    type: SET_OPERATOR_ENTRY_VALUE_PARAMS,
    payload: payload,
});

export const getOperatorLastShiftDataAction = (payload: any): any => ({
    type: GET_OPERATOR_LAST_SHIFT_DATA,
    payload: payload,
});
