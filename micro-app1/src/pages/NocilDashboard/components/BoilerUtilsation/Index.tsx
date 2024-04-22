import React, { useEffect, useState } from 'react';
import { type BoilerutilisationProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Spin } from 'antd';
import './index.scss';
import dayjs from 'dayjs';

import DonutChart from 'components/common/charts/DonutChart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUtilization,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';

const Boilerutilisation: React.FC<BoilerutilisationProps> = ({ heading }) => {
    const utilizationRedux = useSelector(
        (state: any) => state?.nocilDashboard?.utilization?.data
    );
    const utilizationLoader = useSelector(
        (state: any) => state?.nocilDashboard?.utilization?.loader
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const [chartData, setChartData] = useState({
        runTime: utilizationRedux?.runtime,
        downTime: utilizationRedux?.downtime,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getUtilization({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId.boilerUtlisation,
                    })
                ); // Dispatch your action here
            }, intervalDuration);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [dateRange]);
    useEffect(() => {
        setChartData({
            runTime: utilizationRedux?.runtime,
            downTime: utilizationRedux?.downtime,
        });
    }, [utilizationRedux, utilizationLoader]);
    useEffect(() => {
        dispatch(
            getUtilization({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId.boilerUtlisation,
            })
        );
    }, []);

    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: KPIDataId.boilerUtlisation,
                heading: heading,
            })
        );
    };

    return (
        <>
            <Card className="boilerUtilisationWrapper" bordered={false}>
                <div
                    className="boilerUtilizationContainer"
                    onClick={onClickHandler}
                >
                    <div className="boilerUtilizationContainer__heading">
                        {heading}
                    </div>
                    {dateRange === DateRangeFilter?.Today ? (
                        <div className="boilerUtilizationContainer__chart">
                            <DonutChart
                                chartingInfo={[
                                    {
                                        label: 'Run Time',
                                        timeStamp: chartData?.runTime,
                                    },
                                    {
                                        label: 'Down Time',
                                        timeStamp: chartData?.downTime,
                                    },
                                ]}
                                legendEnabled={true}
                                fontSizeTitleText="30px"
                                colorLegends1="#4ED964"
                                colorLegends2="#FB554C"
                                colorTitle="#4ED964"
                                yTitle={-5}
                                fixedTo={2}
                                chartWidth={0}
                                pieCenter={['50%', '50%']}
                                size={100}
                            />
                        </div>
                    ) : utilizationLoader ? (
                        <div className="boilerUtilizationContainer__loader">
                            <Spin />
                        </div>
                    ) : (
                        <div className="boilerUtilizationContainer__chart">
                            <DonutChart
                                chartingInfo={[
                                    {
                                        label: 'Run Time',
                                        timeStamp: chartData?.runTime,
                                    },
                                    {
                                        label: 'Down Time',
                                        timeStamp: chartData?.downTime,
                                    },
                                ]}
                                legendEnabled={true}
                                fontSizeTitleText="30px"
                                colorLegends1="#4ED964"
                                colorLegends2="#FB554C"
                                colorTitle="#4ED964"
                                yTitle={-5}
                                fixedTo={2}
                                chartWidth={0}
                                pieCenter={['50%', '50%']}
                                size={100}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default Boilerutilisation;
