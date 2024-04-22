import React, { useEffect, useState } from 'react';
import './index.scss';
import { Table, Spin } from 'antd';
import dayjs from 'dayjs';
import { dateFormat, sortingOrder } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { useDispatch } from 'react-redux';
import { getDataTableList } from 'redux/actions/DataExplorer/DataVisualizationActions';
import { type ColumnsType } from 'antd/es/table';

const DataTable: React.FC<any> = ({
    dataSource,
    selectedTagRows,
    page,
    setPage,
    setPageSize,
    pageSize,
    loading,
    startTime,
    endTime,
    tagUuidList,
    tagOriginId,
    timezone,
    pageNumber,
}) => {
    const [data, setData] = useState<any>([]);
    const dispatch = useDispatch();

    const dataSources = dataSource?.streams;
    const dataMapper = (): [] => {
        const temp: any = [];
        dataSources?.map((item: any) => {
            const row = selectedTagRows?.filter(
                (tag: any) => tag?.key === item?.uuid
            );

            temp?.push({
                ...item,
                tagName: row[0]?.tagName,
                description: row[0]?.tagDesc,
                value: item?.readings[0]?.value,
                dateTime: dayjs(item?.readings[0]?.timestamp)?.format(
                    `${dateFormat?.format}`
                ),
            });
        });
        return temp;
    };

    useEffect(() => {
        setData(dataMapper());
    }, [dataSources, page, pageSize]);

    const columns: ColumnsType<any> = [
        {
            title: 'Tag Name',
            dataIndex: 'tagName',
            key: 'tagName',
            width: '20%',
            ellipsis: true,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '20%',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            width: '20%',
        },
        {
            title: (
                <>
                    <div className="userTableWrapper__columnTitle">
                        <div>Date & Time</div>
                        <div className="sortArrows">
                            <UpArrow
                                onClick={() => {
                                    dispatch(
                                        getDataTableList({
                                            startTime: startTime,
                                            endTime: endTime,
                                            tagUuidList: tagUuidList,
                                            tagOriginId: tagOriginId,
                                            timezone: timezone,
                                            pageSize: pageSize,
                                            pageNumber: page,
                                            sortOrder: sortingOrder.ascending,
                                        })
                                    );
                                }}
                            />
                            <DownArrow
                                fill="white"
                                onClick={() => {
                                    dispatch(
                                        getDataTableList({
                                            startTime: startTime,
                                            endTime: endTime,
                                            tagUuidList: tagUuidList,
                                            tagOriginId: tagOriginId,
                                            timezone: timezone,
                                            pageSize: pageSize,
                                            pageNumber: page,
                                            sortOrder: sortingOrder.descending,
                                        })
                                    );
                                }}
                            />
                        </div>
                    </div>
                </>
            ),
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: '20%',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            width: '20%',
        },
    ];

    return (
        <>
            <div>
                {loading ? (
                    <div className="view__loader">
                        <Spin />
                    </div>
                ) : (
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        showSorterTooltip={false}
                    />
                )}
                {dataSource?.totalRecord > 10 ? (
                    <div>
                        <CustomPagination
                            totalRecords={dataSource?.totalRecord}
                            page={page}
                            setPage={setPage}
                            setPageSize={setPageSize}
                            pageSize={pageSize}
                            pageSizeOptions={[10, 20, 30, 40, 50]}
                            defaultPageSize={10}
                        />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default DataTable;
