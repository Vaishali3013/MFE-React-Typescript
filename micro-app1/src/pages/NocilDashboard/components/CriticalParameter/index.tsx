import React, { useEffect, useState } from 'react';
import { type CriticalParameterprops } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';
import { Button, Card, Dropdown, Menu } from 'antd';
import './index.scss';
import MultiAxisTimeSeriesChart from 'components/common/charts/MultiAxisTimeSeriesChart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getKPICSVAggData,
    getKPICSVData,
    getParameterTrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import dayjs from 'dayjs';
import { criticalAreaColorMapper } from 'utils/constants';
import { ReactComponent as EmptyTrendIcon } from 'assets/icons/emptyTrendIcon.svg';
import { DownloadOutlined } from '@ant-design/icons';
import { TemplateTypeKpi } from 'types/enums';

const CriticalParameter: React.FC<CriticalParameterprops> = ({
    CriticalParameter,
}) => {
    const parametersValue = useSelector(
        (state: any) => state?.nocilDashboard?.parameters
    );
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [criticalParameter, setCriticalParameter] =
        useState<string>(CriticalParameter);
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const trendDataRedux = useSelector(
        (state: any) => state?.nocilDashboard?.parameterTrendData?.data
    );
    const kpiMetaRedux = useSelector(
        (state: any) => state?.nocilDashboard?.kpiMetaValues?.data
    );
    const dateRange = useSelector(
        (state: any) => state.nocilDashboard.filterValues
    );
    const [chartSeriesData, setChartSeriesData] = useState([]);
    const [yAxisSeriesData, setYAxisSeriesData] = useState([]);

    const fetchValueFromKPI = (idKey: any): any => {
        const foundObject = kpiMetaRedux?.find((obj: any) => obj.id === idKey);

        if (foundObject) {
            const {
                name,
                unit: { name: unitName },
            } = foundObject;
            return { name: name, dataType: unitName };
        }
    };

    const UnitsMapper: any = {};
    const unitMapperArray: any = [];

    const getYAxisCount = (type: any): any => {
        UnitsMapper[type] = unitMapperArray.length;
        unitMapperArray.push(type);

        return unitMapperArray.length - 1;
    };

    const seriesData = (): any => {
        const multiLineGraphDataSeries: any = [];
        const yAxis: any = [];

        trendDataRedux.map((item: any, index: any) => {
            const dataArray: any = [];
            const kpiValue = fetchValueFromKPI(item.id);

            item?.values?.map((tagTimestampData: any) => {
                dataArray.push([
                    tagTimestampData.timestamp,
                    tagTimestampData.value,
                ]);
            });
            multiLineGraphDataSeries?.push({
                name: kpiValue?.name,
                data: dataArray,
                color: criticalAreaColorMapper[kpiValue?.name],
                yAxis: UnitsMapper[kpiValue?.dataType]
                    ? UnitsMapper[kpiValue?.dataType]
                    : getYAxisCount(kpiValue?.dataType),
            });
            yAxis.push({
                title: {
                    text: !yAxis?.find(
                        (obj: any) => obj.title.text === kpiValue?.dataType
                    )
                        ? kpiValue?.dataType
                        : '',
                },
                opposite: !!index,
                showEmpty: false,
            });
        });
        setChartSeriesData(multiLineGraphDataSeries);
        setYAxisSeriesData(yAxis);
    };
    const getCSVData = (): any => {
        dispatch(
            getKPICSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: parametersValue,
                templateType: TemplateTypeKpi.csv, // TemplateType =1 is for pdf, 2 is for csv,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getPDFData = (): any => {
        dispatch(
            getKPICSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: parametersValue,
                templateType: TemplateTypeKpi.pdf, // TemplateType =1 is for pdf, 2 is for csv,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getCSVaggData = (): any => {
        dispatch(
            getKPICSVAggData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: parametersValue,
                templateType: TemplateTypeKpi.csv, // TemplateType =1 is for pdf, 2 is for csv,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getPDFaggData = (): any => {
        dispatch(
            getKPICSVAggData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: parametersValue,
                templateType: TemplateTypeKpi.pdf, // TemplateType =1 is for pdf, 2 is for csv,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };

    const menu = (
        <Menu onClick={({ key }) => {}}>
            <Menu.Item key="csv" onClick={getCSVData}>
                Export Raw as CSV
            </Menu.Item>
            <Menu.Item key="pdf" onClick={getPDFData}>
                Export Raw as PDF
            </Menu.Item>
            <Menu.Item key="csvAgg" onClick={getCSVaggData}>
                Export Aggregated as CSV
            </Menu.Item>
            <Menu.Item key="pdfAgg" onClick={getPDFaggData}>
                Export Aggregated as PDF
            </Menu.Item>
        </Menu>
    );
    useEffect(() => {
        if (trendDataRedux?.length) {
            seriesData();
        } else {
            setChartSeriesData([]);
            setYAxisSeriesData([]);
        }
    }, [trendDataRedux]);

    useEffect(() => {
        if (parametersValue?.length) {
            dispatch(
                getParameterTrend({
                    startTime: dayjs(startDateRedux).valueOf(),
                    endTime: dayjs(endDateRedux).valueOf(),
                    id: parametersValue,
                    enableBroadSampling: false,
                })
            );
        } else {
            dispatch(
                getParameterTrend({
                    startTime: '',
                    endTime: '',
                    id: '',
                    enableBroadSampling: false,
                })
            );
        }
    }, [parametersValue]);

    return (
        <>
            <Card
                className="criticalParametersTrendAreaWrapper"
                bordered={false}
            >
                <div className="criticalParametersTrendAreaWrapper__header">
                    <div className="criticalParametersTrendAreaWrapper__header-title">
                        {criticalParameter}
                    </div>
                    <div className="criticalParametersTrendAreaWrapper__header-exportButton">
                        <Dropdown overlay={menu} disabled={!parametersValue.length} trigger={['click']}>
                            <Button  disabled={!parametersValue.length}>
                                <DownloadOutlined />
                                <span>Export</span>
                            </Button>
                        </Dropdown>
                    </div>
                </div>
                {parametersValue.length ? (
                    <MultiAxisTimeSeriesChart
                        chartSeriesData={chartSeriesData}
                        yAxisSeriesData={yAxisSeriesData}
                        dateRange={dateRange}
                    />
                ) : (
                    <div className="criticalParametersTrendEmptyTrendWrapper">
                        <EmptyTrendIcon />
                    </div>
                )}
            </Card>
        </>
    );
};

export default CriticalParameter;
