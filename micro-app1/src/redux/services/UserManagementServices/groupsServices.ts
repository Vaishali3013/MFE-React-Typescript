import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';

export const getGroupListServices = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const params = {
        pageNum: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        resourceGroupIds: payload?.search?.toString() || [],
    };
    try {
        const response = Api.get(`/resourcegroups`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getAllGroupsServices = async (): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(Api.get(`/resourcegroups/all`));
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createGroupServices = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const requestBody = payload;
    try {
        const response = Api.post(`/resourcegroups`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const editGroupServices = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const requestBody = payload;
    try {
        const response = Api.put(`/resourcegroups`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        
        throw new Error(error?.response?.data);
        
    }
};

export const deactivateGroupService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    const requestBody = {
        ids: payload?.id,
       active: payload.status,
    };   
    
    try {    
        const response = await Api.put(     
            `/resourcegroups/deactivate`,
            requestBody,
            
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getGroupByGroupIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = Api.get(`/resourcegroups/${payload}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getResourceTypeService = async (): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = Api.get(`/resourcegroups/resourceTypes`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getResourceTypeByResourceIdService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = Api.get(`/resourcegroups/resourcesByType/${payload}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        throw new Error(error);
    }
};
