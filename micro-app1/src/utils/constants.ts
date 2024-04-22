export const TIMER = 10 * 60 * 1000;

export const PAGE = 1;

export const PAGE_SIZE = 50;

export const DATA_TABLE_PAGE_SIZE = 10;

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_ONLY_FORMAT = 'DD-MM-YYYY';
export const DATE_FORMAT_MANUAL_ENTRY = 'DD-MM-YYYY HH:mm:ss';
export const BoilerHeading = '30 TPH Boiler - 2 Dashboard';

export const tooltipDateTimeFormat = '%Y-%m-%d %H:%M';

export const maxRowSelectionCount = 15;

export const MULTI_AXIS_CHART_COLORS = [
    '#2E4374', // red
    '#0000FF', // blue
    '#FF6969', // green
    '#B8B800', // yellow
    '#D83F31', // orange
    '#800080', // purple
    '#EE96A4', // pink
    '#A52A2A', // brown
    '#35A29F', // gray
    '#F39F5A', // black
    '#5BCBFC', // white
    '#BC7AF9', // teal
    '#000080', // navy
    '#FF00FF', // magenta
    '#00FFFF', // cyan
];

// Note: keys are named with space because this is the only parameter which is available when a checkbox is clicked,
// hence names of checkbox is being used
export const criticalAreaColorMapper: any = {
    'Average Steam Flow': MULTI_AXIS_CHART_COLORS[0],
    'Excess Oxygen': MULTI_AXIS_CHART_COLORS[1],
    'Average Steam Pressure': MULTI_AXIS_CHART_COLORS[2],
    'Average Steam Temperature': MULTI_AXIS_CHART_COLORS[3],
    'Economizer - Flue Gas Inlet Temperature': MULTI_AXIS_CHART_COLORS[4],
    'Economizer - Flue Gas Exit Temperature': MULTI_AXIS_CHART_COLORS[5],
    'Economizer - Water Inlet Temperature': MULTI_AXIS_CHART_COLORS[6],
    'Economizer - Water Outlet Temperature': MULTI_AXIS_CHART_COLORS[7],
    'APH - Air Inlet Temperature': MULTI_AXIS_CHART_COLORS[8],
    'APH - Air Outlet Temperature': MULTI_AXIS_CHART_COLORS[9],
    'APH - Flue Gas Inlet Temperature': MULTI_AXIS_CHART_COLORS[10],
    'APH - Flue Gas Exit Temperature': MULTI_AXIS_CHART_COLORS[11],
};
export const maxInputLength = 250;
export const maxDeviceNameLength = 60;
export const maxTagNameLength = 100;
export const nocilDashboardUrl = 'nocil-dashboard';
export const chartDateFormat = '%Y-%m-%d %H:%M:%S';
export const oneMinToMilliSecond = 60 * 1000;
export const millisecondsInDay = 24 * 60 * 60 * 1000;
export const passwordMaxLength = 128;
export const resendOtpTimer = 60;
export const maxInputNumberLength = 10;

