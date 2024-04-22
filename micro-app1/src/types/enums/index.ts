export enum EMPTY {
    string = '',
}

export enum ReportsMenuId {
    menuID = '16',
}

export enum ReportsMenuName {
    menuName = 'Reports',
}

export const expiresCookies = 'Thu, 01 Jan 1970 00:00:00 UTC';

export const avtarColor = [
    '#FFA39E',
    '#B9C6F8',
    'blue',
    'purple',
    'black',
    'pink',
    '#FFC069',
    'magenta',
    'green',
    'red',
];

export enum ROLETYPE {
    view = 'view',
    edit = 'edit',
    create = 'create',
    add = 'add',
}

export enum ATTRIBUTETYPE {
    view = 'view',
    edit = 'edit',
    create = 'create',
    display = 'display',
    uom = 'uom',
    add = 'add',
}

export enum TABLETYPE {
    view = 'view',
    edit = 'edit',
    create = 'create',
    display = 'display',
}

export enum TIMECAPSULETYPE {
    view = 'view',
    edit = 'edit',
    create = 'create',
    display = 'display',
}

export enum KPITYPE {
    view = 'view',
    edit = 'edit',
    create = 'create',
    display = 'display',
}

export enum KPIIMPLEMENTATION {
    view = 'view',
    display = 'display',
}

export enum PERMISSIONS {
    read = 'READ',
    write = 'WRITE',
    delete = 'DELETE',
    update = 'UPDATE',
}

export enum USERSTAB {
    users = 'users',
    groups = 'groups',
    roles = 'roles',
}

export enum resourceName {
    users = 'Users',
    groups = 'Resource Groups',
    roles = 'Roles',
    blas = 'BLA',
    devices = 'Devices',
    tags = 'Tags',
}

export enum ROLESSORT {
    roleName = 1,
    isActive = 2,
    createdAt = 3,
    createdBy = 4,
    updatedAt = 5,
}

export enum BLASSORT {
    name = 1,
    uuid = 2,
    createdOn = 3,
    updatedOn = 4,
}

export enum tagSort {
    name = 1,
    dataType = 2,
    nodeId = 3,
    createdOn = 4,
    updatedOn = 5,
    tagName = 1,
}

export enum USERSSORT {
    name = 1,
    email = 2,
    status = 3,
    createdAt = 4,
    createdBy = 5,
}

export enum kpiColumnSort {
    name = 1,
    type = 3,
    nodeLevel = 4,
    valueType = 5,
    UOM = 6,
}

export enum sortOrder {
    ascending = 1,
    descending = 2,
}

export enum sortingOrder {
    ascending = 0,
    descending = 1,
}

export enum tagOriginId {
    PLC = 0,
    USER = 1,
    KPI = 2,
    IT = 3,
}

export enum sortOrderApi {
    ascend = 1,
    descend = 2,
}

export enum GROUPSSORT {
    groupName = 1,
    isActive = 2,
    createdAt = 3,
    createdBy = 4,
    updatedAt = 5,
}

export enum TIMECAPSULESORT {
    name = 1,
    description = 2,
}

export enum BUTTONTYPE {
    assignMore = 'Assign More',
    send = 'send',
    save = 'Save',
    cancel = 'Cancel',
    next = 'Next',
    saveAndNext = 'Save and Next',
    addNew = 'Add New',
    apply = 'Apply',
    otp = 'OTP',
    sendInvitation = 'Send Invitation',
    createNewPassword = 'Create New Password',
    deactivateAll = 'DeactiveAll',
    activateAll = 'ActivateAll',
    resetPassword = 'Reset Password',
    addUser = 'Add User',
    addUsers = 'Add Users',
    createGroup = 'Create Group',
    signIn = 'SIGN IN',
    yes = 'Yes',
    submit = 'Submit',
    finish = 'Finish',
    back = 'Back',
    edit = 'Edit',
    close = 'Close',
    downloadAsCSV = 'Download as CSV',
    sendRecoveryMail = 'Send Recovery Mail',
    sendLink = 'Send Link',
    delete = 'Delete',
    assign = 'Assign',
    assignTimeCapsule = 'Assign Time Capsule',
    validate = 'Validate',
    assignAttributes = 'Assign Attributes',
    verify = 'Verify',
    assignTable = 'Assign Table',
    assignTimeCapsules = 'Assign Time Capsules',
    reasonCode = 'Enter Reason Code',
    marathiReasonCode = 'स्टॉपेजचे कारण एंटर करा',
    marathiBack = 'मागे',
    marathiSubmit = 'सेव्ह करा',
}

export enum dateFormat {
    format = 'YYYY-MM-DD HH:mm:ss',
    formatWithoutTime = 'YYYY-MM-DD',
    timeFormat = 'HH:mm',
    hours = 'HH',
}

export enum UseCasesMenu {
    CPGOEE = 'upl',
    ChemicalProcessMonitoring = 'aarti_apple',
    Brabo = 'Brabo',
    CriticalAssetMonitoring = 'eberspacher',
    DashboardBuilder = 'Dashboard Builder',
    Configure = 'Configure',
    DashboardReporting = 'Dashboard Reporting',
    Reports = 'Reports',
    Username = 'admin',
    Password = 'admin',
    AssetModeller = 'Asset Modeller',
    Connections = 'Connections',
    Mapping = 'Mapping',
    Operations = 'Operations',
    Monitoring = 'Monitoring',
    BoilerMonitoring = 'Boiler Efficiency Monitoring',
    CPGMonitoring = 'CPG OEE Monitoring',
    Dashboards='Dashboards'
}

export enum File_TO_DOWNLOAD {
    EXCEL = 1,
    CSV = 2,
    PDF = 3,
}
export enum deviceSortOption {
    name = 1,
    blaName = 2,
    type = 3,
    createdOn = 4,
    updatedOn = 5,
    deviceName = 1,
    tagName = 1,
    communicationInterface = 3,
}

export enum attributeSortOption {
    ATTRIBUTE_NAME = 1,
    DESCRIPTION = 2,
    PROPERTIES_NAME = 3,
    CATEGORY_NAME = 4,
    UOM_NAME = 5,
    DATA_TYPE = 6,
    DATA_REFERENCE = 7,
    DISPLAY_DIGITS = 8,
    CreatedDate = 9,
}

export enum kpiSortOption {
    KPI_NAME = 1,
    KPI_DESCRIPTION = 2,
    KPI_TYPE = 3,
    NODE_LEVEL = 4,
    DATA_TYPE = 5,
    UOM = 6,
    AGGREGATION_TYPE = 7,
    TARGET_TYPE = 8,
}
export enum tableSortOptions {
    TABLE_NAME = 1,
    CREATED_ON = 2,
    UPDATED_ON = 3,
}

export enum popOverItems {
    Edit = 'Edit',
    Deactivate = 'Deactivate',
    Activate = 'Activate',
}

export enum screenName {
    deviceManagementBlas = 'blas',
    deviceManagementDevices = 'devices',
    deviceManagementTags = 'tags',
    userManagementRoles = 'roles',
    timeCapsule = 'timeCapsule',
    kpi = 'kpi',
}

export enum deviceType {
    modbus = 9,
    opcUa = 1,
    plcAb = 2,
    plcSiemens = 3,
    simulator = 4,
    plcMitsubishi = 5,
    opcDa = 6,
    bacnet = 7,
    plcAbOld = 8,
}

export enum StatusType {
    All = 0,
    Active = 1,
    Deactivate = 2,
}

export enum AssignStatus {
    ASSIGNED = 1,
    UNASSIGNED = 2,
}

export enum ApiService {
    USER_MANAGEMENT = 'user-mgmt',
    AMP_CONFIGURATOR = 'amp-configurator',
    ASSET_API = 'asset',
    KPI_ENGINE = 'kpi',
    CALENDAR_CONFIGURATOR = 'calendar-config',
    CONFIGURE = 'attrib-config',
    REPORT_CONFIGURATOR = 'dashboard-builder',
}

export enum ApiServicePort {
    USER_MANAGEMENT = '6038',
    AMP_CONFIGURATOR = '6572',
    ASSET_API = '6040',
    KPI_ENGINE = '8083',
    REPORT_CONFIGURATOR = '',
}

export enum userActivateDeactivate {
    deactivate = 'Deactivate',
    activate = 'Activate',
    activateDeactivate = 'Activate/Deactivate',
}

export enum attributeActivateDeactivate {
    deactivate = 'Deactivate',
    activate = 'Activate',
    activateDeactivate = 'Activate/Deactivate',
}

export enum deviceManagement {
    blaNameLength = '10',
    deviceDescriptionLength = '20',
}

export enum attribute {
    attributeNameLength = '10',
    attributeDescriptionLength = '7',
}

export enum tableLength {
    tableNameLength = '10',
    tableDescriptionLength = '50',
}
export enum tableImplementation {
    tableNameLength = '10',
    tableDescriptionLength = '60',
}
export enum timeCapsule {
    timeCapsuleNameLength = '17',
    timeCapsuleDescriptionLength = '43',
    attributeNameLength = '15',
    attributeDescriptionLength = '10',
}

export enum userCreationType {
    addUserManually = 2,
    inviteUser = 1,
}

export enum kpiDefinition {
    kpiNameLength = '8',
    kpiDescriptionLength = '8',
}

// Note: To be replaced with actual units after confirming same from backend
export enum unit {
    'kg/cm^2' = 0,
    'TPH' = 1,
    '%' = 2,
    'C^o' = 3,
}

export enum DataManipulation {
    Add = 'add',
    Remove = 'remove',
}

export enum CalendarConfig {
    dayConfiguration = 'Day Configuration',
    shiftConfiguration = 'Shift Configuration',
    startTime = 'startTime',
    endTime = 'endTime',
    shiftTime = 'shiftTime',
    duration = 'duration',
    validFrom = 'validFrom',
    validTill = 'validTill',
    shiftName = 'shiftName',
    day = 'Day',
    shift = 'Shift',
    holiday = 'Holiday',
    break = 'Break',
    action = 'action',
    dayName = 'name',
}

export enum FormEnums {
    save = 'Save',
    cancel = 'Cancel',
    submit = 'Submit',
}

export enum assetsDetails {
    timezone = 'Timezone',
}

export enum dateFormatName {
    timezone = 'timezone',
    monthName = 'monthName',
    weekDay = 'weekDay',
}
export enum fileExtensionTypes {
    csv = 'csv',
    excel = 'excel',
    pdf = 'pdf',
}
export enum resetPasswordOption {
    default = 0,
    sendPasswordLink = 1,
    changePassword = 2,
}

export enum attributeFormEnum {
    nameOfUnit = 'nameOfUnit',
    abbreviation = 'abbreviation',
    uomClasses = 'uomClasses',
    metricSystem = 'metricSystem',
    description = 'description',
    name = 'name',
    properties = 'properties',
    category = 'category',
    uom = 'uom',
    valueType = 'valueType',
    displayDigit = 'displayDigit',
    industry = 'industry',
    dataReference = 'dataReference',
}

export enum kpiFormEnum {
    nameOfUnit = 'nameOfUnit',
    abbreviation = 'abbreviation',
    uomClasses = 'uomClasses',
    metricSystem = 'metricSystem',
    description = 'description',
    name = 'name',
    type = 'type',
    nodeLevel = 'nodeLevel',
    uom = 'uom',
    valueType = 'valueType',
    displayDigit = 'displayDigit',
    targetType = 'targetType',
    aggregationType = 'aggregationType',
}
export enum tableFormEnum {
    description = 'description',
    name = 'name',
}

export enum dataTypeWithId {
    int = 1,
    float = 2,
    double = 3,
    string = 4,
    date = 5,
    timestamp = 6,
}

export enum getTimeFromEpoch {
    hours = 3600000,
}

export enum TemplateTypeAsset {
    csv = 2,
    pdf = 3,
}
export enum TemplateTypeKpi {
    csv = 2,
    pdf = 1,
}

export enum TagOriginId {
    PLC = 0,
    USER = 1,
    KPI = 2,
}
export enum timeCapsuleImpl {
    assignedTimeCapsuleName = '8',
    assignTimeCapsuleDescriptionLength = '25',
    timeCapsuleNameLength = '15',
    timeCapsuleDescriptionLength = '30',
}

export enum timeCapsuleSortOption {
    TIME_CAPSULE_NAME = 1,
    DESCRIPTION = 2,
    CREATED_DATE = 3,
}

export enum implementationTableSortOption {
    tableName = 1,
    createdOn = 2,
    updatedOn = 3,
}
export enum implementationTableAssignStatus {
    assign = 1,
    unassign = 2,
}
export enum implementationPopoverItems {
    REMOVE = 'Remove',
    EDIT = 'Edit',
}
export enum implementationAssignStatus {
    ASSIGN = 1,
    UNASSIGN = 2,
}

export enum assignAttributeStatus {
    ASSIGN = 1,
    UNASSIGN = 2,
}

export enum attributeModalTextarea {
    ROW = 10,
}

export enum paginationRecords {
    RECORDS = 50,
}

export enum ATTRIBUTETYPEIMPL {
    view = 'view',
    edit = 'edit',
    add = 'add',
}

export enum attributeImplValue {
    attributeValueLength = 20,
    tagNameLength = 20,
}
export enum implementationTableState {
    VIEW = 'View',
    EDIT = 'Edit',
    VALIDATE = 'Validate',
}

export enum assignUnassignEnum {
    assign = 1,
    unAssign = 2,
}

export enum timeCapsuleEnum {
    table = 'table',
    kpi = 'kpi',
    timeCapsule = 'time-capsule',
}

export enum dataReferenceType {
    static = 1,
    tag = 2,
}

export enum implementationTabItems {
    ATTRIBUTE = 'attribute',
    TIMECAPSULE = 'time-Capsule',
}

export enum reasonCodeFilterOptions {
    ASSIGNED = 1,
    UNASSIGNED = 2,
    ALL = 3,
}

export enum reasonCodeCategories {
    PLANNED = 'Planned Stoppages',
    UNPLANNED = 'Unplanned Stoppages',
}

export enum reasonCodeLanguage {
    MARATHI = 'मराठी',
    ENGLISH = 'ENGLISH',
}

export enum communicationInterfaceDevice {
    OPC = 'OPC',
    OPCDA = 'OPC DA',
    BACNET = 'BACnet',
    MODBUSTCPDEVICES = 'Modbus TCP Devices​',
    INDUSTRIALCONTROLLER = 'Industrial Controller​', 
    MITSUBISHI = 'Mitsubishi',
    ALLENBRADLEY ='Allen bradley',
    SIEMENS = 'Siemens'
}

export enum deviceInterface{
    OPC='OPC UA',
    OPCDA='OPC DA',
    PLCAB='PLC AB',
    PLCSIEMENS='PLC Siemens',
    MODBUS="Modbus",
    PLCMITSUBISHI ='PLC Mitsubishi'

}
