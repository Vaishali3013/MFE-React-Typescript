import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg.svg';
import { ReactComponent as ShiftConfigIcon } from 'assets/icons/shiftConfigIcon.svg';

export const allDaysList: any = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const daysWeekYear: any = [
    {
        label: 'Timezone',
        defaultValue: 'Select Timezone',
    },
    {
        label: 'Year Start',
        defaultValue: 'January',
        options: [
            { value: 'january', label: 'January' },
            { value: 'february', label: 'February' },
            {
                value: 'march',
                label: 'March',
            },
            {
                value: 'april',
                label: 'April',
            },
            { value: 'may', label: 'May' },
            { value: 'june', label: 'June' },
            { value: 'july', label: 'July' },
            { value: 'august', label: 'August' },
            { value: 'september', label: 'September' },
            { value: 'october', label: 'October' },
            { value: 'november', label: 'November' },
            { value: 'december', label: 'December' },
        ],
    },
    {
        label: 'Week Start',
        defaultValue: 'Sunday',
        options: [
            { value: 'monday', label: 'Monday' },
            { value: 'tuesday', label: 'Tuesday' },
            { value: 'wednesday', label: 'Wednesday' },
            { value: 'thursday', label: 'Thursday' },
            { value: 'friday', label: 'Friday' },
            { value: 'saturday', label: 'Saturday' },
            { value: 'sunday', label: 'Sunday' },
        ],
    },
];

export const configSidebarList: any = [
    {
        icon: <CalendarIcon />,
        label: 'Day Configuration',
    },
    {
        icon: <ShiftConfigIcon />,
        label: 'Shift Configuration',
    },

    // NOTE- will be used later so commenting this and not removing.
    // {
    //     icon: <HolidayIcon />,
    //     label: 'Holidays',
    // },
    // {
    //     icon: <BreakTimeIcon />,
    //     label: 'Break Time',
    // },
];
