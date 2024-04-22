import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const createTagService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = payload;
    try {
        const response = Api.post(`/tag/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getTagsListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        deviceId: payload?.deviceId,
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        status: payload?.status,
        tagIdList: payload?.search?.toString() || [],
    };
    try {
        const response = Api.get(`/tag/list/paginated`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getAllTagsListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        let response;
        if (payload) response = Api.get(`/tag/list`, { params: payload });
        else response = Api.get(`/tag/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getTagPropertiesService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = Api.get(`/tag/properties`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getTagListByDeviceIdServices = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = await Promise.resolve(
            Api.get(`/tag/list`, { params: payload })
        );
        return response;
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};
export const getDatatypesService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        deviceType: payload?.deviceTypeId,
    };
    try {
        const response = Api.get(`/tag/dataType/${params.deviceType}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const editTagsService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const requestBody = {
        timeSeriesId: payload?.timeSeriesId,
        requestedBy: payload?.requestedBy,
        displayName: payload?.displayName,
        uniqueName: payload?.uniqueName,
        dataType: payload?.dataType,
        pollingInterval: payload?.pollingInterval,
        additionalFactor: payload?.additionalFactor,
        multiplicationFactor: payload?.multiplicationFactor,
        aggregateMethodId: payload?.aggregateMethodId,
        engineeringUnit: payload?.engineeringUnit,
        additionalProperties: payload?.additionalProperties,
    };
    try {
        const response = Api.put(`tag/edit`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const activateDeactivateTagsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        tagIdList: payload.id,
        isActive: payload.active,
        requestedBy: payload.updatedBy,
    };
    try {
        const response = await Api.put(`/tag/status`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getTagByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = payload;
    try {
        const response = Api.get(`/tag/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};

export const getAggregateMethodListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = Api.get(`/tag/aggregate/method`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};