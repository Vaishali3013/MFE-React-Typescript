import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    EXPORT_BLAS,
    EXPORT_DATA_VISUALIZATION,
    EXPORT_GROUPS,
    GET_TEMPLATE,
    UPLOAD_BLAS,
    UPLOAD_TAGS,
    UPLOAD_TAGS_SUCCESS,
} from 'redux/actions/actionTypes';
import {
    exportBlasService,
    getTemplate,
    uploadBlasService,
    uploadTagsService,
    exportGroupService,
} from 'redux/services/BulkUpload/bulkUploadService';
import { UPLOAD_LOADER_STATE_HANDLER } from 'redux/types/deviceManagementTypes';

function* getTemplateSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield call(getTemplate, payload);
    } catch (error: any) {
        message.error(error.response.message);
    }
}

function* uploadBlasSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: true,
        });
        yield call(uploadBlasService, payload);
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: false,
        });
    } catch (error) {
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: false,
        });
    }
}

function* uploadTagsSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: true,
        });
        const response = yield call(uploadTagsService, payload);
        yield put({
            type: UPLOAD_TAGS_SUCCESS,
            response: response,
        });
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: false,
        });
    } catch (error) {
        yield put({
            type: UPLOAD_LOADER_STATE_HANDLER,
            bulkUploadLoader: false,
        });
    }
}

function* exportBlasSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield call(exportBlasService, payload);
    } catch (error) {}
}

function* exportDataVisualizationSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield call(exportBlasService, payload);
    } catch (error: any) {
        message.error(error.response.message);
    }
}

function* exportGroupSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield call(exportGroupService, payload);
    } catch (error) {}
}

export function* bulkUploadSaga(): any {
    yield all([takeLatest(GET_TEMPLATE, getTemplateSaga)]);
    yield all([takeLatest(UPLOAD_BLAS, uploadBlasSaga)]);
    yield all([takeLatest(EXPORT_BLAS, exportBlasSaga)]);
    yield all([takeLatest(EXPORT_GROUPS, exportGroupSaga)]);
    yield all([takeLatest(UPLOAD_TAGS, uploadTagsSaga)]);
    yield all([
        takeLatest(EXPORT_DATA_VISUALIZATION, exportDataVisualizationSaga),
    ]);
}
