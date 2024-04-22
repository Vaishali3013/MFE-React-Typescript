import { message } from "antd";
import Api from "../index";
import { baseUrlSetter } from "utils/commonFunction";
import { expiresCookies } from "types/enums";

export const loginUserServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = payload;
  try {
    const response = await Promise.resolve(
      Api.post(`/auth/login`, requestBody)
    );
    if (payload.rememberMe) {
      localStorage.setItem("authToken", response.data.token);
      document.cookie = `authToken=${response.data.token}; domain=solulever.com; path=/`;
    }
    document.cookie = `session=${response.data.reportingToken}; domain=solulever.com; path=/`;
    document.cookie = `authToken=${response.data.token}; domain=solulever.com; path=/`;

    return response;
  } catch (error: any) {
    if (error?.response?.status === 303) {
      message?.success(error.response.data);
      throw error?.response;
    } else {
      error?.response?.data && message.error(error.response.data);
      throw error.response.data;
    }
  }
};

export const refreshTokenLoginServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(
      Api.post(
        `/auth/refreshtoken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      )
    );
    if (response.request.status === 200) {
      if (payload.rememberMe) {
        localStorage.setItem("authToken", response.data.token);
        document.cookie = `authToken=${response.data.token}; domain=solulever.com; path=/`;
      }
      document.cookie = `authToken=${response.data.token}; domain=solulever.com; path=/`;
    }
    return response;
  } catch (error: any) {
    Api.interceptors.response.use(error);
  }
};

export const changePasswordServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    oldPassword: payload.oldPassword,

    newPassword: payload.newPassword,
  };

  try {
    const response = await Promise.resolve(
      Api.post(`/users/changePassword/${payload.userId}`, requestBody)
    );

    return response;
  } catch (error: any) {
    message.error(error.response.data);
    throw error.response.data;
  }
};

// LOGOUT

export const userLogOutServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.post(`/auth/logout`));

    if (response) {
      if (payload.rememberCred) {
        sessionStorage.removeItem("authToken");
        document.cookie = `authToken=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `session=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
      } else {
        sessionStorage.removeItem("authToken");
        document.cookie = `authToken=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
        document.cookie = `session=; expires=${expiresCookies}; path=/; domain=solulever.com;`;
      }
    }

    return response;
  } catch (error: any) {
    if (error.response.status > 399) {
      void message.error("Network error");
    } else {
      void message.error("Invalid user");
    }
  }
};

export const forgotPasswordServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(
      Api.get(`/auth/forgotPassword/${payload.workEmail}`)
    );
    message.success("Password recovery link sent on the email");

    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

// VERIFY OTP

export const verifyOtpServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    email: payload.email,
    password: payload.verifyOtp,
  };
  try {
    const response = await Promise.resolve(
      Api.post(`/auth/verifyOtp`, requestBody)
    );
    return response;
  } catch (error: any) {
    message.error("Invalid otp");
    throw new Error(error);
  }
};

export const setNewPasswordServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    newPassword: payload?.newPassword,
    token: payload?.recoveryToken,
  };
  try {
    const response = await Promise.resolve(
      Api.post(`/users/setNewPassword/${payload?.email}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload?.getToken}`,
        },
      })
    );

    return response;
  } catch (error: any) {
    message.error(error.response.data);

    Api.interceptors.response.use(error);
  }
};

export const sendPasswordResetLinkServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(
      Api.post(`/auth/sendPwdResetLink?email=${payload}`)
    );
    message.success(response?.data);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const validateRecoveryTokenService = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(
      Api.post(`/auth/validateRecoveryToken?token=${payload}`)
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyMfaOtpService = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    email: payload.email,
    otp: payload.otp,
  };
  try {
    const response = await Promise.resolve(
      Api.post(`/auth/verifyMfaOtp`, requestBody)
    );
    sessionStorage.setItem("authToken", response.data.token);
    document.cookie = `authToken=${response.data.token}; domain=solulever.com; path=/`;
    document.cookie = `session=${response.data.reportingToken}; domain=solulever.com; path=/`;
    return response;
  } catch (error: any) {
    message.error(error.response.data);
    throw new Error(error);
  }
};

export const resendMfaOtpService = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");

  try {
    const response = await Promise.resolve(
      Api.post(`/auth/resendMfaOtp/${payload?.email}`)
    );
    message.success(response?.data);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      message.error("Email can not be empty");
    } else {
      message.error(error.response.data);
      throw error.response.data;
    }
  }
};
