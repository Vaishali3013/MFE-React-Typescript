import { Button, Card, Col, Dropdown, Menu, Row } from 'antd';
import './index.scss';
import LineChart from 'components/common/charts/LineChart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getKPICSVAggData,
    getKPICSVData,
    setKPITrend,
} from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import { convertToChartAreaData } from 'utils/commonFunction';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DownloadOutlined } from '@ant-design/icons';
import { TemplateTypeKpi } from 'types/enums';

const KPITrendArea: React.FC<{ kpiTrendAreaData: any }> = ({
    kpiTrendAreaData,
}): any => {
    const dispatch = useDispatch();
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const kpiTrendArea = useSelector(
        (state: any) => state?.nocilDashboard?.kpiTrend
    );
    const [chartData, setChartData] = useState<any>();
    const onCloseKPIHandler = (): any => {
        dispatch(
            setKPITrend({
                view: false,
                id: '',
                heading: '',
                subheading: '',
                unit: {},
            })
        );
    };
    const getCSVData = (): any => {
        dispatch(
            getKPICSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [kpiTrendAreaData?.kpiId],
                templateType: TemplateTypeKpi.csv, // TemplateType =1 is for excel and 2 is for csv and 3 for pdf,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getPDFData = (): any => {
        dispatch(
            getKPICSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [kpiTrendAreaData?.kpiId],
                templateType: TemplateTypeKpi.pdf, // TemplateType =1 is for excel and 2 is for csv and 3 for pdf,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getCSVaggData = (): any => {
        dispatch(
            getKPICSVAggData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                id: [kpiTrendAreaData?.kpiId],
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
                id: [kpiTrendAreaData?.kpiId],
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
        if (kpiTrendArea?.length) {
            setChartData(convertToChartAreaData(kpiTrendArea[0]?.values));
        } else {
            setChartData([]);
        }
    }, [kpiTrendArea]);

    return (
        <>
            <div className="kpiTrendAreaWrapperScrolContent">
                <div className="kpiTrendAreaWrapper">
                    <Card
                        bordered={false}
                        className="kpiTrendAreaWrapper__cardContent"
                    >
                        <div className="kpiTrendAreaWrapper__cardBody">
                            <Row className="nocilWrapper-row" gutter={[16, 16]}>
                                <Col span={18}>
                                    <div className="title">
                                        <div className="heading fs-20 fw-500">
                                            {kpiTrendAreaData?.heading} Trend
                                        </div>

                                        {kpiTrendAreaData?.subHeading ? (
                                            <div className="subHeading fs-16 fw-500">
                                                ({kpiTrendAreaData?.subHeading})
                                            </div>
                                        ) : null}
                                        {kpiTrendAreaData?.unit?.dataType ? (
                                            <div className="subHeading fs-16 fw-500">
                                                (
                                                {
                                                    kpiTrendAreaData?.unit
                                                        ?.dataType
                                                }
                                                )
                                            </div>
                                        ) : null}
                                    </div>
                                </Col>
                                <Col
                                    span={6}
                                    className="kpiTrendAreaWrapper__cardContent__header-exportCancel"
                                >
                                    <div className="kpiTrendAreaWrapper__cardContent__header-exportButton">
                                        <Dropdown
                                            overlay={menu}
                                            trigger={['click']}
                                        >
                                            <Button>
                                                <DownloadOutlined/>
                                                <span>
                                                    Export
                                                </span>
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div
                                        onClick={onCloseKPIHandler}
                                        className="closeIcon"
                                    >
                                        <CloseIcon />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col span={24} className="trendArea">
                                    <LineChart chartData={chartData} name="" />
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default KPITrendArea;
