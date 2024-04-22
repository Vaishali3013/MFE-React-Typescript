export enum chartRangeType {
    good = 'good',
    bad = 'bad',
    worst = 'worst',
}
export enum ShiftTiming {
    shiftAStartTime = '07:00:00',
    shiftAEndTime = '14:59:59',
    shiftBStartTime = '15:00:00',
    shiftBEndTime = '22:59:59',
    shiftCStartTime = '23:00:00',
    shiftCEndTime = '06:59:59',
    yesterdayEndTime = '06:59:59',
}

export enum SIUnits {
    Tons = 'Tons',
}
export enum PoolingTime {
    seconds = 20000,
}
export enum DateRangeFilter {
    Yesterday = 'Yesterday',
    Today = 'Today',
    Last_Week = 'Last Week',
    This_Week = 'This Week',
    MTD = 'MTD',
    YTD = 'YTD',
    Shift_A = 'Shift A',
    Shift_B = 'Shift B',
    Shift_C = 'Shift C',
    Custom = 'Custom',
}
