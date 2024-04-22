import * as types from 'redux/types/configureTypes';

export const setKpiState = (payload: string): any => ({
    type: types.SET_KPI_STATE,
    payload: payload,
});

export const kpiFieldsValues = (payload: any): any => ({
    type: types.KPI_FIELDS_VALUES,
    payload: payload,
});

export const getKpiTypeList = (): any => ({
    type: types.GET_KPI_TYPE_LIST,
});

export const getTargetTypeList = (): any => ({
    type: types.GET_TARGET_TYPE_LIST,
});

export const getAggregationTypeList = (): any => ({
    type: types.GET_AGGREGATION_TYPE_LIST,
});

export const getNodeLevelList = (): any => ({
    type: types.GET_NODE_LEVEL_LIST,
});

export const createKpi = (payload: any): any => ({
    type: types.CREATE_KPI,
    payload: payload,
});

export const getKpiList = (payload: any): any => ({
    type: types.GET_KPI_LIST,
    payload: payload,
});

export const getKpiDetails = (payload: any): any => ({
    type: types.GET_KPI_DETAILS,
    payload: payload,
});

export const statusUpdateKpi = (payload: any): any => ({
    type: types.STATUS_UPDATE_KPI,
    payload: payload,
});

export const updateKpi = (payload: any): any => ({
    type: types.UPDATE_KPI,
    payload: payload,
});
