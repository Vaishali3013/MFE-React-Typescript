import initialState from '../initialStates';
import * as types from 'redux/types/implementationTypes';


export default function implementationReducers(
    state = initialState.implementation,
    action: any
): any {
    switch (action.type) {
        case types.SELECTED_ASSET:
            return {
                ...state,
                attribute: {
                    ...state.attribute,
                    selectedAsset: action?.payload,
                },
            };
        case types.GET_ASSIGNED_ATTRIBUTE_LIST:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    attributesListLoading: true,
                },
            };
            return state;
        case types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    assignedAttributeList: action.response.data,
                    attributesListLoading: false,
                    createAttribute: false,
                    createUom: false,
                    updateAttribute: false,
                    statusUpdateAttribute: false,
                    attributeDetails: {},
                    isValidateEditSuccess: false
                },
            };
            return state;
        case types.GET_ASSIGNED_ATTRIBUTE_LIST_FAILURE:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    attributesListLoading: false,
                },
            };
            return state;

        case types.GET_UNASSIGNED_ATTRIBUTE_LIST:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    attributesListLoading: true,
                },
            };
            return state;
        case types.GET_UNASSIGNED_ATTRIBUTE_LIST_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    UnassignedAttributeList: action.response.data,
                    attributesListLoading: false,
                },
            };
            return state;
        case types.GET_UNASSIGNED_ATTRIBUTE_LIST_FAILURE:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    attributesListLoading: false,
                },
            };
            return state;
        case types.ASSIGN_ATTRIBUTE_LIST_TO_ASSET_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    isAssign: true,
                },
            };
            return state;

        case types.VALIDATE_STATIC_VALUE_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    isValidateSuccess: true,
                },
            };

            return state;

        case types.SET_ATTRIBUTE_IMPL_STATE:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    attributeStateImpl: action.payload,
                },
            };
            return state;
        case types.CLEAR_ASSIGNED_ATTRIBUTE_DATA:
            state={
                ...state,
                attribute:{
                    ...state.attribute,
                    assignedAttributeList:[]
                }
            }
            return state

        case types.GET_TAG_LIST_DATA:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    tagsList: state.attribute.tagsList,
                    tagsListLoading: true,
                },
                // tagsList: {
                //     ...state.tagsList,
                //     tagsListLoading: true,
                // },
            };
            return state;
        case types.GET_TAG_LIST_DATA_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    tagsList: action.response.data,
                    tagsListLoading: false,
                    isValidateEditSuccess: false
                },
            };
            return state;
        case types.GET_TAG_LIST_DATA_FAILURE:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    tagsList: state.attribute.tagsList,
                    tagsListLoading: false,
                },
                // tagsList: {
                //     ...state.attribute,

                // },
            };
            return state;
        case types.VALIDATE_TAG_VALUE_ATTRIBUTE_SUCCESS:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    isValidateSuccess: true,
                },
            };

            return state;
        // case types.REMOVE_TAG_DATA:
        //     state = {
        //         ...state,
        //         attribute: {
        //             ...state.attribute,
        //             tagsList: {},
        //         },
        //     };

        //     return state;

        case types.VALIDATE_TAG_VALUE_ATTRIBUTE_SUCCESS_EDIT:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    isValidateEditSuccess: true,
                    tagsList: []
                },
            };

            return state;
        case types.REMOVE_TAG_DATA:
            state = {
                ...state,
                attribute: {
                    ...state.attribute,
                    tagsList: {},
                },
            };
            return state;
            case types.EDIT_MODAL_DEFAULT_STATE:
                state = {
                    ...state,
                    attribute: {
                        ...state.attribute,
                        isValidateEditSuccess:false,
                        isValidateSuccess:false
                    },
                };
                return state;
        case types.GET_ASSIGNED_TIME_CAPSULE_LIST_SUCCESS:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignedTimeCapsuleList: action?.response?.data,
                    assignedTimeCapsuleListLoading: false,
                    isTimeCapsuleRemovedFromAsset: false,
                    assignTimeCapsuleToAsset: false,
                },
            };
        case types.GET_ASSIGNED_TIME_CAPSULE_LIST:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignedTimeCapsuleListLoading: true,
                },
            };
        case types.GET_UNASSIGNED_TIME_CAPSULE_LIST_SUCCESS:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    unassignedTimeCapsuleList: action?.response?.data,
                    unassignedTimeCapsuleListLoading: false,
                },
            };
        case types.GET_UNASSIGNED_TIME_CAPSULE_LIST:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    unassignedTimeCapsuleListLoading: true,
                },
            };
        case types.ASSIGN_TIME_CAPSULE_TO_ASSET_SUCCESS:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignTimeCapsuleToAsset: true,
                },
            };
        case types.REMOVE_TIME_CAPSULE_FROM_ASSET:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignedTimeCapsuleListLoading: true,
                },
            };
        case types.REMOVE_TIME_CAPSULE_FROM_ASSET_SUCCESS:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    isTimeCapsuleRemovedFromAsset: true,
                    assignedTimeCapsuleListLoading: false,
                },
            };
        case types.CLEAR_ASSIGNED_TIME_CAPSULE_DATA:
            return {
                ...state,
                timeCapsule: {
                    ...state.timeCapsule,
                    assignedTimeCapsuleList: [],
                },
            };

        case types.GET_ASSIGNED_TABLE_LIST:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: true,
                },
            };
            return state;
        case types.GET_ASSIGNED_TABLE_LIST_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    assignedTableList:
                        action?.response?.data?.paginatedResponse?.records,
                    assignedTotalCount:
                        action?.response?.data?.paginatedResponse?.totalRecords,
                    notValidatedCount:
                        action?.response?.data?.nonValidatedTableCount,
                    validatedCount: action?.response?.data?.validatedTableCount,
                    tableListLoading: false,
                },
            };
            return state;
        case types.GET_ASSIGNED_TABLE_LIST_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: false,
                },
            };
            return state;
        case types.GET_UNASSIGNED_TABLE_LIST:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: true,
                },
            };
            return state;
        case types.GET_UNASSIGNED_TABLE_LIST_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    unassignedTableList:
                        action?.response?.data?.paginatedResponse?.records,
                    unassignedTotalCount:
                        action?.response?.data?.paginatedResponse?.totalRecords,
                    tableListLoading: false,
                },
            };
            return state;
        case types.GET_UNASSIGNED_TABLE_LIST_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableListLoading: false,
                },
            };
            return state;
        case types.ASSIGN_TABLE_TO_ASSET_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableAssigned: true,
                },
            };
            return state;
        case types.UNASSIGN_TABLE_TO_ASSET_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableAssigned: true,
                },
            };
            return state;
        case types.RESET_ASSIGN_TABLE_STATUS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableAssigned: false,
                },
            };
            return state;
        case types.CLEAR_TABLE_DATA:
            return {
                ...state,
                table: {
                    ...state.table,
                    assignedTableList: [],
                    assignedTotalCount: null,
                    notValidatedCount: null,
                    validatedCount: null,
                },
            };
        case types.GET_TABLE_VALUES:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableValuesLoading: true,
                },
            };
            return state;
        case types.GET_TABLE_VALUES_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableValuesList: action?.response?.data?.paginatedResponse,
                    tableColumnsList: action?.response?.data?.columnList,
                    tableValuesLoading: false,
                },
            };
            return state;
        case types.GET_TABLE_VALUES_FAILURE:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableValuesLoading: false,
                },
            };
            return state;
        case types.VALIDATE_TABLE_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableValidated: true,
                },
            };
            return state;
        case types.EDIT_TABLE_SUCCESS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableUpdated: true,
                },
            };
            return state;
        case types.RESET_VALIDATE_TABLE_STATUS:
            state = {
                ...state,
                table: {
                    ...state.table,
                    tableValidated: false,
                    tableUpdated: false,
                },
            };
            return state;
        default:
            return state;
    }
}


