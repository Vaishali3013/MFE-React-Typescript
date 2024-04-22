import { type ReactNode } from 'react';
import { UserDetailObject } from '..';

export interface UserTableRowType {
    [x: string]: ReactNode;
    key: string;
    userId: string;
    firstName: string;
    lastName: string;
    roles: any;
    emailId: string;
    email: string;
    addedOn: string;
    addedBy: string;
    active: boolean;
    profileImage: string;
    mobileNumber: string;
    temperature: any;
    reportingTo: string;
    language: any;
    timeZone: any;
    metrics: any;
    avtarColor: string;
}

export interface ViewUsersProps {
    data: UserTableRowType;
    setIsEdit: any;
}

export interface UsersMoreContentProps {
    record: UserTableRowType;
    setIsUserEditModalOpen: any;
    isUserEditModalOpen: boolean;
    setIsEdit: any;
    setSelectedRowData: any;
    setPopoverVisible: Function;
    paginationPayload: any;
    selectedUserIds: any;
}
export interface UserMultipleActiveDeactiveProps {
    //  statusCount:any
    multipleRecord: any;
    // setPopoverVisible: Function;
    selectedUserIds: string[];
    // countDetailsData:any,

    selectedInactiveIds?: Number[];
    selectedActiveIds: Number[];
    onItemClick: Function;

    record?: UserTableRowType;
    setIsUserEditModalOpen: any;
    isUserEditModalOpen: boolean;
    setIsEdit: any;
    setSelectedRowData: any;
    setPopoverVisible?: Function;
    paginationPayload: any;
}
export interface GroupMultipleActiveDeactiveProps {
    multipleRecord: any;
    // setPopoverVisible: Function;
    selectedUserIds: number[];
    // countDetailsData:any,
    selectedInactiveIds?: Number[];
    selectedActiveIds: Number[];
    onItemClick: Function;
    record?: UserTableRowType;
    // setSelectedRowData: any;
    setPopoverVisible?: Function;
    paginationPayload: any;
}

export interface RoleMultipleActiveDeactiveProps {
    multipleRecord: any;
    // setPopoverVisible: Function;
    selectedUserIds: string[];
    // countDetailsData:any,
    selectedInactiveIds?: Number[];
    selectedActiveIds: Number[];
    onItemClick: Function;
    record?: UserTableRowType;
    // setSelectedRowData: any;
    setPopoverVisible?: Function;
    paginationPayload: any;
}
export interface AddUsermanuallyProps {
    handleCancle?: Function;
    data?: any;
    isEdit?: boolean;
    onOk?: any;
    paginationPayload?: any;
    setadduserTypeValue?: any;
}

export interface UserCreationProps {
    onCancelhandler: Function;
    setUserTypeValue: Function | any;
    userTypeValue: number;
    onOk: any;
    paginationPayload?: any;
    setadduserTypeValue?: any;
}

export interface InviteUserProps {
    setInviteValue: Function;
    inviteValue: string[];
    handleBackClick: Function;
}

export interface UserCreationTypeProps {
    setUserTypeValue: Function;
    userTypeValue: number;
    handleNextClick: Function;
    handleCancle: Function;
    paginationPayload?: any;
    setadduserTypeValue?: any;
}

export interface MyProfileTypeProps {
    userDetails: UserDetailObject;
}
