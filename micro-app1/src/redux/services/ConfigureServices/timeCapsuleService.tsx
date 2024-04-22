import { baseUrlSetter } from 'utils/commonFunction';
import Api from '../index';
import { message } from 'antd';
import { AssignStatus, StatusType } from 'types/enums';

export const getTimeCapsuleListsService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        ...(payload?.search !== '' ? { search: payload?.search } : {}),
    };
    try {
        const response = Api.get(`/timeCapsule`, {
            params: params,
        });

        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const createTimeCapsuleService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = payload;
    try {
        const response = Api.post(`/timeCapsule/add`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const getTimeCapsuleByIdService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const paramId = payload?.id;
    const params = {
        pageNumber: payload?.page,
        pageSize: payload?.pageSize,
        sortColumn: payload?.sortColumn,
        sortOrder: payload?.sortOrder,
        ...(payload?.search !== '' ? { search: payload?.search } : {}),
        status: payload.status ? payload.status : StatusType.All,
        isAssign: payload.isAssign ? payload.isAssign : AssignStatus.ASSIGNED,
    };
    try {
        const response = Api.get(`/timeCapsule/${paramId}`, {
            params: params,
        });
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const statusUpdateTimeCapsuleService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('configure');

    try {
        const response = Api.put(`/timeCapsule/status`, payload);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const updateTimeCapsuleService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        ...payload,
    };
    delete params?.timeCapsuleId;
    try {
        const response = Api.put(
            `/timeCapsule/edit/${payload?.timeCapsuleId}`,
            params
        );
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};

export const assignTimeCapsuleService = async (payload: any): Promise<any> => {
    baseUrlSetter('configure');
    const params = {
        ...payload,
    };
    try {
        const response = Api.put(`/timeCapsule/attribute/assignment`, params);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw new Error(error);
    }
};
