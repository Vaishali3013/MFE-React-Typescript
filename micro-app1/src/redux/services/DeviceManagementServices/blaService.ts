import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const editBlaServices = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        blaId: payload?.blaId,
    };
    const requestBody = {
        blaName: payload?.blaName,
        description: payload?.description,
        updatedBy: payload?.updatedBy,
    };
    try {
        const response = Api.put(`bla/update/${params?.blaId}`, requestBody);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getBlasListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        status: payload?.status,
        searchList: payload?.search.toString() || [],
    };
    try {
        const response = Api.get(`/bla/list/paginated`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getAllBlasListService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = Api.get(`/bla/list`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getBlaByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = payload;
    try {
        const response = Api.get(`/bla/${params}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
export const activateDeactivateBlasService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        blaIdList: payload.id,
        isActive: payload.active,
        requestedBy: payload.updatedBy,
    };
    try {
        const response = await Api.put(`/bla/status`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
export const createBlaService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = payload;
    try {
        const response = Api.post(`/bla/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const getDevicesInBlaListService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        pageNumber: payload?.pageNumber,
        pageSize: payload?.pageSize,
        status: payload?.status,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        deviceList: payload?.search.toString() || [],
    };
    try {
        const response = Api.get(`/device/list/${payload.blaId}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const removeDeviceInBla = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const params = {
        deviceId: payload.id,
    };
    try {
        const response = await Api.put(`/device/remove/${params.deviceId}`);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
