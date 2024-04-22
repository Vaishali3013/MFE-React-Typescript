import { type ReactNode } from 'react';

export interface MenuData {
    name: string;
    breadcrumb: string;
    key: string;
    icon: ReactNode;
    path: string;
    exact: boolean;
    children: MenuData[];
}

export interface SidebarProps {
    collapsed: boolean;
    menu: MenuData[];
    changeSideBar: Function;
    setBreadcrumbData?: any;
    setSearchValue: Function;
    searchValue: any;
}

export interface ScreenHeadingProps {
    heading: string;
    subHeading?: string;
}

export interface TabItem {
    key: string;
    label: string;
    children: ReactNode;
}

export interface TabItemProps {
    tabItem: TabItem[];
    setTabKey?: any;
    setActiveTabKey?: any;
    activeTabKey?: any;
    customClassName?: string;
}

export interface ModalProps {
    open: boolean | any;
    onOk?: Function | any;
    onCancel: Function;
    text?: ReactNode;
    title?: string;
    icon?: ReactNode;
    children?: ReactNode;
    userTypeValue?: Function | any;
    otpComponent?: ReactNode;
    customClassName?: string;
    countAnalytics?: ReactNode;
    buttonText?: string;
    status?: string;
    popoverSwitch?: boolean;
    okButtonProp?: any;
    popoverSwitchComponent?: ReactNode;
    footer?: any;
    subText?: any;
    onSwitchChecked?: any;
    backIcon?: boolean;
    setChangePasswordSelected?: any;
}

export interface ManualEntryModalProps {
    open: boolean | any;
    onOk?: Function | any;
    onCancel: Function;
    text?: string;
    title?: string;
    icon?: ReactNode;
    customClassName?: string;
    buttonText?: string;
    titleValue?: string;
}

export interface ActiveDeactiveModalProps {
    countAnalytics?: ReactNode;
    handleCancel: any;
    handleActivateAll: any;
    handleDeactivateAll: any;
    status?: any;
    open: boolean | any;
    onOk?: Function | any;
    onCancel: Function;
    text?: string;
    title?: string;
    icon?: ReactNode;
    children?: ReactNode;
    userTypeValue?: Function | any;
    otpComponent?: ReactNode;
    customClassName?: string;
}
export interface ActivateDeactivateModalProps {
    open: boolean | any;
    onOk?: Function | any;
    onCancel: Function;
    text?: string;
    title?: string;
    icon?: ReactNode;
    activeIds?: Number[];
    inActiveIds?: Number[];
    handleActivate?: Function | any;
    handleDeactivate?: Function | any;
}
export interface customButtonProps {
    type: string;
    disabled: any;
    handleClick?: any;
    typeOfButton?: any;
    customClassName?:string;
}
export interface ValidationObjectProps {
    length: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
    uppercase: boolean;
}
export interface CustomToolTipProps {
    open: boolean;
    validations: any;
}
export interface TableData {
    key: string;
    name?: string;
    userNumber?: string;
    roles?: string;
    emailId?: string;
    addedOn?: string;
    addedBy?: string;
    roleName?: string;
    lastModifiedOn?: string;
    createdBy?: string;
    createdOn?: string;
    groupName?: string;
    subItems?: SubItemsProps;
}
export interface CustomTableProps {
    columnName: string[];
    rowData: any;
    rowsData?: any;
    dynamicMore?: any;
}
export interface CountTypes {
    title: string;
    count: string;
    icon: ReactNode;
}

export interface CountAnalyticsProps {
    countDetails: CountTypes[];
    customClassName?: string;
}

export interface CustomPaginationProps {
    totalRecords?: any;
    page: number;
    setPage: Function;
    setPageSize: Function;
    pageSize: Number;
    pageSizeOptions?:any
    defaultPageSize?:number;
    customClassName?:string;
    isPositionFixed?:boolean
}

export interface EmptyDataPageButtons {
    name: string;
    disable: boolean;
}
export interface EmptyDataComponentProps {
    textValue: string;
    buttonType?: EmptyDataPageButtons;
    bulkImport?: boolean;
    children?: JSX.Element;
    loading?: boolean;
    onClick?: Function;
    buttonClickHandler?: Function;
    secondaryTextValue?: string;
    customClassName?: string;
}
export interface CustomDropDownOptions {
    value: string;
    icon?: ReactNode;
    label: string;
}

export interface CustomDropDownProps {
    optionsData: CustomDropDownOptions[];
    placeholder?: string;
    selcetHandler?: Function;
    disabled?: boolean;
    value?: any;
}
export interface CustomDropDownValueOptions {
    name: string;
    id?: string;
}
export interface CustomDropDownValueProps {
    optionsData: CustomDropDownValueOptions[];
    searchbar?: boolean;
    name?: string;
    onChange?: any;
    selectedValue?: string;
}
export interface MoreContentItems {
    title: string;
    icon?: any;
}
export interface MoreContentProps {
    options: MoreContentItems[];
    setEditDrawer?: Function | any;
}

export interface UserCreationTypeProps {
    setUserTypeValue: Function;
    userTypeValue: number;
    handleNextClick: Function;
    handleCancle: Function;
}

export interface InviteUserProps {
    setInviteValue: Function;
    inviteValue: string[];
    handleBackClick: Function;
}

export interface UserCreationProps {
    onCancelhandler: Function;
    setUserTypeValue: Function | any;
    userTypeValue: number;
}

export interface AddUsermanuallyProps {
    handleCancle: Function;
}
export interface PreferenceItemProps {
    nameValue: string;
    labelValue: string;
    editInfo: boolean;
    onChange: any;
    value: any;
    optionsDataVal: CustomDropDownValueOptions[];
    showSearchbar?: boolean;
}

export interface ProgressProps {
    state?: string;
}

export interface CreateRoleCountProps {
    count: number;
    screen: string;
}

export interface Roleswitchprops {
    text?: string;
    switchBoolean?: boolean;
    types?: any;
    checked?: boolean;
    onChangeFunction?: Function | any;
    key?: any;
    switchDisabled?: boolean;
}
export interface SubItemsData {
    key: number;
    name?: string;
}
export interface FooterButtonProps {
    length: any;
}
export interface DropDownValProps {
    label: string;
    value: string;
    name: string;
}
export interface PreferenceValueObjectProps {
    nameValue: string;
    labelValue: string;
    editInfo: boolean;
    onChange: any;
    optionsDataVal: [];
    value: any;
    showSearchbar: boolean;
}
export interface DataType {
    id: number;
    key: string;
    groupName: string;
    subItems: SubItemsProps[];
    status: string;
    createdBy: string;
    createdOn: string;
    lastModified: string;
    name: string;
    description: string;
    unit: string;
    minRange: number;
    maxRange: number;
    disabled: boolean;
}
export interface SubItemsProps {
    resourceType: string;
    data: SubItemsDatProps[];
}
export interface SubItemsDatProps {
    key: string;
    subItem: string;
}
export interface GroupTableProps {
    openEditDrawer: Function;
    rowsData: Function;
    selectedGroup: Function;
}
export interface RoleTableMoreContentProps {
    key: string;
    roleName: string;
    status: string;
    userNumber: [];
    lastModified: string;
    createdBy: string;
    createdOn: string;
    id: Number;
}

export interface EditBlaProps {
    text?: string;
    open?: boolean;
    checked?: boolean;
    setBlaState: Function;
    setShowSettings: Function;
    record: any;
    setOpenEditDevice: Function;
    setDeviceDescription: any;
    setDetails: any;
    onClose: any;
    tagListByDeviceId: any;
    setDeviceTagPage?: any;
    setDeviceTagPageSize?: any;
    deviceTagPage?: any;
    setDeviceTagStatus?: any;
    deviceTagPageSize?: any;
    setSuccessModalState?: any;
}

export interface BlaTableProps {
    setBlaState?: Function | any;
    checked?: boolean;
}

export interface rolesListObjectProps {
    record: rolesListObject;
    setPopoverVisible: Function;
    selectedUserIds: any;
    paginationPayload: any;
}

export interface rolesListObject {
    key: string;
    roleId: Number;
    roleName: string;
    roleDescription: string;
    active: boolean;
    createdAt: string;
    createdBy: string;
    deleted: boolean;
    updatedAt: string;
    updatedBy: string;
    userMetaDataList: [];
    resGroupPermList: [
        {
            id: Number;
            groupName: string;
            groupDescription: string;
            resourceType: {
                id: Number;
                resourceTypeName: string;
                allowedPermissions: [];
            };
            resourcePermission: [
                {
                    id: Number;
                    resource: {
                        resourceId: Number;
                        resourceName: string;
                        resourceType: {
                            id: Number;
                            resourceTypeName: string;
                            allowedPermissions: [];
                        };
                    };
                    permission: string;
                }
            ];
        }
    ];
}
export interface UserDetailObject {
    userId: Number;
    firstName: string;
    lastName: string;
    email: string;
    employeeId: string;
    profileImage: string;
    mobileNo: string;
    designation: string;
    address: {
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    userGroup: {
        groupId: Number;
        name: string;
        description: string;
    };
    dateFormat: {
        dateFormatId: Number;
        dateFormat: string;
    };
    language: {
        languageId: Number;
        languageName: string;
        languageCode: string;
    };
    metrics: {
        metricId: Number;
        metricSystem: string;
    };
    numberFormat: {
        numberFormatId: Number;
        numberFormat: string;
    };
    temperature: {
        temperatureId: Number;
        temperatureType: string;
    };
    theme: {
        themeId: Number;
        themeName: string;
        themeIcon: string;
    };
    timeZone: {
        timeZoneId: Number;
        timeZone: string;
    };
    active: true;
}

export interface rolePermissionTypes {
    resource: roleSubArraytypes;
    permission: string[];
    id?: Number;
}

export interface roleSubArraytypes {
    resourceId: Number;
    resourceName: string;
}

export interface ParentChildActivationModalProps {
    open: boolean | any;
    onOk?: Function | any;
    onCancel: Function;
    text?: string;
    title?: string;
    icon?: ReactNode;
    children?: ReactNode;
    userTypeValue?: Function | any;
    otpComponent?: ReactNode;
    customClassName?: string;
    countAnalytics?: ReactNode;
    buttonText?: string;
    status?: string;
    popoverSwitch?: boolean;
    okButtonProp?: any;
    popoverSwitchComponent?: ReactNode;
    counterText?: ReactNode;
    selectUnselectText?: ReactNode;
    record?: any;
    tagsIds?: any;
    setTagIds?: any;
    setTagsListLength?: any;
}