import { Button, Col, Row, Table, Divider, notification, Spin } from 'antd';
import { useEffect, useState } from 'react';
import CustomButton from 'components/common/CustomButton';
import './index.scss';
import { CalendarConfig, FormEnums } from 'types/enums';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { cancelHandle } from 'utils/modalFunction';
import { ReactComponent as WarningIcon } from 'assets/icons/warningIcon.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { useDispatch, useSelector } from 'react-redux';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import EmptyTableComponent from '../EmptyTableComponent';
import {
    getShiftConfigByAssetId,
    updateShiftConfig,
    getDayConfigByAssetId,
    updateDayConfig,
    getAssetDetailsById,
    getUpdateShiftDataApi,
    getUpdateDayDataApi,
    setAssetsDetails,
    setShiftConfigDetails,
    setDayConfigDetails,
    resetAssetSuccess,
    configChangeTrue,
    configChangeFalse,
} from 'redux/actions/CalendarConfiguratorActions';
import { dayColumns, shiftColumn } from './tableColumn';
import dayjs from 'dayjs';

import {
    calculateTimeDifferenceInHrs,
    calculateTotalTimeDifference,
    findOverlappingNames,
    findTimeOverlapIndices,
    getTimeValueInHoursMinsSec,
    validateShiftData,
} from 'utils/commonFunction';
import { ENABLE_SWITCH_BUTTON } from 'redux/types/calendarConfiguratorTypes';

const addNewRowForDay = {
    name: '',
    startTime: '',
    endTime: '',
    validFrom: '',
    validTill: '',
};

const newRowForShiftDay = {
    name: '',
    startTime: '',
    endTime: '',
    duration: '',
    active: false,
};

const TableComponant = ({
    configType,
    form,
    selectedAsset,
    dropdownClicked,
    assetPayload,
    selectedAssetChildrenKey,
    setDropdownClicked,
    resetData,
}: any): any => {
    const [displayFooter, setDisplayFooter] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [successfulModalOpen, setSuccessfulModalOpen] = useState(false);
    const [addedRows, setAddedRows] = useState<any>([]);
    const [numberOfHoursInDay, setNumberOfHoursInDay] = useState(0);
    const [numberOfHoursInShift, setNumberOfHoursInShift] = useState(0);
    const [isTimeZoneDetailsChange, setIsTimeZoneDetailsChange] =
        useState(false);
    const shiftDetails = useSelector(
        (state: any) => state.calendarConfigurator.shiftConfigDataByAssetId
    );
    const dispatch = useDispatch();
    const [selectedDayRowForShift, setSelectedDayRowForShift] = useState<any>(
        []
    );
    const [isValidObject, setIsValidObject] = useState({
        sameName: [],
        overlapKeys: [],
    });
    const dayConfigData = useSelector(
        (state: any) => state?.calendarConfigurator?.dayConfigDataByAssetId
    );
    const dayConfigDataAdded = useSelector(
        (state: any) => state?.calendarConfigurator?.dayConfigDataAdded
    );
    const shiftConfigDataAdded = useSelector(
        (state: any) => state?.calendarConfigurator?.shiftConfigDataAdded
    );

    const loadingShift = useSelector(
        (state: any) => state?.calendarConfigurator?.loadingShift
    );

    const loadingDay = useSelector(
        (state: any) => state?.calendarConfigurator?.loadingDay
    );

    const updateShiftDataApi = useSelector(
        (state: any) => state?.calendarConfigurator?.updateShiftDataForApi
    );
    const assetDetailsAdded = useSelector(
        (state: any) => state?.calendarConfigurator?.assetDetailsAdded
    );
    const isSwitchButtonChecked = useSelector(
        (state: any) => state?.calendarConfigurator?.isSwitchChecked
    );
    const [updatedDayApiData, setUpdatedDayApiData] = useState<any>([]);
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const handleSwitchChecked = (checked: boolean): void => {
        setIsSwitchChecked(checked);
        dispatch({ type: ENABLE_SWITCH_BUTTON });
    };
    const shiftDataApi: any = [];


    useEffect(() => {
        setSuccessfulModalOpen(false);
        setUpdatedDayApiData(dayConfigData);
    }, [dayConfigData]);
    useEffect(() => {
        if (assetDetailsAdded) {
            postShiftDetailsHandler();
            setSuccessfulModalOpen(assetDetailsAdded);
            setIsSaveModalOpen(false);
        }
    }, [assetDetailsAdded]);

    const addNewDataForShift = {
        dayName: '',
        expired: false,
        dayId: null,
        shiftResponseList: [
            {
                name: '',
                startTime: '',
                endTime: '',
                duration: '',
                active: false,
            },
        ],
    };
    useEffect(() => {
        if (dropdownClicked) {
            setDisplayFooter(true);
            setIsTimeZoneDetailsChange(true);
        }
    }, [dropdownClicked]);

    useEffect(() => {
        if (displayFooter) {
            dispatch(configChangeTrue());
        }
    }, [displayFooter]);

    const addNewHandler = (): void => {
        const selectedData =
            configType === CalendarConfig.dayConfiguration
                ? { ...addNewRowForDay }
                : { ...addNewDataForShift };
        setAddedRows([...addedRows, selectedData]);
        if (configType === CalendarConfig.dayConfiguration) {
            dispatch(getUpdateDayDataApi(updatedDayApiData));
            dispatch(updateDayConfig([...dayConfigData, selectedData]));
        }
        if (configType === CalendarConfig.shiftConfiguration) {
            dispatch(
                getUpdateShiftDataApi([...updateShiftDataApi, shiftDataApi])
            );
            dispatch(updateShiftConfig([...shiftDetails, selectedData]));
        }
        setDisplayFooter(true);
        setIsTimeZoneDetailsChange(false);
    };
    const onOkHandler = (): void => {
        setIsValidObject({
            sameName: [],
            overlapKeys: [],
        });
        if (cancelButtonClicked) {
            setCancelButtonClicked(false);
        }
        getTableData(selectedAsset?.key);
        resetData();
        setAddedRows([]);
        setDisplayFooter(false);
        setIsCancelModalOpen(false);
        setDropdownClicked(false);
    };
    const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
    useEffect(() => {
        if (!isCancelModalOpen && !cancelButtonClicked) {
            dispatch(getAssetDetailsById(selectedAsset?.key));
        }
    }, [isCancelModalOpen]);


    const addDayRowsHandler = (selectedRowData: any): any => {
        setSelectedDayRowForShift([...selectedDayRowForShift, selectedRowData]);
        addRowForDayHandler(selectedRowData);
    };


    const disableAddNew = (): any => {
        if (
            configType === CalendarConfig.dayConfiguration &&
            dayConfigData.length > 0
        ) {
            for (let i = 0; i < dayConfigData.length; i++) {
                if (
                    !dayConfigData[i]?.name ||
                    (dayConfigData[i]?.startTime === undefined) ||
                    (isNaN(dayConfigData[i]?.startTime)) ||
                    (dayConfigData[i]?.startTime === null) ||
                    !dayConfigData[i]?.endTime||
                    // (dayConfigData[i]?.endTime === undefined) ||
                    // (isNaN(dayConfigData[i]?.endTime)) ||
                    // (dayConfigData[i]?.endTime === null) ||
                    !dayConfigData[i]?.validFrom
                ) {
                    return true;
                }
            }
            return false;
        } else if (
            configType === CalendarConfig.shiftConfiguration &&
            newAPiBodyForShift.length > 0
        ) {
            for (let i = 0; i < newAPiBodyForShift.length; i++) {
                const dayConfig = newAPiBodyForShift[i];

                if (!dayConfig.dayConfigId || !dayConfig.shiftDetailList) {
                    return true;
                }

                for (let j = 0; j < dayConfig.shiftDetailList.length; j++) {
                    const shiftDetail = dayConfig.shiftDetailList[j];

                    if (
                        !shiftDetail.name ||
                        (shiftDetail.startTime === undefined) ||
                        (shiftDetail.startTime === null) ||
                        (isNaN(shiftDetail.startTime)) ||
                        !shiftDetail.endTime ||
                        typeof shiftDetail.active === 'undefined'
                    ) {
                        return true;
                    }
                }
            }

            return false;
        }
    };


    const postShiftDetailsHandler = (): any => {
        if (configType === CalendarConfig.shiftConfiguration) {
            const copyNewAPiBodyForShift = [...copyOfShiftDetail];
            const updatedShiftForRedux = copyNewAPiBodyForShift.map((item) => {
                const {
                    dayConfigId: dayId,
                    name: dayName,
                    shiftDetailList: shiftResponseList,
                    ...rest
                } = item;

                return {
                    dayId,
                    dayName,
                    shiftResponseList,
                    ...rest,
                };
            });
            dispatch(updateShiftConfig(updatedShiftForRedux));
            const apiRequest = newAPiBodyForShift.filter((item) => {
                if (item?.expired) {
                    return item.expired === false;
                } else {
                    return true;
                }
            });
            apiRequest.forEach((obj) => {
                delete obj.expired;
                delete obj.name;
                obj.shiftDetailList.forEach(
                    (shift: any) => delete shift?.duration
                );
            });
            const payload: any = {
                parentAssetId: selectedAsset?.key,
                childAssetIds: isSwitchChecked ? selectedAssetChildrenKey : [],
                dayShiftDetailsList: apiRequest,
            };

            dispatch(setShiftConfigDetails(payload));
        }
        if (configType === CalendarConfig.dayConfiguration) {
            const copyOfUpdatedDay = JSON.parse(
                JSON.stringify(updatedDayApiData)
            );
            const apiRequest = copyOfUpdatedDay.filter((item: any) => {
                if (item?.expired) {
                    return item.expired === false;
                } else {
                    return true;
                }
            });
            apiRequest.map((obj: any) => {
                obj.id = obj?.dayConfigId;
                delete obj?.expired;
                delete obj?.dayConfigId;
            });
            const payload: any = {
                parentAssetId: selectedAsset?.key,
                childAssetIds: isSwitchChecked ? selectedAssetChildrenKey : [],
                dayConfigRequestList: [...apiRequest],
            };

            apiRequest?.length && dispatch(setDayConfigDetails(payload));
        }
    };
    const copyOfShiftDetail = [...shiftDetails];

    useEffect(() => {
        setIsValidObject({ sameName: [], overlapKeys: [] });
    }, [configType, dayConfigData]);

    const newAPiBodyForShift = copyOfShiftDetail.map((item) => {
        const {
            dayId: dayConfigId,
            dayName: name,
            shiftResponseList: shiftDetailList,
            ...rest
        } = item;

        return {
            dayConfigId,
            name,
            shiftDetailList,
            ...rest,
        };
    });


    function hasEmptyFieldsForDay(array: any): boolean {
        if (array.length === 0) {
            return true; // Return true if any field is empty
        }

        // Check if any object in the array has empty fields
        return array.some((obj: any) => {
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    // Check if the value is empty (empty string, undefined, null, or NaN)
                    if (key === 'validTill') {
                        return false;
                    }
                    if (
                        obj[key] === '' ||
                        obj[key] === undefined ||
                        obj[key] === null ||
                        (typeof obj[key] === 'number' && isNaN(obj[key]))
                    ) {
                        return true; // Return true if any field is empty
                    }
                }
            }
            return false; // Return false if no empty fields are found for the current object
        });
    }

    function hasEmptyFieldsForShift(obj: any): boolean {
        // Check if dayConfigId is not empty or undefined
        if (
            !Object.prototype.hasOwnProperty.call(obj, 'dayConfigId') ||
            obj.dayConfigId === '' ||
            obj.dayConfigId === undefined
        ) {
            return false;
        }

        // Check shiftDetailList
        if (obj.shiftDetailList && obj.shiftDetailList.length > 0) {
            for (const shiftDetail of obj.shiftDetailList) {
                // Check mandatory fields in shiftDetailList
                if (
                    shiftDetail.name === '' ||
                    shiftDetail.startTime === '' ||
                    shiftDetail.endTime === '' ||
                    shiftDetail.active === undefined
                ) {
                    return false;
                }
            }
        } else {
            return false; // Return false if shiftDetailList is empty
        }

        return true; // Return true if all checks pass
    }

    function areAllDataValidforShift(data: any): boolean {
        return data.every(hasEmptyFieldsForShift);
    }

    // check when save button should be enable or disable
    const disableSaveHandler = (): any => {
        const isDayDisable = disableAddNew();
        if (isDayDisable) {
            return true;
        }
        if (configType === CalendarConfig.dayConfiguration) {
            if (
                isTimeZoneDetailsChange &&
                !updatedDayApiData.length &&
                dropdownClicked
            ) {
                return false;
            } else if (updatedDayApiData) {
                return hasEmptyFieldsForDay(updatedDayApiData);
            } else {
                return false;
            }
        } else if (configType === CalendarConfig.shiftConfiguration) {
            if (
                isTimeZoneDetailsChange &&
                !newAPiBodyForShift.length &&
                dropdownClicked
            ) {
                return false;
            } else if (newAPiBodyForShift) {
                return !areAllDataValidforShift(newAPiBodyForShift);
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    // change or add the value of shift details
    const updateShiftDetails = (
        dayId: any,
        event: any,
        key: string,
        shiftIndex: number
    ): void => {
        let value: any = '';
        if (key === 'selectDay') {
            const copyShiftDetails = [...shiftDetails];
            copyShiftDetails[shiftIndex].dayId = dayId;
            dispatch(getUpdateShiftDataApi(copyShiftDetails));
        } else {
            if (key === 'active') {
                value = event;
            } else if (key === 'startTime' || key === 'endTime') {
                value = getTimeValueInHoursMinsSec(event);
                dispatch(getUpdateShiftDataApi(newAPiBodyForShift));
            } else {
                value = event?.target?.value || '';
            }

            const exists = newAPiBodyForShift.some(
                (item: any) => item?.dayConfigId === dayId
            );
            const newRowForDay: any = {
                name: '',
                startTime: '',
                endTime: '',
                active: true,
            };
            if (exists) {
                newAPiBodyForShift.forEach((day: any) => {
                    if (day.dayConfigId === dayId) {
                        if (day.shiftDetailList[shiftIndex]) {
                            day.shiftDetailList[shiftIndex][key] = value;
                        } else {
                            newRowForDay[key] = value;
                            day.shiftDetailList.push(newRowForDay);
                        }
                    }
                });
            } else {
                newRowForDay[key] = value;
                const newRow = {
                    dayConfigId: dayId,
                    shiftDetailList: [newRowForDay],
                };
                newAPiBodyForShift.push(newRow);
            }
            if (!displayFooter) {
                setDisplayFooter(true);
            }
        }
    };

    useEffect(() => {
        setNumberOfHoursInDay(calculateTimeDifferenceInHrs(dayConfigData));
    }, [dayConfigData]);

    useEffect(() => {
        setNumberOfHoursInShift(
            calculateTotalTimeDifference(shiftDetails, dayConfigData)
        );
    }, [shiftDetails]);

    const copyDayConfigData = [...dayConfigData];

    // update and add values on day table
    const updateAddDayApiDataHandler = (
        event: any,
        id: any,
        title: any,
        index: number
    ): any => {
        const isPresent = copyDayConfigData.some(
            (item) => item.name === id?.name
        );
        let value: any = '';
        if (title === 'name') {
            value = event.target.value;
        } else if (
            title === CalendarConfig.endTime ||
            title === CalendarConfig.startTime
        ) {
            value = getTimeValueInHoursMinsSec(event);
        } else {
            value = dayjs(event).valueOf();
        }

        if (isPresent && !id?.dayConfigId) {
            copyDayConfigData.map((row: any, indexValue: number) => {
                if (row?.name === id?.name && indexValue === index) {
                    row[title] = value;
                }
            });
            setUpdatedDayApiData([...copyDayConfigData]);
        }

        if (isPresent && id?.dayConfigId) {
            copyDayConfigData.map((row: any) => {
                if (row?.dayConfigId === id?.dayConfigId) {
                    row[title] = value;
                }
            });
            setUpdatedDayApiData([...copyDayConfigData]);
        } else {
            let newObj: any = {
                name: '',
                startTime: 0,
                endTime: 0,
                validFrom: 0,
                validTill: 0,
            };
            if (updatedDayApiData.length !== dayConfigData.length) {
                newObj[title] = value;
                setUpdatedDayApiData([...updatedDayApiData, newObj]);
            } else {
                newObj = updatedDayApiData[updatedDayApiData.length - 1];
                const tempResultArr = updatedDayApiData.slice(0, -1);
                newObj[title] = value;
                setUpdatedDayApiData([...tempResultArr, newObj]);
            }
        }
        if (!displayFooter) {
            setDisplayFooter(true);
        }
    };

    const shiftColumns = shiftColumn(
        shiftDetails,
        addDayRowsHandler,
        form,
        updateShiftDetails,
        dayConfigData,
        [...newAPiBodyForShift],
        disableAddNew
    );
    const dayColumn = dayColumns(
        updateAddDayApiDataHandler,
        isValidObject,
        dayConfigData
    );
    const getTableData = (key: any): any => {
        if (configType === CalendarConfig.dayConfiguration) {
            dispatch(getDayConfigByAssetId(key));
        }
        if (configType === CalendarConfig.shiftConfiguration) {
            dispatch(getDayConfigByAssetId(selectedAsset?.key));
            dispatch(getShiftConfigByAssetId(selectedAsset?.key));
        }
    };

    useEffect(() => {
        getTableData(selectedAsset?.key);
        setDisplayFooter(false);
    }, [configType, selectedAsset]);

    const addRowForDayHandler = (selectedRowData: any): void => {
        const selectedRow = shiftDetails.find(
            (item: any) => item.dayId === selectedRowData.dayId
        );
        if (selectedRow) {
            selectedRow.shiftResponseList.push({ ...newRowForShiftDay });
        }
        dispatch(updateShiftConfig(shiftDetails));
    };

    const cancelClicked = (): void => {
        if (displayFooter) {
            setCancelButtonClicked(true);
            setIsCancelModalOpen(true);
            dispatch(configChangeFalse())
        }
    };
    const handleSave = (assetPayload: any): any => {
        if (isSwitchButtonChecked) {
            dispatch(
                setAssetsDetails({
                    ...assetPayload,
                    assetIds: [selectedAsset?.key, ...selectedAssetChildrenKey],
                })
            );
        } else {
            dispatch(setAssetsDetails(assetPayload));
        }
    };
    const successFulModalHandler = (): void => {
        dispatch(getAssetDetailsById(selectedAsset?.key));
        if (configType === CalendarConfig.dayConfiguration) {
            dispatch(getDayConfigByAssetId(selectedAsset?.key));
        } else {
            dispatch(getShiftConfigByAssetId(selectedAsset?.key));
        }
        setDropdownClicked(false);
        setSuccessfulModalOpen(false);
        setDisplayFooter(false);
    };
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (sameName: any, overlapKeys: any): any => {
        if (sameName.length)
            api.open({
                message: 'Name Overlapping',
                description: "This cannot be created as name's overlap",
                duration: 4,
                style: { backgroundColor: '#fff1f0' },
            });
        else if (overlapKeys.length) {
            api.open({
                message: 'Time Overlapping',
                description: 'This cannot be created as Time overlaps',
                duration: 4,
                style: { backgroundColor: '#fff1f0' },
            });
        }
    };
    return loadingDay || loadingShift ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Spin spinning={loadingDay || loadingShift}></Spin>
        </div>
    ) : (
        <>
            {contextHolder}
            {(dayConfigData?.length &&
                configType === CalendarConfig.dayConfiguration) ||
            (shiftDetails?.length &&
                configType === CalendarConfig.shiftConfiguration) ? (
                <>
                    {(configType === CalendarConfig.dayConfiguration ||
                        configType === CalendarConfig.shiftConfiguration) && (
                        <Row
                            className="TableBox"
                            justify="space-between"
                            align="middle"
                        >
                            <Col span={6}>
                                No. of Hours -
                                <span className="highlighted-hours">
                                    {' '}
                                    {configType ===
                                        CalendarConfig.dayConfiguration &&
                                        `${numberOfHoursInDay}Hrs`}{' '}
                                    {configType ===
                                        CalendarConfig.shiftConfiguration &&
                                        `${numberOfHoursInShift}Hrs`}{' '}
                                </span>
                            </Col>
                            <Col span={3}>
                                <Button
                                    type="primary"
                                    ghost
                                    className="addNewButton"
                                    onClick={addNewHandler}
                                    disabled={disableAddNew()}
                                >
                                    Add new
                                </Button>
                            </Col>
                        </Row>
                    )}
                    {configType === CalendarConfig.dayConfiguration && (
                        <Table
                            columns={dayColumn}
                            dataSource={dayConfigData}
                            rowKey={'dayConfigId'}
                            pagination={false}
                            scroll={{ y: 'calc(100vh - 460px)' }}
                        />
                    )}{' '}
                    {configType === CalendarConfig.shiftConfiguration && (
                        <Table
                            bordered
                            columns={shiftColumns}
                            dataSource={shiftDetails}
                            rowKey={'dayConfigId'}
                            pagination={false}
                            scroll={{ y: 'calc(100vh - 460px)' }}
                        />
                    )}
                </>
            ) : (
                <EmptyTableComponent
                    configType={configType}
                    addClick={addNewHandler}
                    dayConfigData={dayConfigData}
                />
            )}

            {configType === CalendarConfig.dayConfiguration && displayFooter ? (
                <div className="tableFooter">
                    <Divider />
                    <Row className="tableFooterButtons">
                        <Col span={4} className="footerCancelButton">
                            <CustomButton
                                type={FormEnums.cancel}
                                disabled={false}
                                handleClick={() => {
                                    cancelClicked();
                                }}
                            />
                        </Col>
                        <Col span={4} className="footerSaveButton">
                            <CustomButton
                                type={FormEnums.save}
                                disabled={disableSaveHandler()}
                                typeOfButton={'submit'}
                                handleClick={() => {
                                    const dayConfigRequestList = [
                                        ...updatedDayApiData,
                                    ];
                                    const { sameName, overlapKeys } =
                                        validateShiftData(dayConfigRequestList);
                                    setIsValidObject({
                                        sameName: sameName,
                                        overlapKeys: overlapKeys,
                                    });
                                    setNumberOfHoursInDay(
                                        calculateTimeDifferenceInHrs(
                                            dayConfigRequestList
                                        )
                                    );
                                    if (
                                        sameName.length === 0 &&
                                        overlapKeys.length === 0
                                    ) {
                                        setIsSaveModalOpen(true);
                                    } else {
                                        openNotification(sameName, overlapKeys);
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            ) : (
                ''
            )}
            {configType === CalendarConfig.shiftConfiguration &&
            displayFooter ? (
                <div className="tableFooter">
                    <Divider />
                    <Row className="tableFooterButtons">
                        <Col span={4} className="footerCancelButton">
                            <CustomButton
                                type={FormEnums.cancel}
                                disabled={false}
                                handleClick={() => {
                                    cancelClicked();
                                }}
                            />
                        </Col>
                        <Col span={4} className="footerSaveButton">
                            <CustomButton
                                type={FormEnums.save}
                                disabled={
                                    configType ===
                                    CalendarConfig.dayConfiguration
                                        ? hasEmptyFieldsForDay(
                                              updatedDayApiData
                                          )
                                        : configType ===
                                          CalendarConfig.shiftConfiguration
                                        ? !areAllDataValidforShift(
                                              newAPiBodyForShift
                                          )
                                        : false
                                }
                                typeOfButton={'submit'}
                                handleClick={() => {
                                    newAPiBodyForShift.forEach((obj) => {
                                        delete obj.expired;
                                        delete obj.name;
                                        obj.shiftDetailList.forEach(
                                            (shift: any) =>
                                                delete shift?.duration
                                        );
                                    });

                                    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                                    const isValid = newAPiBodyForShift.map(
                                        (data) => {
                                            if (
                                                findOverlappingNames(
                                                    data.shiftDetailList
                                                ).length > 0 ||
                                                findTimeOverlapIndices(
                                                    data.shiftDetailList
                                                ).length > 0
                                            ) {
                                                if (
                                                    findOverlappingNames(
                                                        data.shiftDetailList
                                                    ).length > 0
                                                ) {
                                                    api.open({
                                                        message:
                                                            'Name Overlapping',
                                                        description:
                                                            "This cannot be created as name's overlap",
                                                        duration: 4,
                                                        style: {
                                                            backgroundColor:
                                                                '#fff1f0',
                                                        },
                                                    });
                                                }
                                                if (
                                                    findTimeOverlapIndices(
                                                        data.shiftDetailList
                                                    ).length > 0
                                                ) {
                                                    api.open({
                                                        message:
                                                            'Time Overlapping',
                                                        description:
                                                            'This cannot be created as Time overlaps',
                                                        duration: 4,
                                                        style: {
                                                            backgroundColor:
                                                                '#fff1f0',
                                                        },
                                                    });
                                                }
                                                return true;
                                            }
                                        }
                                    );
                                    setNumberOfHoursInShift(
                                        calculateTotalTimeDifference(
                                            newAPiBodyForShift,
                                            dayConfigData
                                        )
                                    );
                                    if (!isValid.includes(true)) {
                                        setIsSaveModalOpen(true);
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            ) : (
                ''
            )}
            {isCancelModalOpen && (
                <ConfirmationModal
                    icon={<WarningIcon />}
                    open={isCancelModalOpen}
                    onOk={() => {
                        onOkHandler();
                    }}
                    onCancel={() =>
                        cancelHandle(isCancelModalOpen, setIsCancelModalOpen)
                    }
                    text="All the unsaved data will be lost would you like to continue"
                    customClassName="confirmationModal calendarCancelModal"
                />
            )}
            {isSaveModalOpen && (
                <ConfirmationModal
                    icon={<QuestionMarkIcon />}
                    open={isSaveModalOpen}
                    onOk={() => {
                        handleSave(assetPayload);
                    }}
                    onCancel={() => {
                        setIsSaveModalOpen(false);
                    }}
                    text="Are you sure you want to save this?"
                    subText={
                        selectedAssetChildrenKey?.length > 0 &&
                        'Map the same settings to its child nodes'
                    }
                    onSwitchChecked={handleSwitchChecked}
                />
            )}
            {(assetDetailsAdded && dayConfigDataAdded) ||
            (assetDetailsAdded && shiftConfigDataAdded) ||
            assetDetailsAdded ? (
                <SuccessfulModal
                    open={successfulModalOpen}
                    onOk={() => {
                        successFulModalHandler();
                        setIsSwitchChecked(false);
                    }}
                    onCancel={() => {
                        successFulModalHandler();
                        setUpdatedDayApiData([]);
                        setIsSwitchChecked(false);
                        dispatch(resetAssetSuccess());
                        setSuccessfulModalOpen(false);
                        dispatch(configChangeFalse());
                    }}
                    text={'Data Saved Successfully'}
                />
            ) : (
                ''
            )}
        </>
    );
};

export default TableComponant;
