import { USERSTAB } from "types/enums";
import Api from "../index";
import { baseUrlSetter } from "utils/commonFunction";
import { message } from "antd";

export const getUsersListsServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const params = {
    pageNum: payload.page,
    pageSize: payload.pageSize,
    sortColumn: payload.sortColumn,
    sortOrder: payload.sortOrder,
    statusId: payload.statusValue,
    userIds: payload.search?.toString() || [],
    roleIds: payload.rolesFilter?.toString() || [],
  };

  try {
    const response = await Promise.resolve(
      Api.get(`/users`, {
        params: params,
      })
    );
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = Api.get(`/users/${payload}`);
    return await Promise.resolve(response);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addUserServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    createdBy: payload.createdBy,
    updatedBy: payload.updatedBy,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.workEmailID,
    profileImage: payload.upload,
    userGroup: null,
    roles: [
      {
        roleId: payload.role,
      },
    ],
    designation: payload.designation,
    mobileNo: payload.mobileNumber,
    reportingTo: payload.reportingTo,
    language: {
      languageId: payload.languageId,
    },
    metrics: {
      metricId: payload.metrics,
    },
    timeZone: {
      timeZoneId: payload.timeZone,
    },
    assignmentValues: payload.assignmentValues,
    dashboardBuilderRole: payload.dashboardBuilderRole,
    active: true,
  };
  try {
    const response = await Promise.resolve(Api.post(`/users`, requestBody));
    return response;
  } catch (error: any) {
    message.success("User created Sucessfully");
    throw new Error(error);
  }
};

export const getUsersPreferences = async (): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.get(`/userPreferences`));
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateUserPreferencesService = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.put(`/users`, payload));
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserDetailsService = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.put(`/users`, payload));
    return response;
  } catch (error: any) {
    return error;
  }
};

export const editUserServices = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    updatedBy: payload.updatedBy,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.workEmailID,
    profileImage: payload.upload,
    userGroup: null,
    roles: [
      {
        roleId: payload.role,
      },
    ],
    userId: payload.userId,
    designation: payload.designation,
    mobileNo: payload.mobileNumber,
    reportingTo: payload.reportingTo,
    language: {
      languageId: payload.language,
    },
    metrics: {
      metricId: payload.metrics,
    },
    timeZone: {
      timeZoneId: payload.timeZone,
    },
    assignmentValues: payload.assignmentValues,
    dashboardBuilderRole: payload.dashboardBuilderRole,
    active: true,
  };
  try {
    const response = await Promise.resolve(Api.put(`/users`, requestBody));
    return response;
  } catch (error: any) {
    return error;
  }
};

export const userActivateDeactivateServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  const requestBody = {
    ids: payload?.id,
    isActive: payload.status,
  };
  try {
    const response = await Promise.resolve(
      Api.put(
        `/users/activateDeactivateUser`,
        requestBody,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export const getCountAnalyticsDeatilsServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    if (payload === USERSTAB.users) {
      const response = await Promise.resolve(
        Api.get(`/users/getActiveInactiveCount`)
      );
      return response;
    } else if (payload === USERSTAB.groups) {
      const response = await Promise.resolve(
        Api.get(`/resourcegroups/getActiveInactiveCount`)
      );
      return response;
    } else if (payload === USERSTAB.roles) {
      const response = await Promise.resolve(
        Api.get(`/roles/getActiveInactiveCount`)
      );
      return response;
    }
  } catch (error: any) {
    return error;
  }
};

export const getALLUsersService = async (payload: any): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.get(`/users/all`));
    return response;
  } catch (error: any) {
    Api.interceptors.response.use(error);
  }
};

export const getReportingRolesListServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.get(`/users/getReportingRoles`));
    return response;
  } catch (error: any) {
    Api.interceptors.response.use(error);
  }
};

export const getReportingDashboardListServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(Api.get(`/users/getDashboardData`));
    return response;
  } catch (error: any) {
    Api.interceptors.response.use(error);
  }
};

export const getDashboardEmbeddedUuidServices = async (
  payload: any
): Promise<any> => {
  baseUrlSetter("userManagement");
  try {
    const response = await Promise.resolve(
      Api.get(`/users/getDashboardUuid`, { params: { id: payload } })
    );
    return response;
  } catch (error: any) {
    throw error.response;
  }
};
