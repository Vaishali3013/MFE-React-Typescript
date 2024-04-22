import { Row, Col, Divider, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import './index.scss';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import AssignedAttributeTable from './AssignedAttributeTable';
import {
    getAssignedAttributeList,
    getUnassignedAttributeList,
} from 'redux/actions/ImplementationActions/attributeActions';
import { useDispatch, useSelector } from 'react-redux';
import { implementationAssignStatus, BUTTONTYPE, EMPTY, implementationTabItems } from 'types/enums';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AssignedAttribute = ({ setAddAttribute }: any): any => {
    const { t } = useTranslation('translation');
    const [showFooter, setShowFooter] = useState(false);
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [assignedTable, setassignedTable] = useState();
    const dispatch = useDispatch();
    const [searchState, setSearchState] = useState<string | null>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const { currentTab } = useParams();
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const [payload, setPayload] = useState({
        page,
        pageSize,
        sortOrder,
        sortColumn,
    });

    useEffect(() => {
        setPayload({
            ...payload,
            page,
            pageSize,
            sortOrder,
            sortColumn,
        });
    }, [page, pageSize, sortOrder, sortColumn]);
    const attributeAssignedData = useSelector(
        (state: any) => state.implementation?.attribute?.assignedAttributeList
    );

    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );

    const attributeListLoading = useSelector(
        (state: any) => state.implementation?.attribute?.attributesListLoading
    );

    const isValidateEditSuccess = useSelector(
        (state: any) => state.implementation?.attribute?.isValidateEditSuccess
    );

    useEffect(() => {
        setassignedTable(attributeAssignedData?.pageResponse?.records);
    }, [attributeAssignedData]);
    useEffect(() => {
       if (currentTab === implementationTabItems.ATTRIBUTE) {
        const updatedPayload = {
            ...payload,
            assetId: selectedAsset?.key,
            assignStatus: implementationAssignStatus.ASSIGN,
            search: searchState ?? '',
        };
        dispatch(getAssignedAttributeList(updatedPayload));
        setSelectedRowIds([]);
    }
    }, [payload, selectedAsset?.key, currentTab, isValidateEditSuccess]);

    useEffect(() => {
        setSearchState(null);
        setPageSize(PAGE_SIZE);
        setPage(PAGE);
        searchState?.length &&
            dispatch(
                getAssignedAttributeList({
                    page: PAGE,
                    pageSize: PAGE_SIZE,
                    assetId: selectedAsset?.key,
                    assignStatus: implementationAssignStatus.ASSIGN,
                    search: '',
                })
            );
    }, [selectedAsset?.key]);

    return (
        <>
            {attributeAssignedData?.pageResponse?.records?.length ||
            searchState !== null ? (
                <div className="assignedAttribute">
                    <Row className="assignedAttribute__header">
                        <Col span={20}>
                            <span className="fw-500 fs-16 assignedAttribute__assignText">
                                {t(
                                    'implementation.attribute.assignedAttributes'
                                )}
                            </span>
                        </Col>

                        <Col span={4}>
                            <div className="assignedAttribute__assignMoreBtn">
                                <CustomButton
                                    type={BUTTONTYPE.assignMore}
                                    disabled={false}
                                    handleClick={() => {
                                        setAddAttribute(true);
                                        dispatch(
                                            getUnassignedAttributeList({
                                                ...payload,
                                                 page: PAGE,
                                                pageSize: PAGE_SIZE,
                                                assetId: selectedAsset?.key,
                                                assignStatus:
                                                    implementationAssignStatus.UNASSIGN,
                                            })
                                        );
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <div className="assignedAttribute__searchBox">
                        <Input
                            allowClear
                            className="assignedAttribute__search"
                            placeholder={t('commonStr.search')}
                            prefix={<SearchOutlined />}
                            value={searchState ?? EMPTY.string}
                            onChange={(e) => {
                                setPage(PAGE);
                                setSearchState(e.target.value);

                                if (attributeSearchTimeout) {
                                    clearTimeout(attributeSearchTimeout);
                                }
                                // Debouncing for search implemented
                                setAttributeSearchTimeout(
                                    setTimeout(() => {
                                        dispatch(
                                            getAssignedAttributeList({
                                                // ...payload,
                                                sortOrder: sortOrder,
                                                sortColumn: sortColumn,
                                                pageSize: pageSize,
                                                page: PAGE,
                                                search: e.target.value,
                                                assetId: selectedAsset?.key,
                                                assignStatus:
                                                    implementationAssignStatus.ASSIGN,
                                            })
                                        );
                                        setSelectedRowIds([]);
                                    }, 1000)
                                );
                            }}
                        />
                    </div>
                    <div className="assignedAttributeTable">
                        {attributeListLoading ? (
                            <div className="view__loader">
                                <Spin />
                            </div>
                        ) : (
                            <AssignedAttributeTable
                                data={assignedTable}
                                payload={payload}
                                search={searchState}
                                showFooter={showFooter}
                                setShowFooter={setShowFooter}
                                selectedAssetId={selectedAsset}
                                setSortOrder={setSortOrder}
                                setSortColumn={setSortColumn}
                                setPage={setPage}
                                selectedRowIds={selectedRowIds}
                                setSelectedRowIds={setSelectedRowIds}
                                setSearchState={setSearchState}
                            />
                        )}

                        <div>
                            {attributeAssignedData?.pageResponse?.totalRecords >
                                PAGE_SIZE && (
                                <CustomPagination
                                    customClassName="assignedAttribute__pagination"
                                    totalRecords={
                                        attributeAssignedData?.pageResponse
                                            ?.totalRecords
                                    }
                                    setPage={setPage}
                                    page={page}
                                    setPageSize={setPageSize}
                                    pageSize={pageSize}
                                    isPositionFixed={false}
                                />
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="implementationEmptyDataComponent">
                    <EmptyDataComponent
                        textValue={t(
                            'implementation.attribute.noAssignedAttributes'
                        )}
                        buttonType={{
                            name: BUTTONTYPE.assignAttributes,
                            disable: false,
                        }}
                        buttonClickHandler={() => {
                            setAddAttribute(true);
                        }}
                    />
                </div>
            )}
        </>
    );
};
export default AssignedAttribute;
