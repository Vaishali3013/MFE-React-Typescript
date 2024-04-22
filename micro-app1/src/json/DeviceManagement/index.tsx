import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import Blas from '../../pages/DeviceManagement/Blas/index';
import Devices from 'pages/DeviceManagement/Devices';

export const tabItems = [
  {
    key: '1',
    label: `BLAs`,
    children: <Blas />
  },
  {
    key: '2',
    label: `Devices`,
    children: <Devices />
  },
  {
    key: '3',
    label: `Tags`,
    children: `Content of Tab Pane 3`
  }
];

export const countDetails = [
  {
    title: 'Active BLAs',
    count: '56',
    icon: <ActiveUserIcon />
  },
  {
    title: 'Inactive BLAs',
    count: '03',
    icon: <DeactivateUserIcon />
  }
];
