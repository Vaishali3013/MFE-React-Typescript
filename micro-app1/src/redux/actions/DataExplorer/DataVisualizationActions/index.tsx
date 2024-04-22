import {
    CLEAR_DATA_VISUALIZATION_VALUES,
    GET_AGGREGATED_CHART_DATA,
    GET_ASSET_CSV_DATA,
    GET_DATA_TABLE_LIST,
    GET_MODEL_LIST,
    GET_NODE_LIST,
    GET_STREAM_TAG_LIST,
} from '../../actionTypes';

export const getNodeList = (payload: any): any => ({
    type: GET_NODE_LIST,
    payload,
});

export const getStreamTagList = (payload: any): any => ({
    type: GET_STREAM_TAG_LIST,
    payload,
});

export const getAggregatedChartData = (payload: any): any => ({
    type: GET_AGGREGATED_CHART_DATA,
    payload,
});

export const getModelList = (): any => ({
    type: GET_MODEL_LIST,
});

export const clearDataVisualizationValues = (): any => ({
    type: CLEAR_DATA_VISUALIZATION_VALUES,
});
export const getAssetCSVData = (payload: any): any => ({
    type: GET_ASSET_CSV_DATA,
    payload,
});
export const getDataTableList = (payload: any): any => ({
    type: GET_DATA_TABLE_LIST,
    payload,
});
export const clearDataTableList = (): any => ({
    type: 'CLEAR_DATA_TABLE_LIST',
});

