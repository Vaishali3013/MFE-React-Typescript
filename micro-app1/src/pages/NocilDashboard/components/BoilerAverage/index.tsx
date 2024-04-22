import React, { useEffect, useState } from 'react';
import { type ExcessOxygenProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Spin } from 'antd';
import './index.scss';
import GaugeChart from 'components/common/charts/GaugeChart';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAvgOxygenValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import dayjs from 'dayjs';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import {
    fetchValueFromKPI,
    getMinMaxFromBadRanges,
    isEmptyObject,
} from 'utils/commonFunction';

const BoilerAverage: React.FC<ExcessOxygenProps> = ({ heading, value }) => {
    const dispatch = useDispatch();
    const [boilerAvgDataValues, setBoilerAvgDataValues] = useState<any>();
    const [boilerAvgTransformData, setBoilerAvgTransformData] = useState<any>();

    const findAvgOxygenId = useSelector((state: any) =>
        state?.nocilDashboard?.avgOxygenValues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.excessOxygen
        )
    );
    const [siUnit, setSiUnit] = useState<string>('');

    const avgOxygenRedux = findAvgOxygenId?.value;

    const avgOxygenLoader = useSelector(
        (state: any) => state?.nocilDashboard?.avgOxygenValues?.loader
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const [chartDataAvgOxygen, setChartDataAvgOxygen] = useState({
        data: avgOxygenRedux,
    });
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );

    const boilerAvgRanges = useSelector(
        (state: any) =>
            state?.nocilDashboard?.kpiMetaValues?.data.find(
                (obj: any): any => obj?.id === KPIDataId?.excessOxygen
            )?.ranges
    );
    useEffect(() => {
        if (!isEmptyObject(boilerAvgDataValues)) {
            const boilerData: any = {
                ranges: [boilerAvgDataValues],
            };
            setBoilerAvgTransformData(getMinMaxFromBadRanges(boilerData));
        }
    }, [boilerAvgDataValues]);
    useEffect(() => {
        if (boilerAvgRanges !== undefined || null) {
            setBoilerAvgDataValues(
                JSON.parse(String(boilerAvgRanges))?.ranges[0]
            );
        }
    }, [boilerAvgRanges]);
    useEffect(() => {
        setChartDataAvgOxygen({
            data: avgOxygenRedux,
        });
    }, [avgOxygenRedux, avgOxygenLoader]);
    useEffect(() => {
        const kpiValue = fetchValueFromKPI(
            KPIDataId.excessOxygen,
            kpiMetaRedux
        );
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);

    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getAvgOxygenValues({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId?.excessOxygen,
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
            getAvgOxygenValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.excessOxygen,
            })
        );
    }, []);

    const onClickHandler = (subHeading: string): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: KPIDataId.excessOxygen,
                heading: subHeading,
                unit: fetchValueFromKPI(KPIDataId.excessOxygen, kpiMetaRedux),
            })
        );
    };

    return (
        <>
            <Card
                className="excessOxygenWrapper"
                bordered={false}
                onClick={() => {
                    onClickHandler('Boiler Average O₂');
                }}
            >
                <div className="excessOxygenContainer">
                    <div className="excessOxygenContainer__heading">
                        <span className="excessOxygenContainer__span">
                            {`${heading}`}
                            <sub>2</sub>
                        </span>
                        <span className="feedWaterWrapper__degree">
                            ({siUnit})
                        </span>
                    </div>
                    {dateRange === DateRangeFilter?.Today ? (
                        <div className="excessOxygenContainer__charts">
                            <GaugeChart
                                value={chartDataAvgOxygen?.data}
                                label="Boiler Average oxygen"
                                plotBands={boilerAvgTransformData}
                                labelDistance={15}
                                yLabel={0}
                                size="70%"
                                tooltipFontSize="14px"
                                fontSize="14px"
                                centerValues={['50%', '75%']}
                                dataLabelsFontSize="22px"
                            />
                        </div>
                    ) : avgOxygenLoader ? (
                        <div className="excessOxygenContainer__loader">
                            <Spin />
                        </div>
                    ) : (
                        <div className="excessOxygenContainer__charts">
                            <GaugeChart
                                value={chartDataAvgOxygen?.data}
                                label="Boiler Average oxygen"
                                plotBands={boilerAvgTransformData}
                                labelDistance={15}
                                yLabel={0}
                                size="70%"
                                tooltipFontSize="14px"
                                fontSize="14px"
                                centerValues={['50%', '75%']}
                                dataLabelsFontSize="22px"
                            />
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default BoilerAverage;
