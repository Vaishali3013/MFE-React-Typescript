import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import CustomPagination from 'components/common/CustomPagination';
import {
    getKpiList,
    getNodeLevelList,
} from 'redux/actions/KpisActions/kpiImplementationActions';
import KpiTable from './KpiTable';

const KpiListing: React.FC = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [dropdownList, setDropdownList] = useState([]);
    const [radioDropdownOpen, setRadioDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    const [kpiListSearchTimeout, setKpiListSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');

    const kpiData = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.kpiData
    );

    const kpiList = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.kpiList
    );

    const kpiListLoading = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.kpiListLoading
    );

    const nodeLevelList = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.nodeLevelList
    );

    const onOpenChange = (openStatus: any): any => {
        setRadioDropdownOpen(openStatus);
    };

    const handleDropdownChange = (nodeLevel: any): void => {
        setSelectedOption(nodeLevel);
        setSortColumn(null);
        setSortOrder(null);
        dispatch(
            getKpiList({
                page : PAGE,
                pageSize : PAGE_SIZE,
                search: searchState,
                nodeTypeId: nodeLevel,
                activeStatus: 1,
            })
        );
    };
    useEffect(() => {
        dispatch(getNodeLevelList());
    }, []);

    useEffect(() => {
        const tempLevelArray = nodeLevelList?.map(
            (item: { id: string; name: string }) => ({
                value: item?.id,
                label: item?.name,
                key: item?.id,
            })
        );
        tempLevelArray.unshift({ value: null, label: 'All Levels', key: null });
        setDropdownList(tempLevelArray);
    }, [nodeLevelList]);

    useEffect(() => {
        dispatch(
            getKpiList({
                page,
                pageSize,
                search: searchState,
                sortColumn,
                sortOrder,
                nodeTypeId: selectedOption,
                activeStatus: 1,
            })
        );
    }, [page, pageSize, sortOrder, sortColumn]);

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (kpiListSearchTimeout) {
            clearTimeout(kpiListSearchTimeout);
        }
        // Debouncing for search implemented
        setKpiListSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getKpiList({
                        page: PAGE,
                        pageSize: pageSize,
                        sortOrder: sortOrder,
                        sortColumn: sortColumn,
                        search: e.target.value,
                        nodeTypeId: selectedOption,
                        activeStatus: 1,
                    })
                );
            }, 1000)
        );
        setPage(PAGE);
    };

    return (
        <>
            <div className="kpiImplementationListWrapper">
                <Card bordered={false}>
                    {kpiData?.totalActiveKpi + kpiData?.totalInActiveKpi > 0 ? (
                        <>
                            <div className="kpiImplementationListWrapper__rowHeader">
                                <Input
                                    allowClear
                                    className="kpiImplementationListWrapper__search"
                                    placeholder={'Search'}
                                    prefix={<SearchOutlined />}
                                    value={searchState}
                                    onChange={handleSearchChange}
                                />
                                <Select
                                    className="kpiImplementationListWrapper__dropdown downarrow"
                                    style={{ width: '100%' }}
                                    defaultValue={'All Levels'}
                                    open={radioDropdownOpen}
                                    onChange={handleDropdownChange}
                                    onDropdownVisibleChange={onOpenChange}
                                    placeholder="Select Node Level"
                                    options={dropdownList}
                                />
                            </div>
                            {kpiListLoading ? (
                                <div className="view__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <Row
                                    className={
                                        kpiData?.pageResponse?.totalRecords > 50
                                            ? 'kpiImplementationListWrapper__kpiListPagination'
                                            : 'kpiImplementationListWrapper__kpiList'
                                    }
                                >
                                    <Col span={24}>
                                        <KpiTable
                                            data={kpiList}
                                            page={page}
                                            pageSize={pageSize}
                                            search={searchState}
                                            setSortColumn={setSortColumn}
                                            setSortOrder={setSortOrder}
                                            setPage={setPage}
                                            totalRecords={
                                                kpiData?.pageResponse
                                                    ?.totalRecords
                                            }
                                            selectedOption={selectedOption}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        <div className="kpiImplementationListWrapper__noData">
                            <EmptyDataComponent
                                textValue={'No KPIs have been added yet'}
                                loading={kpiListLoading}
                            />
                        </div>
                    )}
                </Card>
            </div>

            {kpiData?.pageResponse?.totalRecords > PAGE_SIZE ? (
                <CustomPagination
                    totalRecords={kpiData?.pageResponse?.totalRecords}
                    setPage={setPage}
                    page={page}
                    setPageSize={setPageSize}
                    pageSize={pageSize}
                />
            ) : (
                ''
            )}
        </>
    );
};
export default KpiListing;
