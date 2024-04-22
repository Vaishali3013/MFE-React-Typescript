import Table, { type ColumnsType } from 'antd/es/table';
import { Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import React, { useState, useEffect } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE } from 'utils/constants';
import { KPIIMPLEMENTATION, kpiColumnSort, sortOrder } from 'types/enums';
import {
    getKpiDetail,
    setKpiImplState,
} from 'redux/actions/KpisActions/kpiImplementationActions';

const KpiTable: React.FC<any> = ({
    data,
    setSortColumn,
    setSortOrder,
    setPage,
    pageSize,
    totalRecords,
    selectedOption,
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const dispatch = useDispatch();

    const kpiListLoading = useSelector(
        (state: any) => state.configure?.kpi?.kpiListLoading
    );

    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.id,
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
    }, [data]);

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const SearchNoDataText = (
        <EmptyDataComponent
            customClassName="SearchEmptyComponent"
            textValue={
                selectedOption
                    ? 'No Results, Try a different filter'
                    : 'No Results, Try a different search item'
            }
            loading={kpiListLoading}
        />
    );

    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>KPIs Name</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.name);
                                setSortOrder(sortOrder.ascending);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.name);
                                setSortOrder(sortOrder.descending);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__kpiName',
            render: (_: any, data: any) => (
                <>
                    <div
                        className="kpiTableWrapper__nameData"
                        onClick={() => {
                            dispatch(getKpiDetail(data?.id));
                            dispatch(setKpiImplState(KPIIMPLEMENTATION.view));
                        }}
                    >
                        <div className="blaTableWrapper__status">
                            <span className="fs-14 fw-500 name">
                                {data?.name?.length < 10 ? (
                                    data?.name
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {data?.name}
                                            </div>
                                        }
                                        visible={isPopoverVisibles[data?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        {data?.name?.length > 10
                                            ? // Slice the name to show in tooltip if length is greater then 10
                                              `${data?.name?.slice(0, 10)}...`
                                            : data?.name}
                                    </Popover>
                                )}
                            </span>
                        </div>
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Asset Validation Status</div>
                </div>
            ),
            dataIndex: 'validationStatus',
            key: 'validationStatus',
            className: 'column__kpiValidationStatus',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {`${data?.totalValidatedNodeCount}/${data?.totalNodeCount} is Validated`}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.type);
                                setSortOrder(sortOrder.ascending);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.type);
                                setSortOrder(sortOrder.descending);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'type',
            key: 'type',
            className: 'column__type',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.kpiType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Node Level</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.nodeLevel);
                                setSortOrder(sortOrder.ascending);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.nodeLevel);
                                setSortOrder(sortOrder.descending);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            key: 'nodeLevel',
            dataIndex: 'nodeLevel',
            className: 'column__nodeLevel',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.nodeType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>Value Type</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.valueType);
                                setSortOrder(sortOrder.ascending);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.valueType);
                                setSortOrder(sortOrder.descending);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'valueType',
            key: 'valueType',
            className: 'column__valueType',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.valueType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="kpiTableWrapper__columnTitle">
                    <div>UOM</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.UOM);
                                setSortOrder(sortOrder.ascending);
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortColumn(kpiColumnSort.UOM);
                                setSortOrder(sortOrder.descending);
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'uom',
            key: 'uom',
            className: 'column__uom',
            render: (_: any, data: any) => (
                <>
                    <div className="kpiTableWrapper__status">
                        {data?.unitOfMeasurement?.name}
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
            {kpiListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={kpiListLoading}
                    scroll={
                        totalRecords > pageSize
                            ? { y: 'calc(100vh - 350px)' }
                            : { y: 'calc(100vh - 310px)' }
                    }
                    locale={{
                        emptyText: SearchNoDataText,
                    }}
                />
            )}
        </>
    );
};

export default KpiTable;
