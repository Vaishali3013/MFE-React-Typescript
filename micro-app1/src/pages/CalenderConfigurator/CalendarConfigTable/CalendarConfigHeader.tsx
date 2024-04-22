import { Row, Col, Button, Select } from 'antd';
import './index.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAssetDetailsById,
    getMonthsList,
    getTimeZoneList,
    getWeekDaysList,
} from 'redux/actions/CalendarConfiguratorActions';
import { dateFormatName } from 'types/enums';

const CalendarConfigHeader: React.FC<any> = ({
    selectedAsset,
    setDropdownClicked,
    setPayload,
}) => {
    const { Option } = Select;
    const dispatch = useDispatch();
    const list = useSelector(
        (state: any) => state?.calendarConfigurator?.timeZonesList
    );

    const months = useSelector(
        (state: any) => state?.calendarConfigurator?.monthsList
    );

    const weekdays = useSelector(
        (state: any) => state?.calendarConfigurator?.weekDaysList
    );
    const assetDetails = useSelector(
        (state: any) => state?.calendarConfigurator?.assetDetails
    );

    useEffect(() => {
        dispatch(getTimeZoneList());
        dispatch(getMonthsList());
        dispatch(getWeekDaysList());
    }, []);

    useEffect(() => {
        dispatch(getAssetDetailsById(selectedAsset?.key));
    }, [selectedAsset]);
    function convertListToSelectOptions(
        list: any,
        valueField: string,
        labelField: string
    ): any {
        return list.map((item: any) => ({
            value: item[valueField],
            label: item[labelField],
        }));
    }
    const selectOptions = convertListToSelectOptions(
        list,
        'id',
        dateFormatName.timezone
    );
    const monthsList = convertListToSelectOptions(
        months,
        'id',
        dateFormatName.monthName
    );
    const daysList = convertListToSelectOptions(
        weekdays,
        'id',
        dateFormatName.weekDay
    );
    const [timeZoneId, setTimeZoneId] = useState<any>();
    const [yearStart, setYearStart] = useState<any>();
    const [weekStart, setWeekStart] = useState<any>();
    const [selectedTimeZone, setSelectedTimeZone] = useState<any>();
    const [selectedYearStart, setSelectedYearStart] = useState<any>();
    const [selectedWeekStart, setSelectedWeekStart] = useState<any>();

    useEffect(() => {
        if (assetDetails) {
            setTimeZoneId(
                assetDetails?.timeZoneId !== 0
                    ? assetDetails?.timeZoneId
                    : undefined
            );
            setYearStart(
                assetDetails?.yearStartId !== 0
                    ? assetDetails?.yearStartId
                    : undefined
            );
            setWeekStart(
                assetDetails?.weekStartId !== 0
                    ? assetDetails?.weekStartId
                    : undefined
            );
            setSelectedWorkWeekIds(assetDetails?.workWeekIds);
        }
    }, [assetDetails]);
    function setOptionByValue(
        value: any,
        options: any,
        setStateFunction: Function
    ): void {
        const selectedOption = options.find(
            (option: any) => option.value === value
        );
        if (selectedOption) {
            setStateFunction(selectedOption.label);
        } else {
            setStateFunction(undefined);
        }
    }
    useEffect(() => {
        setOptionByValue(timeZoneId, selectOptions, setSelectedTimeZone);
    }, [timeZoneId, selectOptions]);
    useEffect(() => {
        setOptionByValue(yearStart, monthsList, setSelectedYearStart);
    }, [yearStart, monthsList]);
    useEffect(() => {
        setOptionByValue(weekStart, daysList, setSelectedWeekStart);
    }, [weekStart, weekdays]);

    const [selectedWorkWeekIds, setSelectedWorkWeekIds] = useState<number[]>(
        []
    );

    const handleDayButtonClick = (dayId: number): void => {
        let updatedWorkWeekIds: any;

        if (selectedWorkWeekIds.includes(dayId)) {
            updatedWorkWeekIds = selectedWorkWeekIds.filter(
                (id) => id !== dayId
            );
            setSelectedWorkWeekIds(updatedWorkWeekIds);
        } else {
            updatedWorkWeekIds = [...selectedWorkWeekIds, dayId];
            setSelectedWorkWeekIds(updatedWorkWeekIds);
        }

        setPayload((prevPayload: any) => ({
            ...prevPayload,
            workWeekIds: updatedWorkWeekIds,
        }));
    };

    const handleDailyButtonClick = (): void => {
        if (selectedWorkWeekIds?.length === 7) {
            setSelectedWorkWeekIds([]);

            setPayload((prevPayload: any) => ({
                ...prevPayload,
                workWeekIds: [],
            }));
        } else {
            const allDayIds = weekdays.map((day: any) => day.id);
            setSelectedWorkWeekIds(allDayIds);
            setPayload((prevPayload: any) => ({
                ...prevPayload,
                workWeekIds: allDayIds,
            }));
        }
    };
    const handleSelectChange = (field: any, value: any): void => {
        setPayload((prevPayload: any) => ({
            ...prevPayload,
            [field]: value,
        }));
        setDropdownClicked(true);
    };
    useEffect(() => {
        if (assetDetails) {
            setPayload((prevPayload: any) => ({
                ...prevPayload,
                assetIds: [selectedAsset.key],
                timeZoneId: assetDetails?.timeZoneId,
                yearStartId: assetDetails?.yearStartId,
                weekStartId: assetDetails?.weekStartId,
                workWeekIds: assetDetails.workWeekIds,
            }));
        }
    }, [assetDetails]);

    return (
        <Row gutter={10}>
            <Col span={16} className="DateComponentMain">
                <Row gutter={10} align={'middle'}>
                    <div className="headerRightSection">
                        <div className="headerRightSection__options">
                            <p className="headerRightSection__heading">
                                Timezone
                            </p>
                            <Select
                                className="headerRightSection__select"
                                placeholder="Select TimeZone"
                                value={selectedTimeZone}
                                onChange={(value) => {
                                    handleSelectChange('timeZoneId', value);
                                    setTimeZoneId(value);
                                }}
                            >
                                {selectOptions.map((option: any) => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="headerRightSection__options">
                            <p className="headerRightSection__heading">
                                Year Start
                            </p>
                            <Select
                                className="headerRightSection__select"
                                placeholder="Select Year Start"
                                value={selectedYearStart}
                                onChange={(value) => {
                                    handleSelectChange('yearStartId', value);
                                    setYearStart(value);
                                }}
                            >
                                {monthsList.map((option: any) => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <div className="headerRightSection__options">
                            <p className="headerRightSection__heading">
                                Week Start
                            </p>
                            <Select
                                className="headerRightSection__select"
                                placeholder="Select Week Start"
                                value={selectedWeekStart}
                                onChange={(value) => {
                                    handleSelectChange('weekStartId', value);
                                    setWeekStart(value);
                                }}
                            >
                                {daysList.map((option: any) => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </Row>
            </Col>
            <Col span={8} className="workWeek">
                <Row className="workWeekRow">
                    <Col span={24}>
                        <label className="workWeek__title">Work Week</label>
                    </Col>
                    <Col span={24}>
                        <Row
                            gutter={10}
                            align="middle"
                            className="workWeek__row"
                        >
                            <Col span={5}>
                                <Button
                                    className={
                                        selectedWorkWeekIds?.length === 7
                                            ? 'selectedDailyButton'
                                            : 'workWeek__button'
                                    }
                                    onClick={() => {
                                        handleDailyButtonClick();
                                        setDropdownClicked(true);
                                    }}
                                >
                                    Daily
                                </Button>
                            </Col>
                            <Col span={17} className="weekDaysBox">
                                <Row gutter={5}>
                                    {weekdays.map((day: any, index: number) => (
                                        <Col span={3.4} key={index}>
                                            <Button
                                                size="small"
                                                className={
                                                    selectedWorkWeekIds?.includes(
                                                        day?.id
                                                    )
                                                        ? 'selectedDayButtons'
                                                        : 'workWeek__buttons'
                                                }
                                                onClick={() => {
                                                    handleDayButtonClick(
                                                        day?.id
                                                    );
                                                    setDropdownClicked(true);
                                                }}
                                            >
                                                {day.weekDay.charAt(0)}
                                            </Button>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default CalendarConfigHeader;
