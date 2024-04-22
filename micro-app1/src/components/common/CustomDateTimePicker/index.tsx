import { DatePicker, type DatePickerProps, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { type RangePickerProps } from 'antd/es/date-picker';
import { dateFormat } from 'types/enums';
import { CalendarOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from 'utils/constants';

import 'dayjs/locale/en';

import { DateRangeFilter, ShiftTiming } from 'types/enums/kpiEnum';
import {
    addDaysToDate,
    checkTimeBeforeShiftC,
    checkTimeBeforeShiftEndTime,
    isDateToday,
} from 'utils/commonFunction';

const CustomDateTimePicker: React.FC<any> = ({
    setDateTimeFilter,
    dateTimeFilter,
    dateRange,
    setDateRange,
    onStateChange,
}) => {
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endTimeRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const dateRangeRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );

    const [shiftDate, setShiftDate] = useState<dayjs.Dayjs | null>(
        dayjs(dayjs(), dateFormat.formatWithoutTime)
    );
    useEffect(() => {
        onStateChange(dateRange);
    }, [dateRange]);
    const data = [
        {
            value: DateRangeFilter?.Yesterday,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Yesterday}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Today,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Today}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.This_Week,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.This_Week}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Last_Week,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Last_Week}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.MTD,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.MTD}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.YTD,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.YTD}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Shift_A,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Shift_A}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Shift_B,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Shift_B}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Shift_C,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Shift_C}
                    </div>
                </div>
            ),
        },
        {
            value: DateRangeFilter?.Custom,
            label: (
                <div className="rangePicker-label">
                    <CalendarOutlined />
                    <div className="rangePicker-label__text">
                        {DateRangeFilter?.Custom}
                    </div>
                </div>
            ),
        },
    ];

    const onOk = (
        value: DatePickerProps['value'] | RangePickerProps['value'] | any
    ): void => {
        setDateTimeFilter({
            startTime: dayjs(value[0], dateFormat),
            endTime: dayjs(value[1], dateFormat),
        });
    };
    const shiftDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setShiftDate(date);
        switch (dateRange) {
            case DateRangeFilter?.Shift_A:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${dateString} ${ShiftTiming.shiftAStartTime}`,
                        dateFormat
                    ),
                    endTime: isDateToday(dateString)
                        ? checkTimeBeforeShiftEndTime(15)
                            ? dayjs(new Date(), dateFormat)
                            : dayjs(
                                  `${dateString} ${ShiftTiming.shiftAEndTime}`,
                                  dateFormat
                              )
                        : dayjs(
                              `${dateString} ${ShiftTiming.shiftAEndTime}`,
                              dateFormat
                          ),
                });
                break;
            case DateRangeFilter?.Shift_B:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${dateString} ${ShiftTiming.shiftBStartTime}`,
                        dateFormat
                    ),
                    endTime: isDateToday(dateString)
                        ? checkTimeBeforeShiftEndTime(23)
                            ? dayjs(new Date(), dateFormat)
                            : dayjs(
                                  `${dateString} ${ShiftTiming.shiftBEndTime}`,
                                  dateFormat
                              )
                        : dayjs(
                              `${dateString} ${ShiftTiming.shiftBEndTime}`,
                              dateFormat
                          ),
                });
                break;
            case DateRangeFilter?.Shift_C:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${dateString} ${ShiftTiming.shiftCStartTime}`,
                        dateFormat
                    ),
                    endTime: isDateToday(dateString)
                        ? checkTimeBeforeShiftC()
                            ? dayjs(new Date(), dateFormat)
                            : dayjs(
                                  `${dateString} ${ShiftTiming.shiftCEndTime}`,
                                  dateFormat
                              )
                        : dayjs(
                              `${addDaysToDate(dateString, 1)} ${
                                  ShiftTiming.shiftCEndTime
                              }`,
                              dateFormat
                          ),
                });
                break;
            default:
                break;
        }
    };
    const [dateFilterFlag, SetdateFilterFlag] = useState(false);
    const handleDatePickerOpenChange = (status: boolean): void => {
        if (status) {
            setDateRange(DateRangeFilter?.Custom);
        }
    };

    const dropDownHandleChange = (values: any): void => {
        setDateRange(values);

        if (values.indexOf('Shift') !== -1) {
            SetdateFilterFlag(true);
            setShiftDate(dayjs(shiftDate?.format('YYYY/MM/DD')));
        } else {
            SetdateFilterFlag(false);
            setDateTimeFilter({
                startTime: dayjs(startDateRedux, dateFormat),
                endTime: dayjs(endTimeRedux, dateFormat),
            });
        }
        switch (values) {
            case DateRangeFilter?.Yesterday:
                setDateTimeFilter({
                    startTime: checkTimeBeforeShiftEndTime(7)
                        ? dayjs(
                              `${dayjs()
                                  .subtract(2, 'day')

                                  .format(dateFormat.formatWithoutTime)} ${
                                  ShiftTiming.shiftAStartTime
                              }`,
                              dateFormat
                          )
                        : dayjs(
                              `${dayjs()
                                  .subtract(1, 'day')

                                  .format(dateFormat.formatWithoutTime)} ${
                                  ShiftTiming.shiftAStartTime
                              }`,
                              dateFormat
                          ),
                    endTime: checkTimeBeforeShiftEndTime(7)
                        ? dayjs(
                              `${dayjs()
                                  .subtract(1, 'day')

                                  .format(dateFormat.formatWithoutTime)} ${
                                  ShiftTiming.yesterdayEndTime
                              }`,
                              dateFormat
                          )
                        : dayjs(
                              `${dayjs().format(
                                  dateFormat.formatWithoutTime
                              )} ${ShiftTiming.yesterdayEndTime}`,
                              dateFormat
                          ),
                });
                break;
            case DateRangeFilter?.Today:
                setDateTimeFilter({
                    startTime: checkTimeBeforeShiftEndTime(7)
                        ? dayjs(
                              dayjs()
                                  .subtract(1, 'days')
                                  .format(
                                      `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                                  )
                          )
                        : dayjs(
                              dayjs().format(
                                  `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                              )
                          ),
                    endTime: dayjs(new Date(), dateFormat),
                });
                break;
            case DateRangeFilter?.This_Week:
                setDateTimeFilter({
                    startTime:
                        dayjs().day() === 1
                            ? checkTimeBeforeShiftEndTime(7)
                                ? dayjs(
                                      `${dayjs()
                                          .subtract(7, 'days')
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftAStartTime}`,
                                      dateFormat
                                  )
                                : dayjs(
                                      `${dayjs()
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftAStartTime}`,
                                      dateFormat
                                  )
                            : dayjs(
                                  `${dayjs()
                                      .startOf('week')
                                      .day(1)
                                      .format(dateFormat.formatWithoutTime)} ${
                                      ShiftTiming.shiftAStartTime
                                  }`,
                                  dateFormat
                              ),
                    endTime:
                        dayjs().day() === 1
                            ? checkTimeBeforeShiftEndTime(7)
                                ? dayjs(
                                      `${dayjs()
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftCEndTime}`,
                                      dateFormat
                                  )
                                : dayjs(new Date(), dateFormat)
                            : dayjs(new Date(), dateFormat),
                });

                break;
            case DateRangeFilter?.Last_Week:
                setDateTimeFilter({
                    startTime:
                        dayjs().day() === 1
                            ? checkTimeBeforeShiftEndTime(7)
                                ? dayjs(
                                      `${dayjs()
                                          .subtract(14, 'days')
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftAStartTime}`,
                                      dateFormat
                                  )
                                : dayjs(
                                      `${dayjs()
                                          .subtract(7, 'days')
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftAStartTime}`,
                                      dateFormat
                                  )
                            : dayjs(
                                  `${dayjs()
                                      .subtract(7, 'days')
                                      .startOf('week')
                                      .day(1)
                                      .format(dateFormat.formatWithoutTime)} ${
                                      ShiftTiming.shiftAStartTime
                                  }`,
                                  dateFormat
                              ),
                    endTime:
                        dayjs().day() === 1
                            ? checkTimeBeforeShiftEndTime(7)
                                ? dayjs(
                                      `${dayjs()
                                          .subtract(7, 'days')
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftCEndTime}`,
                                      dateFormat
                                  )
                                : dayjs(
                                      `${dayjs()
                                          .startOf('week')
                                          .day(1)
                                          .format(
                                              dateFormat.formatWithoutTime
                                          )} ${ShiftTiming.shiftCEndTime}`,
                                      dateFormat
                                  )
                            : dayjs(
                                  `${dayjs()
                                      .startOf('week')
                                      .day(1)
                                      .format(dateFormat.formatWithoutTime)} ${
                                      ShiftTiming.shiftCEndTime
                                  }`,
                                  dateFormat
                              ),
                });

                break;
            case DateRangeFilter?.MTD:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${dayjs()
                            .startOf('month')
                            .format(dateFormat.formatWithoutTime)} 07:00:00`,
                        dateFormat
                    ),
                    endTime: dayjs(new Date(), dateFormat),
                });

                break;
            case DateRangeFilter?.YTD:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${dayjs()
                            .startOf('year')
                            .format(dateFormat.formatWithoutTime)} 07:00:00`,
                        dateFormat
                    ),
                    endTime: dayjs(new Date(), dateFormat),
                });
                break;
            case DateRangeFilter?.Shift_A:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${shiftDate?.format(dateFormat.formatWithoutTime)} ${
                            ShiftTiming.shiftAStartTime
                        }`,
                        dateFormat.format
                    ),
                    endTime: isDateToday(shiftDate)
                        ? checkTimeBeforeShiftEndTime(15)
                            ? dayjs(dayjs().format(dateFormat.format))
                            : dayjs(
                                  `${shiftDate?.format(
                                      dateFormat.formatWithoutTime
                                  )} ${ShiftTiming.shiftAEndTime}`
                              )
                        : dayjs(
                              `${shiftDate?.format(
                                  dateFormat.formatWithoutTime
                              )} ${ShiftTiming.shiftAEndTime}`
                          ),
                });

                break;
            case DateRangeFilter?.Shift_B:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${shiftDate?.format(dateFormat.formatWithoutTime)} ${
                            ShiftTiming.shiftBStartTime
                        }`,
                        dateFormat.format
                    ),
                    endTime: isDateToday(shiftDate)
                        ? checkTimeBeforeShiftEndTime(23)
                            ? dayjs(dayjs().format(dateFormat.format))
                            : dayjs(
                                  `${shiftDate?.format(
                                      dateFormat.formatWithoutTime
                                  )} ${ShiftTiming.shiftBEndTime}`
                              )
                        : dayjs(
                              `${shiftDate?.format(
                                  dateFormat.formatWithoutTime
                              )} ${ShiftTiming.shiftBEndTime}`
                          ),
                });
                break;
            case DateRangeFilter?.Shift_C:
                setDateTimeFilter({
                    startTime: dayjs(
                        `${shiftDate?.format(dateFormat.formatWithoutTime)} ${
                            ShiftTiming.shiftCStartTime
                        }`,
                        dateFormat.format
                    ),
                    endTime: isDateToday(shiftDate)
                        ? checkTimeBeforeShiftC()
                            ? dayjs(dayjs().format(dateFormat.format))
                            : dayjs(
                                  `${shiftDate?.format(
                                      dateFormat.formatWithoutTime
                                  )} ${ShiftTiming.shiftCEndTime}`
                              )
                        : dayjs(
                              `${addDaysToDate(
                                  shiftDate?.format(
                                      dateFormat.formatWithoutTime
                                  ),
                                  1
                              )} ${ShiftTiming.shiftCEndTime}`,
                              dateFormat
                          ),
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        setDateTimeFilter({
            startTime: dayjs(startDateRedux, dateFormat),
            endTime: dayjs(endTimeRedux, dateFormat),
        });
    }, [startDateRedux, endTimeRedux, dateRangeRedux]);
    useEffect(() => {
        if (dateRange?.includes('Shift')) {
            SetdateFilterFlag(true);
        } else {
            SetdateFilterFlag(false);
        }
    }, [dateRange]);

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days after today
        return current && current > dayjs().endOf('day');
    };

    return (
        <>
            <Select
                onChange={dropDownHandleChange}
                options={data}
                value={dateRange}
                popupClassName="dateRange-list"
            />
            {dateFilterFlag ? (
                <DatePicker
                    format={dateFormat?.formatWithoutTime}
                    value={shiftDate}
                    onChange={shiftDateChange}
                    disabledDate={disabledDate}
                />
            ) : (
                <DatePicker.RangePicker
                    showTime={{ format: DATE_FORMAT }}
                    format={dateFormat?.format}
                    value={[dateTimeFilter?.startTime, dateTimeFilter?.endTime]}
                    onOk={onOk}
                    disabledDate={disabledDate}
                    onOpenChange={handleDatePickerOpenChange}
                />
            )}
        </>
    );
};
export default CustomDateTimePicker;
