import React, { useEffect, useState } from 'react';
import { type AirToFuelRatioProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card } from 'antd';
import './index.scss';
import GaugeChart from 'components/common/charts/GaugeChart';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import {
    getFuelRatioValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import dayjs from 'dayjs';
import {
    fetchValueFromKPI,
    getMinMaxFromBadRanges,
    isEmptyObject,
} from 'utils/commonFunction';

const AirToFuelRatio: React.FC<AirToFuelRatioProps> = ({ heading }) => {
    const [airToFuelDataValues, setAirToFuelDataValues] = useState<any>();
    const [fuelToSteamDataValues, setFuelToSteamDataValues] = useState<any>();

    const [airFuelTransformedData, setAirFuelTransformedData] = useState<any>();
    const [fuelSteamTransformedData, setFuelSteamTransformedData] =
        useState<any>();

    const dispatch = useDispatch();

    const findFuelRatioId = useSelector((state: any) =>
        state?.nocilDashboard?.fuelRatioValues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.airToFuelRatio
        )
    );
    const findSteamRatioId = useSelector((state: any) =>
        state?.nocilDashboard?.fuelRatioValues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.fuelToSteamRatio
        )
    );
    const fuelRatioRedux = findFuelRatioId?.value;
    const steamRatioRedux = findSteamRatioId?.value;

    const fuelRatioLoader = useSelector(
        (state: any) => state?.nocilDashboard?.fuelRatioValues?.loader
    );
    const startDateFuelRatioRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateFuelRatioRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [chartDataFuelRatio, setChartDataFuelRatio] = useState({
        data: fuelRatioRedux,
    });

    const [chartDataSteamRatio, setChartDataSteamRatio] = useState({
        data: steamRatioRedux,
    });

    const airTofuelRanges = useSelector(
        (state: any) =>
            state?.nocilDashboard?.kpiMetaValues?.data.find(
                (obj: any): any => obj?.id === KPIDataId?.airToFuelRatio
            )?.ranges
    );
    const fuelToSteamRanges = useSelector(
        (state: any) =>
            state?.nocilDashboard?.kpiMetaValues?.data.find(
                (obj: any): any => obj?.id === KPIDataId?.fuelToSteamRatio
            )?.ranges
    );

    useEffect(() => {
        if (!isEmptyObject(fuelToSteamDataValues)) {
            const fuelToSteamData: any = {
                ranges: [fuelToSteamDataValues],
            };
            setFuelSteamTransformedData(
                getMinMaxFromBadRanges(fuelToSteamData)
            );
        }
    }, [fuelToSteamDataValues]);
    useEffect(() => {
        if (!isEmptyObject(airToFuelDataValues)) {
            const airFuelData: any = {
                ranges: [airToFuelDataValues],
            };
            setAirFuelTransformedData(getMinMaxFromBadRanges(airFuelData));
        }
    }, [airToFuelDataValues]);
    useEffect(() => {
        if (fuelToSteamRanges !== undefined || null) {
            setFuelToSteamDataValues(
                JSON.parse(String(fuelToSteamRanges))?.ranges[0]
            );
        }
    }, [fuelToSteamRanges]);

    useEffect(() => {
        if (airTofuelRanges !== undefined || null) {
            setAirToFuelDataValues(
                JSON.parse(String(airTofuelRanges))?.ranges[0]
            );
        }
    }, [airTofuelRanges]);
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getFuelRatioValues({
                        startTime: dayjs(startDateFuelRatioRedux).valueOf(),
                        endTime: dayjs(endDateFuelRatioRedux).valueOf(),
                        id: [
                            KPIDataId?.airToFuelRatio,
                            KPIDataId?.fuelToSteamRatio,
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
        setChartDataSteamRatio({
            data: steamRatioRedux,
        });
    }, [steamRatioRedux, fuelRatioLoader]);
    useEffect(() => {
        setChartDataFuelRatio({
            data: fuelRatioRedux,
        });
    }, [fuelRatioRedux, fuelRatioLoader]);
    useEffect(() => {
        dispatch(
            getFuelRatioValues({
                startTime: dayjs(startDateFuelRatioRedux).valueOf(),
                endTime: dayjs(endDateFuelRatioRedux).valueOf(),
                id: [KPIDataId?.airToFuelRatio, KPIDataId?.fuelToSteamRatio],
            })
        );
    }, []);
    const onClickHandler = (id: any, subHeading: string): any => {
        if (id)
            dispatch(
                setKPITrend({
                    view: true,
                    id: id,
                    heading: subHeading,
                    unit: fetchValueFromKPI(id, kpiMetaRedux),
                })
            );
    };
    return (
        <>
            <Card className="airToFuelRatioWrapper" bordered={false}>
                <div className="airToFuelRatioContainer">
                    <div className="airToFuelRatioContainer__airToFuel">
                        <div className="airToFuelRatioContainer__airToFuel__chartLabel">
                            Air to Fuel Ratio
                        </div>
                        <div
                            className="airToFuelRatioContainer__airToFuel__chart"
                            onClick={(e: any) =>
                                onClickHandler(
                                    KPIDataId.airToFuelRatio,
                                    'Air to Fuel Ratio'
                                )
                            }
                        >
                            <GaugeChart
                                value={chartDataFuelRatio?.data}
                                label="Air to Fuel Ratio"
                                plotBands={airFuelTransformedData}
                                labelDistance={-10}
                                yLabel={16}
                                size="100%"
                                fontSize="10px"
                                tooltipFontSize="11px"
                                centerValues={['50%', '65%']}
                                dataLabelsFontSize="16px"
                            />
                        </div>
                    </div>
                    <div className="airToFuelRatioContainer__fuelToSteam">
                        <div className="airToFuelRatioContainer__fuelToSteam__chartLabel">
                            Steam to Fuel Ratio
                        </div>
                        <div
                            className="airToFuelRatioContainer__fuelToSteam__chart"
                            onClick={(e: any) =>
                                onClickHandler(
                                    KPIDataId.fuelToSteamRatio,
                                    'Fuel to Steam Ratio'
                                )
                            }
                        >
                            <GaugeChart
                                value={chartDataSteamRatio?.data}
                                label="Fuel to Steam Ratio"
                                plotBands={fuelSteamTransformedData}
                                labelDistance={-15}
                                yLabel={16}
                                size="100%"
                                fontSize="10px"
                                tooltipFontSize="11px"
                                centerValues={['50%', '65%']}
                                dataLabelsFontSize="16px"
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default AirToFuelRatio;
