import React, { useEffect, useState } from 'react';
import { type BoilerPowerConsumptionProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card } from 'antd';
import './index.scss';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPowerConsumptionValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import { fetchValueFromKPI } from 'utils/commonFunction';

const BoilerPowerConsumption: React.FC<BoilerPowerConsumptionProps> = ({
    heading,
}) => {
    const dispatch = useDispatch();
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );

    const powerConsumptionRedux = useSelector(
        (state: any) => state?.nocilDashboard?.powerConsumptionValues?.data
    );
    const powerConsumptionLoader = useSelector(
        (state: any) => state?.nocilDashboard?.powerConsumptionValues?.loader
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const [powerConsumptionValues, setPowerConsumptionValues] = useState<any>({
        specificPowerConsumption: {
            name: 'Specific Power Consumption',
            value: '',
            unit: '',
        },
        totalPowerConsumptionVal: {
            name: 'Total Power Consumption',
            value: '',
            unit: '',
        },
    });
    useEffect(() => {
        setPowerConsumptionValues({
            totalPowerConsumptionVal: {
                name: 'Total Power Consumption',
                value: powerConsumptionRedux
                    ?.find(
                        (obj: any) =>
                            obj.id === KPIDataId?.totalPowerConsumption
                    )
                    ?.value?.toFixed(2),
                unit: fetchValueFromKPI(
                    KPIDataId.totalPowerConsumption,
                    kpiMetaRedux
                )?.dataType,
            },
            specificPowerConsumption: {
                name: 'Specific Power Consumption',
                value: powerConsumptionRedux
                    ?.find(
                        (obj: any) =>
                            obj.id === KPIDataId?.specificPowerConsumption
                    )
                    ?.value?.toFixed(2),
                unit: fetchValueFromKPI(
                    KPIDataId.specificPowerConsumption,
                    kpiMetaRedux
                )?.dataType,
            },
        });
    }, [powerConsumptionRedux, powerConsumptionLoader, kpiMetaRedux]);

    const { totalPowerConsumptionVal, specificPowerConsumption } =
        powerConsumptionValues;
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalDuration = PoolingTime.seconds;

            const intervalId = setInterval(() => {
                dispatch(
                    getPowerConsumptionValues({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: [
                            KPIDataId?.totalPowerConsumption,
                            KPIDataId?.specificPowerConsumption,
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
            getPowerConsumptionValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [
                    KPIDataId?.totalPowerConsumption,
                    KPIDataId?.specificPowerConsumption,
                ],
            })
        );
    }, []);

    const onClickHandler = (id: any, subHeading: string): any => {
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
            <Card className="BoilerPowerConsumptionWrapper" bordered={false}>
                <div className="BoilerPowerConsumptionWrapper__heading">
                    <div className="BoilerPowerConsumptionWrapper__name">
                        <div className="BoilerPowerConsumptionWrapper__heading-div">
                            {`${heading}`}

                            <div className="BoilerPowerConsumptionWrapper__subHeading"></div>
                        </div>
                    </div>
                </div>

                <div className="BoilerPowerConsumptionWrapper__contentBody">
                    <div
                        className="BoilerPowerConsumptionWrapper__dataValues"
                        onClick={(e: any) =>
                            onClickHandler(
                                KPIDataId.totalPowerConsumption,
                                totalPowerConsumptionVal.name
                            )
                        }
                    >
                        <div className="BoilerPowerConsumptionWrapper__dataValues__values">
                            <div className="BoilerPowerConsumptionWrapper__dataValues__value">
                                {totalPowerConsumptionVal?.value !==
                                    undefined || null
                                    ? totalPowerConsumptionVal?.value
                                    : '--'}
                            </div>
                            <span className="BoilerPowerConsumptionWrapper__dataValues__units">
                                {totalPowerConsumptionVal?.unit !== undefined ||
                                null
                                    ? totalPowerConsumptionVal?.unit
                                    : ''}
                            </span>
                        </div>

                        <div className="BoilerPowerConsumptionWrapper__dataValues__name">
                            {totalPowerConsumptionVal?.name}
                        </div>
                    </div>

                    <div
                        className="BoilerPowerConsumptionWrapper__dataValues"
                        onClick={(e: any) =>
                            onClickHandler(
                                KPIDataId.specificPowerConsumption,
                                specificPowerConsumption.name
                            )
                        }
                    >
                        <div className="BoilerPowerConsumptionWrapper__dataValues__values">
                            <div className="BoilerPowerConsumptionWrapper__dataValues__value">
                                {specificPowerConsumption?.value !==
                                    undefined || null
                                    ? specificPowerConsumption?.value
                                    : '--'}
                            </div>
                            <div className="BoilerPowerConsumptionWrapper__dataValues__units">
                                {specificPowerConsumption?.unit !== undefined ||
                                null
                                    ? specificPowerConsumption?.unit
                                    : ''}
                            </div>
                        </div>

                        <div className="BoilerPowerConsumptionWrapper__dataValues__name">
                            {specificPowerConsumption?.name}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default BoilerPowerConsumption;
