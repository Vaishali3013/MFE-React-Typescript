import React, { useEffect, useState } from 'react';
import { type ReductionInBoilerPlateProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Card, Col, Row, Spin } from 'antd';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import dayjs from 'dayjs';
import {
    getReductionValues,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { fetchValueFromKPI } from 'utils/commonFunction';
import ReductionBoilerDonutChart from 'components/common/charts/ReductionBoilerDonutChart';
import { DateRangeFilter } from 'types/enums/kpiEnum';

const ReductionInBoilerPlate: React.FC<ReductionInBoilerPlateProps> = ({
    heading,
    heading1,
    subHeading,
}) => {
    const inputString = heading;
    const splitStrings = inputString.split(' ');

    const dispatch = useDispatch();
    const [siUnit, setSiUnit] = useState<any>('');

    const findCurrentIdReduction = useSelector((state: any) =>
        state?.nocilDashboard?.reductionValues?.data?.find(
            (obj: any): any =>
                obj?.id === KPIDataId?.reductionInBoilerEfficiency
        )
    );

    const reductionRedux = findCurrentIdReduction?.value;

    const reductionLoader = useSelector(
        (state: any) => state?.nocilDashboard?.reductionValues?.loader
    );

    const startDateReductionRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );

    const endDateReductionRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const dateRange = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.dateRange
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [chartDataReduction, setChartDataReduction] = useState({
        data: reductionRedux,
    });
    useEffect(() => {
        if (kpiMetaRedux?.length) {
            const kpiMeta = fetchValueFromKPI(
                KPIDataId.reductionInBoilerEfficiency,
                kpiMetaRedux
            );

            setSiUnit(kpiMeta?.dataType);
        }
    }, [kpiMetaRedux]);

    useEffect(() => {
        setChartDataReduction({
            data: reductionRedux,
        });
    }, [reductionRedux, reductionLoader]);

    useEffect(() => {
        dispatch(
            getReductionValues({
                startTime: dayjs(startDateReductionRedux).valueOf(),

                endTime: dayjs(endDateReductionRedux).valueOf(),

                id: KPIDataId?.reductionInBoilerEfficiency,
            })
        );
    }, []);
    const onClickHandler = (): any => {
        dispatch(
            setKPITrend({
                view: true,
                id: KPIDataId.reductionInBoilerEfficiency,
                heading: heading,
                subHeading: subHeading,
                unit: fetchValueFromKPI(
                    KPIDataId?.reductionInBoilerEfficiency,
                    kpiMetaRedux
                ),
            })
        );
    };
    return (
        <>
            <Card className="reductionInBoilerPlateWrapper" bordered={false}>
                <Row>
                    <Col span={12}>
                        <div className="reductionInBoilerPlateWrapper__heading">
                            <span className="reductionInBoilerPlateWrapper__heading-div">
                                {splitStrings[0]} {splitStrings[1]}
                            </span>
                            <span className="reductionInBoilerPlateWrapper__heading-div">
                                {splitStrings[2]} {splitStrings[3]}
                            </span>
                            <span className="reductionInBoilerPlateWrapper__subheading">
                                ({subHeading})
                            </span>
                        </div>
                    </Col>
                    <Col span={12}>
                        {dateRange === DateRangeFilter?.Today ? (
                            <div
                                className="reductionInBoilerPlateWrapper__charts"
                                onClick={onClickHandler}
                            >
                                <ReductionBoilerDonutChart
                                    legendEnabled={false}
                                    fontSizeTitleText="50px"
                                    colorLegends1="#FFA39E"
                                    colorLegends2="#dee0df"
                                    colorTitle="#000000"
                                    yTitle={-170}
                                    xTitle={-40}
                                    fixedTo={0}
                                    chartWidth={220}
                                    pieCenter={['22%', '-14%']}
                                    size={50}
                                    unit={siUnit}
                                    data={chartDataReduction?.data}
                                />
                            </div>
                        ) : reductionLoader ? (
                            <div className="reductionInBoilerPlateWrapper__loader">
                                <Spin />
                            </div>
                        ) : (
                            <div
                                className="reductionInBoilerPlateWrapper__charts"
                                onClick={onClickHandler}
                            >
                                <ReductionBoilerDonutChart
                                    legendEnabled={false}
                                    fontSizeTitleText="50px"
                                    colorLegends1="#FFA39E"
                                    colorLegends2="#dee0df"
                                    colorTitle="#000000"
                                    yTitle={-170}
                                    xTitle={-40}
                                    fixedTo={0}
                                    chartWidth={220}
                                    pieCenter={['22%', '-14%']}
                                    size={50}
                                    unit={siUnit}
                                    data={chartDataReduction?.data}
                                />
                            </div>
                        )}
                    </Col>
                </Row>
            </Card>
        </>
    );
};
export default ReductionInBoilerPlate;
