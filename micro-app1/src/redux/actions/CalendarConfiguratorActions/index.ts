import * as types from '../../types/calendarConfiguratorTypes';

export const getTimeZoneList = (): any => ({
    type: types.GET_TIMEZONE_LIST,
});

export const setDayConfigDetails = (payload: any): any => ({
    type: types.SET_DAY_CONFIG_DETAILS,
    payload: payload,
});

export const setShiftConfigDetails = (payload: any): any => ({
    type: types.SET_SHIFT_CONFIG_DETAILS,
    payload: payload,
});

export const setAssetsDetails = (payload: any): any => ({
    type: types.SET_ASSET_DETAILS,
    payload: payload,
});

export const getDayConfigByAssetId = (payload: any): any => ({
    type: types.GET_DAY_CONFIG_BY_ASSET_ID,
    payload: payload,
});

export const getShiftConfigByAssetId = (payload: any): any => ({
    type: types.GET_SHIFT_CONFIG_BY_ASSET_ID,
    payload: payload,
});

export const updateShiftConfig = (payload: any): any => ({
    type: types.UPDATE_SHIFT_DETAILS,
    payload: payload,
});

export const updateDayConfig = (payload: any): any => ({
    type: types.UPDATE_DAY_DETAILS,
    payload: payload,
});

export const getAssetDetailsById = (payload: any): any => ({
    type: types.GET_ASSET_DETAILS_BY_ID,
    payload: payload,
});

export const getMonthsList = (): any => ({
    type: types.GET_MONTHS_LIST,
});

export const getWeekDaysList = (): any => ({
    type: types.GET_WEEK_DAYS_LIST,
});

export const getUpdateShiftDataApi = (payload: any): any => ({
    type: types.GET_UPDATE_API_SHIFT,
    payload: payload,
});

export const getUpdateDayDataApi = (payload: any): any => ({
    type: types.GET_UPDATE_API_DAY,
    payload: payload,
});

export const updateModalForCalendar = (payload: any): any => ({
    type: types.UPDATE_MODAL,
    payload: payload,
});

export const resetAssetSuccess = (): any => ({
    type: types.ASSET_DETAILS_RESET,
});

export const configChangeTrue = (): any => ({
    type: types.CONFIG_CHANGE_TRUE,
});
export const configChangeFalse = (): any => ({
    type: types.CONFIG_CHANGE_FALSE,
});

export const defaultConfigType = (): any => ({
    type: types.DEFAULT_CONFIG_TYPE,
});
export const defaultConfigTypeFalse = (): any => ({
    type: types.DEFAULT_CONFIG_TYPE_FALSE,
});

export const loadingDay = (payload: any): any => ({
    type: types.SET_LOADING_DAY,
});
export const loadingShift = (payload: any): any => ({
    type: types.SET_LOADING_SHIFT,
});
