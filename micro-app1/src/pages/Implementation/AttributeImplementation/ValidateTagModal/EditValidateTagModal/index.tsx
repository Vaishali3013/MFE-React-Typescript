import React, { useEffect, useState } from 'react';
import { Modal, Input, Divider, TreeSelect, Radio, Table, Spin } from 'antd';
import '../../index.scss';
import CustomButton from 'components/common/CustomButton';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from 'components/common/CustomPagination';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { SearchOutlined } from '@ant-design/icons';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import {
    editModalDefaultState,
    getTagListData,
    removeTagData,
    validateTagValueAttributeEdit,
} from 'redux/actions/ImplementationActions/attributeActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
import { setAttributeState } from 'redux/actions/ConfigureActions/attributeActions';
import { ATTRIBUTETYPE } from 'types/enums';

interface validateTagModalProps {
    open: boolean; // Define the 'open' prop as a boolean
    onCancel: Function;
    attributeId: any;
    attributeRecord: any;
}
const EditValidateTagModal: React.FC<validateTagModalProps> = ({
    open,
    onCancel,
    attributeId,
    attributeRecord,
    // setAttributeRecord,
}) => {
    const { t } = useTranslation('translation');
    const [expandedKeys] = useState<string[]>([]);
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [isRadioButtonSelected, setIsRadioButtonSelected] = useState(false);
    const nodeList = useSelector(
        (state: any) => state?.dataVisualization?.nodeList
    );
    const onSelectChange = (selectedRowKeys: any): any => {
        setSelectedRowKeys(selectedRowKeys?.uuId);
        setIsRadioButtonSelected(true);
    };
    const [searchState, setSearchState] = useState('');
    const details = parseJwt();
    const dispatch = useDispatch();
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const { tagsList, tagsListLoading, isValidateEditSuccess }: any =
        useSelector((state: any) => state?.implementation?.attribute);

    const handleNodeClick = (flattenedNode: any): any => {
        setSelectedTagId(flattenedNode?.id);
    };

    const convertToTreeSelectData = (flattenedNode: any): any => {
        const isExpanded = expandedKeys?.includes(flattenedNode.name);
        const treeSelectNode = {
            title: (
                <Radio
                    value={flattenedNode?.name}
                    style={{ marginRight: 8 }}
                    onChange={() => handleNodeClick(flattenedNode)}
                    checked={selectedTagId === flattenedNode?.id}
                >
                    {flattenedNode?.name}
                </Radio>
            ),
            value: flattenedNode?.id,
            key: flattenedNode?.name,
            children: isExpanded
                ? (flattenedNode?.childNodes || [])?.map(
                      convertToTreeSelectData
                  )
                : '',
            defaultExpandAll: false,
        };

        if (
            flattenedNode?.childNodes &&
            flattenedNode?.childNodes?.length > 0
        ) {
            treeSelectNode.children = flattenedNode?.childNodes?.map(
                convertToTreeSelectData
            );
        }
        return treeSelectNode;
    };
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        if (selectedAssetId) {
            dispatch(
                getTagListData({
                    ...payload,
                    id: selectedAssetId,
                    includeChildNode: false,
                })
            );
            setSelectedRowKeys([]);
        }
    }, [selectedAssetId]);

    useEffect(() => {
        if (isValidateEditSuccess) {
            setSelectedAssetId(null);
            setSelectedRowKeys([]);
            dispatch(removeTagData());
            dispatch(editModalDefaultState());
            dispatch(setAttributeState(ATTRIBUTETYPE.view));
            onCancel();
            // setIsSaveModalOpen(false);
        }
    }, [isValidateEditSuccess]);

    useEffect(() => {
        selectedAssetId &&
            dispatch(getTagListData({ ...payload, includeChildNode: false }));
    }, [payload]);

    useEffect(() => {
        if (attributeRecord?.attributeValueResponse?.value) {
            setSelectedRowKeys(attributeRecord?.attributeValueResponse?.value);
        }
    }, [tagsList]);

    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );

    useEffect(() => {
        if (attributeRecord?.attributeValueResponse?.assetId) {
            dispatch(
                getTagListData({
                    ...payload,
                    id: attributeRecord?.attributeValueResponse?.assetId,
                    includeChildNode: false,
                })
            );
            setSelectedTagId(attributeRecord?.attributeValueResponse?.assetId);
            setSelectedRowKeys([]);
        }
    }, [payload]);

    const selectAssetValue = (value: any): any => {
        setSelectedAssetId(value);
    };

    const treeSelectData = [nodeList?.node]?.map(convertToTreeSelectData);
    const columns = [
        {
            title: '',
            dataIndex: 'select',
            key: 'select',
            width: '10%',
            render: (_: any, record: any) => (
                <Radio
                    onChange={() => onSelectChange(record)}
                    checked={
                        selectedRowKeys && selectedRowKeys === record?.uuId
                    }
                />
            ),
        },
        {
            title: (
                <div className="table-header-cell">
                    <span>{t('commonStr.tagId')} </span>
                </div>
            ),
            dataIndex: 'tagId',
            key: 'tagId',
            width: '30%',
            ellipsis: true,
        },
        {
            title: (
                <div className="table-header-cell">
                    <span>{t('commonStr.tagname')}</span>
                </div>
            ),
            dataIndex: 'tagName',
            key: 'tagName',
            width: '30%',
            ellipsis: true,
        },
        {
            title: (
                <div className="table-header-cell">
                    <span>{t('implementation.attribute.unitName')}</span>
                </div>
            ),
            dataIndex: 'unitName',
            key: 'unitName',
            width: '30%',
            ellipsis: true,
        },
    ];

    const dataForTagListTable = tagsList?.content?.map((item: any) => {
        return {
            key: item?.tagId,
            tagId: item?.tagId,
            tagName: item?.tagName,
            unitName: item?.dataType?.unit,
            uuId: item?.uuid,
        };
    });

    return (
        <>
            <Modal
                className="validateTagModal"
                open={open}
                title={`${t('implementation.attribute.editValidateTag')} - ${
                    attributeRecord.name
                }`}
                onCancel={() => {
                    dispatch(removeTagData());
                    onCancel();
                }}
                footer={[
                    <>
                        <CustomButton
                            type={'Cancel'}
                            disabled={false}
                            handleClick={() => {
                                onCancel();
                                dispatch(removeTagData());
                            }}
                        />
                        <CustomButton
                            type={'Validate'}
                            disabled={!isRadioButtonSelected}
                            handleClick={() => {
                                setIsSaveModalOpen(true);
                            }}
                        />
                    </>,
                ]}
            >
                <div>
                    <Divider className="divider" />
                    <div className="assest-dropdown">
                        <div className="selectAsset">
                            <TreeSelect
                                showSearch
                                className="tree-select"
                                dropdownStyle={{
                                    minWidth: 313,
                                    width: 300,
                                    maxHeight: 400,
                                    overflow: 'auto',
                                }}
                                placeholder={t(
                                    'implementation.attribute.selectAssetPlaceholder'
                                )}
                                treeData={treeSelectData}
                                onSelect={selectAssetValue}
                                defaultValue={
                                    attributeRecord?.attributeValueResponse
                                        ?.assetId
                                }
                            />
                        </div>
                        <div className="search">
                            <Input
                                allowClear
                                addonAfter={<SearchOutlined />}
                                placeholder={t(
                                    'implementation.attribute.inputSearchTextPlaceholder'
                                )}
                                className="card-header-input-search"
                                value={searchState}
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
                                                getTagListData({
                                                    id:
                                                        selectedAssetId ??
                                                        attributeRecord
                                                            ?.attributeValueResponse
                                                            ?.assetId,
                                                    tagName: e.target.value,
                                                    includeChildNode: false,
                                                    pageSize: pageSize,
                                                    page: PAGE,
                                                })
                                            );
                                        }, 1000)
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="table-container">
                            {tagsListLoading ? (
                                <div className="view__loader">
                                    <Spin />
                                </div>
                            ) : (
                                <Table
                                    dataSource={dataForTagListTable}
                                    columns={columns}
                                    pagination={false}
                                    scroll={{ y: 220 }}
                                    rowClassName="custom-table-row"
                                />
                            )}
                            <div>
                                {tagsList?.totalElements > PAGE_SIZE ? (
                                    <CustomPagination
                                        totalRecords={tagsList?.totalElements}
                                        page={page}
                                        setPage={setPage}
                                        setPageSize={setPageSize}
                                        pageSize={pageSize}
                                        isPositionFixed={false}
                                    />
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                    <Divider />
                </div>
                {isSaveModalOpen && (
                    <ConfirmationModal
                        customClassName="confirmationModal attributeImplementationModal"
                        icon={<QuestionMarkIcon />}
                        open={isSaveModalOpen}
                        onOk={() => {
                            dispatch(
                                validateTagValueAttributeEdit({
                                    paginationPayload: payload,
                                    attributeId: attributeRecord?.id,
                                    assetId: selectedAsset?.key,
                                    requestedBy: details?.username,
                                    value: selectedRowKeys,
                                })
                            );
                            setIsSaveModalOpen(false);
                        }}
                        onCancel={() => {
                            setIsSaveModalOpen(false);
                        }}
                        text={t(
                            'implementation.attribute.validateAttributeModalText'
                        )}
                    />
                )}
            </Modal>
        </>
    );
};

export default EditValidateTagModal;
