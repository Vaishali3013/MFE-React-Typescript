import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Row, Spin, Typography } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { TIMECAPSULETYPE } from 'types/enums';
import {
    getTimeCapsuleDetails,
    setTimeCapsuleState,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import { SearchOutlined } from '@ant-design/icons';
import ViewAttributeTable from './ViewAttributeTable';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const ViewTimeCapsule: React.FC<any> = (): any => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const dispatch = useDispatch();
    const [timeCapsuleSearchTimeout, setTimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');

    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
    );

    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );
    const { t } = useTranslation('translation');
   
    const handlePage = (page: any): any => {
        setPage(page);
    };

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        if (timeCapsuleDetails?.id) {
            dispatch(
                getTimeCapsuleDetails({
                    id: timeCapsuleDetails?.id,
                    page,
                    pageSize,
                    search: searchState,
                })
            );
        }
    }, [page, pageSize]);

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (timeCapsuleSearchTimeout) {
            clearTimeout(timeCapsuleSearchTimeout);
        }
        // Debouncing for search implemented
        setTimeCapsuleSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getTimeCapsuleDetails({
                        id: timeCapsuleDetails?.id,
                        page,
                        pageSize,
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
            <div className="viewCapsuleWrapper">
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row className="viewCapsuleWrapper__headerWrapper">
                        <Col span={24}>
                            <Row className="viewCapsuleWrapper__heading">
                                <Col
                                    span={0.5}
                                    className="viewCapsuleWrapper__backIcon"
                                >
                                    <BackIcon
                                        onClick={() =>
                                            dispatch(
                                                setTimeCapsuleState(
                                                    TIMECAPSULETYPE.display
                                                )
                                            )
                                        }
                                    />
                                </Col>
                                <Col
                                    span={22}
                                    className="viewCapsuleWrapper__headingName fw-500 fs-20"
                                >
                                    {t('timeCapsuleDefinition.viewTimeCapsule.viewTimeCapsule')}
                                </Col>
                                <Col span={1}>
                                    <Button
                                        type="primary"
                                        ghost
                                        className="addNewButton"
                                        onClick={() => {
                                            dispatch(
                                                setTimeCapsuleState(
                                                    TIMECAPSULETYPE.edit
                                                )
                                            );
                                        }}
                                        disabled={!timeCapsuleDetails?.isActive}
                                    >
                                       {t('timeCapsuleDefinition.viewTimeCapsule.edit')}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="viewCapsuleWrapper__tabContainer">
                        <div className="viewCapsuleWrapper__innerContentDetails">
                            <Text
                                type="secondary"
                                strong
                                className="createCapsuleWrapper__createRoleInnerContentText"
                            >
                                <span className="mandatoryClass">*</span> {t('timeCapsuleDefinition.viewTimeCapsule.name')}
                            </Text>
                            <Input
                                className="createCapsuleWrapper__createRoleInnerContentInput"
                                value={timeCapsuleDetails?.name}
                                disabled
                            />
                        </div>
                        <div className="viewCapsuleWrapper__innerContentDetails">
                            <Text
                                type="secondary"
                                strong
                                className="createCapsuleWrapper__createRoleInnerContentText"
                            >
                                {t('timeCapsuleDefinition.viewTimeCapsule.description')}
                            </Text>
                            <Input
                                className="createCapsuleWrapper__createRoleInnerContentInput"
                                value={timeCapsuleDetails?.description}
                                disabled
                            />
                        </div>
                    </Row>
                    <Row className="viewCapsuleWrapper__headingContainer">
                        <div className="viewCapsuleWrapper__headingAttribute">
                        {t('timeCapsuleDefinition.viewTimeCapsule.assignedAttributes')}
                        </div>
                    </Row>
                    <Row className="viewCapsuleWrapper__headingSearchContainer">
                        <Input
                            allowClear
                            className="createRolesWrapper__search"
                            placeholder="Search"
                            prefix={<SearchOutlined />}
                            value={searchState}
                            onChange={handleSearchChange}
                        />
                    </Row>
                    <div className="viewCapsuleWrapper__scrollContent">
                        <Row
                            className={
                                'viewCapsuleWrapper__timeCapsuleListPagination'
                            }
                        >
                            <Col span={24}>
                                {timeCapsuleListLoading ? (
                                    <div className="view__loader">
                                        <Spin />
                                    </div>
                                ) : (
                                    <>
                                        <ViewAttributeTable
                                            data={
                                                timeCapsuleDetails?.pageResponse
                                                    ?.records
                                            }
                                            payload={{ page, pageSize }}
                                            search={searchState}
                                            capsuleId={timeCapsuleDetails?.id}
                                        />
                                    </>
                                )}
                                {timeCapsuleDetails?.pageResponse
                                    ?.totalRecords > 0 ? (
                                    <CustomPagination
                                        totalRecords={
                                            timeCapsuleDetails?.pageResponse
                                                ?.totalRecords
                                        }
                                        setPage={handlePage}
                                        page={page}
                                        setPageSize={handlePageSize}
                                        pageSize={pageSize}
                                    />
                                ) : (
                                    ''
                                )}
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default ViewTimeCapsule;
