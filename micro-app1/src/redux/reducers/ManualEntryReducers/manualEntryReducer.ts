import {
    GET_ALL_MANUAL_ENTRY_PARAMS,
    GET_ALL_MANUAL_ENTRY_PARAMS_FAIL,
    GET_ALL_MANUAL_ENTRY_PARAMS_SUCCESS,
    GET_MANUAL_ENTRY_VALUE_PARAMS,
    GET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
    GET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
    SET_MANUAL_ENTRY_VALUE_PARAMS,
    SET_MANUAL_ENTRY_VALUE_PARAMS_FAIL,
    SET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS,
} from '../../types/nocilDashboardTypes';
import initialState from '../initialStates';

export default function manualEntryReducer(
    state = initialState.manualEntry,
    action: any
): any {
    switch (action.type) {
        case GET_ALL_MANUAL_ENTRY_PARAMS:
            state = {
                ...state,
                allManualEntryParams: {
                    ...state.allManualEntryParams,
                    loader: true,
                },
            };
            return state;
        case GET_ALL_MANUAL_ENTRY_PARAMS_SUCCESS:
            state = {
                ...state,
                allManualEntryParams: {
                    ...state.allManualEntryParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_ALL_MANUAL_ENTRY_PARAMS_FAIL:
            state = {
                ...state,
                allManualEntryParams: {
                    ...state.allManualEntryParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;

        case GET_MANUAL_ENTRY_VALUE_PARAMS:
            state = {
                ...state,
                manualEntryValueParams: {
                    ...state.manualEntryValueParams,
                    loader: true,
                },
            };
            return state;
        case GET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS:
            state = {
                ...state,
                manualEntryValueParams: {
                    ...state.manualEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_MANUAL_ENTRY_VALUE_PARAMS_FAIL:
            state = {
                ...state,
                manualEntryValueParams: {
                    ...state.manualEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;

        case SET_MANUAL_ENTRY_VALUE_PARAMS:
            state = {
                ...state,
                setManualEntryValueParams: {
                    ...state.setManualEntryValueParams,
                    loader: true,
                },
            };
            return state;
        case SET_MANUAL_ENTRY_VALUE_PARAMS_SUCCESS:
            state = {
                ...state,
                setManualEntryValueParams: {
                    ...state.setManualEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case SET_MANUAL_ENTRY_VALUE_PARAMS_FAIL:
            state = {
                ...state,
                setManualEntryValueParams: {
                    ...state.setManualEntryValueParams,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        default:
            return state;
    }
}
