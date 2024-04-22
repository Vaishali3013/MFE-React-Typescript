import * as types from 'redux/types/configureTypes';
import initialState from '../initialStates';

export default function configureReducer(
    state = initialState.configure,
    action: any
): any {
    switch (action.type) {
        case types.SET_ATTRIBUTE_STATE:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributeState: action.payload,
                },
            };
            return state;
        case types.GET_ATTRIBUTE_LIST:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributesListLoading: true,
                },
            };
            return state;
        case types.GET_ATTRIBUTE_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributesList: action.response.data,
                    attributesListLoading: false,
                    createAttribute: false,
                    createUom: false,
                    updateAttribute: false,
                    statusUpdateAttribute: false,
                    attributeDetails: {},
                },
            };
            return state;
        case types.GET_ATTRIBUTE_LIST_FAILURE:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributesListLoading: false,
                },
            };
            return state;
        case types.GET_ATTRIBUTE_DETAILS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributesDetailLoading: true,
                },
            };
            return state;
        case types.GET_ATTRIBUTE_DETAIL_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributeDetails: action.response.data,
                    attributesDetailLoading: false,
                },
            };
            return state;
        case types.GET_ATTRIBUTE_DETAIL_FAILURE:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    attributesDetailLoading: false,
                },
            };
            return state;
        case types.GET_INDUSTRY_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    industryList: action.response.data,
                    createIndustry: false,
                },
            };
            return state;
        case types.GET_CATEGORY_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    categoryList: action.response.data,
                    createCategory: false,
                },
            };
            return state;
        case types.GET_DATA_REFERENCE_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    dataReferenceList: action.response.data,
                },
            };
            return state;
        case types.GET_VALUE_TYPE_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    valueTypeList: action.response.data,
                },
            };
            return state;
        case types.GET_PROPERTY_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    propertyList: action.response.data,
                },
            };
            return state;
        case types.GET_UOM_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    uomList: action.response.data,
                    createUom: false,
                },
            };
            return state;
        case types.GET_UOM_CLASS_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    uomClassList: action.response.data,
                    createUomClass: false,
                },
            };
            return state;
        case types.GET_UOM_METRIC_LIST_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    uomMetricList: action.response.data,
                },
            };
            return state;
        case types.CREATE_UOM_CLASS_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createUomClass: true,
                },
            };
            return state;
        case types.CREATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createCategory: true,
                },
            };
            return state;
        case types.CREATE_INDUSTRY_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createIndustry: true,
                },
            };
            return state;
        case types.CREATE_UOM_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createUom: true,
                },
            };
            return state;
        case types.CREATE_UOM_FAILURE:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createUom: false,
                },
            };
            return state;
        case types.CREATE_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    createAttribute: true,
                },
            };
            return state;
        case types.UPDATE_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    updateAttribute: true,
                },
            };
            return state;
        case types.STATUS_UPDATE_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attributes: {
                    ...state.attributes,
                    statusUpdateAttribute: true,
                },
            };
            return state;
        case types.ATTRUBUTE_FIELDS_VALUES:
            state = {
                ...state,
                attributesFieldsValues: action.payload,
            };
            return state;
        case types.SET_TABLE_STATE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableState: action.payload,
                },
            };
            return state;
        case types.GET_TABLE_LIST:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: true,
                },
            };
            return state;
        case types.GET_TABLE_LIST_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableList: action.response.data,
                    tableListLoading: false,
                    createTable: false,
                    tableDetails: {},
                    statusUpdateTable: false,
                    updateTable: false,
                    assignTable: false,
                    deleteTableRow: false
                },
            };
            return state;
        case types.GET_TABLE_LIST_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: false,
                },
            };
            return state;
        case types.CREATE_TABLE_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    createTable: true,
                },
            };
            return state;
        case types.CHANGE_SUCCESS_STATUS_OF_TABLE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    createTable: false,
                },
            };
            return state;
        case types.GET_TABLE_DETAILS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableDetailLoading: true,
                },
            };
            return state;
        case types.GET_TABLE_DETAIL_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableDetails: action.response.data,
                    tableDetailLoading: false,
                    deleteTableRow: false
                },
            };
            return state;
        case types.GET_TABLE_DETAIL_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableDetailLoading: false,
                },
            };
            return state;
        case types.UPDATE_TABLE_DATA_FOR_LOCAL:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableUpdatedName: action.payload.nameState,
                    tableUpdatedDescription: action.payload.descriptionState,
                },
            };
            return state;
        case types.STATUS_UPDATE_TABLE_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    statusUpdateTable: true,
                },
            };
            return state;
        case types.UPDATE_TABLE_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    updateTable: true,
                },
            };
            return state;
        case types.DELETE_TABLE_ROW_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    deleteTableRow: true,
                },
            };
            return state;
        case types.DELETE_TABLE_ROW_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    deleteTableRow: false,
                    },
            };
            return state;
        case types.SET_TIME_CAPSULE_STATE:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleState: action.payload,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_LIST:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleListLoading: true,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_LIST_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleList: action.response.data,
                    timeCapsuleListLoading: false,
                    createTimeCapsule: false,
                    timeCapsuleDetails: {},
                    statusUpdateTimeCapsule: false,
                    updateTimeCapsule: false,
                    assignTimeCapsule: false,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_LIST_FAILURE:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleListLoading: false,
                },
            };
            return state;
        case types.CREATE_TIME_CAPSULE_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    createTimeCapsule: true,
                },
            };
            return state;
        case types.CHANGE_SUCCESS_STATUS_OF_TIMECAPSULE:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    createTimeCapsule: false,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_DETAILS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleDetailLoading: true,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_DETAIL_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleDetails: action.response.data,
                    timeCapsuleDetailLoading: false,
                },
            };
            return state;
        case types.GET_TIME_CAPSULE_DETAIL_FAILURE:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleDetailLoading: false,
                },
            };
            return state;
        case types.UPDATE_TIMECAPSULE_DATA_FOR_LOCAL:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    timeCapsuleUpdatedName: action.payload.nameState,
                    timeCapsuleUpdatedDescription:
                        action.payload.descriptionState,
                },
            };
            return state;
        case types.STATUS_UPDATE_TIME_CAPSULE_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    statusUpdateTimeCapsule: true,
                },
            };
            return state;
        case types.UPDATE_TIME_CAPSULE_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    updateTimeCapsule: true,
                },
            };
            return state;
        case types.ASSIGN_TIME_CAPSULE_SUCCESS:
            state = {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignTimeCapsule: true,
                },
            };
            return state;
        case types.SET_KPI_STATE:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiState: action.payload,
                },
            };
            return state;
        case types.KPI_FIELDS_VALUES:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiFieldsValues: action.payload,
                },
            };
            return state;
        case types.GET_KPI_TYPE_LIST_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiTypeList: action?.response?.data?.kpiTypeList,
                },
            };
            return state;
        case types.GET_TARGET_TYPE_LIST_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    targetTypeList: action?.response?.data?.targetTypeList,
                },
            };
            return state;
        case types.GET_AGGREGATION_TYPE_LIST_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    aggregationTypeList:
                        action?.response?.data?.aggregationTypeList,
                },
            };
            return state;
        case types.GET_NODE_LEVEL_LIST_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    nodeLevelList: action?.response?.data,
                },
            };
            return state;
        case types.CREATE_KPI_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    createKpi: true,
                },
            };
            return state;
        case types.GET_KPI_LIST:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiListLoading: true,
                },
            };
            return state;
        case types.GET_KPI_LIST_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiList: action.response.data,
                    kpiListLoading: false,
                    createKpi: false,
                    createUom: false,
                    updateKpi: false,
                    statusUpdateKpi: false,
                    kpiDetails: {},
                },
            };
            return state;
        case types.GET_KPI_LIST_FAILURE:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiListLoading: false,
                },
            };
            return state;
        case types.GET_KPI_DETAILS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiDetailLoading: true,
                },
            };
            return state;
        case types.GET_KPI_DETAIL_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiDetails: action.response.data,
                    kpiDetailLoading: false,
                },
            };
            return state;
        case types.GET_KPI_DETAIL_FAILURE:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    kpiDetailLoading: false,
                },
            };
            return state;
        case types.STATUS_UPDATE_KPI_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    statusUpdateKpi: true,
                },
            };
            return state;
        case types.UPDATE_KPI_SUCCESS:
            state = {
                ...state,
                kpi: {
                    ...state.kpi,
                    updateKpi: true,
                },
            };
            return state;
        default:
            return state;
    }
}
