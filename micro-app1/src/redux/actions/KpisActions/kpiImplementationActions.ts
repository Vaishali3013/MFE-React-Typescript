import * as types from 'redux/types/kpiTypes';

export const getKpiList = (payload: any): any => ({
    type: types.GET_KPI_DATA,
    payload: payload,
});

export const getNodeLevelList = (): any => ({
    type: types.GET_NODE_LEVEL_LIST,
});

export const getKpiDetail = (payload: any): any => ({
    type: types.GET_KPI_DETAILS,
    payload: payload,
});

export const setKpiImplState = (payload: string): any => ({
    type: types.SET_KPI_IMPL_STATE,
    payload: payload,
});

export const getCalculationCycleList = (): any => ({
    type: types.GET_CIRCULATIONCYCLE_LIST,
});

export const setValidate = (payload: any): any => ({
    type: types.SET_VALIDATE,
    payload: payload,
});