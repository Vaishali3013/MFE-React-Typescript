import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';

export const usersOptionsData = [
  {
    value: 'uploadCSV',
    icon: <CSVIcon />,
    label: 'Upload as CSV'
  },
  {
    value: 'uploadExcel',
    icon: <ExcelIcon />,
    label: 'Upload as Excel'
  },
  {
    value:"downloadTemplate",
    icon: <ExcelIcon/>,
    label: 'Download Template'
  }
];
