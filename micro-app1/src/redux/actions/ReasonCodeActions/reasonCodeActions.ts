import {
    DEFAULT_REASON_CODE_VALUE,
    DEFAULT_REASON_FACTORY_VALUE,
    GET_ALL_DOWNTIMES,
    GET_ALL_REASON_CATEGORY,
    GET_ALL_REASON_CODE,
    GET_ALL_REASON_FACTOR,
    GET_REASON_CODE_NODE_DETAILS,
    SET_REASON_CODE,
} from 'redux/types/reasonCodeTypes';

export const getAllDownTimes = (payload?: any): any => ({
    type: GET_ALL_DOWNTIMES,
    payload: payload,
});

export const getAllReasonFactors = (payload?: any): any => ({
    type: GET_ALL_REASON_FACTOR,
    payload: payload,
});

export const getAllReasonCode = (payload?: any): any => ({
    type: GET_ALL_REASON_CODE,
    payload: payload,
});

export const getAllReasonCategory = (payload?: any): any => ({
    type: GET_ALL_REASON_CATEGORY,
    payload: payload,
});

export const setReasoncode = (payload?: any): any => ({
    type: SET_REASON_CODE,
    payload: payload,
});

export const defaultReasonCodeValue = (payload?: any): any => ({
    type: DEFAULT_REASON_CODE_VALUE,
    payload: payload,
});

export const defaultReasonFactorValue = (payload?: any): any => ({
    type: DEFAULT_REASON_FACTORY_VALUE,
    payload: payload,
});

export const getReasonCodeNodeDetails = (payload?: any): any => ({
    type: GET_REASON_CODE_NODE_DETAILS,
    payload: payload,
});
