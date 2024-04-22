import * as types from 'redux/types/deviceManagementTypes';
import initialState from '../initialStates';
import {
    ADD_DEVICE_SUCCESS,
    ADD_SELECTED_BLA_TO_REDUX,
    ADD_SELECTED_DEVICE_TO_REDUX,
    GET_ALL_DEVICES_LIST_BY_BLA_ID_SUCCESS,
    GET_ALL_TAG_LIST_BY_DEVICE_SUCCESS,
    UPLOAD_TAGS_SUCCESS,
} from 'redux/actions/actionTypes';

export default function deviceManagementReducer(
    state = initialState.deviceManagement,
    action: any
): any {
    switch (action.type) {
        case types.SET_ADD_BLA_STATE:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    addBlaState: action.payload,
                },
            };
            return state;
        case types.SET_SIDEBAR_NAVIGATE:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    sidebarNavigate: action.payload,
                },
            };
            return state;
        case types.SET_CURRENT_STATE:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    addDeviceState: action.payload,
                },
            };
            return state;
        case types.SET_BLA_ID:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blaId: action.payload,
                },
            };
            return state;
        case types.SET_DEVICE_ID:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    deviceId: action.payload,
                },
            };
            return state;
        case types.GET_BLAS_LIST:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blasListLoading: true,
                },
            };
            return state;
        case types.GET_BLAS_LIST_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blasList: action.response.data,
                    blasListLoading: false,
                    blaDetails: {},
                    isEdited: false,
                },
            };
            return state;
        case types.GET_BLAS_LIST_FAILURE:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blasListLoading: false,
                },
            };
            return state;
        case types.GET_ALL_BLAS_LIST_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    allBlasList: action.response.data,
                },
            };
            return state;
        case types.GET_BLA_DETAILS_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blaDetails: action.response.data,
                },
            };
            return state;

        case types.ACTIVATE_DEACTIVATE_BLAS_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    blaStatusChanged: !state.blas.blaStatusChanged,
                },
            };
            return state;
        case types.SET_BLA_LIST_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    createBlaState: true,
                    lastCreatedBla: action.response,
                },
            };
            return state;
        case types.REMOVE_LAST_CREATED_BLA:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    createBlaState: true,
                    lastCreatedBla: null,
                },
                devices: {
                    ...state.devices,
                    lastAddedDevice: null,
                },
            };
            return state;

        case types.REMOVE_SELECTED_DEVICE:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    selectedDevice: null,
                },
                devices: {
                    ...state.devices,
                    lastAddedDevice: null,
                },
            };
            return state;
        case types.EDIT_BLA_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    isEdited: true,
                },
            };
            return state;

        case types.SET_TAG_LIST_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    createTagState: true,
                },
            };
            return state;
        case UPLOAD_TAGS_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    uploadedTags: true,
                },
            };
            return state;
        case types.REMOVE_CREATED_TAG_STATUS_REDUX:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    createTagState: false,
                },
            };
            return state;

        case types.GET_TAG_LIST:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagsListLoading: true,
                },
            };
            return state;

        case types.GET_TAG_LIST_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagsList: action.response.data,
                    tagsListLoading: false,
                    isEdited: false,
                    tagStatusChanged: false,
                },
            };
            return state;
        case types.GET_TAG_LIST_FAILURE:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagsListLoading: false,
                },
            };
            return state;
        case types.GET_ALL_TAG_LIST_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    allTagsList: action.response.data,
                },
            };
            return state;
        case GET_ALL_TAG_LIST_BY_DEVICE_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    allTagsByDeviceId: action.response.data,
                    tagStatusResponse: false,
                },
            };
            return state;
        case types.GET_TAG_PROPERTIES_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagProperties: action.response.data,
                },
            };
            return state;
        case types.GET_TAG_LIST_BY_DEVICE_ID_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagListByDeviceId: action.response.data,
                    tagStatusResponse: false,
                },
            };
            return state;
        case ADD_SELECTED_BLA_TO_REDUX:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    selectedBla: action.payload,
                },
            };
            return state;
        case types.GET_DEVICES_BLA_LIST_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    devicesInBlaList: action.response.data,
                    deviceIsRemoved: false,
                    deviceInBlaLoader: false,
                },
                devices: {
                    ...state.devices,
                    deviceStatusResponse: false,
                },
            };
            return state;
        case types.GET_DEVICE_LIST:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    devicesListLoading: true,
                },
            };
            return state;
        case types.GET_DEVICES_BLA_LIST:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    deviceInBlaLoader: true,
                },
            };
            return state;

        case types.GET_DEVICE_LIST_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceList: action.response.data,
                    devicesListLoading: false,
                    selectedBla: [],
                    isEdited: false,
                },
            };
            return state;
        case types.GET_DEVICE_LIST_FAILURE:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    devicesListLoading: false,
                },
            };
            return state;
        case types.GET_ALL_DEVICES_LIST_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    allDevicesList: action.response.data,
                },
            };
            return state;
        case GET_ALL_DEVICES_LIST_BY_BLA_ID_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    allDevicesListByBla: action.response.data,
                },
            };
            return state;
        case ADD_DEVICE_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    lastAddedDevice: action.response.data,
                },
            };
            return state;
        case types.GET_DEVICE_DETAILS_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceDetails: action.response.data,
                },
            };
            return state;
        case types.EDIT_DEVICE_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    isEdited: true,
                },
            };
            return state;

        case types.EDIT_TAGS_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    isEdited: true,
                },
            };
            return state;
        case ADD_SELECTED_DEVICE_TO_REDUX:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    selectedDevice: action.payload,
                },
            };
            return state;
        case types.GET_DATA_TYPES_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    dataTypes: action.response.data,
                },
            };
            return state;
        case types.GET_DATA_TYPES_FAILURE:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    dataTypes: [],
                },
            };
            return state;

        case types.REMOVE_DEVICE_BLA_SUCCESS:
            state = {
                ...state,
                blas: {
                    ...state.blas,
                    deviceIsRemoved: true,
                },
            };
            return state;

        case types.ACTIVATE_DEACTIVATE_DEVICES_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStatusChanged: !state.devices.deviceStatusChanged,
                    deviceStatusResponse: true,
                },
            };
            return state;

        case types.SET_DEVICE_RESPONSE_STATE:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStatusResponse: false,
                },
            };
            return state;
        case types.SET_TAG_RESPONSE_STATE:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagStatusResponse: false,
                },
            };
            return state;

        case types.SET_DEVICE_START:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStart: true,
                },
            };
            return state;

        case types.SET_DEVICE_STOP:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStop: true,
                },
            };
            return state;

        case types.SET_DEVICE_START_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStart: false,
                },
            };
            return state;
        case types.ACTIVATE_DEACTIVATE_TAGS_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagStatusChanged: true,
                    tagStatusResponse: true,
                },
            };
            return state;
        case types.GET_TAG_DETAILS_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    tagDetails: action.response.data,
                    tagStatusChanged: false,
                    tagStatusResponse: false,
                },
            };
            return state;
        case types.SET_DEVICE_STOP_SUCCESS:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStop: false,
                },
            };
            return state;

        case types.SET_DEVICE_START_FAILURE:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStart: false,
                },
            };
            return state;

        case types.SET_DEVICE_STOP_FAILURE:
            state = {
                ...state,
                devices: {
                    ...state.devices,
                    deviceStop: false,
                },
            };
            return state;
        case types.GET_AGGREGATE_METHODS_SUCCESS:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    methodList: action.response.data,
                },
            };
            return state;
        case types.SET_ADD_TAG_DATA:
            state = {
                ...state,
                tags: {
                    ...state.tags,
                    updatedTagData: action.payload,
                },
            };
            return state;
        default:
            return state;
    }
}
