import initialState from '../initialStates';
import * as types from '../../types/loginTypes';
import { EMPTY } from 'types/enums';

export default function loginReducer(
    state = initialState.login,
    action: any
): any {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            state = {
                ...state,
                loginParameters: action.response.data.token,
                isLoggedIn: true,
                isEmailValid: true,
                isPasswordValid: true,
            };
            return state;

        case types.USER_LOGIN_FAILED:
            if (action.response.status === 404) {
                state = {
                    ...state,
                    isEmailValid: action.response.data.includes('Invalid User')
                        ? false
                        : state.isEmailValid,
                    isPasswordValid: action.response.data.includes(
                        'Invalid password'
                    )
                        ? false
                        : state.isPasswordValid,
                };
            }
            if (action.response.status === 303) {
                state = {
                    ...state,
                    mfaOtpSentMessage: true,
                };
            }
            return state;

        case types.REFRESH_TOKEN_SUCCESS:
            state = {
                ...state,
                refreshToken: action.response.data.token,
            };
            return state;
        case types.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                isLoggedIn: action.response,
            };

        case types.FORGOT_PASSWORD_SUCCESS:
            state = {
                ...state,
                otpData: true,
                changePassword: true,
            };
            return state;
        case types.FORGOT_PASSWORD_FAILED:
            state = {
                ...state,
                otpData: action.response.data ? action.response.data : false,
            };
            return state;
        case types.VERIFY_OTP_SUCCESS:
            state = {
                ...state,
                otpVerify: action.response.data ? action.response.data : false,
                changePassword: true,
            };
            return state;

        case types.CLEAR_OTP:
            state = {
                ...state,
                otpData: '',
                otpVerify: '',
            };
            return state;

        case types.SET_NEW_PASSWORD_SUCCESS:
            state = {
                ...state,
                passwordUpdated: action.response.status === 201,
                changePassword: true,

                otpVerify: EMPTY?.string,
                userEmail: EMPTY?.string,
                recoveryToken: EMPTY?.string,
            };
            return state;
        case types.SET_PASSWORD_UPDATE:
            state = {
                ...state,
                passwordUpdated: false,
                changePassword: true,
            };
            return state;

        case types.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isMfaOtpVerify: false,
                userEmail: '',
                logout: action.response.data,
            };
        case types.USER_LOGOUT:
            return {
                ...state,
                mfaOtpSentMessage: false,
                isLoggedIn: false,
            };
        case types.USER_LOGOUT_FAILED:
            return {
                ...state,
            };
        case types.CHANGE_PASSWORD:
            return {
                ...state,
            };
        case types.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePassword: true,
            };
        case types.CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                changePassword: false,
            };
        case types.NEW_PASSWORD:
            return {
                ...state,
                changePassword: false,
            };
        case types.SEND_PASSWORD_RESET_LINK:
            return {
                ...state,
                recoveryLinkSentLoading: true,
            };
        case types.SEND_PASSWORD_RESET_LINK_SUCCESS:
            return {
                ...state,
                isEmailValid: true,
                passwordResetLinkSent: true,
                recoveryLinkSentLoading: false,
            };
        case types.SEND_PASSWORD_RESET_LINK_FAILURE:
            return {
                ...state,
                isEmailValid: false,
                passwordResetLinkSent: false,
                recoveryLinkSentLoading: false,
            };
        case types.VALIDATE_RECOVERY_TOKEN:
            return {
                ...state,
                setNewpasswordLoading: true,
            };
        case types.VALIDATE_RECOVERY_TOKEN_SUCCESS:
            return {
                ...state,

                passwordResetLinkValidated: true,
                otpVerify: action.response.data.jwtToken,
                userEmail: action.response.data.email,
                recoveryToken: action.response.data.token,
                setNewpasswordLoading: false,
            };
        case types.VALIDATE_RECOVERY_TOKEN_FAILURE:
            return {
                ...state,
                passwordResetLinkValidated: false,
                otpVerify: EMPTY?.string,
                userEmail: EMPTY?.string,
                recoveryToken: EMPTY?.string,
                setNewpasswordLoading: false,
            };
        case types.CLOSE_SET_NEW_PASSWORD_MODAL:
            return {
                ...state,
                passwordUpdated: false,
            };

        case types.SET_IS_EMAIL_VALID:
            return {
                ...state,
                isEmailValid: true,
            };
        case types.CLEAR_MFA_OTP_SENT_MESSAGE:
            return {
                ...state,
                mfaOtpSentMessage: false,
            };
        case types.SET_EMAIL_ADDRESS:
            return {
                ...state,
                userEmail: action.payload,
            };
        case types.VERIFY_MFA_OTP_SUCCESS:
            return {
                ...state,
                loginParameters: action.response.data.token,
                isLoggedIn: true,
                isMfaOtpVerify: true,
                resendMfaOtp: false,
            };
        case types.VERIFY_MFA_OTP_FAILURE:
            return {
                ...state,
                isMfaOtpVerify: false,
            };
        case types.RESEND_MFA_OTP_SUCCESS:
            return {
                ...state,
                resendMfaOtp: true,
            };
        case types.RESEND_MFA_OTP_FAILURE:
            return {
                ...state,
                resendMfaOtp: false,
            };
        default:
            return state;
    }
}
