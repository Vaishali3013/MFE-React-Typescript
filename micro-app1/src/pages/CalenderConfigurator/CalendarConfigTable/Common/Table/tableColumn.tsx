import {
    Col,
    DatePicker,
    Divider,
    Input,
    Row,
    Select,
    Switch,
    TimePicker,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReactComponent as AddNewIcon } from 'assets/icons/addNewIcon.svg';
import { ReactComponent as AddNewIconDisable } from 'assets/icons/addNewFadeIcon.svg';
import utc from 'dayjs/plugin/utc';
import { CalendarConfig, dateFormat, getTimeFromEpoch } from 'types/enums';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

import {
    type DayConfigTypes,
    type ShiftConfigTypes,
} from 'types/interfaces/PropsInterfaces/calendarConfig';
import './index.scss';
import {
    findOverlappingNames,
    findTimeOverlapIndices,
    getTimeFromEpochValue,
} from 'utils/commonFunction';

dayjs.extend(utc);

const dayColumnData: ColumnsType<DayConfigTypes> = [
    {
        title: 'Day Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
    },
    {
        title: 'Valid From',
        dataIndex: 'validFrom',
        key: 'validFrom',
    },
    {
        title: 'Valid Till',
        dataIndex: 'validTill',
        key: 'validTill',
    },
];

const convertHoursAndMins = (epochValue: number): any => {
    const utcTimeString = getTimeFromEpochValue(epochValue, dateFormat.format);
    const newTime = dayjs(utcTimeString);
    return dayjs(newTime);
};

const convertEpochToDate = (epochValue: number): any => {
    return dayjs(epochValue);
};

export const shiftColumn = (
    shiftDetails: any,
    addDayRowsHandler: any,
    form: any,
    updateShiftDetails: any,
    dayConfigData: any,
    newAPiBodyForShift: any,
    disableAddNew :any
): any => {
    const isAddNewDisable = disableAddNew()
    const alreadySelectedDayName: any = [];
    const nonExpiredDays = dayConfigData.filter((item: any) => !item.expired);
    newAPiBodyForShift.map((item: any) => {
        alreadySelectedDayName.push(item?.name);
    });
    const unusedDayList = nonExpiredDays.filter(
        (item: any) => !alreadySelectedDayName.includes(item.name)
    );
    const formattedArray = unusedDayList.map((item: any) => ({
        value: item?.dayConfigId,
        label: item?.name,
    }));
    const shiftColumnValues: ColumnsType<ShiftConfigTypes> = [
        {
            title: 'Day',
            dataIndex: 'dayName',
            key: 'dayId',
            render: (dayName: string, record, index) => {
                const obj: any = {
                    children: dayName,
                    props: {},
                };
                if (
                    index === 0 ||
                    (index > 0 && dayName !== shiftDetails[index - 1]?.dayName)
                ) {
                    const count = shiftDetails.filter(
                        (item: any) => item?.dayName === dayName
                    ).length;
                    obj.props.rowSpan = count;
                } else {
                    obj.props.rowSpan = 0;
                }
                return (
                    <Select
                        labelInValue
                        bordered={false}
                        defaultValue={dayName || ''}
                        style={{ width: '80%' }}
                        onChange={(selectedDayData: any) => {
                            updateShiftDetails(
                                selectedDayData?.key,
                                'selectDay',
                                'selectDay',
                                index
                            );
                        }}
                        placeholder="Select day"
                        options={formattedArray}
                        disabled={shiftDetails[index]?.expired}
                    />
                );
            },
        },
        {
            title: 'Shift Name',
            dataIndex: 'shiftResponseList',
            key: 'name',
            render: (shiftResponseList: any, selectedDayData: any) => {
                return shiftResponseList?.map((item: any, index: number) => (
                    <>
                        <Row align="middle">
                            <Col span={6}>
                                <div
                                    className={
                                        selectedDayData?.expired
                                            ? 'disableShifts'
                                            : item.active
                                            ? 'activeShifts'
                                            : 'disableShifts'
                                    }
                                ></div>
                            </Col>
                            <Col span={18}>
                                <Input
                                    style={{
                                        color:
                                            findOverlappingNames(
                                                shiftResponseList
                                            ).includes(index) && 'red',
                                    }}
                                    key={item.name}
                                    type="text"
                                    defaultValue={item.name || ''}
                                    placeholder={`Enter Name `}
                                    bordered={false}
                                    disabled={selectedDayData?.expired}
                                    onChange={(e) => {
                                        updateShiftDetails(
                                            selectedDayData?.dayId,
                                            e,
                                            'name',
                                            index
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        {shiftResponseList.length - 1 !== index && <Divider />}
                    </>
                ));
            },
        },
        {
            title: 'Start Time',
            dataIndex: 'shiftResponseList',
            key: 'startTime',
            render: (shiftResponseList, selectedDayData: any) => {
                return shiftResponseList?.map((item: any, index: number) => (
                    <>
                        <TimePicker
                            className={
                                findTimeOverlapIndices(
                                    shiftResponseList
                                ).includes(index) && 'calendar-error'
                            }
                            onChange={(e) => {
                                updateShiftDetails(
                                    selectedDayData.dayId,
                                    e,
                                    'startTime',
                                    index
                                );
                            }}
                            inputReadOnly={true}
                            value={
                                item?.startTime || item?.startTime === 0
                                    ? convertHoursAndMins(item?.startTime)
                                    : ''
                            }
                            suffixIcon={null}
                            placeholder={'Select Time'}
                            bordered={false}
                            disabled={selectedDayData?.expired}
                            format="HH:mm:ss"
                        />
                        {shiftResponseList.length - 1 !== index && <Divider />}
                    </>
                ));
            },
        },
        {
            title: 'End Time',
            dataIndex: 'shiftResponseList',
            key: 'endTime',
            render: (shiftResponseList, selectedDayData: any) => {
                return shiftResponseList?.map((item: any, index: number) => (
                    <>
                        <TimePicker
                            className={
                                findTimeOverlapIndices(
                                    shiftResponseList
                                ).includes(index) && 'calendar-error'
                            }
                            defaultValue={
                                item?.endTime || item?.endTime === 0
                                    ? convertHoursAndMins(item?.endTime)
                                    : ''
                            }
                            suffixIcon={null}
                            placeholder={'Select Time'}
                            disabled={selectedDayData?.expired}
                            bordered={false}
                            format="HH:mm:ss"
                            inputReadOnly={true}
                            onChange={(e) => {
                                updateShiftDetails(
                                    selectedDayData.dayId,
                                    e,
                                    'endTime',
                                    index
                                );
                            }}
                        />
                        {shiftResponseList.length - 1 !== index && <Divider />}
                    </>
                ));
            },
        },
        {
            title: 'Duration',
            dataIndex: 'shiftResponseList',
            key: 'duration',
            render: (shiftResponseList, selectedDayData: any) => {
                return shiftResponseList?.map((item: any, index: number) => (
                    <>
                        {item?.duration ? (
                            <Input
                                type="text"
                                defaultValue={
                                    `${Math.round(item?.duration/getTimeFromEpoch?.hours)} Hrs` ||
                                    " "
                                }
                                placeholder={'Select Duration'}
                                bordered={false}
                                disabled={
                                    !item.duration || selectedDayData?.expired
                                }
                            />
                        ):
                        <Input style={{visibility:"hidden"}}/>
                    }
                        {shiftResponseList.length - 1 !== index && <Divider />}
                    </>
                ));
            },
        },
        {
            title: 'Action',
            dataIndex: 'shiftResponseList',
            key: 'is_active',
            render: (shiftResponseList, selectedDayData: any) => {
                return shiftResponseList?.map((item: any, index: number) => (
                    <>
                        <Row align="middle">
                            <Col
                                span={8}
                                className="actionBoxAddButton"
                                onClick={() =>
                                    (!selectedDayData?.expired && !isAddNewDisable) &&
                                    addDayRowsHandler(selectedDayData)
                                }
                            >
                                {(!selectedDayData?.expired && !isAddNewDisable)? (
                                    <AddNewIcon />
                                ) : (
                                    <AddNewIconDisable />
                                )}
                            </Col>
                            <Col span={8}>
                                <Switch
                                    disabled={selectedDayData?.expired}
                                    defaultChecked={
                                        selectedDayData?.expired
                                            ? false
                                            : item.active
                                    }
                                    onChange={(e) => {
                                        updateShiftDetails(
                                            selectedDayData.dayId,
                                            e,
                                            'active',
                                            index
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        {shiftResponseList.length - 1 !== index && <Divider />}
                    </>
                ));
            },
        },
    ];
    return shiftColumnValues;
};

const currentDate = new Date();
const yesterday = new Date(currentDate);
yesterday.setDate(yesterday.getDate() - 1);

const disabledDatesCalculator: any = (timeStamp: any) => {
    return (current: any) => {
        return current && current < dayjs(timeStamp).endOf('day');
    };
};
export const dayColumns = (
    updateAddDayApiDataHandler: any,
    isValidObject: any,
    dayTableData: any
): any => {
    const updatedColumns: any[] = [];
    dayColumnData.map((column) => {
        if (column.key === CalendarConfig.dayName) {
            updatedColumns.push({
                ...column,
                render: (title: string, id: any, index: number) => (
                    <Input
                        type="text"
                        style={{
                            color:
                                isValidObject.sameName.includes(index) && 'red',
                        }}
                        defaultValue={title || ''}
                        placeholder={'Enter Day'}
                        bordered={false}
                        onChange={(event) =>
                            updateAddDayApiDataHandler(event, id, 'name', index)
                        }
                        disabled={dayTableData[index].expired}
                    />
                ),
            });
        } else if (
            column.key === CalendarConfig.startTime ||
            column.key === CalendarConfig.endTime
        ) {
            updatedColumns.push({
                ...column,
                render: (title: any, id: any, index: number) => (
                    <TimePicker
                        suffixIcon={null}
                        defaultValue={
                            title || title === 0
                                ? convertHoursAndMins(title)
                                : ''
                        }
                        format="HH:mm:ss"
                        placeholder={'Select Time'}
                        bordered={false}
                        inputReadOnly={true}
                        disabled={dayTableData[index].expired}
                        onChange={(event) =>
                            updateAddDayApiDataHandler(
                                event,
                                id,
                                column.key,
                                index
                            )
                        }
                    />
                ),
            });
        } else {
            updatedColumns.push({
                ...column,
                render: (title: number, id: any, index: number) => {
                    return (
                        <DatePicker
                            className={
                                isValidObject.overlapKeys.includes(index) &&
                                'calendar-error'
                            }
                            disabledDate={
                                column.key === 'validTill'
                                    ? disabledDatesCalculator(id.validFrom)
                                    : disabledDatesCalculator(yesterday)
                            }
                            defaultValue={
                                title ? convertEpochToDate(title) : ''
                            }
                            format="YYYY/MM/DD"
                            placeholder={'Select Date'}
                            suffixIcon={null}
                            disabled={
                                (column.key === 'validTill' &&
                                    id.validFrom === '') ||
                                dayTableData[index].expired
                            }
                            bordered={false}
                            inputReadOnly={true}
                            onChange={(event) =>
                                updateAddDayApiDataHandler(
                                    event,
                                    id,
                                    column.key,
                                    index
                                )
                            }
                        />
                    );
                },
            });
        }
    });
    return updatedColumns;
};
