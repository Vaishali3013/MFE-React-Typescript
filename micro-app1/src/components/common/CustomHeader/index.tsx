import React, { useEffect, useState } from 'react';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import CurrentDateTimeComponent from 'components/common/CurrentDateTimeComponent';
import CustomButton from 'components/common/CustomButton';
import CustomDateTimePicker from 'components/common/CustomDateTimePicker';
import { ReactComponent as ResetIcon } from 'assets/icons/resetIconOrange.svg';
import { ReactComponent as AssumptionsLightIcon } from 'assets/icons/AssumptionsLightIcon.svg';
import { ReactComponent as AssumptionsIcon } from 'assets/icons/AssumptionsIcon.svg';
import { type customHeaderProps } from 'types/interfaces/PropsInterfaces/common';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import {
    changeDateFilter,
    getAggregateValues,
    getAvgOxygenValues,
    getChooseParamValues,
    getCoalConsumptionValues,
    getCoalIntakeProd,
    getCurrentValues,
    getEconomizerAndAphValues,
    getFeedWaterTrend,
    getFuelRatioValues,
    getKPITrend,
    getParameterTrend,
    getPowerConsumptionValues,
    getReductionValues,
    getSteamPressure,
    getSteamRateData,
    getSteamRateFlowData,
    getSteamTemp,
    getUtilization,
    openAssumptionAndFormula,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { dateFormat } from 'types/enums';
import { currentDataIds } from 'redux/services/KPIServices/currentValuesMetaData';

import {
    checkIfTimeIsUnderShift,
    checkTimeBeforeShiftEndTime,
    isDateToday,
} from 'utils/commonFunction';
import { DateRangeFilter, PoolingTime, ShiftTiming } from 'types/enums/kpiEnum';
import { useNavigate, useParams } from 'react-router-dom';
import { nocilDashboardUrl } from 'utils/constants';
import { Tooltip, message } from 'antd';
const CustomHeader: React.FC<customHeaderProps> = ({
    heading,
    customDateTimePicker,
    currentTimePicker,
    applyClickHandler,
    infoTooltip,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const params = useParams()['*'];
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const parametersValue = useSelector(
        (state: any) => state?.nocilDashboard?.parameters
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiTrendArea = useSelector(
        (state: any) => state?.nocilDashboard?.kpiTrendParameter
    );
    const [localStateDateRange, setLocalStateDateRange] = useState(dateRange);
    
    const resetFilter = (): void => {
        dispatch(
            changeDateFilter({
                startTime: checkTimeBeforeShiftEndTime(7)
                    ? dayjs()
                          .subtract(1, 'days')
                          .format(
                              `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                          )
                    : dayjs().format(
                          `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                      ),
                endTime: dayjs().format(`${dateFormat.format}`),
                dateRange: DateRangeFilter?.Today,
            })
        );
        setDateRange(DateRangeFilter.Today);
    };

    useEffect(() => {
        applyClickHandler ? applyClickHandler() : applyHandler();
    }, [dateRange, startDateRedux, endDateRedux, isClicked]);
    const nocilDashboardAPICalls = (): any => {
        dispatch(
            getAggregateValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.directBoilerEfficiency,
            })
        );
        dispatch(
            getPowerConsumptionValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.totalPowerConsumption,
                    KPIDataId?.specificPowerConsumption,
                ],
            })
        );
        dispatch(
            getSteamRateData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.steamRate,
            })
        );
        dispatch(
            getSteamPressure({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.steamPressure9bar,
                    KPIDataId?.steamPressure18bar,
                    KPIDataId?.averageSteamPressure,
                ],
                enableBroadSampling: false,
            })
        );
        dispatch(
            getFuelRatioValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId?.airToFuelRatio, KPIDataId?.fuelToSteamRatio],
            })
        );
        dispatch(
            getAvgOxygenValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.excessOxygen,
            })
        );
        dispatch(
            getUtilization({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.boilerUtlisation,
            })
        );
        dispatch(
            getChooseParamValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.averageSteamFlow,
                    KPIDataId?.excessOxygen,
                    KPIDataId?.averageSteamPressure,
                    KPIDataId?.averageSteamTemperature,
                    KPIDataId?.economizerFuelGasInletTemp,
                    KPIDataId?.economizerFuelGasOuletTemp,
                    KPIDataId?.economizerWaterInletTemp,
                    KPIDataId?.economizerWaterOuletTemp,
                    KPIDataId?.aphAirInletTemp,
                    KPIDataId?.aphAirOuletTemp,
                    KPIDataId?.aphFuelGasInletTemp,
                    KPIDataId?.aphFuelGasOuletTemp,
                ],
            })
        );
        dispatch(
            getCoalIntakeProd({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId?.coalIntake, KPIDataId?.coalProduction],
                enableBroadSampling: true,
            })
        );
        dispatch(
            getEconomizerAndAphValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.economizerPerformance,
                    KPIDataId?.aphPerformance,
                ],
            })
        );
        dispatch(
            getReductionValues({
                startTime: dayjs(startDateRedux).valueOf(),

                endTime: dayjs(endDateRedux).valueOf(),

                id: KPIDataId?.reductionInBoilerEfficiency,
            })
        );
        dispatch(
            getSteamTemp({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId?.averageSteamTemperature],
                enableBroadSampling: false,
            })
        );
        dispatch(
            getParameterTrend({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: parametersValue,
                enableBroadSampling: false,
            })
        );
        dispatch(
            getKPITrend({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: kpiTrendArea?.kpiId,
                enableBroadSampling: false,
            })
        );
        dispatch(
            getFeedWaterTrend({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId?.feedWaterFlow],
                enableBroadSampling: false,
            })
        );
        dispatch(
            getSteamRateFlowData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.averageSteamFlow,
            })
        );
        dispatch(
            getCoalConsumptionValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.coalIntake,
            })
        );
    };
    const applyHandler = (): any => {
        if (params?.includes(nocilDashboardUrl)) {
            if (dateRange === DateRangeFilter?.Today) {
                dispatch(
                    getCurrentValues({
                        id: [
                            currentDataIds?.mainSteamPressure,
                            currentDataIds?.steamTemperature,
                            currentDataIds?.steamPressure9Bar,
                            currentDataIds?.steamPressure18Bar,
                            currentDataIds?.feedWaterPressure,
                        ],
                    })
                );
            }
            checkIfTimeIsUnderShift(startDateRedux, dateRange);
            if (isDateToday(startDateRedux) && dateRange.includes('Shift')) {
                if (checkIfTimeIsUnderShift(startDateRedux, dateRange)) {
                    nocilDashboardAPICalls();
                } else {
                    message.error(`${dateRange} hasn't been started yet.`);
                }
            } else {
                nocilDashboardAPICalls();
            }
        }
    };
    const [dateTimeFilter, setDateTimeFilter] = useState<any>({
        startTime: dayjs(startDateRedux, dateFormat),
        endTime: dayjs(endDateRedux, dateFormat),
    });
    const [dateRangeComponent, setDateRange] = useState<any>(
        DateRangeFilter.Today
    );
    useEffect(() => {
        const intervalDuration = PoolingTime.seconds;

        const intervalId = setInterval(() => {
            if (dateRange === 'Today' && localStateDateRange === 'Today') {
                dispatch(
                    changeDateFilter({
                        startTime: checkTimeBeforeShiftEndTime(7)
                            ? dayjs()
                                  .subtract(1, 'days')
                                  .format(
                                      `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                                  )
                            : dayjs().format(
                                  `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                              ),
                        endTime: dayjs().format(`${dateFormat.format}`),
                        dateRange: DateRangeFilter?.Today,
                    })
                );
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
                    endTime: dayjs(dayjs().format(`${dateFormat.format}`)),
                    dateRange: DateRangeFilter?.Today,
                });
            } else {
                clearInterval(intervalId);
            }
        }, intervalDuration);

        return () => {
            clearInterval(intervalId);
        };
    }, [dateRange, localStateDateRange]);

    const onApply = (): any => {
        setIsClicked(!isClicked);

        const startTimeDateFlag = isDateToday(
            dateTimeFilter.startTime.format(dateFormat.formatWithoutTime)
        );
        const resetToToday = (): void =>
            dispatch(
                changeDateFilter({
                    startTime: dayjs().format(
                        `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                    ),
                    endTime: dayjs().format(`${dateFormat.format}`),
                    dateRange: dateRangeComponent,
                })
            );
        if (startTimeDateFlag) {
            dispatch(
                changeDateFilter({
                    startTime: dateTimeFilter.startTime.format(
                        dateFormat.format
                    ),
                    endTime: dateTimeFilter.endTime.format(dateFormat.format),
                    dateRange: dateRangeComponent,
                })
            );
            if (dateRangeComponent.includes('Shift')) {
                switch (dateRangeComponent) {
                    case DateRangeFilter?.Shift_A:
                        !checkTimeBeforeShiftEndTime(7)
                            ? dispatch(
                                  changeDateFilter({
                                      startTime:
                                          dateTimeFilter.startTime.format(
                                              dateFormat.format
                                          ),
                                      endTime: dateTimeFilter.endTime.format(
                                          dateFormat.format
                                      ),
                                      dateRange: dateRangeComponent,
                                  })
                              )
                            : resetToToday();
                        break;
                    case DateRangeFilter?.Shift_B:
                        !checkTimeBeforeShiftEndTime(15)
                            ? dispatch(
                                  changeDateFilter({
                                      startTime:
                                          dateTimeFilter.startTime.format(
                                              dateFormat.format
                                          ),
                                      endTime: dateTimeFilter.endTime.format(
                                          dateFormat.format
                                      ),
                                      dateRange: dateRangeComponent,
                                  })
                              )
                            : resetToToday();
                        break;
                    case DateRangeFilter?.Shift_C:
                        !checkTimeBeforeShiftEndTime(23)
                            ? dispatch(
                                  changeDateFilter({
                                      startTime:
                                          dateTimeFilter.startTime.format(
                                              dateFormat.format
                                          ),
                                      endTime: dateTimeFilter.endTime.format(
                                          dateFormat.format
                                      ),
                                      dateRange: dateRangeComponent,
                                  })
                              )
                            : resetToToday();
                        break;
                    default:
                        break;
                }
            }
        } else {
            dispatch(
                changeDateFilter({
                    startTime: dateTimeFilter.startTime.format(
                        dateFormat.format
                    ),
                    endTime: dateTimeFilter.endTime.format(dateFormat.format),
                    dateRange: dateRangeComponent,
                })
            );
        }
    };

    const handleOpenAssumptionAndFormula = (): any => {
        dispatch(openAssumptionAndFormula());
        navigate('/nocil/nocil-dashboard/assumptions');
    };
    const handleChildStateChange = (newChildState: any): void => {
        setLocalStateDateRange(newChildState);
    };

    return (
        <div className="customHeader">
            <div className="customHeader__child">
                <div className="customHeader__child__titledatePicker">
                    <div className="customHeader__child-title">
                        <ScreenNameHeading heading={heading} />
                    </div>
                    {customDateTimePicker ? (
                        <div className="customHeader__child-datePicker">
                            <CustomDateTimePicker
                                onStateChange={handleChildStateChange}
                                dateTimeFilter={dateTimeFilter}
                                setDateTimeFilter={setDateTimeFilter}
                                dateRange={dateRangeComponent}
                                setDateRange={setDateRange}
                            />
                            <div className="customHeader__child-applyButton">
                                <CustomButton
                                    type="Apply"
                                    disabled={false}
                                    handleClick={onApply}
                                />
                            </div>
                            <span
                                className="customHeader__child-resetButton"
                                onClick={resetFilter}
                            >
                                <ResetIcon />
                            </span>
                            {infoTooltip && (
                                <Tooltip title="Assumptions & Formulas">
                                    <span
                                        className="customHeader__child-assumptionButton"
                                        onClick={handleOpenAssumptionAndFormula}
                                        onMouseEnter={(): any => {
                                            setIsHovered(true);
                                        }}
                                        onMouseLeave={(): any => {
                                            setIsHovered(false);
                                        }}
                                    >
                                        <AssumptionsLightIcon
                                            style={{
                                                display: isHovered
                                                    ? 'none'
                                                    : 'inline-block',
                                            }}
                                        />
                                        <AssumptionsIcon
                                            style={{
                                                display: isHovered
                                                    ? 'inline-block'
                                                    : 'none',
                                            }}
                                        />
                                    </span>
                                </Tooltip>
                            )}
                        </div>
                    ) : null}
                </div>
                {currentTimePicker ? (
                    <div className="customHeader__child__clock">
                        <CurrentDateTimeComponent />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default CustomHeader;
