import * as types from 'redux/types/kpiTypes';
import initialState from '../initialStates';

export default function kpiReducer(state = initialState.kpi, action: any): any {
    switch (action.type) {
        case types.GET_KPI_DATA:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiListLoading: true,
                },
            };
            return state;
        case types.GET_KPI_DATA_SUCCESS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiData: action?.response?.data,
                    kpiList: action?.response?.data?.pageResponse?.records,
                    kpiListLoading: false,
                },
            };
            return state;
        case types.GET_KPI_DATA_FAILURE:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiListLoading: false,
                },
            };
            return state;
        case types.GET_NODE_LEVEL_LIST_SUCCESS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    nodeLevelList: action?.response?.data,
                },
            };
            return state;
        case types.GET_KPI_DETAILS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiDetailLoading: true,
                },
            };
            return state;
        case types.GET_KPI_DETAILS_SUCCESS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    KpiDetailsData: action?.response?.data,
                    kpiDetailLoading: false,
                },
            };
            return state;
        case types.GET_KPI_DETAILS_FAILURE:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiDetailLoading: false,
                },
            };
            return state;
        case types.SET_KPI_IMPL_STATE:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    KpiImplementationState: action.payload,
                },
            };
            return state;
        case types.GET_CIRCULATIONCYCLE_LIST_SUCCESS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiCalculationCycleList: action?.response?.data,
                },
            };
            return state;
        case types.SET_VALIDATE_SUCCESS:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiValidated: true,
                },
            };
            return state;
        case types.SET_VALIDATE_FAILURE:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiValidated: false,
                },
            };
            return state;
        case types.VALIDATE_STATE_UPDATE:
            state = {
                ...state,
                kpiImplementation: {
                    ...state.kpiImplementation,
                    kpiValidated: false,
                },
            };
            return state;
        default:
            return state;
    }
}
