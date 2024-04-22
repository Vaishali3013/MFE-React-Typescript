import React, { useEffect, useState } from 'react';
import { type DirectEfficiencyProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Spin } from 'antd';
import './index.scss';
import SolidGaugeChart from 'components/common/charts/SolidGaugeChart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAggregateValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import dayjs from 'dayjs';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { fetchValueFromKPI } from 'utils/commonFunction';

const DirectEfficiency: React.FC<DirectEfficiencyProps> = ({ heading }) => {
    const dispatch = useDispatch();
    const findCurrentIdEfficiency = useSelector((state: any) =>
        state?.nocilDashboard?.aggregateValues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.directBoilerEfficiency
        )
    );

    const efficiencyRedux = findCurrentIdEfficiency?.value;

    const efficiencyLoader = useSelector(
        (state: any) => state?.nocilDashboard?.aggregateValues?.loader
    );
    const [siUnit, setSiUnit] = useState<string>('');
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const [chartDataEfficiency, setChartDataEfficiency] = useState({
        data: efficiencyRedux,
    });
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );

    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.directBoilerEfficiency,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);

    useEffect(() => {
        setChartDataEfficiency({
            data: efficiencyRedux,
        });
    }, [efficiencyRedux, efficiencyLoader]);
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getAggregateValues({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId?.directBoilerEfficiency,
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
            getAggregateValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.directBoilerEfficiency,
            })
        );
    }, []);

    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: KPIDataId.directBoilerEfficiency,
                heading: heading,
                unit: fetchValueFromKPI(
                    KPIDataId?.directBoilerEfficiency,
                    kpiMetaRedux
                ),
            })
        );
    };

    return (
        <>
            <Card className="directEfficencyWrapper" bordered={false}>
                <div className="directEfficencyContainer">
                    <div className="directEfficencyContainer__heading">
                        <span>{heading}</span>
                    </div>
                    <div
                        className="directEfficencyContainer__charts"
                        onClick={onClickHandler}
                    >
                        {dateRange === DateRangeFilter?.Today ? (
                            <SolidGaugeChart
                                height="0"
                                data={chartDataEfficiency?.data}
                                name="Direct Efficiency"
                                unit={siUnit}
                            />
                        ) : efficiencyLoader ? (
                            <div className="directEfficencyContainer__loader">
                                <Spin />
                            </div>
                        ) : (
                            <SolidGaugeChart
                                height="0"
                                data={chartDataEfficiency?.data}
                                name="Direct Efficiency"
                                unit={siUnit}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
};

export default DirectEfficiency;
