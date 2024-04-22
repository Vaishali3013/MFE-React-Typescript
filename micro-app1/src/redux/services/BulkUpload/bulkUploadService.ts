import { File_TO_DOWNLOAD, ApiService, dateFormat } from 'types/enums';
import { message } from 'antd';
import Api from '..';
import dayjs from 'dayjs';
import { getUrlForApiService } from 'utils/urlHandler';
import { baseUrlSetter } from 'utils/commonFunction';

export const getTemplate = async (payload: any): Promise<any> => {
    const baseEndpoint: string = baseUrlSetter(payload.screenType);
    let endPoint = '';
    switch (baseEndpoint) {
        case getUrlForApiService(ApiService.USER_MANAGEMENT):
            if (payload.screenType === 'userManagementGroups') {
                endPoint =
                    baseEndpoint + '/resourcegroups/exportAllResourceGroup';
            } else endPoint = baseEndpoint + '/users/downloadtemplate';
            break;

        case getUrlForApiService(ApiService.AMP_CONFIGURATOR):
            if (payload.screenType === 'deviceManagementTags') {
                endPoint = baseEndpoint + '/tag/download/template';
            } else endPoint = baseEndpoint + '/bla/download/template';
            break;
        default:
            break;
    }
    try {
        const response = await Api.get(`${endPoint}`, {
            responseType: 'blob',
            params: {
                templateType:
                    payload.typeOfDownload === 'downloadTemplateExcel'
                        ? File_TO_DOWNLOAD.EXCEL
                        : File_TO_DOWNLOAD.CSV,
            },
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileExtension =
            payload.typeOfDownload === 'downloadTemplateExcel' ? 'xlsx' : 'csv';
        link.setAttribute('download', `template.${fileExtension}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const importUsers = async (): Promise<any> => {
    try {
        const formData = new FormData();
        Api.post(`/users/downloadtemplate`, {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
export const exportGroupService = async (payload: any): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Api.get(
            `/resourcegroups/exportAllResourceGroup`,
            {
                responseType: 'blob',
                params: payload,
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileExtension =
            payload.templateType === File_TO_DOWNLOAD.EXCEL ? 'xlsx' : 'csv';
        link.setAttribute('download', `template.${fileExtension}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        message.error(error?.response?.data?.message);
        throw error;
    }
};
export const uploadBlasService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = await Api.post(`/bla/bulk/upload`, payload.formData, {
            params: {
                templateType:
                    payload.fileType === 'excel'
                        ? File_TO_DOWNLOAD.EXCEL
                        : File_TO_DOWNLOAD.CSV,
                createdBy: payload.createdBy,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        message.success(response.data.message);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const uploadTagsService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = await Api.post(`/tag/bulk/upload`, payload.formData, {
            params: {
                templateType:
                    payload.fileType === 'excel'
                        ? File_TO_DOWNLOAD.EXCEL
                        : File_TO_DOWNLOAD.CSV,
                createdBy: payload.createdBy,
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        message.success(response.data.message);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const exportBlasService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    try {
        const response = await Api.get(`/bla/export`, {
            responseType: 'blob',
            params: payload,
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileExtension =
            payload.templateType === File_TO_DOWNLOAD.EXCEL ? 'xlsx' : 'csv';
        link.setAttribute('download', `template.${fileExtension}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};

export const exportDataVisualizationService = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('asset');
    const idList = Array.isArray(payload?.tagUuidList)
        ? payload.tagUuidList.join(',')
        : payload?.tagUuidList;

    const params = {
        startTime: payload?.startTime,
        endTime: payload?.endTime,
        tagUuidList: idList,
        templateType: payload?.templateType,
        tagOriginId: payload?.tagOriginId,
        timeZone: payload?.timeZone,
    };
    try {
        const response = await Api.get(`/tag/export/aggregated/data`, {
            responseType: 'blob',
            params: params,
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileExtension =
            payload.templateType === File_TO_DOWNLOAD.PDF ? 'pdf' : 'csv';
        link.setAttribute(
            'download',
            `TAGS_Data_Aggregated_${dayjs().format(
                dateFormat.format
            )}.${fileExtension}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error: any) {
        message.error(
            error.response.data.message
                ? error.response.data.message
                : 'Internal Server Error'
        );
        throw new Error(error);
    }
};
