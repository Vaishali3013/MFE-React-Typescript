import {
    GET_ALL_OPERATOR_ENTRY_PARAMS,
    GET_ALL_OPERATOR_ENTRY_PARAMS_FAIL,
    GET_ALL_OPERATOR_ENTRY_PARAMS_SUCCESS,
    GET_ALL_SUPERVISOR_PARAMS,
    GET_ALL_SUPERVISOR_PARAMS_FAIL,
    GET_ALL_SUPERVISOR_PARAMS_SUCCESS,
    GET_OPERATOR_LAST_SHIFT_DATA,
    GET_OPERATOR_LAST_SHIFT_DATA_FAIL,
    GET_OPERATOR_LAST_SHIFT_DATA_SUCCESS,
    SET_OPERATOR_ENTRY_VALUE_PARAMS,
    SET_OPERATOR_ENTRY_VALUE_PARAMS_FAIL,
    SET_OPERATOR_ENTRY_VALUE_PARAMS_SUCCESS,
} from '../../types/nocilDashboardTypes';
import initialState from '../initialStates';

export default function operatorEntryReducer(
    state = initialState.operatorEntry,
    action: any
): any {
    switch (action.type) {
        case GET_ALL_SUPERVISOR_PARAMS:
            state = {
                ...state,
                allSuperVisorParams: {
                    ...state.allSuperVisorParams,
                    loader: true,
                },
            };
            return state;
        case GET_ALL_SUPERVISOR_PARAMS_SUCCESS:
            state = {
                ...state,
                allSuperVisorParams: {
                    ...state.allSuperVisorParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_ALL_SUPERVISOR_PARAMS_FAIL:
            state = {
                ...state,
                allSuperVisorParams: {
                    ...state.allSuperVisorParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_ALL_OPERATOR_ENTRY_PARAMS:
            state = {
                ...state,
                allOperatorEntryParams: {
                    ...state.allOperatorEntryParams,
                    loader: true,
                },
            };
            return state;
        case GET_ALL_OPERATOR_ENTRY_PARAMS_SUCCESS:
            state = {
                ...state,
                allOperatorEntryParams: {
                    ...state.allOperatorEntryParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_ALL_OPERATOR_ENTRY_PARAMS_FAIL:
            state = {
                ...state,
                allOperatorEntryParams: {
                    ...state.allOperatorEntryParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;

        case SET_OPERATOR_ENTRY_VALUE_PARAMS:
            state = {
                ...state,
                setOperatorEntryValueParams: {
                    ...state.setOperatorEntryValueParams,
                    loader: true,
                },
            };
            return state;
        case SET_OPERATOR_ENTRY_VALUE_PARAMS_SUCCESS:
            state = {
                ...state,
                setOperatorEntryValueParams: {
                    ...state.setOperatorEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case SET_OPERATOR_ENTRY_VALUE_PARAMS_FAIL:
            state = {
                ...state,
                setOperatorEntryValueParams: {
                    ...state.setOperatorEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;

        case GET_OPERATOR_LAST_SHIFT_DATA:
            state = {
                ...state,
                operatorLastShiftData: {
                    ...state.operatorLastShiftData,
                    loader: true,
                },
            };
            return state;
        case GET_OPERATOR_LAST_SHIFT_DATA_SUCCESS:
            state = {
                ...state,
                operatorLastShiftData: {
                    ...state.operatorLastShiftData,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_OPERATOR_LAST_SHIFT_DATA_FAIL:
            state = {
                ...state,
                operatorLastShiftData: {
                    ...state.operatorLastShiftData,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        default:
            return state;
    }
}
