import {
    Button,
    Dropdown,
    Input,
    Menu,
    Select,
    Table,
    TreeSelect,
    message,
} from 'antd';
import './index.scss';
import type { ColumnsType } from 'antd/es/table';
import MultiAxisTimeSeriesChart from 'components/common/charts/MultiAxisTimeSeriesChart';
import { useEffect, useRef, useState } from 'react';
import {
    getAggregatedChartData,
    getNodeList,
    getStreamTagList,
    getModelList,
    clearDataVisualizationValues,
    getAssetCSVData,
    getDataTableList,
    clearDataTableList,
} from 'redux/actions/DataExplorer/DataVisualizationActions';
import { useDispatch, useSelector } from 'react-redux';
import { checkTimeBeforeShiftEndTime, mapTree } from 'utils/commonFunction';
import CustomHeader from 'components/common/CustomHeader';
import {
    DATA_TABLE_PAGE_SIZE,
    PAGE,
    maxRowSelectionCount,
} from 'utils/constants';
import { changeDateFilter } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { DateRangeFilter, ShiftTiming } from 'types/enums/kpiEnum';
import {
    TagOriginId,
    TemplateTypeAsset,
    dateFormat,
    sortingOrder,
    tagOriginId,
} from 'types/enums';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import DataTable from './DataTable';
import { type DataType } from 'types/interfaces/PropsInterfaces';
import { DownloadOutlined } from '@ant-design/icons';
import { exportGroups } from 'redux/actions/BulkUploadActions/bulkUploadActions';

const DataVisualization: React.FC = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'tagName',
        },
        {
            title: 'Description',
            dataIndex: 'tagDesc',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            width: '100px',
            render: (_: any, record: any) => <>{record?.dataType?.unit}</>,
        },
    ];

    const location = useLocation();
    const { pathname } = location;

    const isTrendingPage = pathname === '/data-visualization/trending';
    const rowSelectionType = isTrendingPage ? 'checkbox' : 'radio';

    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(DATA_TABLE_PAGE_SIZE);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });

    const [tagUUID, setTagUUID] = useState('');

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    const streamTagsList: any = useSelector(
        (state: any) => state.dataVisualization.streamTagList
    );
    const nodeList: any = useSelector(
        (state: any) => state.dataVisualization.nodeList
    );
    const modelList: any = useSelector(
        (state: any) => state.dataVisualization.modelList
    );
    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );
    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [selectedRowsKeys, setSelectedRowsKeys] = useState<any>([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState<any>();
    const [tagTableData, setTagTableData] = useState(streamTagsList);

    const rowSelection = {
        columnWidth: 30,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            if (selectedRows.length <= maxRowSelectionCount) {
                setSelectedRows(selectedRows);
                setSelectedRowsKeys(
                    selectedRows?.map((item: any) => {
                        return item.key;
                    })
                );
            } else {
                message.info(
                    `Maximum selectable rows are ${maxRowSelectionCount}`
                );
            }
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.name,
        }),
        selectedRowKeys: selectedRows?.map((item: any) => {
            return item.key;
        }),
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedDevice) dispatch(getStreamTagList(selectedDevice));
    }, [selectedDevice]);

    useEffect(() => {
        dispatch(
            changeDateFilter({
                startTime: checkTimeBeforeShiftEndTime(7)
                    ? dayjs()
                          .subtract(1, 'days')
                          .format(
                              `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                          )
                    : dayjs().format(
                          `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                      ),
                endTime: dayjs().format(`${dateFormat.format}`),
                dateRange: DateRangeFilter?.Today,
            })
        );
        dispatch(getModelList());
        dispatch(clearDataVisualizationValues());

        return () =>
            dispatch(
                changeDateFilter({
                    startTime: checkTimeBeforeShiftEndTime(7)
                        ? dayjs()
                              .subtract(1, 'days')
                              .format(
                                  `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                              )
                        : dayjs().format(
                              `${dateFormat.formatWithoutTime} ${ShiftTiming.shiftAStartTime}`
                          ),
                    endTime: dayjs().format(`${dateFormat.format}`),
                    dateRange: DateRangeFilter?.Today,
                })
            );
    }, []);

    const selectHandler = (value: any): any => {
        setSelectedDevice(value);
    };

    const aggregatedChartData = useSelector(
        (state: any) => state.dataVisualization.aggregatedChartData
    );
    const aggregatedChartDataLoading = useSelector(
        (state: any) => state.dataVisualization.aggregatedChartDataLoading
    );
    const dateRange = useSelector(
        (state: any) => state.nocilDashboard.filterValues
    );
    const dataTableList = useSelector(
        (state: any) => state?.dataVisualization?.dataTableList?.data
    );
    const loading = useSelector(
        (state: any) => state?.dataVisualization?.dataTableList?.loader
    );

    const timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;

    const applyHandler = (): any => {
        if (selectedRows?.length) {
            let tagUUIDString = '';
            selectedRows?.map((selectedTagValues: any) => {
                if (tagUUIDString === '') {
                    tagUUIDString = String(selectedTagValues?.key);
                } else {
                    tagUUIDString += ',' + String(selectedTagValues?.key);
                }
                setTagUUID(tagUUIDString);
            });

            dispatch(
                getAggregatedChartData({
                    startTime: new Date(dateRange?.startTime)?.getTime(),
                    endTime: new Date(dateRange?.endTime)?.getTime(),
                    tagUuidList: tagUUIDString,
                    tagOriginId: tagOriginId?.PLC,
                    timezone,
                    pageSize: pageSize,
                    pageNumber: page,
                })
            );
            dispatch(
                getDataTableList({
                    startTime: new Date(dateRange?.startTime)?.getTime(),
                    endTime: new Date(dateRange?.endTime)?.getTime(),
                    tagUuidList: tagUUIDString,
                    tagOriginId: tagOriginId?.PLC,
                    timezone,
                    pageSize: pageSize,
                    pageNumber: page,
                    sortOrder: sortingOrder.descending,
                })
            );
        } else {
            setChartSeriesData([]);
            setYAxisSeriesData([]);
        }
    };

    useEffect(() => {
        applyHandler();
    }, [selectedRows, pageSize, page]);

    const [chartSeriesData, setChartSeriesData] = useState<any>([]);
    const [yAxisSeriesData, setYAxisSeriesData] = useState<any>([]);

    const UnitsMapper: any = {};
    const unitMapperArray: any = [];

    const getYAxisCount = (type: any): any => {
        UnitsMapper[type] = unitMapperArray?.length;
        unitMapperArray?.push(type);

        return unitMapperArray?.length - 1;
    };

    const uuidToNameMapper = (uuid: any): any => {
        let resultTagName = '';

        streamTagsList?.map(function (el: any) {
            if (el?.uuid === uuid) resultTagName = el?.tagName;
        });
        return resultTagName;
    };

    useEffect(() => {
        const multiLineGraphDataSeries: any = [];
        const yAxis: any = [];
        aggregatedChartData?.streams?.map((tagValue: any, index: number) => {
            const dataArray: any = [];
            if (!UnitsMapper[tagValue.unit])
                if (UnitsMapper[tagValue.unit] !== 0)
                    if (tagValue?.readings?.length) {
                        yAxis.push({
                            title: {
                                text: tagValue.unit,
                            },
                            opposite: !!unitMapperArray?.length,
                            showEmpty: false,
                        });
                    }
            const sortedTimestamps = tagValue?.readings?.sort(
                (a: any, b: any) => a?.timestamp - b?.timestamp
            );
            if (sortedTimestamps?.length) {
                sortedTimestamps?.map((tagTimestampData: any) => {
                    dataArray?.push([
                        tagTimestampData.timestamp,
                        tagTimestampData.value,
                    ]);
                });
            }
            if (sortedTimestamps?.length) {
                multiLineGraphDataSeries?.push({
                    name: uuidToNameMapper(tagValue.uuid),
                    data: dataArray,
                    yAxis:
                        UnitsMapper[tagValue.unit] ||
                        UnitsMapper[tagValue.unit] === 0
                            ? UnitsMapper[tagValue.unit]
                            : getYAxisCount(tagValue.unit),
                });
            }
        });
        setChartSeriesData(multiLineGraphDataSeries);
        setYAxisSeriesData(yAxis);
    }, [aggregatedChartData]);

    useEffect(() => {
        setTagTableData(streamTagsList);
    }, [streamTagsList]);
    const handleChange = (event: any): any => {
        const inputValue = event.target.value;
        const resultArray: any = [];
        const disabledArray: any = [];
        streamTagsList.map((streamData: any) => {
            if (
                streamData?.tagName
                    ?.toLowerCase()
                    .includes(inputValue?.toLowerCase())
            ) {
                resultArray.push({ ...streamData, disabled: false });
            } else {
                disabledArray.push({ ...streamData, disabled: true });
            }
        });
        setTagTableData([...resultArray, ...disabledArray]);
    };

    const modelListOptions = (): any => {
        const result: any = [];
        modelList?.map((modelObject: any) => {
            result.push({
                label: modelObject?.name,
                value: modelObject?.rootNode?.id,
            });
        });
        return result;
    };

    useEffect(() => {
        selectedModel && dispatch(getNodeList(selectedModel));
    }, [selectedModel]);

    const modelSelectHandler = (value: any): any => {
        setSelectedModel(value);
    };

    const chartRef: any = useRef(null);

    useEffect(() => {
        aggregatedChartDataLoading
            ? chartRef.current?.chart?.showLoading()
            : chartRef.current?.chart?.hideLoading();
    }, [aggregatedChartDataLoading]);

    const getRowClassName = (record: any): any => {
        return record.disabled ? 'hide-row' : '';
    };

    useEffect(() => {
        setSelectedRows([]);
        setSelectedRowsKeys([]);
        setSelectedDevice(null);
        setSelectedModel(null);
        setTagTableData([]);
        dispatch(clearDataTableList());
    }, [isTrendingPage]);

    const getCSVData = (): any => {
        dispatch(
            getAssetCSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                tagUuidList: selectedRowsKeys,
                templateType: TemplateTypeAsset.csv, // 2 is for csv, 3 for pdf,
                tagOriginId: TagOriginId.PLC, // this denotes tag category wherr PLC = 0, USER = 1, KPI = 2
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getPDFData = (): any => {
        dispatch(
            getAssetCSVData({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                tagUuidList: selectedRowsKeys,
                templateType: TemplateTypeAsset.pdf, // TemplateType = 2 is for csv, 3 for pdf,
                tagOriginId: TagOriginId.PLC, // this denotes tag category wherr PLC = 0, USER = 1, KPI = 2
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getCSVAggData = (): any => {
        dispatch(
            exportGroups({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                tagUuidList: selectedRowsKeys,
                templateType: TemplateTypeAsset.csv, // TemplateType = 2 is for csv, 3 for pdf,
                tagOriginId: TagOriginId.PLC, // this denotes tag category wherr PLC = 0, USER = 1, KPI = 2
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const getPDFAggData = (): any => {
        dispatch(
            exportGroups({
                startTime: dayjs(startDateRedux).valueOf(),
                endTime: dayjs(endDateRedux).valueOf(),
                tagUuidList: selectedRowsKeys,
                templateType: TemplateTypeAsset.pdf, // TemplateType = 2 is for csv, 3 for pdf,
                tagOriginId: TagOriginId.PLC, // this denotes tag category wherr PLC = 0, USER = 1, KPI = 2
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
        );
    };
    const menu = (
        <Menu onClick={({ key }): any => {}}>
            <Menu.Item key="csv" onClick={getCSVData}>
                Export Raw as CSV
            </Menu.Item>
            <Menu.Item key="pdf" onClick={getPDFData}>
                Export Raw as PDF
            </Menu.Item>
            <Menu.Item key="csvAgg" onClick={getCSVAggData}>
                Export Aggregated as CSV
            </Menu.Item>
            <Menu.Item key="pdfAgg" onClick={getPDFAggData}>
                Export Aggregated as PDF
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="dataVisualizationDashboard">
            <CustomHeader
                heading="Data Visualization"
                currentTimePicker={true}
                customDateTimePicker={true}
                applyClickHandler={applyHandler}
            />
            <div
                className={`data-visualization-container ${
                    isTrendingPage ? 'trending-container' : 'other-container'
                }`}
            >
                <div className="twenty">
                    <div className="device-tag-selector-header child">
                        <div>Device Tags</div>
                    </div>
                    <Select
                        className="child"
                        placeholder="Select Model"
                        style={{ width: '100%' }}
                        size="small"
                        options={modelListOptions()}
                        onSelect={modelSelectHandler}
                        value={selectedModel}
                    />

                    <TreeSelect
                        className="child"
                        showSearch
                        placeholder="Select Node"
                        value={selectedDevice || undefined}
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={
                            nodeList?.node ? [mapTree(nodeList.node)] : []
                        }
                        size="small"
                        onSelect={selectHandler}
                    />
                    <Input
                        className="search-tag"
                        placeholder="Search Tags"
                        size="small"
                        onChange={handleChange}
                    />
                    <Table
                        rowSelection={{
                            type: rowSelectionType,
                            ...rowSelection,
                        }}
                        className="child"
                        columns={columns.slice(0, 2)}
                        dataSource={
                            selectedModel && selectedDevice
                                ? tagTableData.map(
                                      ({ uuid, ...rest }: any) => ({
                                          key: uuid,
                                          ...rest,
                                      })
                                  )
                                : ''
                        }
                        pagination={false}
                        size="small"
                        rowClassName={getRowClassName}
                    />
                </div>
                <div className="eighty">
                    {isTrendingPage ? (
                        <div>
                            <div className="data-visualization-container__header">
                                <div className="data-visualization-container__header__title">
                                    Trends
                                </div>
                                <Dropdown overlay={menu} disabled={!selectedRowsKeys.length} trigger={['click']}>
                                    <Button>
                                        <DownloadOutlined className="export-name" />
                                        <span className="export-name">
                                            Export
                                        </span>
                                    </Button>
                                </Dropdown>
                            </div>
                            <div className="data-visualization-container__multiAxisChart">
                                {selectedModel && selectedDevice ? (
                                    <MultiAxisTimeSeriesChart
                                        chartSeriesData={chartSeriesData}
                                        yAxisSeriesData={yAxisSeriesData}
                                        chartRef={chartRef}
                                        dateRange={dateRange}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>

                            <Table
                                columns={columns}
                                dataSource={selectedRows}
                                pagination={false}
                                size="small"
                            />
                        </div>
                    ) : (
                        <DataTable
                            dataSource={dataTableList}
                            selectedTagRows={selectedRows}
                            page={page}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            pageSize={pageSize}
                            loading={loading}
                            startTime={new Date(
                                dateRange?.startTime
                            )?.getTime()}
                            endTime={new Date(dateRange?.endTime)?.getTime()}
                            tagUuidList={tagUUID}
                            tagOriginId={tagOriginId?.PLC}
                            timezone={timezone}
                            pageNumber={page}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DataVisualization;
