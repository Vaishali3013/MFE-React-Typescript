import React, { useEffect, useState } from 'react';
import { type SteamTemperatureProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Row, Spin } from 'antd';
import dayjs from 'dayjs';

import './index.scss';
import SynchronizedChart from 'components/common/charts/SynchronisedChart';
import { styleRules } from 'components/common/charts/styleRules';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSteamTemp,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { currentDataIds } from 'redux/services/KPIServices/currentValuesMetaData';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { ReactComponent as EmptyChartIcon } from 'assets/icons/emptyChartIcon.svg';

const SteamTemperature: React.FC<SteamTemperatureProps> = ({
    heading,
    subHeading,
    name,
    charts,
}) => {
    const [siUnit, setSiUnit] = useState<string>('');

    const dateRangeRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );

    const tempTrendRedux = useSelector(
        (state: any) => state?.nocilDashboard?.steamTempTrend?.data[0]?.values
    );
    const tempTrendLoader = useSelector(
        (state: any) => state?.nocilDashboard?.steamTempTrend?.loader
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const [currentTemperature, setCurrentTemperature] = useState<any>();
    const currentValuesRedux = useSelector(
        (state: any) => state.nocilDashboard.currentValues
    );
    const dispatch = useDispatch();
    const [tempData, setTempData] = useState([]);
    useEffect(() => {
        setCurrentTemperature(
            currentValuesRedux?.data?.find(
                (obj: any) => obj?.name === currentDataIds.steamTemperature
            )
        );
    }, [currentValuesRedux]);
    useEffect(() => {
        if (tempTrendRedux?.length) {
            const dataOfArrays = tempTrendRedux?.map((obj: any) => {
                return Object.values(obj);
            });
            setTempData(dataOfArrays);
        } else {
            setTempData([]);
        }
    }, [tempTrendRedux, tempTrendLoader]);
    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.averageSteamTemperature,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getSteamTemp({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: [KPIDataId.averageSteamTemperature],
                        enableBroadSampling: false,
                    })
                );
            }, intervalDuration);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [dateRange]);
    useEffect(() => {
        dispatch(
            getSteamTemp({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId.averageSteamTemperature],
                enableBroadSampling: false,
            })
        );
    }, []);

    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: [KPIDataId.averageSteamTemperature],
                heading: heading,
                subHeading: subHeading,
            })
        );
    };
    return (
        <>
            <Card className="steamTempWrapper" bordered={false}>
                <div className="steamTempWrapper__div" onClick={onClickHandler}>
                    <Row className="steamTempWrapper__row">
                        <Col className="steamTempWrapper__column" span={15}>
                            <span className="steamTempWrapper__name">
                                {`${heading} `}
                            </span>
                            <span className="steamTempWrapper__degree">
                                ({siUnit})
                            </span>
                        </Col>
                        {dateRangeRedux === DateRangeFilter?.Today ? (
                            <Col className="steamTempWrapper__col" span={9}>
                                <div className="steamTempWrapper__value">
                                    <span className="steamTempWrapper__num">
                                        {currentTemperature?.value
                                            ? currentTemperature?.value?.toFixed(
                                                  2
                                              )
                                            : '--'}
                                    </span>
                                    <span className="steamTempWrapper__val">
                                        {name}
                                    </span>
                                </div>
                            </Col>
                        ) : null}
                    </Row>
                    <div className="steamTempWrapper__charts">
                        {dateRange === DateRangeFilter?.Today ? (
                            tempData?.length > 0 ? (
                                <SynchronizedChart
                                    heading="FeedWater Flow"
                                    chartColor={{
                                        gradientColor: styleRules.greenGradient,
                                        gradientStops:
                                            styleRules.greenGradientStops,
                                        gradientStroke:
                                            styleRules.greenGradientStroke,
                                    }}
                                    chartData={tempData}
                                />
                            ) : (
                                <div className="criticalParametersTrendEmptyTrendWrapper">
                                    <EmptyChartIcon />
                                </div>
                            )
                        ) : tempTrendLoader ? (
                            <div className="steamTempWrapper__loader">
                                <Spin />
                            </div>
                        ) : tempData?.length > 0 ? (
                            <SynchronizedChart
                                heading="FeedWater Flow"
                                chartColor={{
                                    gradientColor: styleRules.greenGradient,
                                    gradientStops:
                                        styleRules.greenGradientStops,
                                    gradientStroke:
                                        styleRules.greenGradientStroke,
                                }}
                                chartData={tempData}
                            />
                        ) : (
                            <div className="criticalParametersTrendEmptyTrendWrapper">
                                <EmptyChartIcon />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
};

export default SteamTemperature;
