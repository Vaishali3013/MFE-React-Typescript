import React, { useEffect, useState } from 'react';
import { type FeedWaterFlowProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Row, Spin } from 'antd';
import './index.scss';
import SynchronizedChart from 'components/common/charts/SynchronisedChart';
import { styleRules } from 'components/common/charts/styleRules';
import { useDispatch, useSelector } from 'react-redux';
import {
    getFeedWaterTrend,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import dayjs from 'dayjs';
import { currentDataIds } from 'redux/services/KPIServices/currentValuesMetaData';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { ReactComponent as EmptyChartIcon } from 'assets/icons/emptyChartIcon.svg';

const FeedWaterFlow: React.FC<FeedWaterFlowProps> = ({
    heading,
    subHeading,

    name,
    charts,
}) => {
    const dispatch = useDispatch();
    const [siUnit, setSiUnit] = useState<string>('');

    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const feedWaterLoader = useSelector(
        (state: any) => state?.nocilDashboard?.feedWaterTrend?.loader
    );
    const feedTrendRedux = useSelector(
        (state: any) => state?.nocilDashboard?.feedWaterTrend?.data[0]?.values
    );
    const [feedData, setFeedData] = useState([]);
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const [feedWaterCurrent, setFeedWaterCurrent] = useState<any>();
    const currentValuesRedux = useSelector(
        (state: any) => state.nocilDashboard.currentValues
    );
    useEffect(() => {
        setFeedWaterCurrent(
            currentValuesRedux?.data?.find(
                (obj: any) => obj?.name === currentDataIds.feedWaterPressure
            )
        );
    }, [currentValuesRedux]);
    useEffect(() => {
        if (feedTrendRedux?.length) {
            const dataOfArrays = feedTrendRedux?.map((obj: any) => {
                return Object.values(obj);
            });
            setFeedData(dataOfArrays);
        } else {
            setFeedData([]);
        }
    }, [feedTrendRedux, feedWaterLoader]);

    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getFeedWaterTrend({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: [KPIDataId.feedWaterFlow],
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
        const kpiValue = fetchValueFromKPI(
            KPIDataId.feedWaterFlow,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        dispatch(
            getFeedWaterTrend({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [KPIDataId.feedWaterFlow],
                enableBroadSampling: false,
            })
        );
    }, []);

    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: [KPIDataId.feedWaterFlow],
                heading: heading,
                subHeading: subHeading,
            })
        );
    };
    return (
        <>
            <Card className="feedWaterWrapper" bordered={false}>
                <div className="feedWaterWrapper__div" onClick={onClickHandler}>
                    <Row className="feedWaterWrapper__row">
                        <Col className="feedWaterWrapper__column" span={15}>
                            <span className="feedWaterWrapper__name">
                                {heading}
                            </span>
                            <span className="feedWaterWrapper__degree">
                                ({siUnit})
                            </span>
                        </Col>
                        {dateRange === DateRangeFilter?.Today &&
                        dateRange.length > 0 ? (
                            <Col className="feedWaterWrapper__col" span={9}>
                                <div className="feedWaterWrapper__value">
                                    <span className="feedWaterWrapper__num">
                                        {feedWaterCurrent?.value
                                            ? feedWaterCurrent?.value?.toFixed(
                                                  2
                                              )
                                            : '--'}
                                    </span>
                                    <span className="feedWaterWrapper__val">
                                        {name}
                                    </span>
                                </div>
                            </Col>
                        ) : (
                            <></>
                        )}
                    </Row>
                    <div className="feedWaterWrapper__charts">
                        {dateRange === DateRangeFilter?.Today ? (
                            feedData?.length > 0 ? (
                                <SynchronizedChart
                                    heading="FeedWater Flow"
                                    chartColor={{
                                        gradientColor: styleRules.blueGradient,
                                        gradientStops:
                                            styleRules.blueGradientStops,
                                        gradientStroke:
                                            styleRules.blueGradientStroke,
                                    }}
                                    chartData={feedData}
                                />
                            ) : (
                                <div className="criticalParametersTrendEmptyTrendWrapper">
                                    <EmptyChartIcon />
                                </div>
                            )
                        ) : feedWaterLoader ? (
                            <div className="feedWaterWrapper__loader">
                                <Spin />
                            </div>
                        ) : feedData?.length > 0 ? (
                            <SynchronizedChart
                                heading="FeedWater Flow"
                                chartColor={{
                                    gradientColor: styleRules.blueGradient,
                                    gradientStops: styleRules.blueGradientStops,
                                    gradientStroke:
                                        styleRules.blueGradientStroke,
                                }}
                                chartData={feedData}
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

export default FeedWaterFlow;
