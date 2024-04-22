import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    createAttributeService,
    createCategoryService,
    createIndustryService,
    createUomClassService,
    createUomService,
    getAttributeByIdService,
    getAttributeListsService,
    getCategoryListService,
    getDataReferenceListService,
    getIndustryListService,
    getPropertyListService,
    getUomClassListService,
    getUomListService,
    getUomMetricListService,
    getValueTypeListService,
    statusUpdateAttributeService,
    updateAttributeService,
} from 'redux/services/ConfigureServices/attributeServices';
import * as types from 'redux/types/configureTypes';

export function* getAttributeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAttributeListData = yield call(
            getAttributeListsService,
            payload
        );
        yield put({
            type: types.GET_ATTRIBUTE_LIST_SUCCESS,
            response: getAttributeListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ATTRIBUTE_LIST_FAILURE });
    }
}

export function* getAttributeDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAttributeDetails = yield call(
            getAttributeByIdService,
            payload
        );
        yield put({
            type: types.GET_ATTRIBUTE_DETAIL_SUCCESS,
            response: getAttributeDetails,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ATTRIBUTE_DETAIL_FAILURE });
    }
}

export function* getIndustryListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getIndustryList = yield call(getIndustryListService, payload);
        yield put({
            type: types.GET_INDUSTRY_LIST_SUCCESS,
            response: getIndustryList,
        });
    } catch (error: any) {}
}

export function* getCategoryListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getCategoryList = yield call(getCategoryListService, payload);
        yield put({
            type: types.GET_CATEGORY_LIST_SUCCESS,
            response: getCategoryList,
        });
    } catch (error: any) {}
}

export function* getValueTypeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getValueTypeList = yield call(getValueTypeListService, payload);
        yield put({
            type: types.GET_VALUE_TYPE_LIST_SUCCESS,
            response: getValueTypeList,
        });
    } catch (error: any) {}
}

export function* getPropertyListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getPropertyList = yield call(getPropertyListService, payload);
        yield put({
            type: types.GET_PROPERTY_LIST_SUCCESS,
            response: getPropertyList,
        });
    } catch (error: any) {}
}

export function* getDataReferenceListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getDataReferenceList = yield call(
            getDataReferenceListService,
            payload
        );
        yield put({
            type: types.GET_DATA_REFERENCE_LIST_SUCCESS,
            response: getDataReferenceList,
        });
    } catch (error: any) {}
}

export function* getUomListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getUomList = yield call(getUomListService, payload);
        yield put({
            type: types.GET_UOM_LIST_SUCCESS,
            response: getUomList,
        });
    } catch (error: any) {}
}

export function* getUomClassListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getUomClassList = yield call(getUomClassListService, payload);
        yield put({
            type: types.GET_UOM_CLASS_LIST_SUCCESS,
            response: getUomClassList,
        });
    } catch (error: any) {}
}

export function* getUomMetricListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const getUomMetricList = yield call(getUomMetricListService, payload);
        yield put({
            type: types.GET_UOM_METRIC_LIST_SUCCESS,
            response: getUomMetricList,
        });
    } catch (error: any) {}
}

export function* createUomClassSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setUomDetails = yield call(createUomClassService, payload);
        yield put({
            type: types.CREATE_UOM_CLASS_SUCCESS,
            response: setUomDetails,
        });
        message.success('UOM class created successfully');
        if (setUomDetails) {
            const getUomClassList = yield call(getUomClassListService, payload);
            yield put({
                type: types.GET_UOM_CLASS_LIST_SUCCESS,
                response: getUomClassList,
            });
        }
    } catch (error: any) {}
}

export function* createCategorySaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setCategoryDetails = yield call(createCategoryService, payload);
        yield put({
            type: types.CREATE_CATEGORY_SUCCESS,
            response: setCategoryDetails,
        });
        message.success('Category created successfully');
        if (setCategoryDetails) {
            const getCategoryList = yield call(getCategoryListService, payload);
            yield put({
                type: types.GET_CATEGORY_LIST_SUCCESS,
                response: getCategoryList,
            });
        }
    } catch (error: any) {}
}

export function* createIndustrySaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setIndustryDetails = yield call(createIndustryService, payload);
        yield put({
            type: types.CREATE_INDUSTRY_SUCCESS,
            response: setIndustryDetails,
        });
        message.success('Industry created successfully');
        if (setIndustryDetails) {
            const getIndustryList = yield call(getIndustryListService, payload);
            yield put({
                type: types.GET_INDUSTRY_LIST_SUCCESS,
                response: getIndustryList,
            });
        }
    } catch (error: any) {}
}

export function* createUomSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setUomDetails = yield call(createUomService, payload);
        yield put({
            type: types.CREATE_UOM_SUCCESS,
            response: setUomDetails,
        });
        if (setUomDetails) {
            const getUomList = yield call(getUomListService, payload);
            yield put({
                type: types.GET_UOM_LIST_SUCCESS,
                response: getUomList,
            });
        }
    } catch (error: any) {
        yield put({ type: types.CREATE_UOM_FAILURE });
    }
}

export function* createAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setAttributeDetails = yield call(createAttributeService, payload);
        yield put({
            type: types.CREATE_ATTRIBUTE_SUCCESS,
            response: setAttributeDetails,
        });
    } catch (error: any) {}
}

export function* updateAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const setAttributeDetails = yield call(updateAttributeService, payload);
        yield put({
            type: types.UPDATE_ATTRIBUTE_SUCCESS,
            response: setAttributeDetails,
        });
    } catch (error: any) {}
}

export function* statusUpdateAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        const paginatedPayload = {
            ...payload?.paginatedPayload,
            search: payload?.searchPayload,
        };
        const attributeStatus = yield call(
            statusUpdateAttributeService,
            payload?.updatedPayload
        );
        yield put({
            type: types.STATUS_UPDATE_ATTRIBUTE_SUCCESS,
            response: attributeStatus,
        });
        if (attributeStatus) {
            const getAttributeListData = yield call(
                getAttributeListsService,
                paginatedPayload
            );
            yield put({
                type: types.GET_ATTRIBUTE_LIST_SUCCESS,
                response: getAttributeListData,
            });
        }
    } catch (error) {}
}

export function* attributeSaga(): any {
    yield all([takeLatest(types.GET_ATTRIBUTE_LIST, getAttributeListSaga)]);
    yield all([takeLatest(types.GET_INDUSTRY_LIST, getIndustryListSaga)]);
    yield all([takeLatest(types.GET_CATEGORY_LIST, getCategoryListSaga)]);
    yield all([takeLatest(types.GET_VALUE_TYPE_LIST, getValueTypeListSaga)]);
    yield all([takeLatest(types.GET_PROPERTY_LIST, getPropertyListSaga)]);
    yield all([takeLatest(types.GET_UOM_LIST, getUomListSaga)]);
    yield all([takeLatest(types.GET_UOM_CLASS_LIST, getUomClassListSaga)]);
    yield all([takeLatest(types.GET_UOM_METRIC_LIST, getUomMetricListSaga)]);
    yield all([takeLatest(types.CREATE_UOM_CLASS, createUomClassSaga)]);
    yield all([takeLatest(types.CREATE_CATEGORY, createCategorySaga)]);
    yield all([takeLatest(types.CREATE_INDUSTRY, createIndustrySaga)]);
    yield all([takeLatest(types.CREATE_UOM, createUomSaga)]);
    yield all([takeLatest(types.CREATE_ATTRIBUTE, createAttributeSaga)]);
    yield all([takeLatest(types.UPDATE_ATTRIBUTE, updateAttributeSaga)]);
    yield all([
        takeLatest(types.STATUS_UPDATE_ATTRIBUTE, statusUpdateAttributeSaga),
    ]);
    yield all([
        takeLatest(types.GET_DATA_REFERENCE_LIST, getDataReferenceListSaga),
    ]);
    yield all([
        takeLatest(types.GET_ATTRIBUTE_DETAILS, getAttributeDetailsSaga),
    ]);
}
