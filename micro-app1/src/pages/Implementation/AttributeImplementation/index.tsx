import { Col, Divider, Input, Row, Spin } from 'antd';
import { ReactComponent as BackIcon } from 'assets/icons/LightArrowBack.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    AssignAttributeList,
    getUnassignedAttributeList,
} from 'redux/actions/ImplementationActions/attributeActions';
import AssignedAttribute from './AssignedAttributeTable';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ENABLE_SWITCH_BUTTON } from 'redux/types/calendarConfiguratorTypes';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import UnassignAttributeTable from './UnassignAttributeTable';
import {
    implementationAssignStatus,
    BUTTONTYPE,
    assignAttributeStatus,
    EMPTY,
} from 'types/enums';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const AttributeImplemenation = ({
    selectedAssetChildrenKey,
    assetPayload,
    selectedUserIds,
    selectedAssetkey,
}: any): any => {
    const { t } = useTranslation('translation');
    const details = parseJwt();
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [attributeListId, setAttributeListId] = useState();
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [addAttribute, setAddAttribute] = useState(false);
    const dispatch = useDispatch();
    const { currentTab } = useParams();
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState<string | null>(null);
    const [IsSwitchChecked, setIsSwitchChecked] = useState(false);
    const handleSwitchChecked = (checked: boolean): void => {
        setIsSwitchChecked(checked);
        dispatch({ type: ENABLE_SWITCH_BUTTON });
    };

    const attributeUnassignData = useSelector(
        (state: any) => state.implementation?.attribute?.UnassignedAttributeList
    );

    const [payload, setPayload] = useState({
        page,
        pageSize,
        sortOrder,
        sortColumn,
    });
    useEffect(() => {
        setSearchState(null);
        setPageSize(PAGE_SIZE);
    }, [addAttribute]);
    useEffect(() => {
        setPayload({ ...payload, page, pageSize, sortOrder, sortColumn });
    }, [page, pageSize, sortOrder, sortColumn]);

    const selectedAsset = useSelector(
        (state: any) => state.implementation?.attribute?.selectedAsset
    );
    const isAssign = useSelector(
        (state: any) => state.implementation?.attribute?.isAssign
    );

    useEffect(() => {
        setAddAttribute(false);
        setPageSize(PAGE_SIZE);
        setPage(PAGE);
    }, [selectedAsset?.key]);

    const attributeListLoading = useSelector(
        (state: any) => state.implementation?.attribute?.attributesListLoading
    );

    useEffect(() => {
       if(addAttribute){
        const updatedPayload = {
            ...payload,
            assetId: selectedAsset?.key,
            assignStatus: implementationAssignStatus.UNASSIGN,
        };
        dispatch(getUnassignedAttributeList(updatedPayload));
        // setSearchState(null);
        setSelectedRowIds([]);
       }
    }, [payload, selectedAsset, addAttribute,currentTab]);

    useEffect(() => {
        isAssign && setAddAttribute(false);
    }, [isAssign]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);

    return (
        <>
            {addAttribute ? (
                <div className="attribute">
                    <Row className="attribute__header">
                        <Col span={20} className="attribute__d-flex">
                            <BackIcon
                                className="attribute__backIcon"
                                onClick={() => {
                                    setAddAttribute(false);
                                    setSelectedRowIds([]);
                                }}
                            />

                            <span className="fw-500 fs-16 attribute__assignText">
                                {t('implementation.attribute.assignAttributes')}
                            </span>
                        </Col>
                    </Row>
                    <Divider />
                    {attributeUnassignData?.pageResponse?.records?.length ||
                    searchState !== null ? (
                        <div>
                            <div className="attribute__searchBox">
                                <Input
                                    allowClear
                                    className="attribute__search"
                                    placeholder={t('commonStr.search')}
                                    prefix={<SearchOutlined />}
                                    value={searchState ?? EMPTY.string}
                                    onChange={(e) => {
                                        setPage(PAGE);
                                        setSearchState(e.target.value);
                                        if (attributeSearchTimeout) {
                                            clearTimeout(
                                                attributeSearchTimeout
                                            );
                                        }
                                        // Debouncing for search implemented
                                        setAttributeSearchTimeout(
                                            setTimeout(() => {
                                                dispatch(
                                                    getUnassignedAttributeList({
                                                        sortOrder: sortOrder,
                                                        sortColumn: sortColumn,
                                                        pageSize: PAGE_SIZE,
                                                        page: PAGE,
                                                        // ...payload,
                                                        search: e.target.value,
                                                        assetId:
                                                            selectedAsset?.key,
                                                        assignStatus:
                                                            implementationAssignStatus.UNASSIGN,
                                                    })
                                                );
                                                setSelectedRowIds([]);
                                            }, 1000)
                                        );
                                    }}
                                />
                            </div>
                            <div className="attributeTable">
                                {attributeListLoading ? (
                                    <div className="view__loader">
                                        <Spin />
                                    </div>
                                ) : (
                                    <UnassignAttributeTable
                                        data={
                                            attributeUnassignData?.pageResponse
                                                ?.records
                                        }
                                        selectedRowIds={selectedRowIds}
                                        setSelectedRowIds={setSelectedRowIds}
                                        payload={payload}
                                        search={searchState}
                                        setAttributeListId={setAttributeListId}
                                        setSortOrder={setSortOrder}
                                        setSortColumn={setSortColumn}
                                        setPage={setPage}
                                        pageSize={pageSize}
                                    />
                                )}
                            </div>
                            <div>
                                {attributeUnassignData?.pageResponse
                                    ?.totalRecords > PAGE_SIZE && (
                                    <CustomPagination
                                        customClassName="attribute__pagination"
                                        totalRecords={
                                            attributeUnassignData?.pageResponse
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
                    ) : (
                        <div className="attributeEmptyDataComponent">
                            <EmptyDataComponent
                                textValue={t(
                                    'implementation.attribute.noAttributeCreatedText1'
                                )}
                                secondaryTextValue={t(
                                    'implementation.attribute.noAttributeCreatedText2'
                                )}
                            />
                        </div>
                    )}

                    <div className="attributeFooter">
                        <Divider />
                        <Row className="attributeFooter__btns">
                            <Col span={4} className="cancelBtn">
                                <CustomButton
                                    type={BUTTONTYPE.cancel}
                                    disabled={false}
                                    handleClick={() => {
                                        setSelectedRowIds([]);
                                        setAddAttribute(false);
                                    }}
                                />
                            </Col>
                            <Col span={4} className="saveBtn">
                                <CustomButton
                                    type={BUTTONTYPE.assign}
                                    disabled={!selectedRowIds?.length}
                                    typeOfButton={'submit'}
                                    handleClick={() => {
                                        setIsSaveModalOpen(true);
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                <AssignedAttribute setAddAttribute={setAddAttribute} />
            )}
            {isSaveModalOpen && (
                <ConfirmationModal
                    customClassName="confirmationModal attributeImplementationModal"
                    icon={<QuestionMarkIcon />}
                    open={isSaveModalOpen}
                    onOk={() => {
                        dispatch(
                            AssignAttributeList({
                                ...payload,
                                assetId: selectedAsset?.key,
                                childConfigurationFlag: IsSwitchChecked,
                                attributeIdList: attributeListId,
                                requestedBy: details?.username,
                                doAssign: assignAttributeStatus.ASSIGN,
                                assignStatus: implementationAssignStatus.ASSIGN,
                            })
                        );
                        setSelectedRowIds([]);
                        setIsSaveModalOpen(false);
                        setAddAttribute(false);
                        setIsSwitchChecked(false);
                    }}
                    onCancel={() => {
                        setSelectedRowIds([]);
                        setIsSaveModalOpen(false);
                        setIsSwitchChecked(false);
                    }}
                    text={t(
                        'implementation.attribute.attributeAssigningModalText'
                    )}
                    subText={
                        selectedAssetkey.children?.length > 0 &&
                        t('implementation.mappingToChildNodesText')
                    }
                    onSwitchChecked={handleSwitchChecked}
                />
            )}
        </>
    );
};
export default AttributeImplemenation;
