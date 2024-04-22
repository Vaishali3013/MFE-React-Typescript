import * as types from 'redux/types/calendarConfiguratorTypes';
import initialState from '../initialStates';

export default function calendarConfiguratorReducer(
    state = initialState.calendarConfigurator,
    action: any
): any {
    switch (action.type) {
        case types.GET_TIMEZONE_LIST_SUCCESS:
            state = {
                ...state,
                timeZonesList: action.response.data,
            };
            return state;

        case types.SET_DAY_CONFIG_DETAILS_SUCCESS:
            state = {
                ...state,
                dayConfigDataAdded: true,
                isSwitchChecked: false,
            };
            return state;

        case types.SET_SHIFT_CONFIG_DETAILS_SUCCESS:
            state = {
                ...state,
                shiftConfigDataAdded: true,
                isSwitchChecked: false,
            };
            return state;

        case types.SET_ASSET_DETAILS_SUCCESS:
            state = {
                ...state,
                assetDetailsAdded: true,
                isSwitchChecked: false,
            };
            return state;
        case types.ASSET_DETAILS_RESET:
            state = {
                ...state,
                assetDetailsAdded: false,
                isSwitchChecked: false,
            };
            return state;

        case types.GET_DAY_CONFIG_BY_ASSET_ID_SUCCESS:
            state = {
                ...state,
                dayConfigDataByAssetId: action.response.data,
            };
            return state;
        case types.UPDATE_DAY_DETAILS:
            state = {
                ...state,
                dayConfigDataByAssetId: action.payload,
            };
            return state;
        case types.GET_SHIFT_CONFIG_BY_ASSET_ID_SUCCESS:
            state = {
                ...state,
                shiftConfigDataByAssetId: action.response.data,
            };
            return state;
        case types.UPDATE_SHIFT_DETAILS:
            state = {
                ...state,
                shiftConfigDataByAssetId: action.payload,
            };
            return state;
        case types.GET_ASSET_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                assetDetails: action.response.data,
            };
            return state;
        case types.GET_MONTHS_LIST_SUCCESS:
            state = {
                ...state,
                monthsList: action.response.data,
            };
            return state;
        case types.GET_WEEK_DAYS_LIST_SUCCESS:
            state = {
                ...state,
                weekDaysList: action.response.data,
            };
            return state;
        case types.GET_UPDATE_API_SHIFT:
            state = {
                ...state,
                updateShiftDataForApi: action.payload,
            };
            return state;
        case types.GET_UPDATE_API_DAY:
            state = {
                ...state,
                updateDaytDataForApi: action.payload,
            };
            return state;
        case types.UPDATE_MODAL:
            state = {
                ...state,
                updateModalState: action.payload,
            };
            return state;

        case types.CLEAR_DAY_DATA:
            state = {
                ...state,
                dayConfigDataByAssetId: [],
            };
            return state;
        case types.ENABLE_SWITCH_BUTTON:
            state = {
                ...state,
                isSwitchChecked: true,
            };
            return state;
        case types.CONFIG_CHANGE_TRUE:
            state = {
                ...state,
                isConfigChange: true,
            };
            return state;
        case types.CONFIG_CHANGE_FALSE:
            state = {
                ...state,
                isConfigChange: false,
            };
            return state;
        case types.DEFAULT_CONFIG_TYPE:
            state = {
                ...state,
                isDefaultConfigType: true,
            };
            return state;
        case types.DEFAULT_CONFIG_TYPE_FALSE:
            state = {
                ...state,
                isDefaultConfigType: false,
            };
            return state;
        case types.SET_DAY_CONFIG_DETAILS_FAILURE:
            state = {
                ...state,
                assetDetailsAdded: false,
                isSwitchChecked: false,
            };
            return state;

        case types.SET_SHIFT_CONFIG_DETAILS_FAILURE:
            state = {
                ...state,
                assetDetailsAdded: false,
                isSwitchChecked: false,
            };
            return state;
        case types.SET_LOADING_DAY:
            state = {
                ...state,
                loadingDay: action.payload,
            };
            return state;
        case types.SET_LOADING_SHIFT:
            state = {
                ...state,
                loadingShift: action.payload,
            };
            return state;
        case types.CLEAR_ASSET_DATA_ON_MODEL_CHANGE:
            state = {
                ...state,
                assetDetails: [],
            };
            return state;
        default:
            return state;
    }
}
