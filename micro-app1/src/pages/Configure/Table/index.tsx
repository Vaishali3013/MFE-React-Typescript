import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'components/common/CustomButton';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { TABLETYPE } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';
import { useParams } from 'react-router';
import {
    getTableList,
    setTableState,
} from 'redux/actions/ConfigureActions/tableAction';
import TablesTable from './TablesTable';
import { useTranslation } from 'react-i18next';

const Table: React.FC = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const dispatch = useDispatch();
    const [tableSearchTimeout, setTableSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');
    const { t } = useTranslation('translation');
    const tableData = useSelector(
        (state: any) => state.configure?.table?.tableList
    );
    const tableListLoading = useSelector(
        (state: any) => state.configure?.table?.tableListLoading
    );
    const handlePage = (page: any): any => {
        setPage(page);
    };
    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        dispatch(
            getTableList({
                page,
                pageSize,
                search: searchState,
                sortColumn,
                sortOrder,
            })
        );
    }, [page, pageSize]);
    const { currentTab } = useParams();
    useEffect(() => {
        if (currentTab === 'table') {
            setSearchState('');
            dispatch(
                getTableList({
                    page,
                    pageSize,
                    search: searchState,
                    sortColumn,
                    sortOrder,
                })
            );
        }
    }, [currentTab]);

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (tableSearchTimeout) {
            clearTimeout(tableSearchTimeout);
        }
        // Debouncing for search implemented
        setTableSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getTableList({
                        page: PAGE,
                        pageSize: PAGE_SIZE,
                        search: e.target.value,
                        sortColumn,
                        sortOrder,
                    })
                );
            }, 1000)
        );
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
    };
    return (
        <>
            <div className="tableWrapper">
                <Card bordered={false}>
                    {tableData?.activeTableCount +
                        tableData?.inActiveTableCount >
                    0 ? (
                        <>
                            <div className="tableWrapper__rowHeader">
                                <Input
                                    allowClear
                                    className="tableWrapper__search"
                                    placeholder="Search table by name"
                                    prefix={<SearchOutlined />}
                                    value={searchState}
                                    onChange={handleSearchChange}
                                />
                                <div className="tableWrapper__button">
                                    <CustomButton
                                        type={t('tableDefinition.newTable')}
                                        disabled={false}
                                        handleClick={() => {
                                            dispatch(
                                                setTableState(TABLETYPE.create)
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            {tableListLoading ? (
                                <div className="view__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <Row
                                    className={
                                        tableData?.paginatedResponse
                                            ?.totalRecords > 50
                                            ? 'tableWrapper__timeCapsuleListPagination'
                                            : 'tableWrapper__timeCapsuleList'
                                    }
                                >
                                    <Col span={24}>
                                        <TablesTable
                                            data={
                                                tableData?.paginatedResponse
                                                    ?.records
                                            }
                                            payload={{
                                                page,
                                                pageSize,
                                            }}
                                            setSortColumn={setSortColumn}
                                            setSortOrder={setSortOrder}
                                            search={searchState}
                                            setPage={setPage}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        <div className="tableWrapper__noData">
                            <EmptyDataComponent
                                textValue="No Table has been created yet"
                                buttonType={{
                                    name: 'New Table',
                                    disable: false,
                                }}
                                loading={tableListLoading}
                                buttonClickHandler={() => {
                                    dispatch(setTableState(TABLETYPE.create));
                                }}
                            />
                        </div>
                    )}
                </Card>
            </div>
            {tableData?.paginatedResponse?.totalRecords > 50 ? (
                <CustomPagination
                    totalRecords={tableData?.paginatedResponse?.totalRecords}
                    setPage={handlePage}
                    page={page}
                    setPageSize={handlePageSize}
                    pageSize={pageSize}
                />
            ) : (
                ''
            )}
        </>
    );
};
export default Table;
