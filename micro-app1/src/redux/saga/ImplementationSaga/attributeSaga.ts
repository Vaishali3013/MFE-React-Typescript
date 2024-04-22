import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    AssignAttributeService,
    editAttributeValueService,
    getAttributeImplementationListsService,
    getTagList,
    validateStaticValueAttributeService,
    validateTagValueAttributeEditService,
    validateTagValueAttributeService,
} from 'redux/services/ImplementationServices/attributeServices';
import * as types from 'redux/types/implementationTypes';

export function* getAssignedAttributeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAssignedAttributeListData = yield call(
            getAttributeImplementationListsService,
            payload
        );
        yield put({
            type: types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS,
            response: getAssignedAttributeListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_ASSIGNED_ATTRIBUTE_LIST_FAILURE });
    }
}
export function* getUnassignedAttributeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getUnassignedTableListData = yield call(
            getAttributeImplementationListsService,
            payload
        );
        yield put({
            type: types.GET_UNASSIGNED_ATTRIBUTE_LIST_SUCCESS,
            response: getUnassignedTableListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_UNASSIGNED_ATTRIBUTE_LIST_FAILURE });
    }
}

export function* AssignAttributeListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });

        const assignAttributeListData: any = yield call(
            AssignAttributeService,
            payload
        );
        yield put({
            type: types.ASSIGN_ATTRIBUTE_LIST_TO_ASSET_SUCCESS,
            response: assignAttributeListData,
        });

        if (assignAttributeListData) {
            const getAssignedAttributeListData = yield call(
                getAttributeImplementationListsService,
                payload
            );
            yield put({
                type: types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS,
                response: getAssignedAttributeListData,
            });

            message.success(assignAttributeListData?.data?.message);
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.ASSIGN_ATTRIBUTE_LIST_TO_ASSET_FAILURE });
    }

}

export function* validateStaticValueAttributeSaga({
    type,
    payload ,
}: {
    type: string;
    payload: any;
}): Generator<any> 
{
   
    try {
        // Api call

        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const validateStaticValueData: any = yield call(
            validateStaticValueAttributeService,
            payload
        );
        yield put({
            type: types.VALIDATE_STATIC_VALUE_ATTRIBUTE_SUCCESS,
            response: validateStaticValueData,
        });
        if (validateStaticValueData) {
            const getAssignedAttributeListData = yield call(
                getAttributeImplementationListsService,
                {
                    page: payload.paginationPayload.page,
                    pageSize: payload.paginationPayload.pageSize,
                    assetId: payload.assetId,
                }
            );
            yield put({
                type: types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS,
                response: getAssignedAttributeListData,
            });
            message.success(validateStaticValueData?.data?.message);
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.VALIDATE_STATIC_VALUE_ATTRIBUTE_FAILURE });
    }
}

export function* validateTagValueAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
      
        // Api call

        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });

        const validateTagValueData: any = yield call(
            validateTagValueAttributeService,
            payload
        );
        yield put({
            type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_SUCCESS,
            response: validateTagValueData,
        });
        if (validateTagValueData) {
            const getAssignedAttributeListData = yield call(
                getAttributeImplementationListsService,
                {
                    page: payload.paginationPayload.page,
                    pageSize: payload.paginationPayload.pageSize,
                    assetId: payload.assetId,
                }
            );
            yield put({
                type: types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS,
                response: getAssignedAttributeListData,
            });
            message.success(validateTagValueData?.data?.message);
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_FAILURE });
    }
}

export function* validateTagValueEditAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
      
        // Api call
       
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });

        const validateTagValueData: any = yield call(
            validateTagValueAttributeEditService,
            payload
        );
        yield put({
            type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_SUCCESS_EDIT,
            response: validateTagValueData,
        });
        if (validateTagValueData) {
            const getAssignedAttributeListData = yield call(
                getAttributeImplementationListsService,
                {
                    page: payload.paginationPayload.page,
                    pageSize: payload.paginationPayload.pageSize,
                    assetId: payload.assetId,
                }
            );
            yield put({
                type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_SUCCESS_EDIT,
                response: getAssignedAttributeListData,
            });
            message.success(validateTagValueData?.data?.message);
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.VALIDATE_TAG_VALUE_ATTRIBUTE_FAILURE_EDIT });
    }
}

export function* editStaticValueAttributeSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api call

        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });

        const editStaticValueData = yield call(
            editAttributeValueService,
            payload
        );
        yield put({
            type: types.EDIT_VALUE_ATTRIBUTE_SUCCESS,
            response: editStaticValueData,
        });

        if (editStaticValueData) {
            const getAssignedAttributeListData = yield call(
                getAttributeImplementationListsService,
                {
                    page: payload.paginationPayload.page,
                    pageSize: payload.paginationPayload.pageSize,
                    assetId: payload.assetId,
                }
            );
            yield put({
                type: types.GET_ASSIGNED_ATTRIBUTE_LIST_SUCCESS,
                response: getAssignedAttributeListData,
            });
        }
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.EDIT_VALUE_ATTRIBUTE_FAILURE });
    }
}

export function* getTagListSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
      
        // Api call
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: true });
        const getAssignedAttributeListData = yield call(
            getTagList,
            payload
        );
        yield put({
            type: types.GET_TAG_LIST_DATA_SUCCESS,
            response: getAssignedAttributeListData,
        });
        yield put({ type: types.SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({ type: types.GET_TAG_LIST_DATA_FAILURE });
    }
}

export function* attributeImplementationSaga(): any {
    yield all([
        takeLatest(
            types.ASSIGN_ATTRIBUTE_LIST_TO_ASSET,
            AssignAttributeListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.GET_ASSIGNED_ATTRIBUTE_LIST,
            getAssignedAttributeListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.GET_UNASSIGNED_ATTRIBUTE_LIST,
            getUnassignedAttributeListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.VALIDATE_STATIC_VALUE_ATTRIBUTE,
            validateStaticValueAttributeSaga
        ),
    ]);
    yield all([
        takeLatest(types.EDIT_VALUE_ATTRIBUTE, editStaticValueAttributeSaga),
    ]);
    yield all([
        takeLatest(
            types.VALIDATE_TAG_VALUE_ATTRIBUTE,
            validateTagValueAttributeSaga
        ),
    ]);
    yield all([
        takeLatest(types.EDIT_VALUE_ATTRIBUTE, editStaticValueAttributeSaga),
    ]);
    yield all([
        takeLatest(
            types.GET_TAG_LIST_DATA,
            getTagListSaga
        ),
    ]);
    yield all([
        takeLatest(
            types.VALIDATE_TAG_VALUE_ATTRIBUTE_EDIT,
            validateTagValueEditAttributeSaga
        ),
    ]);
}
