import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InActiveDotIcon } from 'assets/icons/inactiveDot.svg';

export const RolesData = [
  {
    key: '1',
    roleName: 'Supervisor',
    status: 'Active',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '2',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '3',
    roleName: 'Supervisor',
    status: 'Active',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '4',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '5',
    roleName: 'Supervisor',
    status: 'Active',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '6',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '7',
    roleName: 'Supervisor',
    status: 'Active',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '8',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '9',
    roleName: 'Supervisor',
    status: 'Active',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg', 'fghj', 'fghjn', 'fghbn'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '10',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
  {
    key: '11',
    roleName: 'Manager',
    status: 'Inactive',
    userNumber: ['Vaishali', 'Riya', 'Mike', 'evccg'],
    lastModified: '2021-02-05 08:28:36',
    createdBy: 'Michael Knight',
    createdOn: '2021-02-05 08:28:36',
  },
];

export const RolesResourceTypeData = [
  {
    name: 'Menu',
    subItems: [],
  },
  {
    name: 'KPIs',
    subItems: [
      { name: 'KPI Group 1' },
      { name: 'KPI Group Level 2' },
      { name: 'KPI Group Level 3' },
      { name: 'KPI Group Level 4' },
      { name: 'KPI Group 5' },
    ],
  },
  {
    name: 'Screens',
    subItems: [],
  },
  {
    name: 'Sections',
    subItems: [],
  },
  {
    name: 'Dashboards',
    subItems: [],
  },
];

export const RolesSubItemsHeader = [
  {
    name: 'Sub Items',
    checkbox: false,
  },
  {
    name: 'Read',
    checkbox: true,
  },
  {
    name: 'Write',
    checkbox: true,
  },
  {
    name: 'Edit',
    checkbox: true,
  },
  {
    name: 'Delete',
    checkbox: true,
  },
];

export const RolesSubItemsTable = [
  {
    name: 'KPI (Energy)',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI (Temperature)',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI (Speed)',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI (Density)',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI (Altitude)',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'Overview Dashboard',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI 0934',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
  {
    name: 'KPI 3928',
    read: true,
    write: false,
    edit: false,
    delete: false,
  },
];

export const rolesUsersTableData = [
  {
    key: '1',
    name: 'mike',
    roles: 'Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Active',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
  {
    key: '2',
    name: 'John',
    roles: 'Super Admin',
    emailId: 'rick.wright@brabo.com',
    status: 'Inactive',
  },
];

export const rolesUsersOptionsData = [
  {
    value: 'csv-upload',
    icon: <CSVIcon />,
    label: 'Upload as CSV',
  },
  {
    value: 'Upload as Excel',
    icon: <ExcelIcon />,
    label: 'Upload as Excel',
  },
];

export const rolesStatusOptionsData = [
  {
    value: '',
    icon: <ActiveDotIcon />,
    label: 'Active',
  },
  {
    value: 'Upload as Excel',
    icon: <InActiveDotIcon />,
    label: 'Inactive',
  },
];
