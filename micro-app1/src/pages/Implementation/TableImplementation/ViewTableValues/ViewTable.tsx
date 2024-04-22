import Table from 'antd/es/table';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useTranslation } from 'react-i18next';
const ViewTable: React.FC<any> = ({ pageSize }) => {
    const { t } = useTranslation('translation');
    const [columnState, setColumnState] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);

    const tableValuesLoading = useSelector(
        (state: any) => state?.implementation?.table?.tableValuesLoading
    );
    const tableColumnList = useSelector(
        (state: any) => state?.implementation?.table?.tableColumnsList
    );
    const tableValuesList = useSelector(
        (state: any) => state?.implementation?.table?.tableValuesList?.records
    );
    const totalCount = useSelector(
        (state: any) =>
            state?.implementation?.table?.tableValuesList?.totalRecords
    );
    useEffect(() => {
        createColumns(tableColumnList);
        const temp: any = [];
        tableValuesList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item?.row_sequence_id,
                value: item?.row_sequence_id,
                label: item?.row_sequence_id,
            });
        });
        setDataSource(temp);
    }, [tableColumnList, tableValuesList]);

    const SearchNoDataText = (
        <EmptyDataComponent
            textValue={t('implementation.table.noData')}
            customClassName="SearchEmptyComponent"
        />
    );

    const createColumns: any = (columnNames: any[]) => {
        const tempCol: any[] = [];
        columnNames.map((col) =>
            tempCol.push({
                title: <div>{col.columnName}</div>,
                dataIndex: col.columnName,
                key: col.columnName,
                width: tableColumnList?.length > 6 && (col?.columnName?.length > 12 ? 230 : 160), // Note- fixed the width to provide vertical scroll for more than 6 columns
            })
        );
        setColumnState(tempCol);
    };
    return (
        <>
            {tableValuesLoading ? (
                <div className="implementation_loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    className="validateTable"
                    columns={columnState}
                    dataSource={dataSource}
                    pagination={false}
                    rowClassName={() => 'editable-row'}
                    scroll={
                        totalCount > pageSize
                            ? { y: 'calc(100vh - 450px)' }
                            : { y: 'calc(100vh - 390px)' }
                    }
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}
        </>
    );
};
export default ViewTable;
