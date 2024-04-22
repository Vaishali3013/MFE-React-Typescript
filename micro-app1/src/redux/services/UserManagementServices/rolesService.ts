import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';

export const getRolesListsService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = {
        pageNum: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        roleIds: payload?.search?.toString() || [],
    };
    try {
        const response = Api.get(`/roles`, {
            params: params,
        });

        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getALLRolesService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(Api.get(`/roles/all`));
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getRoleByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = payload;
    try {
        const response = Api.get(`/roles/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createRoleService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = payload;
    try {
        const response = Api.post(`/roles`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const updateRoleService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = payload;
    try {
        const response = Api.put(`/roles`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getResourceTypeListService = async (): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(
            Api.get(`/resourcegroups/resourceTypes`)
        );
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getResourceTypeByIdService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = payload;
    try {
        const response = Api.get(`/resourcegroups/groupsByType/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const roleActivateDeactivateServices = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('userManagement');
    const requestBody = {
        ids: payload?.id,
        active: payload.status,
    };
    try {
        const response = await Promise.resolve(
            Api.put(`/roles/deactivate`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        );

        return response;
    } catch (error: any) {
        Api.interceptors.response.use(error);
    }
};
