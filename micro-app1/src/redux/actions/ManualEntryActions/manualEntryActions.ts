import {
    GET_ALL_MANUAL_ENTRY_PARAMS,
    GET_MANUAL_ENTRY_VALUE_PARAMS,
    SET_MANUAL_ENTRY_VALUE_PARAMS,
} from 'redux/types/nocilDashboardTypes';

export const getAllManualParamsAction = (payload?: any): any => ({
    type: GET_ALL_MANUAL_ENTRY_PARAMS,
    payload: payload,
});

export const getManualParamsValueAction = (payload?: any): any => ({
    type: GET_MANUAL_ENTRY_VALUE_PARAMS,
    payload: payload,
});

export const setManualParamsValueAction = (payload?: any): any => ({
    type: SET_MANUAL_ENTRY_VALUE_PARAMS,
    payload: payload,
});
