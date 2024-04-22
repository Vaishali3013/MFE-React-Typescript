import {
    GET_CURRENTVALUES,
    GET_CURRENTVALUES_SUCCESS,
    GET_AGGREGATE_VALUES,
    GET_AGGREGATE_VALUES_SUCCESS,
    GET_UTILIZATION,
    GET_UTILIZATION_SUCCESS,
    KPI_METADATA,
    KPI_METADATA_SUCCESS,
    UPDATE_DATE_FILTER,
    GET_AVG_OXYGEN_VALUES,
    GET_AVG_OXYGEN_VALUES_SUCCESS,
    GET_FUEL_RATIO_VALUES,
    GET_FUEL_RATIO_VALUES_SUCCESS,
    GET_CHOOSE_PARAM_VALUES,
    GET_CHOOSE_PARAM_VALUES_SUCCESS,
    GET_POWER_CONSUMPTION_VALUES,
    GET_POWER_CONSUMPTION_VALUES_SUCCESS,
    GET_ECONOMISER_AND_APH_VALUES,
    GET_ECONOMISER_AND_APH_VALUES_SUCCESS,
    GET_STEAM_PRESSURE_TREND_SUCCESS,
    GET_STEAM_PRESSURE_TREND,
    GET_STEAM_TEMP_TREND_SUCCESS,
    GET_STEAM_TEMP_TREND,
    GET_FEED_WATER_TREND_SUCCESS,
    GET_FEED_WATER_TREND,
    GET_STEAM_RATE_SUCCESS,
    GET_STEAM_RATE,
    GET_PARAMETER_TREND_DATA,
    GET_PARAMETER_TREND_DATA_SUCCESS,
    UPDATE_PARAMETERS,
    GET_COAL_INTAKE_PROD,
    GET_COAL_INTAKE_PROD_SUCCESS,
    GET_REDUCTION_VALUES,
    GET_REDUCTION_VALUES_SUCCESS,
    GET_KPI_TREND_SUCCESS,
    SET_KPI_TREND,
    GET_STEAM_FLOW_RATE,
    GET_STEAM_FLOW_RATE_SUCCESS,
    GET_UTILIZATION_FAIL,
    GET_CURRENTVALUES_FAIL,
    KPI_METADATA_FAIL,
    GET_AGGREGATE_VALUES_FAIL,
    GET_POWER_CONSUMPTION_VALUES_FAIL,
    GET_ECONOMISER_AND_APH_VALUES_FAIL,
    GET_AVG_OXYGEN_VALUES_FAIL,
    GET_FUEL_RATIO_VALUES_FAIL,
    GET_CHOOSE_PARAM_VALUES_FAIL,
    GET_STEAM_RATE_FAIL,
    GET_FEED_WATER_TREND_FAIL,
    GET_STEAM_TEMP_TREND_FAIL,
    GET_STEAM_PRESSURE_TREND_FAIL,
    GET_KPI_TREND_FAIL,
    GET_PARAMETER_TREND_DATA_FAIL,
    GET_COAL_INTAKE_PROD_FAIL,
    GET_REDUCTION_VALUES_FAIL,
    GET_STEAM_FLOW_RATE_FAIL,
    GET_COAL_CONSUMPTION,
    GET_COAL_CONSUMPTION_SUCCESS,
    GET_COAL_CONSUMPTION_FAIL,
} from '../../types/nocilDashboardTypes';
import initialState from '../initialStates';

export default function nocilDashboardReducer(
    state = initialState.nocilDashboard,
    action: any
): any {
    switch (action.type) {
        case UPDATE_DATE_FILTER:
            state = {
                ...state,
                filterValues: action.payload,
            };
            return state;
        case GET_UTILIZATION:
            state = {
                ...state,
                utilization: {
                    ...state.utilization,
                    loader: true,
                },
            };
            return state;
        case GET_UTILIZATION_SUCCESS:
            state = {
                ...state,
                utilization: {
                    ...state.utilization,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_UTILIZATION_FAIL:
            state = {
                ...state,
                utilization: {
                    ...state.utilization,
                    loader: false,
                    data: {},
                },
            };
            return state;
        case GET_CURRENTVALUES:
            state = {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    loader: !state.currentValues.data.length ?? true,
                },
            };
            return state;
        case GET_CURRENTVALUES_SUCCESS:
            state = {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case GET_CURRENTVALUES_FAIL:
            state = {
                ...state,
                currentValues: {
                    ...state.currentValues,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case KPI_METADATA:
            state = {
                ...state,
                kpiMetaValues: {
                    ...state.kpiMetaValues,
                    loader: true,
                },
            };
            return state;
        case KPI_METADATA_SUCCESS:
            state = {
                ...state,
                kpiMetaValues: {
                    ...state.kpiMetaValues,
                    loader: false,
                    data: action?.response?.data,
                },
            };
            return state;
        case KPI_METADATA_FAIL:
            state = {
                ...state,
                kpiMetaValues: {
                    ...state.kpiMetaValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_AGGREGATE_VALUES:
            state = {
                ...state,
                aggregateValues: {
                    ...state.aggregateValues,
                    loader: true,
                },
            };
            return state;

        case GET_AGGREGATE_VALUES_SUCCESS:
            state = {
                ...state,
                aggregateValues: {
                    ...state.aggregateValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_AGGREGATE_VALUES_FAIL:
            state = {
                ...state,
                aggregateValues: {
                    ...state.aggregateValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_POWER_CONSUMPTION_VALUES:
            state = {
                ...state,
                powerConsumptionValues: {
                    ...state.powerConsumptionValues,
                    loader: true,
                },
            };
            return state;

        case GET_POWER_CONSUMPTION_VALUES_SUCCESS:
            state = {
                ...state,
                powerConsumptionValues: {
                    ...state.powerConsumptionValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_POWER_CONSUMPTION_VALUES_FAIL:
            state = {
                ...state,
                powerConsumptionValues: {
                    ...state.powerConsumptionValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_ECONOMISER_AND_APH_VALUES:
            state = {
                ...state,
                economiserAndAphvalues: {
                    ...state.economiserAndAphvalues,
                    loader: true,
                },
            };
            return state;

        case GET_ECONOMISER_AND_APH_VALUES_SUCCESS:
            state = {
                ...state,
                economiserAndAphvalues: {
                    ...state.economiserAndAphvalues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_ECONOMISER_AND_APH_VALUES_FAIL:
            state = {
                ...state,
                economiserAndAphvalues: {
                    ...state.economiserAndAphvalues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_AVG_OXYGEN_VALUES:
            state = {
                ...state,
                avgOxygenValues: {
                    ...state.avgOxygenValues,
                    loader: true,
                },
            };
            return state;

        case GET_AVG_OXYGEN_VALUES_SUCCESS:
            state = {
                ...state,
                avgOxygenValues: {
                    ...state.avgOxygenValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;

        case GET_AVG_OXYGEN_VALUES_FAIL:
            state = {
                ...state,
                avgOxygenValues: {
                    ...state.avgOxygenValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_FUEL_RATIO_VALUES:
            state = {
                ...state,
                fuelRatioValues: {
                    ...state.fuelRatioValues,
                    loader: true,
                },
            };
            return state;

        case GET_FUEL_RATIO_VALUES_SUCCESS:
            state = {
                ...state,
                fuelRatioValues: {
                    ...state.fuelRatioValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_FUEL_RATIO_VALUES_FAIL:
            state = {
                ...state,
                fuelRatioValues: {
                    ...state.fuelRatioValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_CHOOSE_PARAM_VALUES:
            state = {
                ...state,
                chooseParamValues: {
                    ...state.chooseParamValues,
                    loader: true,
                },
            };
            return state;

        case GET_CHOOSE_PARAM_VALUES_SUCCESS:
            state = {
                ...state,
                chooseParamValues: {
                    ...state.chooseParamValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_CHOOSE_PARAM_VALUES_FAIL:
            state = {
                ...state,
                chooseParamValues: {
                    ...state.chooseParamValues,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case GET_STEAM_RATE:
            state = {
                ...state,
                steamRateData: {
                    ...state.steamRateData,
                    loader: true,
                },
            };
            return state;
        case GET_STEAM_RATE_SUCCESS:
            state = {
                ...state,
                steamRateData: {
                    ...state.steamRateData,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_STEAM_RATE_FAIL:
            state = {
                ...state,
                steamRateData: {
                    ...state.steamRateData,
                    loader: false,
                    data: {},
                },
            };
            return state;
        case GET_FEED_WATER_TREND:
            state = {
                ...state,
                feedWaterTrend: {
                    ...state.feedWaterTrend,
                    loader: true,
                },
            };
            return state;
        case GET_FEED_WATER_TREND_SUCCESS:
            state = {
                ...state,
                feedWaterTrend: {
                    ...state.feedWaterTrend,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_FEED_WATER_TREND_FAIL:
            state = {
                ...state,
                feedWaterTrend: {
                    ...state.feedWaterTrend,
                    loader: false,
                    data: {},
                },
            };
            return state;
        case GET_STEAM_TEMP_TREND:
            state = {
                ...state,
                steamTempTrend: {
                    ...state.steamTempTrend,
                    loader: true,
                },
            };
            return state;
        case GET_STEAM_TEMP_TREND_SUCCESS:
            state = {
                ...state,
                steamTempTrend: {
                    ...state.steamTempTrend,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_STEAM_TEMP_TREND_FAIL:
            state = {
                ...state,
                steamTempTrend: {
                    ...state.steamTempTrend,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case GET_STEAM_PRESSURE_TREND:
            state = {
                ...state,
                steamPressure: {
                    ...state.steamPressure,
                    loader: true,
                },
            };
            return state;
        case GET_STEAM_PRESSURE_TREND_SUCCESS:
            state = {
                ...state,
                steamPressure: {
                    ...state.steamPressure,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_STEAM_PRESSURE_TREND_FAIL:
            state = {
                ...state,
                steamPressure: {
                    ...state.steamPressure,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case GET_KPI_TREND_SUCCESS:
            state = {
                ...state,
                kpiTrend: action.response.data,
            };
            return state;
        case GET_KPI_TREND_FAIL:
            state = {
                ...state,
                kpiTrend: {},
            };
            return state;
        case SET_KPI_TREND:
            state = {
                ...state,
                kpiTrendParameter: {
                    ...state.kpiTrendParameter,
                    view: action.payload.view,
                    kpiId: action.payload.id,
                    heading: action.payload.heading,
                    subHeading: action.payload.subHeading,
                    unit: action.payload.unit,
                },
            };
            return state;
        case UPDATE_PARAMETERS:
            // eslint-disable-next-line no-case-declarations
            const { values, operation } = action.payload;
            if (operation === 'add') {
                return {
                    ...state,
                    parameters: [...state.parameters, ...values],
                };
            } else if (operation === 'remove') {
                return {
                    ...state,
                    parameters: state.parameters.filter(
                        (value: any) => !values.includes(value)
                    ),
                };
            }
            return state; // Default case

        case GET_PARAMETER_TREND_DATA:
            state = {
                ...state,
                parameterTrendData: {
                    ...state.parameterTrendData,

                    loader: true,
                },
            };
            return state;
        case GET_PARAMETER_TREND_DATA_SUCCESS:
            state = {
                ...state,
                parameterTrendData: {
                    ...state.parameterTrendData,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;

        case GET_PARAMETER_TREND_DATA_FAIL:
            state = {
                ...state,
                parameterTrendData: {
                    ...state.parameterTrendData,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_COAL_INTAKE_PROD:
            state = {
                ...state,
                coalIntakeProd: {
                    ...state.coalIntakeProd,
                    loader: true,
                },
            };
            return state;

        case GET_COAL_INTAKE_PROD_SUCCESS:
            state = {
                ...state,
                coalIntakeProd: {
                    ...state.coalIntakeProd,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_COAL_INTAKE_PROD_FAIL:
            state = {
                ...state,
                coalIntakeProd: {
                    ...state.coalIntakeProd,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case GET_REDUCTION_VALUES:
            state = {
                ...state,
                reductionValues: {
                    ...state.reductionValues,
                    loader: true,
                },
            };
            return state;

        case GET_REDUCTION_VALUES_SUCCESS:
            state = {
                ...state,
                reductionValues: {
                    ...state.reductionValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_REDUCTION_VALUES_FAIL:
            state = {
                ...state,
                reductionValues: {
                    ...state.reductionValues,
                    loader: false,
                    data: [],
                },
            };
            return state;
        case GET_STEAM_FLOW_RATE:
            state = {
                ...state,
                steamFlowRate: {
                    ...state.steamFlowRate,
                    loader: true,
                },
            };
            return state;

        case GET_STEAM_FLOW_RATE_SUCCESS:
            state = {
                ...state,
                steamFlowRate: {
                    ...state.steamFlowRate,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_STEAM_FLOW_RATE_FAIL:
            state = {
                ...state,
                steamFlowRate: {
                    ...state.steamFlowRate,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case GET_COAL_CONSUMPTION:
            state = {
                ...state,
                coalConsumptionValues: {
                    ...state.coalConsumptionValues,
                    loader: true,
                },
            };
            return state;

        case GET_COAL_CONSUMPTION_SUCCESS:
            state = {
                ...state,
                coalConsumptionValues: {
                    ...state.coalConsumptionValues,
                    loader: false,
                    data: action.response.data,
                },
            };
            return state;
        case GET_COAL_CONSUMPTION_FAIL:
            state = {
                ...state,
                coalConsumptionValues: {
                    ...state.coalConsumptionValues,
                    loader: false,
                    data: [],
                },
            };
            return state;

        case 'OPEN_ASSUMPTION_AND_FORMULA':
            return {
                ...state,
                isAssumptionAndFormulaOpen: true,
            };
        case 'CLOSE_ASSUMPTION_AND_FORMULA':
            return {
                ...state,
                isAssumptionAndFormulaOpen: false,
            };
        default:
            return state;
    }
}
