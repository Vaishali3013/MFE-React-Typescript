import {
    GET_CURRENTVALUES,
    GET_AGGREGATE_VALUES,
    GET_UTILIZATION,
    KPI_METADATA,
    UPDATE_DATE_FILTER,
    GET_AVG_OXYGEN_VALUES,
    GET_FUEL_RATIO_VALUES,
    GET_CHOOSE_PARAM_VALUES,
    GET_POWER_CONSUMPTION_VALUES,
    GET_ECONOMISER_AND_APH_VALUES,
    GET_STEAM_RATE,
    GET_FEED_WATER_TREND,
    GET_STEAM_TEMP_TREND,
    GET_STEAM_PRESSURE_TREND,
    GET_PARAMETER_TREND_DATA,
    UPDATE_PARAMETERS,
    GET_COAL_INTAKE_PROD,
    GET_REDUCTION_VALUES,
    GET_KPI_TREND,
    SET_KPI_TREND,
    GET_STEAM_FLOW_RATE,
    GET_COAL_CONSUMPTION,
    GET_KPI_CSV,
    CLOSE_ASSUMPTION_AND_FORMULA,
    OPEN_ASSUMPTION_AND_FORMULA,
    GET_KPI_EXPORT_DATA,
} from 'redux/types/nocilDashboardTypes';

export const changeDateFilter = (payload: any): any => ({
    type: UPDATE_DATE_FILTER,
    payload: payload,
});

export const getUtilization = (payload: any): any => ({
    type: GET_UTILIZATION,
    payload: payload,
});
export const getCurrentValues = (payload: any): any => ({
    type: GET_CURRENTVALUES,
    payload: payload,
});
export const getKPIMetaData = (payload: any): any => ({
    type: KPI_METADATA,
    payload: payload,
});

export const getAggregateValues = (payload: any): any => ({
    type: GET_AGGREGATE_VALUES,
    payload: payload,
});

export const getPowerConsumptionValues = (payload: any): any => ({
    type: GET_POWER_CONSUMPTION_VALUES,
    payload: payload,
});

export const getEconomizerAndAphValues = (payload: any): any => ({
    type: GET_ECONOMISER_AND_APH_VALUES,
    payload: payload,
});

export const getAvgOxygenValues = (payload: any): any => ({
    type: GET_AVG_OXYGEN_VALUES,
    payload: payload,
});

export const getFuelRatioValues = (payload: any): any => ({
    type: GET_FUEL_RATIO_VALUES,
    payload: payload,
});

export const getChooseParamValues = (payload: any): any => ({
    type: GET_CHOOSE_PARAM_VALUES,
    payload: payload,
});

export const getSteamRateData = (payload: any): any => ({
    type: GET_STEAM_RATE,
    payload: payload,
});
export const getFeedWaterTrend = (payload: any): any => ({
    type: GET_FEED_WATER_TREND,
    payload: payload,
});
export const getSteamTemp = (payload: any): any => ({
    type: GET_STEAM_TEMP_TREND,
    payload: payload,
});
export const getSteamPressure = (payload: any): any => ({
    type: GET_STEAM_PRESSURE_TREND,
    payload: payload,
});

export const getParameterTrend = (payload: any): any => ({
    type: GET_PARAMETER_TREND_DATA,
    payload: payload,
});

export const updateParameters: any = (
    values: string[],
    operation: 'add' | 'remove'
) => ({
    type: UPDATE_PARAMETERS,
    payload: { values, operation },
});

export const getCoalIntakeProd = (payload: any): any => ({
    type: GET_COAL_INTAKE_PROD,
    payload: payload,
});

export const getReductionValues = (payload: any): any => ({
    type: GET_REDUCTION_VALUES,
    payload: payload,
});
export const getKPITrend = (payload: any): any => ({
    type: GET_KPI_TREND,
    payload: payload,
});

export const setKPITrend = (payload: any): any => ({
    type: SET_KPI_TREND,
    payload: payload,
});
export const getSteamRateFlowData = (payload: any): any => ({
    type: GET_STEAM_FLOW_RATE,
    payload: payload,
});

export const getCoalConsumptionValues = (payload: any): any => ({
    type: GET_COAL_CONSUMPTION,
    payload: payload,
});

export const getKPICSVData = (payload: any): any => ({
    type: GET_KPI_CSV,
    payload: payload,
});
export const getKPICSVAggData = (payload: any): any => ({
    type: GET_KPI_EXPORT_DATA,
    payload: payload,
});
export const openAssumptionAndFormula = (): any => ({
    type: OPEN_ASSUMPTION_AND_FORMULA,
});

export const closeAssumptionAndFormula = (): any => ({
    type: CLOSE_ASSUMPTION_AND_FORMULA,
});
