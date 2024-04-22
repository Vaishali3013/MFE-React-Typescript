import { baseUrlSetter } from 'utils/commonFunction';
import Api from '..';

export const getAllowedMenuListsServices = async (
    payload: any
): Promise<any> => {
    baseUrlSetter('userManagement');
    try {
        const response = await Promise.resolve(
            Api.get(`users/getAllowedMenuItems/${payload}`)
        );
        return response;
    } catch (error: any) {
        throw new Error(error);
    }
};
