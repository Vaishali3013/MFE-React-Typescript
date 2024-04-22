import React, { useEffect, useState } from 'react';
import { type EconomizerAndAPHProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Row, Spin } from 'antd';
import './index.scss';
import BulletChart from 'components/common/charts/BulletGraph';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import dayjs from 'dayjs';
import {
    getEconomizerAndAphValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import {
    fetchValueFromKPI,
    getMinMaxFromBadRanges,
    isEmptyObject,
} from 'utils/commonFunction';

const EconomizerAndAPH: React.FC<EconomizerAndAPHProps> = ({
    heading,
    subHeading,
    charts,
}) => {
    const dispatch = useDispatch();
    const [economiserDataValues, setEconomiserDataValues] = useState<any>();
    const [economiserTransformData, setEconomiserTransformData] =
        useState<any>();
    const [aphDataValues, setAphDataValues] = useState<any>();
    const [aphTransformData, setAphTransformData] = useState<any>();
    const [siUnit, setSiUnit] = useState<string>('');

    const findCurrentEconomiserId = useSelector((state: any) =>
        state?.nocilDashboard?.economiserAndAphvalues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.economizerPerformance
        )
    );
    const findCurrentAphId = useSelector((state: any) =>
        state?.nocilDashboard?.economiserAndAphvalues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.aphPerformance
        )
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const economiserRedux = findCurrentEconomiserId?.value;
    const aphRedux = findCurrentAphId?.value;

    const economiserAndAphLoader = useSelector(
        (state: any) => state?.nocilDashboard?.economiserAndAphvalues?.loader
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const [chartDataEconomiser, setChartDataEconomiser] = useState({
        data: economiserRedux,
    });
    const [chartDataAph, setChartDataAph] = useState({
        data: aphRedux,
    });

    const economiserRanges = useSelector(
        (state: any) =>
            state?.nocilDashboard?.kpiMetaValues?.data.find(
                (obj: any): any => obj?.id === KPIDataId?.economizerPerformance
            )?.ranges
    );
    const aphRanges = useSelector(
        (state: any) =>
            state?.nocilDashboard?.kpiMetaValues?.data.find(
                (obj: any): any => obj?.id === KPIDataId?.aphPerformance
            )?.ranges
    );

    useEffect(() => {
        if (!isEmptyObject(economiserDataValues)) {
            const economiserData: any = {
                ranges: [economiserDataValues],
            };
            setEconomiserTransformData(getMinMaxFromBadRanges(economiserData));
        }
    }, [economiserDataValues]);
    useEffect(() => {
        if (!isEmptyObject(aphDataValues)) {
            const aphData: any = {
                ranges: [aphDataValues],
            };
            setAphTransformData(getMinMaxFromBadRanges(aphData));
        }
    }, [aphDataValues]);
    useEffect(() => {
        if (economiserRanges !== undefined || null) {
            setEconomiserDataValues(
                JSON.parse(String(economiserRanges))?.ranges[0]
            );
        }
    }, [economiserRanges]);

    useEffect(() => {
        if (aphRanges !== undefined || null) {
            setAphDataValues(JSON.parse(String(aphRanges))?.ranges[0]);
        }
    }, [aphRanges]);

    useEffect(() => {
        setChartDataEconomiser({
            data: economiserRedux,
        });
    }, [economiserRedux, economiserAndAphLoader]);
    useEffect(() => {
        setChartDataAph({
            data: aphRedux,
        });
    }, [aphRedux, economiserAndAphLoader]);

    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.economizerPerformance,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getEconomizerAndAphValues({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: [
                            KPIDataId?.economizerPerformance,
                            KPIDataId?.aphPerformance,
                        ],
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
            getEconomizerAndAphValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.economizerPerformance,
                    KPIDataId?.aphPerformance,
                ],
            })
        );
    }, []);

    const onClickHandler = (id: any, headingParam: string): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: id,
                heading: headingParam,
                subHeading: subHeading,
            })
        );
    };

    function handlerUndefinedAph(): any {
        if (chartDataAph?.data === undefined || null) {
            return '-';
        } else {
            return parseFloat(chartDataAph?.data?.toFixed(2));
        }
    }

    function handlerUndefinedEconomiser(): any {
        if (chartDataEconomiser?.data === undefined || null) {
            return '-';
        } else {
            return parseFloat(chartDataEconomiser?.data?.toFixed(2));
        }
    }

    return (
        <>
            <Card className="EconomizerAndAPHWrapper" bordered={false}>
                <Row className="EconomizerAndAPHWrapper__row">
                    <Col className="EconomizerAndAPHWrapper__column" span={24}>
                        <div className="EconomizerAndAPHContainer">
                            <div className="EconomizerAndAPHContainer__heading">
                                <span className="EconomizerAndAPHWrapper__name">
                                    {heading}
                                </span>
                                <span className="EconomizerAndAPHWrapper__degree">
                                    ({subHeading})
                                </span>
                            </div>
                            {dateRange === DateRangeFilter?.Today ? (
                                <>
                                    <div
                                        className="EconomizerAndAPHContainer__charts"
                                        onClick={() =>
                                            onClickHandler(
                                                KPIDataId.economizerPerformance,
                                                'Economizer Performance'
                                            )
                                        }
                                    >
                                        <BulletChart
                                            value={handlerUndefinedEconomiser()}
                                            category={'Economizer'}
                                            y={chartDataEconomiser?.data}
                                            unit={siUnit}
                                            plotBands={economiserTransformData}
                                        />
                                    </div>
                                    <div
                                        className="EconomizerAndAPHContainer__charts"
                                        onClick={(e: any) =>
                                            onClickHandler(
                                                KPIDataId.aphPerformance,
                                                'APH Performance'
                                            )
                                        }
                                    >
                                        <BulletChart
                                            value={handlerUndefinedAph()}
                                            category={'APH'}
                                            y={chartDataAph?.data}
                                            unit={siUnit}
                                            plotBands={aphTransformData}
                                        />
                                    </div>
                                </>
                            ) : economiserAndAphLoader ? (
                                <div className="EconomizerAndAPHContainer__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <>
                                    <div
                                        className="EconomizerAndAPHContainer__charts"
                                        onClick={(e: any) =>
                                            onClickHandler(
                                                KPIDataId.economizerPerformance,
                                                'Economizer Performance'
                                            )
                                        }
                                    >
                                        <BulletChart
                                            value={handlerUndefinedEconomiser()}
                                            category={'Economizer'}
                                            y={chartDataEconomiser?.data}
                                            unit={siUnit}
                                            plotBands={economiserTransformData}
                                        />
                                    </div>
                                    <div
                                        className="EconomizerAndAPHContainer__charts"
                                        onClick={(e: any) =>
                                            onClickHandler(
                                                KPIDataId.aphPerformance,
                                                'APH Performance'
                                            )
                                        }
                                    >
                                        <BulletChart
                                            value={handlerUndefinedAph()}
                                            category={'APH'}
                                            y={chartDataAph?.data}
                                            unit={siUnit}
                                            plotBands={aphTransformData}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default EconomizerAndAPH;
