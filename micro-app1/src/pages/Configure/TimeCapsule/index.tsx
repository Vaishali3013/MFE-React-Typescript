import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'components/common/CustomButton';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { TIMECAPSULETYPE } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';
import {
    getTimeCapsuleList,
    setTimeCapsuleState,
    updateTimeCapsuleDataForLocal,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import TimeCapsuleTable from './TimeCapsuleTable';
import { useParams } from 'react-router';

const TimeCapsule: React.FC = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const dispatch = useDispatch();
    const [timeCapsuleSearchTimeout, setTimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');

    const timeCapsuleData = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleList
    );

    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleListLoading
    );

    const handlePage = (page: any): any => {
        setPage(page);
    };

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        dispatch(
            updateTimeCapsuleDataForLocal({
                nameState: '',
                descriptionState: '',
            })
        );
    }, []);

    useEffect(() => {
        dispatch(getTimeCapsuleList({ page, pageSize, search: searchState }));
    }, [page, pageSize]);

    const { currentTab } = useParams();
    useEffect(() => {
        if (currentTab === 'time-capsule') {
            setSearchState('');
            dispatch(getTimeCapsuleList({ page, pageSize }));
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
                    getTimeCapsuleList({
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
            <div className="timeCapsuleWrapper">
                <Card bordered={false}>
                    {timeCapsuleData?.totalActiveCount +
                        timeCapsuleData?.totalInactiveCount >
                    0 ? (
                        <>
                            <div className="timeCapsuleWrapper__rowHeader">
                                <Input
                                    allowClear
                                    className="timeCapsuleWrapper__search"
                                    placeholder="Search time capsule by name"
                                    prefix={<SearchOutlined />}
                                    value={searchState}
                                    onChange={handleSearchChange}
                                />

                                <div className="timeCapsuleWrapper__button">
                                    <CustomButton
                                        type={'Add Time Capsule'}
                                        disabled={false}
                                        handleClick={() => {
                                            dispatch(
                                                setTimeCapsuleState(
                                                    TIMECAPSULETYPE.create
                                                )
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            {timeCapsuleListLoading ? (
                                <div className="view__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <Row
                                    className={
                                        timeCapsuleData?.pageResponse
                                            ?.totalRecords > 50
                                            ? 'timeCapsuleWrapper__timeCapsuleListPagination'
                                            : 'timeCapsuleWrapper__timeCapsuleList'
                                    }
                                >
                                    <Col span={24}>
                                        <TimeCapsuleTable
                                            data={
                                                timeCapsuleData?.pageResponse
                                                    ?.records
                                            }
                                            payload={{ page, pageSize }}
                                            search={searchState}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        <div className="timeCapsuleWrapper__noData">
                            <EmptyDataComponent
                                textValue="No Time Capsule are added yet"
                                buttonType={{
                                    name: 'New Time Capsule',
                                    disable: false,
                                }}
                                loading={timeCapsuleListLoading}
                                buttonClickHandler={() => {
                                    dispatch(
                                        setTimeCapsuleState(
                                            TIMECAPSULETYPE.create
                                        )
                                    );
                                }}
                            />
                        </div>
                    )}
                </Card>
            </div>

            {timeCapsuleData?.pageResponse?.totalRecords > 50 ? (
                <CustomPagination
                    totalRecords={timeCapsuleData?.pageResponse?.totalRecords}
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
export default TimeCapsule;
