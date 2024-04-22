import React from 'react';
import { type SteamPressureProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Row, Spin } from 'antd';
import './index.scss';
import SynchronizedChart from 'components/common/charts/SynchronisedChart';
import { styleRules } from 'components/common/charts/styleRules';
import { useDispatch, useSelector } from 'react-redux';
import { setKPITrend } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { fetchValueFromKPI } from 'utils/commonFunction';
import { ReactComponent as EmptyChartIcon } from 'assets/icons/emptyChartIcon.svg';
import { DateRangeFilter } from 'types/enums/kpiEnum';

const SteamPressure: React.FC<SteamPressureProps> = ({
    heading,
    pressureType,
    value,
    chartData,
    unit,
}) => {
    const dispatch = useDispatch();

    const dateRangeRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const steamPressureLoader = useSelector(
        (state: any) => state?.nocilDashboard?.steamPressure?.loader
    );
    const onClickHandler = (id: any): any => {
        if (id === 9) {
            dispatch(
                setKPITrend({
                    view: true,
                    id: KPIDataId.steamPressure9bar,
                    heading: heading,
                    unit: fetchValueFromKPI(
                        KPIDataId.steamPressure9bar,
                        kpiMetaRedux
                    ),
                })
            );
        } else if (id === 18) {
            dispatch(
                setKPITrend({
                    view: true,
                    id: KPIDataId.steamPressure18bar,
                    heading: heading,
                    unit: fetchValueFromKPI(
                        KPIDataId.steamPressure18bar,
                        kpiMetaRedux
                    ),
                })
            );
        } else {
            dispatch(
                setKPITrend({
                    view: true,
                    id: KPIDataId.averageSteamPressure,
                    heading: heading,
                    unit: fetchValueFromKPI(
                        KPIDataId.averageSteamPressure,
                        kpiMetaRedux
                    ),
                })
            );
        }
    };
    return (
        <>
            <Card className="steamPressureWrapper" bordered={false}>
                <div
                    className="steamPressureWrapper__div"
                    onClick={(e: any) => onClickHandler(pressureType)}
                >
                    <Row className="steamPressureWrapper__row">
                        <Col className="steamPressureWrapper__column" span={15}>
                            <span className="steamPressureWrapper__name">
                                {`${heading} `}
                            </span>
                            <span className="steamPressureWrapper__degree">
                                {pressureType
                                    ? `(${pressureType} ${unit})`
                                    : `(${
                                          unit !== undefined || null
                                              ? `${unit}`
                                              : ''
                                      })`}
                            </span>
                        </Col>
                        {dateRangeRedux === DateRangeFilter?.Today ? (
                            <Col className="steamPressureWrapper__col" span={9}>
                                <div className="steamPressureWrapper__value">
                                    <span className="steamPressureWrapper__num">
                                        {value ?? '--'}
                                    </span>

                                    <span className="steamPressureWrapper__val">
                                        Current Pressure
                                    </span>
                                </div>
                            </Col>
                        ) : (
                            <></>
                        )}
                    </Row>
                    <div className="steamPressureWrapper__charts">
                        {dateRangeRedux === DateRangeFilter?.Today ? (
                            chartData?.length > 0 ? (
                                <SynchronizedChart
                                    heading="FeedWater Flow"
                                    chartColor={{
                                        gradientColor: styleRules.redGradient,
                                        gradientStops:
                                            styleRules.redGradientStops,
                                        gradientStroke:
                                            styleRules.redGradientStroke,
                                    }}
                                    chartData={chartData}
                                />
                            ) : (
                                <div className="criticalParametersTrendEmptyTrendWrapper">
                                    <EmptyChartIcon />
                                </div>
                            )
                        ) : steamPressureLoader ? (
                            <div className="steamPressureWrapper__loader">
                                <Spin />
                            </div>
                        ) : chartData?.length > 0 ? (
                            <SynchronizedChart
                                heading="FeedWater Flow"
                                chartColor={{
                                    gradientColor: styleRules.redGradient,
                                    gradientStops: styleRules.redGradientStops,
                                    gradientStroke:
                                        styleRules.redGradientStroke,
                                }}
                                chartData={chartData}
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

export default SteamPressure;
