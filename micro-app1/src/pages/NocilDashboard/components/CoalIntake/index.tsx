import React, { useEffect, useState } from 'react';
import { type CoalInTakeProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.scss';
import LineCoulumnChart from 'components/common/charts/LineCoulmnChart';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import {
    getCoalIntakeProd,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { ReactComponent as EmptyCoalIntakeProductionChart } from 'assets/icons/emptyCoalIntakeProductionChart.svg';

const CoalInTake: React.FC<CoalInTakeProps> = ({ lineHeading, barHeading }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation('trasnaltion');
    const idsToFind = [KPIDataId.coalIntake, KPIDataId.coalProduction];

    const coalIntakeRedux = useSelector(
        (state: any) => state?.nocilDashboard?.coalIntakeProd?.data[0]?.values
    );

    const coalProdRedux = useSelector(
        (state: any) => state?.nocilDashboard?.coalIntakeProd?.data[1]?.values
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

    const coalProdLoader = useSelector(
        (state: any) => state?.nocilDashboard?.coalIntakeProd?.loader
    );

    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const [siUnit, setSiUnit] = useState<string>('');

    const [coalIntake, setCoalIntake] = useState([]);

    const [coalProd, setCoalProd] = useState([]);

    useEffect(() => {
        const kpiValue = fetchValueFromKPI(KPIDataId.coalIntake, kpiMetaRedux);
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        const dataOfArraysIntake = coalIntakeRedux?.map((obj: any) => {
            return {
                timestamp: obj?.timestamp,

                value: obj?.value,
            };
        });

        setCoalIntake(dataOfArraysIntake);

        const dataOfArraysProd = coalProdRedux?.map((obj: any) => {
            return {
                timestamp: obj?.timestamp,

                value: obj?.value,
            };
        });

        setCoalProd(dataOfArraysProd);
    }, [coalIntakeRedux, coalProdRedux, coalProdLoader]);

    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getCoalIntakeProd({
                        startTime: dayjs(startDateRedux).valueOf(),

                        endTime: dayjs(endDateRedux).valueOf(),

                        id: idsToFind,

                        enableBroadSampling: true,
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
            getCoalIntakeProd({
                startTime: dayjs(startDateRedux).valueOf(),

                endTime: dayjs(endDateRedux).valueOf(),

                id: idsToFind,

                enableBroadSampling: true,
            })
        );
    }, []);

    const onBarClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,

                id: [KPIDataId.coalIntake],

                heading: barHeading,

                subHeading: siUnit,
                unit: fetchValueFromKPI(
                    [KPIDataId.coalIntake],

                    kpiMetaRedux
                ),
            })
        );
    };

    const onLineClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,

                id: [KPIDataId.coalProduction],

                heading: lineHeading,
                subHeading: siUnit,

                unit: fetchValueFromKPI(
                    [KPIDataId.coalProduction],

                    kpiMetaRedux
                ),
            })
        );
    };

    return (
        <>
            <Card className="coalIntakeVsProductionWrapper" bordered={false}>
                <div className="coalIntakeVsProductionContainer">
                    <div className="coalIntakeVsProductionContainer__heading">
                        <span className="coalIntakeVsProductionContainer__span-heading">
                            {t('nocil.coalIntakeVsProduction')}
                        </span>

                        <span className="coalIntakeVsProductionContainer__span-unit">
                            ({siUnit})
                        </span>
                    </div>

                    {dateRange === DateRangeFilter?.Today ? (
                        coalIntake?.length > 0 && coalProd?.length > 0 ? (
                            <div className="coalIntakeVsProductionContainer__charts">
                                <LineCoulumnChart
                                    dataIntake={coalIntake}
                                    dataProd={coalProd}
                                    dateRange={dateRange}
                                    barClickEventHandler={function (this: any) {
                                        onBarClickHandler();
                                    }}
                                    lineClickEventHandler={function (
                                        this: any
                                    ) {
                                        onLineClickHandler();
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="criticalParametersTrendEmptyTrendWrapper">
                                <EmptyCoalIntakeProductionChart />
                            </div>
                        )
                    ) : coalProdLoader ? (
                        <div className="coalIntakeVsProductionContainer__loader">
                            <Spin />
                        </div>
                    ) : coalIntake?.length > 0 && coalProd?.length > 0 ? (
                        <div className="coalIntakeVsProductionContainer__charts">
                            <LineCoulumnChart
                                dataIntake={coalIntake}
                                dataProd={coalProd}
                                dateRange={dateRange}
                                barClickEventHandler={function (this: any) {
                                    onBarClickHandler();
                                }}
                                lineClickEventHandler={function (this: any) {
                                    onLineClickHandler();
                                }}
                            />
                        </div>
                    ) : (
                        <div className="criticalParametersTrendEmptyTrendWrapper">
                            <EmptyCoalIntakeProductionChart />
                        </div>
                    )}
                </div>
            </Card>
        </>
    );
};

export default CoalInTake;
