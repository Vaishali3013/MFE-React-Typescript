import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'components/common/CustomButton';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { KPITYPE } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';
import { useParams } from 'react-router';
import {
    getKpiList,
    setKpiState,
} from 'redux/actions/ConfigureActions/kpiActions';
import { useTranslation } from 'react-i18next';
import KpiTable from './KpiTable';

const KPI: React.FC = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [timeCapsuleSearchTimeout, setTimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');

    const kpiData = useSelector((state: any) => state.configure?.kpi?.kpiList);

    const kpiListLoading = useSelector(
        (state: any) => state.configure?.kpi?.kpiListLoading
    );

    const handlePage = (page: any): any => {
        setPage(page);
    };

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        dispatch(
            getKpiList({
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
        if (currentTab === 'kpi') {
            setSearchState('');
            dispatch(getKpiList({ page, pageSize }));
        }
    }, [currentTab]);

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (timeCapsuleSearchTimeout) {
            clearTimeout(timeCapsuleSearchTimeout);
        }
        // Debouncing for search implemented
        setTimeCapsuleSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getKpiList({
                        page: PAGE,
                        pageSize: PAGE_SIZE,
                        search: e.target.value,
                    })
                );
            }, 1000)
        );
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
    };

    return (
        <>
            <div className="kpiWrapper">
                <Card bordered={false}>
                    {kpiData?.totalActiveKpi + kpiData?.totalInActiveKpi > 0 ? (
                        <>
                            <div className="kpiWrapper__rowHeader">
                                <Input
                                    allowClear
                                    className="kpiWrapper__search"
                                    placeholder={t(
                                        'kpiDefinition.kpiTable.searchKpiPlaceholder'
                                    )}
                                    prefix={<SearchOutlined />}
                                    value={searchState}
                                    onChange={handleSearchChange}
                                />

                                <div className="kpiWrapper__button">
                                    <CustomButton
                                        type={'New KPIs'}
                                        disabled={false}
                                        handleClick={() => {
                                            dispatch(
                                                setKpiState(KPITYPE.create)
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            {kpiListLoading ? (
                                <div className="view__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <Row
                                    className={
                                        kpiData?.pageResponse?.totalRecords > 50
                                            ? 'kpiWrapper__kpiListPagination'
                                            : 'kpiWrapper__kpiList'
                                    }
                                >
                                    <Col span={24}>
                                        <KpiTable
                                            data={
                                                kpiData?.pageResponse?.records
                                            }
                                            payload={{ page, pageSize }}
                                            search={searchState}
                                            setSortColumn={setSortColumn}
                                            setSortOrder={setSortOrder}
                                            setPage={setPage}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        <div className="kpiWrapper__noData">
                            <EmptyDataComponent
                                textValue={t(
                                    'kpiDefinition.kpiTable.emptyDataText'
                                )}
                                buttonType={{
                                    name: 'New KPIs',
                                    disable: false,
                                }}
                                loading={kpiListLoading}
                                buttonClickHandler={() => {
                                    dispatch(setKpiState(KPITYPE.create));
                                }}
                            />
                        </div>
                    )}
                </Card>
            </div>

            {kpiData?.pageResponse?.totalRecords > PAGE_SIZE ? (
                <CustomPagination
                    totalRecords={kpiData?.pageResponse?.totalRecords}
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
export default KPI;
