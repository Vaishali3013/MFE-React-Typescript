import Table, { type ColumnsType } from 'antd/es/table';
import { Badge, Popover, Spin } from 'antd';
import { ReactComponent as UpArrow } from 'assets/icons/upArrowIcon.svg';
import { ReactComponent as DownArrow } from 'assets/icons/downArrowIcon.svg';
import { MoreOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { PAGE } from 'utils/constants';
import '../index.scss';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { ReactComponent as CheckCircle } from 'assets/icons/check-circle.svg';
import { type DataType } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import { useSelector, useDispatch } from 'react-redux';
import {
    sortOrder,
    attribute,
    attributeSortOption,
    ATTRIBUTETYPEIMPL,
    attributeImplValue,
    dataReferenceType,
} from 'types/enums';

import {
    editAttributeValue,
    setAttributeImplState,
    validateStaticValueAttribute,
} from 'redux/actions/ImplementationActions/attributeActions';

import StaticValueModal from '../StaticValueModal';
import MultipleRemove from '../AttributeMoreContent/MultipleRemove';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { parseJwt } from 'utils/jwtTokenFunction';
import ValidateTagModal from '../ValidateTagModal';
import ViewTagModal from '../ValidateTagModal/ViewTagModal';
import EditValidateTagModal from '../ValidateTagModal/EditValidateTagModal';
import AttributeMoreContent from '../AttributeMoreContent';
import { useTranslation } from 'react-i18next';
const AssignedAttributeTable: React.FC<any> = ({
    data,
    payload,
    search,
    setShowFooter,
    selectedAssetkey,
    selectedAssetId,
    setSortOrder,
    setSortColumn,
    setPage,
    setSelectedRowIds,
    selectedRowIds,
    setSearchState,
}) => {
    const { t } = useTranslation('translation');
    const details = parseJwt();
    // const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [attributeId, setAttributeId] = useState([]);
    const [textAreaValue, setTextAreaValue] = useState<any>(null);
    const [, setSelectedRows] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any>([]);
    const [staticValueModal, setStaticValueModal] = useState(false);
    const [tagValueModal, setTagValueModal] = useState(false);
    const [attributeRecord, setAttributeRecord] = useState<any>('');
    const [isEditTag, setIsEditTag] = useState(false);
    const [validateConfirmationModal, setvalidateConfirmationModal] =
        useState(false);
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const [isViewTagModal, setIsViewTagModal] = useState(false);
    const [popoverheaderVisible, setPopoverheaderVisible] = useState({
        actions: false,
    });

    const handlePopoverItemClick = (): void => {
        setPopoverheaderVisible({ actions: false });
    };

    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});

    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    const [showPopover, setShowPopover] = useState(false);
    const [showHeaderPopover, setShowHeaderPopover] = useState(false);
    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };
    const dispatch = useDispatch();
    const attributeStateImpl = useSelector(
        (state: any) => state.implementation?.attribute?.attributeStateImpl
    );

    const handleBadgeClick = (record: any): any => {
        const isValidRecord = record?.isValidated;
        const dataRefTypeId = record?.dataReference?.id;
        // Open the modal when the badge is clicked
        if (!isValidRecord && dataRefTypeId === dataReferenceType?.static) {
            // If not validated, open the modal
            setAttributeRecord(record);
            setAttributeId(record.id);
            dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.add));
            setStaticValueModal(true);
        }
        if (!isValidRecord && dataRefTypeId === dataReferenceType?.tag) {
            // If not validated, open the modal
            setAttributeRecord(record);
            setIsEditTag(false);
            setAttributeId(record.id);
            dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.add));
            setTagValueModal(true);
        }
    };

    const handleModalClose = (): any => {
        setStaticValueModal(false);
        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.add));
    };

    const handleTagModalClose = (): any => {
        setIsViewTagModal(false);
        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.add));
    };

    const attributeListLoading = useSelector(
        (state: any) => state.implementation?.attribute?.attributesListLoading
    );

    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );

    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.id,
            });
        });
        return temp;
    };

    useEffect(() => {
        setShowFooter(false);
    }, []);

    useEffect(() => {
        setTableData(tableDataMapper());
        setShowHeaderPopover(false);
        setShowPopover(true);
    }, [data]);

    const columns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {showHeaderPopover && (
                        <Popover
                            visible={popoverheaderVisible.actions}
                            onVisibleChange={(visible) => {
                                setPopoverheaderVisible((prevState: any) => ({
                                    ...prevState,
                                    actions: visible,
                                }));
                            }}
                            content={
                                <div className="custom-popover-content">
                                    <MultipleRemove
                                        setSelectedRowIds={setSelectedRowIds}
                                        selectedRowIds={selectedRowIds}
                                        onItemClick={handlePopoverItemClick}
                                        paginatedPayload={payload}
                                        searchPayload={search}
                                    />
                                </div>
                            }
                            placement="bottomLeft"
                            trigger="click"
                        >
                            <MoreOutlined />
                        </Popover>
                    )}
                </div>
            ),
            key: 'more',
            width: 56,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            <Popover
                                visible={popoverVisible[record.key]}
                                onVisibleChange={(visible) => {
                                    handlePopoverVisibleChange(visible, record);
                                }}
                                placement="bottomLeft"
                                trigger={showPopover ? 'click' : []}
                                content={
                                    record?.dataReference?.id ===
                                    dataReferenceType?.static ? (
                                        <AttributeMoreContent
                                            record={record}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            paginatedPayload={payload}
                                            searchPayload={search}
                                            setStaticValueModal={
                                                setStaticValueModal
                                            }
                                            textAreaValue={textAreaValue}
                                            setAttributeRecord={
                                                setAttributeRecord
                                            }
                                            setTextAreaValue={setTextAreaValue}
                                            setSearchState={setSearchState}
                                        />
                                    ) : record?.dataReference?.id ===
                                      dataReferenceType?.tag ? (
                                        <AttributeMoreContent
                                            record={record}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            paginatedPayload={payload}
                                            searchPayload={search}
                                            setStaticValueModal={setIsEditTag}
                                            textAreaValue={
                                                record?.attributeValueResponse
                                                    ?.value
                                            }
                                            setAttributeRecord={
                                                setAttributeRecord
                                            }
                                            setTextAreaValue={setTextAreaValue}
                                            isEditTag={true}
                                            setSearchState={setSearchState}
                                        />
                                    ) : (
                                        <AttributeMoreContent
                                            record={record}
                                            setPopoverVisible={
                                                setPopoverVisible
                                            }
                                            paginatedPayload={payload}
                                            searchPayload={search}
                                            setStaticValueModal={
                                                setStaticValueModal
                                            }
                                            textAreaValue={textAreaValue}
                                            setAttributeRecord={
                                                setAttributeRecord
                                            }
                                            setTextAreaValue={setTextAreaValue}
                                            setSearchState={setSearchState}
                                        />
                                    )
                                }
                                overlayStyle={{ width: '162px' }}
                            >
                                <MoreOutlined />
                            </Popover>
                        </div>
                    </>
                );
            },
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('commonStr.name')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'name',
            key: 'name',
            className: 'column__name',
            render: (_: any, record: any) => (
                <>
                    <div className="attributeTableWrapper__nameData">
                        <div className="blaTableWrapper__status">
                            <span className="fs-14 fw-500 name">
                                {record?.name?.length <
                                attribute.attributeNameLength ? (
                                    <>
                                        <div className="attribute-name">
                                            <div
                                                onClick={() => {
                                                    if (
                                                        record?.dataReference?.id ===
                                                        dataReferenceType?.static
                                                    ) {
                                                        staticViewHandler(
                                                            record
                                                        );
                                                    } else if (
                                                        record?.dataReference?.id ===
                                                        dataReferenceType?.tag
                                                    ) {
                                                        tagViewHandler(record);
                                                    }
                                                }}
                                            >
                                                {record?.name}
                                            </div>
                                            <span
                                                className="validation-green"
                                                onClick={() => {
                                                    handleBadgeClick(record);
                                                }}
                                            >
                                                {record?.isValidated ? (
                                                    <CheckCircle />
                                                ) : (
                                                    <Badge
                                                        count={t(
                                                            'implementation.validate'
                                                        )}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {record?.name}
                                            </div>
                                        }
                                        visible={isPopoverVisibles[data?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        <div
                                            onClick={() => {
                                                if (
                                                    record?.dataReference?.id ===
                                                    dataReferenceType?.static
                                                ) {
                                                    staticViewHandler(record);
                                                } else if (
                                                    record?.dataReference?.id ===
                                                    dataReferenceType?.tag
                                                ) {
                                                    tagViewHandler(record);
                                                }
                                            }}
                                        >
                                            {record?.name?.length >
                                            attribute.attributeNameLength
                                                ? `${record?.name?.slice(
                                                      0,
                                                      attribute.attributeNameLength
                                                  )}...`
                                                : record?.name}
                                        </div>

                                        <span
                                            onClick={() => {
                                                handleBadgeClick(record);
                                            }}
                                        >
                                            {record?.isValidated ? (
                                                <CheckCircle />
                                            ) : (
                                                <Badge
                                                    count={t(
                                                        'implementation.validate'
                                                    )}
                                                />
                                            )}
                                        </span>
                                    </Popover>
                                )}
                            </span>
                        </div>
                    </div>
                </>
            ),
        },

        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('implementation.attribute.uom')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'uom',
            key: 'uom',
            className: 'column__uom',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status fw-500">
                        {data?.unitOfMeasurement?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('implementation.attribute.valueType')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'valueType',
            key: 'valueType',
            className: 'column__valueType',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status fw-500">
                        {data?.dataType?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('implementation.attribute.dataReference')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'dataReference',
            key: 'dataReference',
            className: 'column__dataReference',
            render: (_: any, data: any) => (
                <>
                    <div className="attributeTableWrapper__status fw-500">
                        {data?.dataReference?.name}
                    </div>
                </>
            ),
        },
        {
            title: (
                <div className="attributeTableWrapper__columnTitle">
                    <div>{t('implementation.attribute.value')}</div>
                    <div className="sortArrows">
                        <UpArrow
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.ascending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                        <DownArrow
                            fill="white"
                            cursor="pointer"
                            onClick={() => {
                                setSortOrder(sortOrder.descending);
                                setSortColumn(
                                    attributeSortOption.ATTRIBUTE_NAME
                                );
                                setPage(PAGE);
                            }}
                        />
                    </div>
                </div>
            ),
            dataIndex: 'value',
            key: 'value',
            className: 'column__value',
            render: (_: any, record: any) => (
                <>
                    <div className="attributeTableWrapper__status fw-500">
                        {record?.attributeValueResponse?.value?.length <
                        attributeImplValue.attributeValueLength ? (
                            <>
                                {record?.dataReference?.id ===
                                    dataReferenceType?.static
                                    ? record?.attributeValueResponse?.value
                                    : record?.dataReference?.id ===
                                    dataReferenceType?.tag
                                    ? record?.attributeValueResponse?.tagName
                                    : ''}
                            </>
                        ) : (
                            <Popover
                                overlayClassName="customOverlay"
                                content={
                                    <div className="blaName">
                                        {record?.dataReference?.id ===dataReferenceType?.static
                                            ? record?.attributeValueResponse
                                                  ?.value
                                            : record?.dataReference?.id ===dataReferenceType?.tag
                                            ? record?.attributeValueResponse
                                                  ?.tagName
                                            : ''}
                                    </div>
                                }
                                visible={isPopoverVisibles[data?.key]}
                                onVisibleChange={handlePopoverVisibleChanges}
                                placement="topLeft"
                            >
                                <div>
                                    {record?.dataReference?.id === dataReferenceType?.static
                                        ? record?.attributeValueResponse?.value
                                              ?.length >
                                          attributeImplValue.attributeValueLength
                                            ? `${record?.attributeValueResponse?.value?.slice(
                                                  0,
                                                  attributeImplValue.attributeValueLength
                                              )}...`
                                            : record?.attributeValueResponse
                                                  ?.value
                                        : record?.dataReference?.id === dataReferenceType?.tag
                                        ? record?.attributeValueResponse
                                              ?.tagName?.length >
                                          attributeImplValue.tagNameLength
                                            ? `${record?.attributeValueResponse?.tagName?.slice(
                                                  0,
                                                  attributeImplValue.tagNameLength
                                              )}...`
                                            : record?.attributeValueResponse
                                                  ?.tagName
                                        : ''}
                                  
                                </div>
                            </Popover>
                        )}
                    </div>
                </>
            ),
        },
    ];

    const rowSelection: any = {
        onSelect: (record: any, selected: boolean, selectedRows: any) => {
            if (selected) {
                setSelectedRowIds([...selectedRowIds, record?.id]);
                setSelectedRows([...selectedRows, record]);
                
            } else {
                setSelectedRowIds(
                    selectedRowIds?.filter((id: number) => id !== record?.id)
                );
                setSelectedRows(
                    selectedRows.filter((row: any) => row?.key !== record?.key)
                );
            }
        },
        onSelectAll: (selected: boolean, selectedRows: DataType[]) => {
            if (selected) {
                const newSelectedIds = selectedRows?.map(
                    (record) => record?.id
                );
                setSelectedRowIds(newSelectedIds);
                setSelectedRows(selectedRows);
            } else {
                setSelectedRowIds([]);
                setSelectedRows([]);
            }
        },
    };

    useEffect(() => {
        // Check if selectedRowIds has any entries
        setShowPopover(selectedRowIds?.length <= 1);
        setShowHeaderPopover(selectedRowIds?.length > 1);
    }, [selectedRowIds]);

    const staticViewHandler = (record: any): any => {
        if (record?.isValidated) {
            dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.view));
            setAttributeRecord(record);
            setTextAreaValue(record?.attributeValueResponse?.value);
            setStaticValueModal(true);
        }
    };

    const tagViewHandler = (record: any): any => {
        if (record?.isValidated) {
            dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.view));
            setAttributeRecord(record);
            setIsViewTagModal(true);
            setStaticValueModal(false);
            setTagValueModal(false);
            setIsEditTag(false);
        }
    };

    const SearchNoDataText = (
        <EmptyDataComponent
            customClassName="SearchEmptyComponent"
            textValue={t('implementation.noResultFoundInSearch')}
            loading={attributeListLoading}
        />
    );

    return (
        <>
            {attributeListLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <Table
                    className={
                        data?.length > 0
                            ? 'tablePaginated'
                            : 'tableNotPaginated'
                    }
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                        selectedRowKeys: selectedRowIds,
                    }}
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    loading={attributeListLoading}
                    scroll={{ y: 'calc(100vh - 450px)' }}
                    locale={{ emptyText: SearchNoDataText }}
                />
            )}

            <StaticValueModal
                customClassName="staticValueModal"
                open={staticValueModal}
                onCancel={handleModalClose}
                attributeRecord={attributeRecord}
                setvalidateAttributeModal={setvalidateConfirmationModal}
                setStaticValueModal={setStaticValueModal}
                setTextAreaValue={setTextAreaValue}
                textAreaValue={textAreaValue}
                setAttributeId={setAttributeId}
            />
            {tagValueModal && (
                <ValidateTagModal
                    open={tagValueModal}
                    onCancel={() => {
                        setTagValueModal(false);
                    }}
                    attributeId={attributeId}
                    attributeRecord={attributeRecord}
                    isEditTag={isEditTag}
                    selectedAssetDefaultId={selectedAsset?.key}
                />
            )}
            {isEditTag && (
                <EditValidateTagModal
                    open={isEditTag}
                    onCancel={() => {
                        setIsEditTag(false);
                        dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.add));
                    }}
                    attributeId={attributeId}
                    attributeRecord={attributeRecord}
                    // setAttributeRecord={setAttributeRecord}
                />
            )}

            <ViewTagModal
                open={isViewTagModal}
                onCancel={handleTagModalClose}
                customClassName={''}
                onEdit={() => {
                    setIsEditTag(true);
                    setTagValueModal(false);
                    setIsViewTagModal(false);
                    dispatch(setAttributeImplState(ATTRIBUTETYPEIMPL.edit));
                }}
                attributeRecord={attributeRecord}
            />

            <ConfirmationModal
                customClassName="confirmationModal attributeImplementationModal"
                icon={<QuestionMarkIcon />}
                open={validateConfirmationModal}
                onOk={() => {
                    setTextAreaValue(null);

                    attributeStateImpl === ATTRIBUTETYPEIMPL.edit
                        ? dispatch(
                              editAttributeValue({
                                  assetId: selectedAsset?.key,
                                  attributeId: attributeId,
                                  value: textAreaValue,
                                  paginationPayload: payload,
                              })
                          )
                        : dispatch(
                              validateStaticValueAttribute({
                                  paginationPayload: payload,
                                  assetId: selectedAsset?.key,
                                  requestedBy: details?.username,
                                  attributeId: attributeId,
                                  value: textAreaValue,
                              })
                          );
                    setvalidateConfirmationModal(false);
                }}
                onCancel={() => {
                    setTextAreaValue(null);
                    setvalidateConfirmationModal(false);
                }}
                text={t('implementation.attribute.validateAttributeModalText')}
            />
        </>
    );
};

export default AssignedAttributeTable;
