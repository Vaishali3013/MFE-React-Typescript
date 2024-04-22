import {
    CLEAR_DATA_TABLE_LIST,
    CLEAR_DATA_VISUALIZATION_VALUES,
    GET_AGGREGATED_CHART_DATA_FAILURE,
    GET_AGGREGATED_CHART_DATA_LOADING,
    GET_AGGREGATED_CHART_DATA_SUCCESS,
    GET_DATA_TABLE_LIST,
    GET_DATA_TABLE_LIST_FAILURE,
    GET_DATA_TABLE_LIST_SUCCESS,
    GET_MODEL_LIST_SUCCESS,
    GET_NODE_LIST_SUCCESS,
    GET_STREAM_TAG_LIST_SUCCESS,
} from 'redux/actions/actionTypes';
import initialState from '../initialStates';

export default function dataVisualizationReducer(
    state = initialState.dataVisualization,
    action: any
): any {
    switch (action.type) {
        case GET_NODE_LIST_SUCCESS:
            state = {
                ...state,
                nodeList: action.payload,
            };
            return state;
        case GET_STREAM_TAG_LIST_SUCCESS:
            state = {
                ...state,
                streamTagList: action.payload,
            };
            return state;
        case GET_AGGREGATED_CHART_DATA_SUCCESS:
            state = {
                ...state,
                aggregatedChartData: action.payload,
                aggregatedChartDataLoading: false,
            };
            return state;
        case GET_AGGREGATED_CHART_DATA_FAILURE:
            state = {
                ...state,
                aggregatedChartData: action.payload,
                aggregatedChartDataLoading: false,
            };
            return state;
        case GET_AGGREGATED_CHART_DATA_LOADING:
            state = {
                ...state,
                aggregatedChartDataLoading: true,
            };
            return state;
        case GET_MODEL_LIST_SUCCESS:
            state = {
                ...state,
                modelList: action.payload,
            };
            return state;
        case CLEAR_DATA_VISUALIZATION_VALUES:
            state = {
                ...state,
                aggregatedChartData: [],
                streamTagList: [],
                modelList: [],
                nodeList: [],
            };
            return state;
        case GET_DATA_TABLE_LIST:
            state = {
                ...state,
                dataTableList: {
                    ...state.dataTableList,
                    loader: true,
                },
            };
            return state;
        case GET_DATA_TABLE_LIST_SUCCESS:
            state = {
                ...state,
                dataTableList: {
                    ...state.dataTableList,
                    loader: false,
                    data: action?.payload,
                },
            };
            return state;
        case GET_DATA_TABLE_LIST_FAILURE:
            state = {
                ...state,
                dataTableList: {
                    ...state.dataTableList,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
            case CLEAR_DATA_TABLE_LIST:
            return {
                ...state,
                dataTableList: {
                    data: [],
                },
            };
        default:
            return state;
    }
}
