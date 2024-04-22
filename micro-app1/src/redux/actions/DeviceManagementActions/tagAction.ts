import * as types from 'redux/types/deviceManagementTypes';

export const createTag = (payload: any): any => ({
    type: types.SET_TAG_LIST,
    payload: payload,
});

export const getTagList = (payload: any): any => ({
    type: types.GET_TAG_LIST,
    payload: payload,
});

export const getAllTagList = (payload?: any): any => ({
    type: types.GET_ALL_TAG_LIST,
    payload: payload,
});

export const getTagProperties = (): any => ({
    type: types.GET_TAG_PROPERTIES,
});

export const getTagListByDeviceId = (payload: any): any => ({
    type: types.GET_TAG_LIST_BY_DEVICE_ID,
    payload: payload,
});

export const getDatatypes = (payload?: any): any => ({
    type: types.GET_DATA_TYPES,
    payload: payload,
});

export const editTags = (payload: any): any => ({
    type: types.EDIT_TAGS,
    payload: payload,
});

export const activateDeactivateTags = (payload: any): any => ({
    type: types.ACTIVATE_DEACTIVATE_TAGS,
    payload: payload,
});

export const removeCreatedTagStatus = (): any => ({
    type: types.REMOVE_CREATED_TAG_STATUS_REDUX,
});

export const getTagDetails = (payload: any): any => ({
    type: types.GET_TAG_DETAILS,
    payload: payload,
});

export const setTagResponseState = (): any => ({
    type: types.SET_TAG_RESPONSE_STATE,
});

export const getAggregateMethodList = (): any => ({
    type: types.GET_AGGREGATE_METHODS,
});

export const setAddTagData = (payload : any): any => ({
    type: types.SET_ADD_TAG_DATA,
    payload: payload,
});

