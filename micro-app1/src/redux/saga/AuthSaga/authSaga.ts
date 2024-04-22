import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../../types/loginTypes';
import {
    changePasswordServices,
    refreshTokenLoginServices,
    forgotPasswordServices,
    loginUserServices,
    setNewPasswordServices,
    userLogOutServices,
    verifyOtpServices,
    sendPasswordResetLinkServices,
    validateRecoveryTokenService,
    verifyMfaOtpService,
    resendMfaOtpService,
} from 'redux/services/AuthServices/authServices';
import { SHOW_LOADER_SUCCESS } from 'redux/types/userManagementTypes';

export function* loginUserSaga({
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const loginUserData = yield call(loginUserServices, payload);
        yield put({
            type: types.USER_LOGIN_SUCCESS,
            response: loginUserData,
        });
    } catch (error: any) {
        yield put({
            type: types.USER_LOGIN_FAILED,
            response: error,
        });
    }
}

export function* refreshTokenLoginSaga({
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const refreshTokenLogin = yield call(
            refreshTokenLoginServices,
            payload
        );
        yield put({
            type: types.REFRESH_TOKEN_SUCCESS,
            response: refreshTokenLogin,
        });
    } catch (error: any) {
        yield put({
            type: types.REFRESH_TOKEN_FAILURE,
            response: false,
        });
    }
}

export function* logoutUserSaga({
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const response = yield call(userLogOutServices, payload);
        yield put({
            type: types.USER_LOGOUT_SUCCESS,
            response: response,
        });
    } catch (error: any) {
        yield put({
            type: types.USER_LOGOUT_FAILED,
        });
    }
}

export function* changePasswordSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        // Api Call
        const passwordAuth = yield call(changePasswordServices, payload);

        yield put({
            type: types.CHANGE_PASSWORD_SUCCESS,
            response: passwordAuth,
        });
    } catch (error: any) {
        yield put({
            type: types.CHANGE_PASSWORD_FAILED,
            response: false,
        });
    }
}

export function* forgotPasswordSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const getOtp = yield call(forgotPasswordServices, payload);
        yield put({
            type: types.FORGOT_PASSWORD_SUCCESS,
            response: getOtp,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: types.FORGOT_PASSWORD_FAILED,
            response: error,
        });
    }
}
export function* verifyOtpSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const validOtp = yield call(verifyOtpServices, payload);

        yield put({
            type: types.VERIFY_OTP_SUCCESS,
            response: validOtp,
        });
    } catch (error: any) {
        yield put({
            type: types.VERIFY_OTP_FAILED,
            response: error,
        });
    }
}

export function* setNewPasswordSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const isPasswordUpdated = yield call(setNewPasswordServices, payload);
        yield put({
            type: types.SET_NEW_PASSWORD_SUCCESS,
            response: isPasswordUpdated,
        });
    } catch (error: any) {
        yield put({
            type: types.SET_NEW_PASSWORD_FAILED,
            response: error,
        });
    }
}

export function* sendPasswordResetLinkSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const isResetPasswordLinkSent = yield call(
            sendPasswordResetLinkServices,
            payload
        );
        yield put({
            type: types.SEND_PASSWORD_RESET_LINK_SUCCESS,
            response: isResetPasswordLinkSent,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: types.SEND_PASSWORD_RESET_LINK_FAILURE,
            response: error,
        });
    }
}

export function* validateRecoveryTokenSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: true });
        const isRecoveryTokenvalidated = yield call(
            validateRecoveryTokenService,
            payload
        );
        yield put({
            type: types.VALIDATE_RECOVERY_TOKEN_SUCCESS,
            response: isRecoveryTokenvalidated,
        });
        yield put({ type: SHOW_LOADER_SUCCESS, showLoader: false });
    } catch (error: any) {
        yield put({
            type: types.VALIDATE_RECOVERY_TOKEN_FAILURE,
            response: error,
        });
    }
}

export function* verifyMfaOtpSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const validMfaOtp = yield call(verifyMfaOtpService, payload);

        yield put({
            type: types.VERIFY_MFA_OTP_SUCCESS,
            response: validMfaOtp,
        });
    } catch (error: any) {
        yield put({
            type: types.VERIFY_MFA_OTP_FAILURE,
            response: error,
        });
    }
}

export function* resendMfaOtpSaga({
    type,
    payload,
}: {
    type: string;
    payload: any;
}): Generator<any> {
    try {
        const resendMfaOtp = yield call(resendMfaOtpService, payload);

        yield put({
            type: types.RESEND_MFA_OTP_SUCCESS,
            response: resendMfaOtp,
        });
    } catch (error: any) {
        yield put({
            type: types.RESEND_MFA_OTP_FAILURE,
            response: error,
        });
    }
}

export function* loginSaga(): any {
    yield all([takeLatest(types.USER_LOGIN, loginUserSaga)]);
    yield all([takeLatest(types.REFRESH_TOKEN, refreshTokenLoginSaga)]);
    yield all([takeLatest(types.CHANGE_PASSWORD, changePasswordSaga)]);
    yield all([takeLatest(types.FORGOT_PASSWORD, forgotPasswordSaga)]);
    yield all([takeLatest(types.VERIFY_OTP, verifyOtpSaga)]);
    yield all([takeLatest(types.SET_NEW_PASSWORD, setNewPasswordSaga)]);
    yield all([takeLatest(types.USER_LOGOUT, logoutUserSaga)]);
    yield all([
        takeLatest(types.SEND_PASSWORD_RESET_LINK, sendPasswordResetLinkSaga),
    ]);
    yield all([
        takeLatest(types.VALIDATE_RECOVERY_TOKEN, validateRecoveryTokenSaga),
    ]);
    yield all([takeLatest(types.VERIFY_MFA_OTP, verifyMfaOtpSaga)]);
    yield all([takeLatest(types.RESEND_MFA_OTP, resendMfaOtpSaga)]);
}
