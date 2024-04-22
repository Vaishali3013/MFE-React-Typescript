import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/deviceManagementTypes';
import {
    activateDeactivateTagsService,
    createTagService,
    editTagsService,
    getAllTagsListService,
    getDatatypesService,
    getTagListByDeviceIdServices,
    getTagPropertiesService,
    getTagsListService,
    getTagByIdService,
    getAggregateMethodListService,
} from 'redux/services/DeviceManagementServices/tagService';
import { GET_ALL_TAG_LIST_BY_DEVICE_SUCCESS } from 'redux/actions/actionTypes';
import { message } from 'antd';

export function* createTagSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const setTagDetails = yield call(createTagService, payload);
        yield put({
            type: types.SET_TAG_LIST_SUCCESS,
            response: setTagDetails,
        });
        message.success('Tag added successfully');
    } catch (error: any) {
    }
}

export function* getTagsListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTagsListData = yield call(getTagsListService, payload);
        yield put({
            type: types.GET_TAG_LIST_SUCCESS,
            response: getTagsListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TAG_LIST_FAILURE });
    }
}

export function* getAllTagListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAllTagListData = yield call(getAllTagsListService, payload);
        if (payload) {
            yield put({
                type: GET_ALL_TAG_LIST_BY_DEVICE_SUCCESS,
                response: getAllTagListData,
            });
        } else {
            yield put({
                type: types.GET_ALL_TAG_LIST_SUCCESS,
                response: getAllTagListData,
            });
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ALL_TAG_LIST_FAILURE });
    }
}

export function* getTagPropertiesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTagPropertiesData = yield call(
            getTagPropertiesService,
            payload
        );
        yield put({
            type: types.GET_TAG_PROPERTIES_SUCCESS,
            response: getTagPropertiesData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
    }
}

export function* getDatatypesSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getDataTypes = yield call(getDatatypesService, payload);
        yield put({
            type: types.GET_DATA_TYPES_SUCCESS,
            response: getDataTypes,
        });
    } catch (error: any) {
        yield put({
            type: types.GET_DATA_TYPES_FAILURE,
            response: error,
        });
    }
}

export function* editTagSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const editTagsData = yield call(editTagsService, payload);
        yield put({
            type: types.EDIT_TAGS_SUCCESS,
            response: editTagsData,
        });
        message.success('Tag updated successfully');
    } catch (error: any) { }
}

export function* getTagsListByDeviceIdSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getTagListByDeviceId = yield call(
            getTagListByDeviceIdServices,
            payload
        );
        yield put({
            type: types.GET_TAG_LIST_BY_DEVICE_ID_SUCCESS,
            response: getTagListByDeviceId,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
    }
}

export function* activateDeactivateTagsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const activateDeactivateTagsData = yield call(
            activateDeactivateTagsService,
            payload
        );
        yield put({
            type: types.ACTIVATE_DEACTIVATE_TAGS_SUCCESS,
            response: activateDeactivateTagsData,
        });
    } catch (error: any) { }
}

export function* getTagDetailsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getTagDetails = yield call(getTagByIdService, payload);
        yield put({
            type: types.GET_TAG_DETAILS_SUCCESS,
            response: getTagDetails,
        });
    } catch (error: any) {
    }
}

export function* getAggregateMethodListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const getTagDetails = yield call(getAggregateMethodListService, payload);
        yield put({
            type: types.GET_AGGREGATE_METHODS_SUCCESS,
            response: getTagDetails,
        });
    } catch (error: any) {
    }
}

export function* tagSaga(): any {
    yield all([takeLatest(types.SET_TAG_LIST, createTagSaga)]);
    yield all([takeLatest(types.GET_TAG_LIST, getTagsListSaga)]);
    yield all([takeEvery(types.GET_ALL_TAG_LIST, getAllTagListSaga)]);
    yield all([takeLatest(types.GET_TAG_PROPERTIES, getTagPropertiesSaga)]);
    yield all([
        takeLatest(types.GET_TAG_LIST_BY_DEVICE_ID, getTagsListByDeviceIdSaga),
    ]);
    yield all([takeLatest(types.GET_DATA_TYPES, getDatatypesSaga)]);
    yield all([takeLatest(types.EDIT_TAGS, editTagSaga)]);
    yield all([
        takeLatest(types.ACTIVATE_DEACTIVATE_TAGS, activateDeactivateTagsSaga),
    ]);
    yield all([
        takeLatest(types.GET_TAG_DETAILS, getTagDetailsSaga),
    ]);
    yield all([
        takeLatest(types.GET_AGGREGATE_METHODS, getAggregateMethodListSaga),
    ]);
}
