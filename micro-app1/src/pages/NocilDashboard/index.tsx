import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import './index.scss';
import DirectEfficiency from './components/DirectEfficiency';
import SteamRate from './components/SteamRate';
import AirToFuelRatio from './components/AirToFuelRatio';
import CoalInTake from './components/CoalIntake';
import SteamPressure from './components/SteamPressure';
import BoilerAverage from './components/BoilerAverage';
import SteamTemperature from './components/SteamTemperature';
import FeedWaterFlow from './components/FeedWaterFlow';
import EconomizerAndAPH from './components/EconomizerAndAPH';
import TotalSteamGeneration from './components/TotalSteamGeneration';
import BoilerPowerConsumption from './components/BoilerPowerConsumption';
import ReductionInBoilerPlate from './components/ReductionInBoilerPlate';
import Boilerutilisation from './components/BoilerUtilsation/Index';
import ChooseAnyParameter from './components/ChooseAnyParameter';
import {
    changeDateFilter,
    getCurrentValues,
    getKPIMetaData,
    getKPITrend,
    getSteamPressure,
    getSteamRateData,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import dayjs from 'dayjs';
import CustomHeader from 'components/common/CustomHeader';
import SteamRateTrendArea from './components/KPITrendArea';
import { PoolingTime, SIUnits, ShiftTiming } from 'types/enums/kpiEnum';
import CriticalParameter from './components/CriticalParameter';
import { currentDataIds } from 'redux/services/KPIServices/currentValuesMetaData';
import {
    checkTimeBeforeShiftEndTime,
    fetchValueFromKPI,
} from 'utils/commonFunction';
import { dateFormat } from 'types/enums';
import { useTranslation } from 'react-i18next';

const NocilDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [totalSteamGenObject, setTotalSteamGenObject] = useState({
        heading: '',
        subHeading: {
            value: 0,
            unit: '',
        },
        percentage: 0,
    });
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const [steamPressureUnit, setSteamPressureUnit] = useState<string>('');

    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const steamRateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.steamRateData?.data
    );
    const kpiTrendArea = useSelector(
        (state: any) => state?.nocilDashboard?.kpiTrendParameter
    );
    const currentValuesRedux = useSelector(
        (state: any) => state.nocilDashboard.currentValues
    );
    const [pressure9CurrentVal, setPressure9CurrentVal] = useState<any>();
    const [pressure18CurrentVal, setPressure18CurrentVal] = useState<any>();
    const [mainpressureCurrentVal, setMainPressureCurrentVal] = useState<any>();

    const [steamData, setSteamData] = useState<any>();

    const steamPressureRedux = useSelector(
        (state: any) => state?.nocilDashboard?.steamPressure?.data
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );

    const [steamPressure9Bar, setSteamPressure9Bar] = useState<any>([]);
    const [steamPressure18Bar, setSetSteamPressure18Bar] = useState<any>([]);
    const [mainSteamPressure, setMainSteamPressure] = useState<any>([]);

    const kpiTrendState = useSelector(
        (state: any) => state?.nocilDashboard?.kpiTrend
    );

    useEffect(() => {
        setPressure9CurrentVal(
            currentValuesRedux?.data?.find(
                (obj: any) => obj?.name === currentDataIds.steamPressure9Bar
            )
        );
        setPressure18CurrentVal(
            currentValuesRedux?.data?.find(
                (obj: any) => obj?.name === currentDataIds.steamPressure18Bar
            )
        );
        setMainPressureCurrentVal(
            currentValuesRedux?.data?.find(
                (obj: any) => obj?.name === currentDataIds.mainSteamPressure
            )
        );
    }, [currentValuesRedux]);
    useEffect(() => {
        setSteamData(steamRateRedux);
        setTotalSteamGenObject({
            heading: 'Total Steam Generation',
            subHeading: {
                value: steamRateRedux?.totalGeneration?.toFixed(2),
                unit: SIUnits.Tons,
            },
            percentage: steamRateRedux?.variance?.toFixed(2),
        });
    }, [steamRateRedux]);

    useEffect(() => {
        const steamPressure9Data = steamPressureRedux
            ?.find((obj: any) => obj?.id === KPIDataId.steamPressure9bar)
            ?.values?.map((obj: any) => {
                return Object.values(obj);
            });
        const steamPressure18Data = steamPressureRedux
            ?.find((obj: any) => obj?.id === KPIDataId.steamPressure18bar)
            ?.values?.map((obj: any) => {
                return Object.values(obj);
            });
        const mainPressureData = steamPressureRedux
            ?.find((obj: any) => obj?.id === KPIDataId.averageSteamPressure)
            ?.values?.map((obj: any) => {
                return Object.values(obj);
            });
        setSteamPressure9Bar(steamPressure9Data);
        setSetSteamPressure18Bar(steamPressure18Data);
        setMainSteamPressure(mainPressureData);
    }, [steamPressureRedux]);
    useEffect(() => {
        if (dateRange === 'Today') {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getCurrentValues({
                        id: [
                            currentDataIds.mainSteamPressure,
                            currentDataIds.steamTemperature,
                            currentDataIds.steamPressure9Bar,
                            currentDataIds.steamPressure18Bar,
                            currentDataIds.feedWaterPressure,
                        ],
                    })
                );
                dispatch(
                    getSteamRateData({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId.steamRate,
                    })
                );
                dispatch(
                    getSteamPressure({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: [
                            KPIDataId.steamPressure9bar,
                            KPIDataId.steamPressure18bar,
                            KPIDataId.averageSteamPressure,
                        ],
                        enableBroadSampling: false,
                    })
                ); // Dispatch your action here
            }, intervalDuration);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [dateRange]);
    useEffect(() => {
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
                dateRange: 'Today',
            })
        );
        dispatch(
            getKPIMetaData({
                id: [
                    KPIDataId?.directBoilerEfficiency,
                    KPIDataId?.steamRate,
                    KPIDataId?.boilerUtlisation,
                    KPIDataId?.reductionInBoilerEfficiency,
                    KPIDataId?.airToFuelRatio,
                    KPIDataId?.fuelToSteamRatio,
                    KPIDataId?.currentFDFan,
                    KPIDataId?.currentIDFan,
                    KPIDataId?.currentPAFan,
                    KPIDataId?.specificPowerConsumption,
                    KPIDataId?.totalFeedWater,
                    KPIDataId?.coalIntake,
                    KPIDataId?.coalProduction,
                    KPIDataId?.excessOxygen,
                    KPIDataId?.averageSteamTemperature,
                    KPIDataId?.feedWaterFlow,
                    KPIDataId?.economizerPerformance,
                    KPIDataId?.aphFuelGasOuletTemp,
                    KPIDataId?.steamPressure9bar,
                    KPIDataId?.steamPressure18bar,
                    KPIDataId?.averageSteamPressure,
                    KPIDataId?.economizerFuelGasInletTemp,
                    KPIDataId?.economizerFuelGasOuletTemp,
                    KPIDataId?.economizerWaterInletTemp,
                    KPIDataId?.economizerWaterOuletTemp,
                    KPIDataId?.aphAirInletTemp,
                    KPIDataId?.aphAirOuletTemp,
                    KPIDataId?.aphFuelGasInletTemp,
                    KPIDataId?.aphFuelGasOuletTemp,
                    KPIDataId?.boilerUtlisation,
                    KPIDataId?.averageSteamFlow,
                    KPIDataId?.feedWater1,
                    KPIDataId?.feedWater2,
                    KPIDataId?.aphPerformance,
                    KPIDataId?.totalPowerConsumption,
                ],
            })
        );

        dispatch(
            getCurrentValues({
                id: [
                    currentDataIds.mainSteamPressure,
                    currentDataIds.steamTemperature,
                    currentDataIds.steamPressure9Bar,
                    currentDataIds.steamPressure18Bar,
                    currentDataIds.feedWaterPressure,
                ],
            })
        );

        dispatch(
            getSteamRateData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId.steamRate,
            })
        );
        dispatch(
            getSteamPressure({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId.steamPressure9bar,
                    KPIDataId.steamPressure18bar,
                    KPIDataId.averageSteamPressure,
                ],
                enableBroadSampling: false,
            })
        );
        kpiTrendState?.length &&
            dispatch(
                setKPITrend({
                    view: false,
                    id: '',
                    heading: '',
                    subheading: '',
                    unit: {},
                })
            );

        return () =>
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
                    dateRange: 'Today',
                })
            );
    }, []);

    const { heading, subHeading, percentage } = totalSteamGenObject;

    useEffect(() => {
        dispatch(
            getKPITrend({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: kpiTrendArea?.kpiId,
                enableBroadSampling: false,
            })
        );
    }, [kpiTrendArea]);

    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.averageSteamPressure,
            kpiMetaRedux
        );
        setSteamPressureUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    return (
        <div className="nocilDashboard">
            <CustomHeader
                heading={t("nocil.nocilHeader")}
                currentTimePicker={true}
                customDateTimePicker={true}
                infoTooltip={true}
            />
            {kpiTrendArea.view ? (
                <SteamRateTrendArea kpiTrendAreaData={kpiTrendArea} />
            ) : (
                <div className="nocilWrapperScrolContent">
                <div className="nocilWrapper">
                    <Row className="nocilWrapper-row" gutter={[16, 16]}>
                        <Col className="nocilWrapper-col" span={12}>
                            <Row
                                className="nocilWrapper-row"
                                gutter={[16, 16]}
                            >
                                <Col className="nocilWrapper-col" span={12}>
                                    <Row
                                        className="nocilWrapper-row"
                                        gutter={[16, 16]}
                                    >
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <DirectEfficiency heading={t('nocil.directEfficiency')}/>
                                        </Col>
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <ReductionInBoilerPlate
                                                heading="Reduction in Boiler Efficiency"
                                                heading1="Boiler Efficiency"
                                                subHeading="Unburnt Carbon Loss"
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className="nocilWrapper-col" span={12}>
                                    <Row
                                        className="nocilWrapper-row"
                                        gutter={[16, 16]}
                                    >
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <SteamRate
                                                heading={t('nocil.steamRate')}
                                                data={steamData?.steamRate}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row
                                className="nocilWrapper-row"
                                gutter={[16, 16]}
                            >
                                <Col className="nocilWrapper-col" span={14}>
                                    <AirToFuelRatio heading={t(('nocil.airToFuel'))} />
                                </Col>
                                <Col
                                    className="nocilWrapper__currentUsage__col-main"
                                    span={10}
                                >
                                    <BoilerPowerConsumption heading="Boiler Power Consumption" />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="nocilWrapper-col" span={12}>
                            <Row
                                className="nocilWrapper-row"
                                gutter={[16, 16]}
                            >
                                <Col className="nocilWrapper-col" span={12}>
                                    <Row
                                        className="nocilWrapper-row"
                                        gutter={[16, 16]}
                                    >
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <TotalSteamGeneration
                                                heading={heading}
                                                percentage={percentage}
                                                subHeading={subHeading}
                                                coalHeading="Total Coal Consumption"
                                            />
                                        </Col>
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <CoalInTake
                                                lineHeading="Coal Production"
                                                barHeading="Coal Intake"
                                            />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className="nocilWrapper-col" span={12}>
                                    <Row
                                        className="nocilWrapper-row"
                                        gutter={[16, 16]}
                                    >
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <Boilerutilisation heading={t('nocil.boilerUtilisation')} />
                                        </Col>
                                        <Col
                                            className="nocilWrapper-col"
                                            span={24}
                                        >
                                            <BoilerAverage
                                                heading={t('nocil.boilerAverageO')}
                                                value=""
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="nocilWrapper-row" gutter={[16, 16]}>
                        <Col className="nocilWrapper-col" span={8}>
                            <SteamTemperature
                                heading={t('nocil.steamTemperature')}
                                subHeading="C"
                                name="Current Temp"
                            />
                        </Col>
                        <Col className="nocilWrapper-col" span={8}>
                            <FeedWaterFlow
                                heading={t('nocil.feedWaterFlow')}
                                subHeading="TPH"
                                name="Current Flow"
                            />
                        </Col>
                        <Col className="nocilWrapper-col" span={8}>
                            <EconomizerAndAPH
                                heading={t('nocil.economizerAndAPH')}
                                subHeading="%"
                            />
                        </Col>
                    </Row>
                    <Row className="nocilWrapper-row" gutter={[16, 16]}>
                        <Col className="nocilWrapper-col" span={8}>
                            <SteamPressure
                                heading={t('nocil.steamPressure')}
                                pressureType={9}
                                value={pressure9CurrentVal?.value?.toFixed(
                                    2
                                )}
                                chartData={steamPressure9Bar}
                                unit={steamPressureUnit}
                            />
                        </Col>
                        <Col className="nocilWrapper-col" span={8}>
                            <SteamPressure
                                heading={t('nocil.steamPressure')}
                                pressureType={18}
                                value={pressure18CurrentVal?.value?.toFixed(
                                    2
                                )}
                                chartData={steamPressure18Bar}
                                unit={steamPressureUnit}
                            />
                        </Col>
                        <Col className="nocilWrapper-col" span={8}>
                            <SteamPressure
                                heading={t('nocil.mainSteamPressure')}
                                pressureType={0}
                                value={mainpressureCurrentVal?.value?.toFixed(
                                    2
                                )}
                                chartData={mainSteamPressure}
                                unit={steamPressureUnit}
                            />
                        </Col>
                    </Row>
                    <Row className="nocilWrapper-row">
                        <Col className="nocilWrapper-col" span={7}>
                            <ChooseAnyParameter heading={t('nocil.chooseAnyParameter')} />
                        </Col>
                        <Col className="nocilWrapper-col" span={17}>
                            <CriticalParameter CriticalParameter={t('nocil.criticalParametersTrend')} />
                        </Col>
                    </Row>
                </div>
            </div>)
                
            }
        </div>
    );
};

export default NocilDashboard;
