import * as types from 'redux/types/configureTypes';

export const setAttributeState = (payload: string): any => ({
    type: types.SET_ATTRIBUTE_STATE,
    payload: payload,
});

export const getAttributesList = (payload: any): any => ({
    type: types.GET_ATTRIBUTE_LIST,
    payload: payload,
});

export const getAttributeDetails = (payload: any): any => ({
    type: types.GET_ATTRIBUTE_DETAILS,
    payload: payload,
});

export const getIndustryList = (): any => ({
    type: types.GET_INDUSTRY_LIST,
});

export const getCategoryList = (): any => ({
    type: types.GET_CATEGORY_LIST,
});

export const getValueTypeList = (): any => ({
    type: types.GET_VALUE_TYPE_LIST,
});

export const getDataReferenceList = (): any => ({
    type: types.GET_DATA_REFERENCE_LIST,
});

export const getPropertyList = (): any => ({
    type: types.GET_PROPERTY_LIST,
});

export const getUomList = (): any => ({
    type: types.GET_UOM_LIST,
});

export const getUomClassList = (): any => ({
    type: types.GET_UOM_CLASS_LIST,
});

export const getUomMetricList = (): any => ({
    type: types.GET_UOM_METRIC_LIST,
});

export const createUomClass = (payload: any): any => ({
    type: types.CREATE_UOM_CLASS,
    payload: payload,
});

export const createCategory = (payload: any): any => ({
    type: types.CREATE_CATEGORY,
    payload: payload,
});

export const createIndustry = (payload: any): any => ({
    type: types.CREATE_INDUSTRY,
    payload: payload,
});

export const createUom = (payload: any): any => ({
    type: types.CREATE_UOM,
    payload: payload,
});

export const createAttribute = (payload: any): any => ({
    type: types.CREATE_ATTRIBUTE,
    payload: payload,
});

export const updateAttribute = (payload: any): any => ({
    type: types.UPDATE_ATTRIBUTE,
    payload: payload,
});

export const statusUpdateAttribute = (payload: any): any => ({
    type: types.STATUS_UPDATE_ATTRIBUTE,
    payload: payload,
});

export const attributeFieldsValues = (payload: any): any => ({
    type: types.ATTRUBUTE_FIELDS_VALUES,
    payload: payload,
});
