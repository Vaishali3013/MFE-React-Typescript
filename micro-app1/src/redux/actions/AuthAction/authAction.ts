import * as types from '../../types/loginTypes';

// user login function
export const loginUser = (payload: any): any => ({
    type: types.USER_LOGIN,
    payload: payload,
});

export const refreshTokenRequest = (payload: any): any => ({
    type: types.REFRESH_TOKEN,
    payload: payload,
});

// change password
export const changePassword = (payload: any): any => ({
    type: types.CHANGE_PASSWORD,
    payload: payload,
});

export const newPasswordAction = (): any => ({
    type: types.NEW_PASSWORD,
});

// forgot password
export const forgotPassword = (payload: any): any => ({
    type: types.FORGOT_PASSWORD,
    payload: payload,
});

// verify otp
export const verifyOtp = (payload: any): any => ({
    type: types.VERIFY_OTP,
    payload: payload,
});

// user Logout
export const LogOutuser = (payload: any): any => ({
    type: types.USER_LOGOUT,
    payload: payload,
});

// setnewpassword password
export const setNewPassword = (payload: any): any => ({
    type: types.SET_NEW_PASSWORD,
    payload: payload,
});

export const isPasswordUpdated = (): any => ({
    type: types.SET_PASSWORD_UPDATE,
});

export const sendPasswordResetLink = (payload: any): any => ({
    type: types.SEND_PASSWORD_RESET_LINK,
    payload: payload,
});

export const validateRecoveryToken = (payload: any): any => ({
    type: types.VALIDATE_RECOVERY_TOKEN,
    payload: payload,
});

export const setIsEmailValid = (): any => ({
    type: types.SET_IS_EMAIL_VALID,
});

export const setEmailAddress = (payload: any): any => ({
    type: types.SET_EMAIL_ADDRESS,
    payload: payload,
});

export const verifyMfaOtp = (payload: any): any => ({
    type: types.VERIFY_MFA_OTP,
    payload: payload,
});

export const resendMfaOtp = (payload: any): any => ({
    type: types.RESEND_MFA_OTP,
    payload: payload,
});
