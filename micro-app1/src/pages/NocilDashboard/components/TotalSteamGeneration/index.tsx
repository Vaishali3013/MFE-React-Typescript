import React, { useEffect, useState } from 'react';
import { type TotalSteamGenerationProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Divider } from 'antd';
import './index.scss';
import Arrow from 'assets/icons/Group 203.svg';
import arrowRed from 'assets/icons/arrowRed.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCoalConsumptionValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { DateRangeFilter, PoolingTime } from 'types/enums/kpiEnum';
import dayjs from 'dayjs';

const TotalSteamGeneration: React.FC<TotalSteamGenerationProps> = ({
    heading,
    subHeading,
    percentage,
    coalHeading,
}) => {
    const dispatch = useDispatch();
    const { value } = subHeading;
    const findCoalValue = useSelector((state: any) =>
        state?.nocilDashboard?.coalConsumptionValues?.data?.find(
            (obj: any): any => obj?.id === KPIDataId?.coalIntake
        )
    );

    const coalConsumptionRedux = findCoalValue?.value;
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
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
    const coalConsumptionLoader = useSelector(
        (state: any) => state?.nocilDashboard?.coalConsumptionValues?.loader
    );
    const [coalConsumptionAvgValue, setCoalConsumptionAvgValue] = useState({
        data: coalConsumptionRedux,
    });
    const [siUnit, setSiUnit] = useState<string>('');
    const [coalSIUnit, setCoalSIUnit] = useState<string>('');

    useEffect(() => {
        setCoalConsumptionAvgValue({
            data: coalConsumptionRedux,
        });
    }, [coalConsumptionRedux, coalConsumptionLoader]);
    useEffect(() => {
        const kpiValue = fetchValueFromKPI(KPIDataId.steamRate, kpiMetaRedux);
        const coalKpiValue = fetchValueFromKPI(
            KPIDataId.coalIntake,
            kpiMetaRedux
        );
        setCoalSIUnit(coalKpiValue?.dataType);
        setSiUnit(kpiValue?.dataType);
    }, [kpiMetaRedux]);
    useEffect(() => {
        if (dateRange === DateRangeFilter?.Today) {
            const intervalId = setInterval(() => {
                dispatch(
                    getCoalConsumptionValues({
                        startTime: dayjs(startDateRedux).valueOf(),
                        endTime: dayjs(endDateRedux).valueOf(),
                        id: KPIDataId?.coalIntake,
                    })
                );
            }, PoolingTime.seconds);
            return () => {
                clearInterval(intervalId);
            };
        }
    }, [dateRange]);
    useEffect(() => {
        dispatch(
            getCoalConsumptionValues({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: KPIDataId?.coalIntake,
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
            <Card className="steamCoalWrapper" bordered={false}>
                <div className="steamCoalWrapper-card">
                    <div className="steamGenerationWrapper">
                        <div
                            className="steamGenerationWrapper__valueUnit"
                            onClick={(e: any) =>
                                onClickHandler(KPIDataId.steamRate, heading)
                            }
                        >
                            <div className="steamGenerationWrapper__value">
                                {value ? `${value}` : `--`}
                            </div>
                            <div className="steamGenerationWrapper__unit">
                                {siUnit ? `${siUnit}` : ``}
                            </div>
                            <div
                                className={
                                    percentage >= 0
                                        ? 'steamGenerationWrapper__greenpercentage'
                                        : 'steamGenerationWrapper__redpercentage'
                                }
                            >
                                {percentage !== undefined || null
                                    ? `${percentage}%`
                                    : ''}
                                {percentage !== undefined || null ? (
                                    percentage >= 0 ? (
                                        <img src={Arrow} />
                                    ) : (
                                        <img src={arrowRed} />
                                    )
                                ) : null}
                            </div>
                        </div>
                        <div className="steamGenerationWrapper__labelWithVariance">
                            <div className="steamGenerationWrapper__label">
                                {heading}
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div
                        className="coalConsumptionWrapper"
                        onClick={(e: any) =>
                            onClickHandler(KPIDataId.coalIntake, coalHeading)
                        }
                    >
                        <div className="coalConsumptionWrapper__valueUnit">
                            <div className="coalConsumptionWrapper__value">
                                {coalConsumptionAvgValue?.data
                                    ? coalConsumptionAvgValue?.data?.toFixed(2)
                                    : `--`}
                            </div>
                            <div className="coalConsumptionWrapper__unit">
                                {coalSIUnit ?? ''}
                            </div>
                        </div>
                        <div className="coalConsumptionWrapper__label">
                            {coalHeading}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
};

export default TotalSteamGeneration;
