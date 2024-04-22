import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';

export const devicesTableData = [
  {
    key: '1',
    blaName: 'Bla Name 1',
    deviceName: 'Device 1',
    communicationInterface: '743364787',
    connectedDevices: {
      inactive: ['jkdf', 'jksbvd'],
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active',
  },
  {
    key: '3',
    blaName: 'Bla Name 2',
    deviceName: 'Device 1',
    communicationInterface: '732836774',
    connectedDevices: {
      active: ['jkdf', 'jksbvd', 'bhsje'],
      inactive: [
        'jkdf',
        'jksbvd',
        'bhsje',
        'jkdf',
        'jksbvd',
        'bhsje',
        'jkdf',
        'jksbvd',
        'bhsje',
      ],
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Inactive',
  },
  {
    key: '1',
    blaName: 'Bla Name 1',
    deviceName: 'Device 1',
    communicationInterface: '743364787',
    connectedDevices: {
      inactive: ['jkdf', 'jksbvd'],
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active',
  },
  {
    key: '3',
    deviceName: 'Device 1',
    blaName: 'Bla Name 2',
    communicationInterface: '732836774',
    connectedDevices: {
      active: ['jkdf', 'jksbvd', 'bhsje'],
      inactive: [
        'jkdf',
        'jksbvd',
        'bhsje',
        'jkdf',
        'jksbvd',
        'bhsje',
        'jkdf',
        'jksbvd',
        'bhsje',
      ],
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Inactive',
  },
  {
    key: '1',
    deviceName: 'Device 1',
    blaName: 'Bla Name 1',
    communicationInterface: '743364787',
    connectedDevices: {
      inactive: ['jkdf', 'jksbvd'],
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active',
  },
];

export const blasOptionsData = [
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

export const editBlaTableData = [
  {
    key: '1',
    deviceName: 'Device Name 1',
    comInterface: 'Serial Devicer',
    mappedTags: {
      inactive: [
        'jkdf',
        'jksbvd'
      ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active'
  },
  {
    key: '3',
    deviceName: 'Device Name 2',
    comInterface: 'OPC',
    mappedTags: {
        active: [
          'jkdf',
          'jksbvd',
          'bhsje'
        ],
        inactive: [
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje'
        ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Inactive'
  },
  {
    key: '1',
    deviceName: 'Device Name 1',
    comInterface: 'Ethernet',
    mappedTags: {
      inactive: [
        'jkdf',
        'jksbvd'
      ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active'
  },
  {
    key: '3',
    deviceName: 'Device Name 2',
    comInterface: 'OPC',
    mappedTags: {
        active: [
          'jkdf',
          'jksbvd',
          'bhsje'
        ],
        inactive: [
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje'
        ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Inactive'
  },
  {
    key: '1',
    deviceName: 'Device Name 1',
    comInterface: 'MODBUS',
    mappedTags: {
      inactive: [
        'jkdf',
        'jksbvd'
      ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active'
  },
  {
    key: '3',
    deviceName: 'Device Name 2',
    comInterface: 'Wireless',
    mappedTags: {
        active: [
          'jkdf',
          'jksbvd',
          'bhsje'
        ],
        inactive: [
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje',
          'jkdf',
          'jksbvd',
          'bhsje'
        ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Inactive'
  },
  {
    key: '1',
    deviceName: 'Device Name 1',
    comInterface: 'Serial Devicer',
    mappedTags: {
      inactive: [
        'jkdf',
        'jksbvd'
      ]
    },
    lastModified: '2021-02-05 08:28:36',
    createdOn: '2021-02-05 08:28:36',
    status: 'Active'
  }
];
export const editBlaOptionsData = [
  {
    value: 'csv-upload',
    icon: <CSVIcon />,
    label: 'Upload as CSV'
  },
  {
    value: 'Upload as Excel',
    icon: <ExcelIcon />,
    label: 'Upload as Excel'
  }
];
