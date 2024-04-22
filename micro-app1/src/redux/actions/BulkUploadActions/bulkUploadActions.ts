// import { UPLOAD_LOADER_STATE_HANDLER } from 'redux/types/deviceManagementTypes';
import {
    EXPORT_BLAS,
    EXPORT_DATA_VISUALIZATION,
    EXPORT_GROUPS,
    GET_TEMPLATE,
    IMPORT_USERS,
    UPLOAD_BLAS,
    UPLOAD_TAGS,
} from '../actionTypes';

export const getTemplate = (payload?: any): any => ({
    type: GET_TEMPLATE,
    payload,
});

export const uploadUsers = (payload: FormData): any => ({
    type: IMPORT_USERS,
    payload,
});

export const uploadBla = (payload: any): any => ({
    type: UPLOAD_BLAS,
    payload: payload,
});

export const exportBla = (payload: any): any => ({
    type: EXPORT_BLAS,
    payload: payload,
});

export const exportGroups = (payload: any): any => ({
    type: EXPORT_GROUPS,
    payload: payload,
});

export const uploadTags = (payload: any): any => ({
    type: UPLOAD_TAGS,
    payload: payload,
});

export const exportDataVisualization = (payload: any): any => ({
    type: EXPORT_DATA_VISUALIZATION,
    payload: payload,
});

// export const uploadLoader = (payload: any): any => ({
//     type: UPLOAD_LOADER_STATE_HANDLER,
//     payload: payload,
// });
