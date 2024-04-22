import Table from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { EditableCell, EditableRow } from './EditableContext';
import { ReactComponent as DeleteIconTable } from 'assets/icons/DeleteIconTable.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/attributeRemoveIcon.svg';
import { ReactComponent as ListingIcon } from 'assets/icons/verticalListIcon.svg';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useTranslation } from 'react-i18next';
const ValidateTable: React.FC<any> = ({ dataSource, setDataSource }) => {
    const { t } = useTranslation('translation');
    const [columnState, setColumnState] = useState<any[]>([]);
    const [removeModal, setRemoveModal] = useState<number | null>(null);
    const tableColumnList = useSelector(
        (state: any) => state?.implementation?.table?.tableColumnsList
    );
    useEffect(() => {
        createColumns(tableColumnList);
    }, [tableColumnList, dataSource]);
    const SearchNoDataText = (
        <EmptyDataComponent
            textValue={t('implementation.table.noData')}
            customClassName="SearchEmptyComponent"
        />
    );
    const handleSave: any = (row: any, dataSource: any) => {
        const newData = [...dataSource];
        const index = newData?.findIndex((item) => row?.key === item?.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const handleDelete: any = (key: React.Key) => {
        const newData = dataSource?.filter((item: any) => item?.key !== key);
        setDataSource(newData);
    };

    const createColumns: any = (columnNames: any[]) => {
        const tempCol: any[] = [];
        tempCol.push({
            title: '',
            dataIndex: 'icon',
            key: 'icon',
            width: 50,
            render: (text: any, record: any) => (
                <ListingIcon style={{ marginRight: 8 }} />
            ),
        });
        columnNames?.map((col) =>
            tempCol.push({
                title: <div>{col.columnName}</div>,
                dataIndex: col.columnName,
                key: col.columnName,
                editable: true,
                width:
                    tableColumnList?.length > 5 &&
                    (col?.columnName?.length > 12 ? 230 : 160), // Note- fixed the width to provide vertical scroll for more than 5 columns
                className: 'editableColumn',
                onCell: (record: any) => ({
                    record,
                    editable: true,
                    dataIndex: col.columnName,
                    title: col.columnName,
                    handleSave,
                    dataSource: dataSource,
                }),
            })
        );
        tempCol.push({
            title: t('implementation.table.action'),
            dataIndex: 'action',
            width: 120,
            className: 'column__action',
            render: (_: any, record: any) => (
                <>
                    <a
                        className="deleteicon"
                        onClick={() => {
                            setRemoveModal(record?.key);
                        }}
                    >
                        <DeleteIconTable />
                    </a>
                </>
            ),
        });
        setColumnState(tempCol);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    return (
        <>
            <Table
                className="validateTable"
                components={components}
                columns={columnState}
                dataSource={dataSource}
                pagination={false}
                rowClassName={() => 'editable-row'}
                scroll={{ y: 'calc(100vh - 410px)' }}
                locale={{ emptyText: SearchNoDataText }}
            />
            {removeModal && (
                <ConfirmationModal
                    open={removeModal}
                    icon={<DeleteIcon />}
                    onOk={() => {
                        handleDelete(removeModal);
                        setRemoveModal(null);
                    }}
                    onCancel={() => {
                        setRemoveModal(null);
                    }}
                    text={t('implementation.removeModalText')}
                />
            )}
        </>
    );
};
export default ValidateTable;
