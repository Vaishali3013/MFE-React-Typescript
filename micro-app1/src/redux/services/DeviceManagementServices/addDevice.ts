import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';
import { message } from 'antd';

export const addDeviceService = async (payload: any): Promise<any> => {
    baseUrlSetter('deviceManagement');
    const body = payload;
    try {
        const response = Api.post(`/device/add`, body);
        return await Promise.resolve(response);
    } catch (error: any) {
        message.error(error.response.data.message ? error.response.data.message : "Internal Server Error");
        throw new Error(error);
    }
};
