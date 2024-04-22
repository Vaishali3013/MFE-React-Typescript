import React, { useEffect, useState } from 'react';
import './index.scss';
import { Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AssignAttributeTable from './AssignAttributeTable.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { getAttributesList } from 'redux/actions/ConfigureActions/attributeActions';
import { StatusType } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';
import { useTranslation } from 'react-i18next';

const CreateTimeCapsuleStep2: React.FC<any> = ({
    setAttributesSelectedIds,
}: any) => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const dispatch = useDispatch();
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');

    const attributeData = useSelector(
        (state: any) => state.configure?.attributes?.attributesList
    );

    const attributeListLoading = useSelector(
        (state: any) => state.configure?.attributes?.attributesListLoading
    );
    const handlePage = (page: any): any => {
        setPage(page);
    };

    const { t } = useTranslation('translation');

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        dispatch(getAttributesList({ page, pageSize, status: StatusType.All }));
    }, [page, pageSize]);

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (attributeSearchTimeout) {
            clearTimeout(attributeSearchTimeout);
        }
        // Debouncing for search implemented
        setAttributeSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getAttributesList({
                        page,
                        pageSize,
                        search: e.target.value,
                        status: StatusType.All,
                    })
                );
            }, 1000)
        );
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
    };

    return (
        <div>
            <div className="timeCapsuleWrapper">
                <Row className="viewCapsuleWrapper__headingContainer">
                    <div className="viewCapsuleWrapper__headingAttribute">
                    {t('timeCapsuleDefinition.createTimeCapsule.selectAttributeToAssign')}
                    </div>
                </Row>
                <Row className="viewCapsuleWrapper__headingSearchContainer">
                    <Input
                        allowClear
                        className="timeCapsuleWrapper__search"
                        placeholder={t('timeCapsuleDefinition.createTimeCapsule.searchPlaceHolder')}
                        prefix={<SearchOutlined />}
                        value={searchState}
                        onChange={handleSearchChange}
                    />
                </Row>
                <>
                    {attributeListLoading ? (
                        <div className="view__loader">
                            <Spin />
                        </div>
                    ) : (
                        <>
                            <Row
                                className={
                                    attributeData?.pageResponse?.totalRecords >
                                    50
                                        ? 'createCapsuleWrapper__timeCapsuleAttributeListPagination'
                                        : 'createCapsuleWrapper__timeCapsuleAttributeList'
                                }
                            >
                                <Col span={24}>
                                    <AssignAttributeTable
                                        data={
                                            attributeData?.pageResponse?.records
                                        }
                                        payload={{ page, pageSize }}
                                        search={searchState}
                                        status={StatusType.All}
                                        setAttributesSelectedIds={
                                            setAttributesSelectedIds
                                        }
                                        totalCountWithoutSearch={
                                            attributeData?.totalActiveAttribute +
                                            attributeData?.totalDeactivateAttribute
                                        }
                                    />

                                    {attributeData?.pageResponse?.totalRecords >
                                    50 ? (
                                        <CustomPagination
                                            totalRecords={
                                                attributeData?.pageResponse
                                                    ?.totalRecords
                                            }
                                            setPage={handlePage}
                                            page={page}
                                            setPageSize={handlePageSize}
                                            pageSize={pageSize}
                                            isPositionFixed={false}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            </div>
        </div>
    );
};

export default CreateTimeCapsuleStep2;
