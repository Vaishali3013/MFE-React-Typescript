import {
    GET_AGGREGATE_VALUES_FAIL,
    GET_AVG_OXYGEN_VALUES_FAIL,
    GET_CHOOSE_PARAM_VALUES_FAIL,
    GET_COAL_CONSUMPTION,
    GET_COAL_CONSUMPTION_FAIL,
    GET_COAL_CONSUMPTION_SUCCESS,
    GET_COAL_INTAKE_PROD_FAIL,
    GET_CURRENTVALUES_FAIL,
    GET_ECONOMISER_AND_APH_VALUES_FAIL,
    GET_FEED_WATER_TREND_FAIL,
    GET_FUEL_RATIO_VALUES_FAIL,
    GET_KPI_CSV,
    GET_KPI_CSV_FAIL,
    GET_KPI_CSV_SUCCESS,
    GET_KPI_EXPORT_DATA,
    GET_KPI_EXPORT_DATA_FAILURE,
    GET_KPI_EXPORT_DATA_SUCCESS,
    GET_KPI_TREND_FAIL,
    GET_PARAMETER_TREND_DATA_FAIL,
    GET_POWER_CONSUMPTION_VALUES_FAIL,
    GET_STEAM_PRESSURE_TREND_FAIL,
    GET_STEAM_RATE_FAIL,
    GET_STEAM_TEMP_TREND_FAIL,
    GET_UTILIZATION_FAIL,
    KPI_METADATA_FAIL,
} from './../../types/nocilDashboardTypes';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
    GET_CURRENTVALUES,
    GET_CURRENTVALUES_SUCCESS,
    GET_AGGREGATE_VALUES,
    GET_AGGREGATE_VALUES_SUCCESS,
    GET_UTILIZATION,
    GET_UTILIZATION_SUCCESS,
    KPI_METADATA,
    GET_AVG_OXYGEN_VALUES,
    GET_AVG_OXYGEN_VALUES_SUCCESS,
    GET_FUEL_RATIO_VALUES_SUCCESS,
    GET_FUEL_RATIO_VALUES,
    GET_CHOOSE_PARAM_VALUES_SUCCESS,
    GET_CHOOSE_PARAM_VALUES,
    GET_POWER_CONSUMPTION_VALUES_SUCCESS,
    GET_POWER_CONSUMPTION_VALUES,
    GET_ECONOMISER_AND_APH_VALUES_SUCCESS,
    GET_ECONOMISER_AND_APH_VALUES,
    GET_STEAM_TEMP_TREND_SUCCESS,
    GET_FEED_WATER_TREND_SUCCESS,
    GET_STEAM_RATE_SUCCESS,
    GET_STEAM_PRESSURE_TREND_SUCCESS,
    KPI_METADATA_SUCCESS,
    GET_PARAMETER_TREND_DATA_SUCCESS,
    GET_PARAMETER_TREND_DATA,
    GET_STEAM_RATE,
    GET_COAL_INTAKE_PROD,
    GET_COAL_INTAKE_PROD_SUCCESS,
    GET_FEED_WATER_TREND,
    GET_STEAM_TEMP_TREND,
    GET_STEAM_PRESSURE_TREND,
    GET_KPI_TREND,
    GET_KPI_TREND_SUCCESS,
    GET_REDUCTION_VALUES_SUCCESS,
    GET_REDUCTION_VALUES,
    GET_STEAM_FLOW_RATE_SUCCESS,
    GET_STEAM_FLOW_RATE,
    GET_STEAM_FLOW_RATE_FAIL,
    GET_REDUCTION_VALUES_FAIL,
} from 'redux/types/nocilDashboardTypes';
import {
    getCurrentDataService,
    getKPIMetaService,
    getUtilizationDataService,
    getAggregatedValuesService,
    getSteamRateDataService,
    getTrendDataService,
    getKPIDataService,
    getKPIAggDataService,
} from 'redux/services/KPIServices/reportingDataServices';

export function* getutilizationSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getUtilizationData = yield call(
            getUtilizationDataService,
            payload
        );
        yield put({
            type: GET_UTILIZATION_SUCCESS,
            response: getUtilizationData,
        });
    } catch (error: any) {
        yield put({
            type: GET_UTILIZATION_FAIL,
            response: error,
        });
    }
}
export function* getCurrentValuesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getCurrentData = yield call(getCurrentDataService, payload);
        yield put({
            type: GET_CURRENTVALUES_SUCCESS,
            response: getCurrentData,
        });
    } catch (error: any) {
        yield put({
            type: GET_CURRENTVALUES_FAIL,
            response: error,
        });
    }
}
export function* getKPIMetaSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getKPIData = yield call(getKPIMetaService, payload);
        yield put({
            type: KPI_METADATA_SUCCESS,
            response: getKPIData,
        });
    } catch (error: any) {
        yield put({
            type: KPI_METADATA_FAIL,
            response: error,
        });
    }
}

export function* getefficiencySaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getEfficiencyData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_AGGREGATE_VALUES_SUCCESS,
            response: getEfficiencyData,
        });
    } catch (error: any) {
        yield put({
            type: GET_AGGREGATE_VALUES_FAIL,
            response: error,
        });
    }
}

export function* getPowerConsumptionSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getPowerConsumptionSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_POWER_CONSUMPTION_VALUES_SUCCESS,
            response: getPowerConsumptionSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_POWER_CONSUMPTION_VALUES_FAIL,
            response: error,
        });
    }
}

export function* getEconomiserAndAphSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getEconomiserAndAphSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_ECONOMISER_AND_APH_VALUES_SUCCESS,
            response: getEconomiserAndAphSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_ECONOMISER_AND_APH_VALUES_FAIL,
            response: error,
        });
    }
}

export function* getAvgOxygenSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getAvgOxygenSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_AVG_OXYGEN_VALUES_SUCCESS,
            response: getAvgOxygenSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_AVG_OXYGEN_VALUES_FAIL,
            response: error,
        });
    }
}

export function* getFuelRatioSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getFuelRatioSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_FUEL_RATIO_VALUES_SUCCESS,
            response: getFuelRatioSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_FUEL_RATIO_VALUES_FAIL,
            response: error,
        });
    }
}

export function* getChooseParamSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getChooseParamSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_CHOOSE_PARAM_VALUES_SUCCESS,
            response: getChooseParamSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_CHOOSE_PARAM_VALUES_FAIL,
            response: error,
        });
    }
}
export function* getSteamRateSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getSteamData = yield call(getSteamRateDataService, payload);
        yield put({
            type: GET_STEAM_RATE_SUCCESS,
            response: getSteamData,
        });
    } catch (error: any) {
        yield put({
            type: GET_STEAM_RATE_FAIL,
            response: error,
        });
    }
}
export function* getFeedWaterTrendSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getFeedTrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_FEED_WATER_TREND_SUCCESS,
            response: getFeedTrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_FEED_WATER_TREND_FAIL,
            response: error,
        });
    }
}
export function* getSteamTempTrendSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getFeedTrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_STEAM_TEMP_TREND_SUCCESS,
            response: getFeedTrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_STEAM_TEMP_TREND_FAIL,
            response: error,
        });
    }
}
export function* getSteamPressureSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getFeedTrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_STEAM_PRESSURE_TREND_SUCCESS,
            response: getFeedTrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_STEAM_PRESSURE_TREND_FAIL,
            response: error,
        });
    }
}
export function* getParameterTrendSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getFeedTrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_PARAMETER_TREND_DATA_SUCCESS,
            response: getFeedTrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_PARAMETER_TREND_DATA_FAIL,
            response: error,
        });
    }
}
export function* getCoalIntakeprodTrendSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getCoalTrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_COAL_INTAKE_PROD_SUCCESS,
            response: getCoalTrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_COAL_INTAKE_PROD_FAIL,
            response: error,
        });
    }
}
export function* getKPITrendSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getKPITrend = yield call(getTrendDataService, payload);
        yield put({
            type: GET_KPI_TREND_SUCCESS,
            response: getKPITrend,
        });
    } catch (error: any) {
        yield put({
            type: GET_KPI_TREND_FAIL,
            response: error,
        });
    }
}

export function* getReductionPowerSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const reductionPowerValues = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_REDUCTION_VALUES_SUCCESS,
            response: reductionPowerValues,
        });
    } catch (error: any) {
        yield put({
            type: GET_REDUCTION_VALUES_FAIL,
            response: error,
        });
    }
}
export function* getSteamRateFlowSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getSteamData = yield call(getAggregatedValuesService, payload);
        yield put({
            type: GET_STEAM_FLOW_RATE_SUCCESS,
            response: getSteamData,
        });
    } catch (error: any) {
        yield put({
            type: GET_STEAM_FLOW_RATE_FAIL,
            response: error,
        });
    }
}
export function* getCoalConsumptionSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getCoalConsumptionSagaData = yield call(
            getAggregatedValuesService,
            payload
        );
        yield put({
            type: GET_COAL_CONSUMPTION_SUCCESS,
            response: getCoalConsumptionSagaData,
        });
    } catch (error: any) {
        yield put({
            type: GET_COAL_CONSUMPTION_FAIL,
            response: error,
        });
    }
}
export function* getKPICSVDataSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getKPIDataResponse = yield call(getKPIDataService, payload);
        yield put({
            type: GET_KPI_CSV_SUCCESS,
            response: getKPIDataResponse,
        });
    } catch (error: any) {
        yield put({
            type: GET_KPI_CSV_FAIL,
            response: error,
        });
    }
}

export function* getKPICSVAggDataSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getKPIAggDataResponse = yield call(getKPIAggDataService, payload);
        yield put({
            type: GET_KPI_EXPORT_DATA_SUCCESS,
            response: getKPIAggDataResponse,
        });
    } catch (error: any) {
        yield put({
            type: GET_KPI_EXPORT_DATA_FAILURE,
            response: error,
        });
    }
}

export function* nocilSaga(): any {
    yield all([takeLatest(GET_UTILIZATION, getutilizationSaga)]);
    yield all([takeLatest(GET_CURRENTVALUES, getCurrentValuesSaga)]);
    yield all([takeLatest(KPI_METADATA, getKPIMetaSaga)]);
    yield all([takeLatest(GET_AGGREGATE_VALUES, getefficiencySaga)]);
    yield all([
        takeLatest(GET_POWER_CONSUMPTION_VALUES, getPowerConsumptionSaga),
    ]);
    yield all([
        takeLatest(GET_ECONOMISER_AND_APH_VALUES, getEconomiserAndAphSaga),
    ]);
    yield all([takeLatest(GET_AVG_OXYGEN_VALUES, getAvgOxygenSaga)]);
    yield all([takeLatest(GET_FUEL_RATIO_VALUES, getFuelRatioSaga)]);
    yield all([takeLatest(GET_CHOOSE_PARAM_VALUES, getChooseParamSaga)]);
    yield all([takeLatest(GET_PARAMETER_TREND_DATA, getParameterTrendSaga)]);
    yield all([takeLatest(GET_STEAM_RATE, getSteamRateSaga)]);
    yield all([takeLatest(GET_COAL_INTAKE_PROD, getCoalIntakeprodTrendSaga)]);
    yield all([takeLatest(GET_FEED_WATER_TREND, getFeedWaterTrendSaga)]);
    yield all([takeLatest(GET_STEAM_TEMP_TREND, getSteamTempTrendSaga)]);
    yield all([takeLatest(GET_STEAM_PRESSURE_TREND, getSteamPressureSaga)]);

    yield all([takeLatest(GET_REDUCTION_VALUES, getReductionPowerSaga)]);
    yield all([takeLatest(GET_KPI_TREND, getKPITrendSaga)]);
    yield all([takeLatest(GET_STEAM_FLOW_RATE, getSteamRateFlowSaga)]);
    yield all([takeLatest(GET_COAL_CONSUMPTION, getCoalConsumptionSaga)]);
    yield all([takeLatest(GET_KPI_CSV, getKPICSVDataSaga)]);
    yield all([takeLatest(GET_KPI_EXPORT_DATA, getKPICSVAggDataSaga)]);
}

export default nocilSaga;
