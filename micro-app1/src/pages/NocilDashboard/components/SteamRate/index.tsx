import React, { useEffect, useState } from 'react';
import { type SteamRateProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Spin } from 'antd';
import './index.scss';
import dayjs from 'dayjs';

import SingleAxesGauge from 'components/common/charts/SingleAxesGauge';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSteamRateFlowData,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';

const steamRate: React.FC<SteamRateProps> = ({ heading, data }) => {
    const steamRateLoader = useSelector(
        (state: any) => state?.nocilDashboard?.steamFlowRate?.loader
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const findSteamRateId = useSelector((state: any) =>
        state?.nocilDashboard?.steamFlowRate?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.averageSteamFlow
        )
    );

    const steamRateRedux = findSteamRateId?.value;
    const [chartAvgValue, setChartAvgValue] = useState({
        data: steamRateRedux,
    });
    const [siUnit, setSiUnit] = useState<string>('');

    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const dispatch = useDispatch();
    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: KPIDataId.averageSteamFlow,
                heading: heading,
                unit: fetchValueFromKPI(
                    KPIDataId?.averageSteamFlow,
                    kpiMetaRedux
                ),
            })
        );
    };
    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.averageSteamFlow,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        setChartAvgValue({
            data: steamRateRedux,
        });
    }, [startDateRedux, endDateRedux, dateRange, steamRateLoader]);
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getSteamRateFlowData({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId?.averageSteamFlow,
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
            getSteamRateFlowData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.averageSteamFlow,
            })
        );
    }, []);
    return (
        <>
            <Card className="steamRateWrapper" bordered={false}>
                <div className="steamRateContainer">
                    <div className="steamRateContainer__heading">
                        <span className="steamRateContainer__span-tag">
                            {heading}
                        </span>
                    </div>
                    {dateRange === DateRangeFilter?.Today ? (
                        <div
                            className="steamRateContainer__charts"
                            onClick={onClickHandler}
                        >
                            <SingleAxesGauge
                                label={heading}
                                value={data && chartAvgValue?.data}
                                unit={siUnit}
                            />
                        </div>
                    ) : steamRateLoader ? (
                        <div className="steamRateContainer__loader">
                            <Spin />
                        </div>
                    ) : (
                        <div
                            className="steamRateContainer__charts"
                            onClick={onClickHandler}
                        >
                            <SingleAxesGauge
                                label={heading}
                                value={data && chartAvgValue?.data}
                                unit={siUnit}
                            />
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default steamRate;
