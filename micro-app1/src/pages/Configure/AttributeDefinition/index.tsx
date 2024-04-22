import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'components/common/CustomButton';

import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import AttributeTable from './AttributeTable';
import {
    getAttributesList,
    setAttributeState,
} from 'redux/actions/ConfigureActions/attributeActions';
import { ATTRIBUTETYPE } from 'types/enums';
import CustomPagination from 'components/common/CustomPagination';

const AttributeDefinition: React.FC = () => {
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

    const [payload, setPayload] = useState({
        page,
        pageSize,
    });

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        dispatch(getAttributesList({ ...payload }));
        setSearchState('');
    }, [payload]);

    return (
        <>
            <div className="attributeWrapper">     
                <Card bordered={false}>
                    <>
                        <div className="attributeWrapper__rowHeader">
                            <Input
                                allowClear
                                className="attributeWrapper__search"
                                placeholder="Search attribute by name"
                                prefix={<SearchOutlined />}
                                value={searchState}
                                onChange={(e) => {
                                    setSearchState(e.target.value);
                                    if (attributeSearchTimeout) {
                                        clearTimeout(attributeSearchTimeout);
                                    }
                                    // Debouncing for search implemented
                                    setAttributeSearchTimeout(
                                        setTimeout(() => {
                                            dispatch(
                                                getAttributesList({
                                                    ...payload,
                                                    search: e.target.value,
                                                })
                                            );
                                        }, 1000)
                                    );
                                }}
                            />

                            <div className="attributeWrapper__button">
                                <CustomButton
                                    type={'New Attribute'}
                                    disabled={false}
                                    handleClick={() => {
                                        dispatch(
                                            setAttributeState(
                                                ATTRIBUTETYPE.create
                                            )
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {attributeListLoading ? (
                            <div className="view__loader">
                                <Spin />
                            </div>
                        ) : attributeData?.pageResponse?.totalRecords > 0 ? (
                            <Row
                                className={
                                    attributeData?.pageResponse?.totalRecords >
                                    50
                                        ? 'attributeWrapper__attributeListPagination'
                                        : 'attributeWrapper__attributeList'
                                }
                            >
                                <Col span={24}>
                                    <AttributeTable
                                        data={
                                            attributeData?.pageResponse?.records
                                        }
                                        payload={payload}
                                        search={searchState}
                                    />
                                </Col>
                            </Row>
                        ) : (
                            <div className="attributeWrapper__noData">
                                <EmptyDataComponent
                                    textValue="Add New Attribute"
                                    buttonType={{
                                        name: 'New Attribute',
                                        disable: false,
                                    }}
                                    loading={attributeListLoading}
                                    buttonClickHandler={() => {
                                        dispatch(
                                            setAttributeState(
                                                ATTRIBUTETYPE.create
                                            )
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </>
                </Card>
            </div>

            {attributeData?.pageResponse?.totalRecords > 50 ? (
                <CustomPagination
                    totalRecords={attributeData?.pageResponse?.totalRecords}
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
export default AttributeDefinition;
