import * as types from 'redux/types/implementationTypes';


// asset selection
export const selectedAsset = (payload: any): any => ({
    type: types.SELECTED_ASSET,
    payload: payload,
});

export const getAssignedAttributeList = (payload: any): any => ({
    type: types.GET_ASSIGNED_ATTRIBUTE_LIST,
    payload: payload,
});
export const getTagListData = (payload: any): any => ({
    type: types.GET_TAG_LIST_DATA,
    payload: payload,
});
export const getUnassignedAttributeList = (payload: any): any => ({
    type: types.GET_UNASSIGNED_ATTRIBUTE_LIST,
    payload: payload,
});

export const AssignAttributeList = (payload: any): any => ({
    type: types.ASSIGN_ATTRIBUTE_LIST_TO_ASSET,
    payload: payload,
});

export const validateStaticValueAttribute = (payload: any): any => ({
    type: types.VALIDATE_STATIC_VALUE_ATTRIBUTE,
    payload: payload,
});

export const setAttributeImplState = (payload: string): any => ({
    type: types.SET_ATTRIBUTE_IMPL_STATE,
    payload: payload,
});

export const editAttributeValue = (payload: any): any => ({
    type: types.EDIT_VALUE_ATTRIBUTE,
    payload: payload,
});

export const validateTagValueAttribute = (payload: any): any => ({
    type: types.VALIDATE_TAG_VALUE_ATTRIBUTE,
    payload: payload,
});

export const validateTagValueAttributeEdit = (payload: any): any => ({
    type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_EDIT,
    payload: payload,
});

export const removeTagData = (): any => ({
    type: types.REMOVE_TAG_DATA,
});

export const editModalDefaultState = (): any => ({
    type: types.EDIT_MODAL_DEFAULT_STATE,
});



