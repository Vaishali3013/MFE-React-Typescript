import { Col, Divider, Input, Row } from 'antd';
import { ReactComponent as BackIcon } from 'assets/icons/lightBackArrow.svg';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { BUTTONTYPE, EMPTY, implementationAssignStatus } from 'types/enums';
import { useEffect, useState } from 'react';
import TimeCapsuleTable from './TimeCapsuleTable';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import AssignedTimeCapsule from './AssignedTimeCapsuleTable';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useSelector, useDispatch } from 'react-redux';
import {
    assignTimeCapsuleToAsset,
    getUnassignedTimeCapsuleList,
} from 'redux/actions/ImplementationActions/timeCapsuleActions';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';
const TimeCapsule = (): any => {
    const { t } = useTranslation('translation');
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const dispatch = useDispatch();
    const details = parseJwt();
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [addTimeCapsule, setAddTimeCapsule] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const [timeCapsuleSearchTimeout, settimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    useEffect(() => {
        setAddTimeCapsule(false);
    }, [selectedAsset?.key]);
    useEffect(() => {
        setSearch(null);
        setPageSize(PAGE_SIZE);
        setPage(PAGE);
    }, [addTimeCapsule]);
    useEffect(() => {
        
        if (addTimeCapsule) {
            dispatch(
                getUnassignedTimeCapsuleList({
                    page: page,
                    pageSize: pageSize,
                    assetId: selectedAsset?.key,
                    isAssign: implementationAssignStatus?.UNASSIGN,
                    sortOrder: sortOrder,
                    sortColumn: sortColumn,
                    search: search ?? EMPTY?.string,
                })
            );
            setSelectedRowIds([]);
        }
    }, [addTimeCapsule, page, pageSize, sortOrder, sortColumn]);

    const unassignedTimeCapsuleList = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.unassignedTimeCapsuleList
    );
    const [showModal, setShowModal] = useState(false);
    const [switchState, setSwitchState] = useState(false);
    const handleSwitchChecked = (checked: boolean): void => {
        setSwitchState(checked);
    };

    return (
        <>
            {addTimeCapsule ? (
                <div className="timeCapsule">
                    <Row className="timeCapsule__header">
                        <Col span={20}>
                            <BackIcon
                                className="timeCapsule__backIcon"
                                onClick={() => {
                                    setAddTimeCapsule(false);
                                    setSelectedRowIds([]);
                                }}
                            />

                            <span className="fw-500 fs-16 timeCapsule__assignText">
                                {t(
                                    'implementation.timeCapsule.assignTimeCapsules'
                                )}
                            </span>
                        </Col>
                    </Row>
                    <Divider />
                    {unassignedTimeCapsuleList?.pageResponse?.totalRecords >
                        0 || search !== null ? (
                        <div>
                            <div className="timeCapsule__searchBox">
                                <Input
                                    allowClear
                                    className="timeCapsule__search"
                                    placeholder={t('commonStr.search')}
                                    prefix={<SearchOutlined />}
                                    value={search ?? EMPTY?.string}
                                    onChange={(e) => {
                                        setPage(PAGE);
                                        setSearch(e.target.value);
                                        if (timeCapsuleSearchTimeout) {
                                            clearTimeout(
                                                timeCapsuleSearchTimeout
                                            );
                                        }
                                        settimeCapsuleSearchTimeout(
                                            setTimeout(() => {
                                                dispatch(
                                                    getUnassignedTimeCapsuleList(
                                                        {
                                                            page: PAGE,
                                                            pageSize: PAGE_SIZE,
                                                            assetId:
                                                                selectedAsset?.key,
                                                            isAssign:
                                                                implementationAssignStatus?.UNASSIGN,
                                                            search: e.target
                                                                .value,
                                                            sortColumn:
                                                                sortColumn,
                                                            sortOrder:
                                                                sortOrder,
                                                        }
                                                    )
                                                );
                                                setSelectedRowIds([]);
                                            }, 1000)
                                        );
                                    }}
                                />
                            </div>
                            <div className="timeCapsuleTable">
                                <TimeCapsuleTable
                                    data={
                                        unassignedTimeCapsuleList?.pageResponse
                                            ?.records
                                    }
                                    assetId={selectedAsset?.key}
                                    isAssign={
                                        implementationAssignStatus?.UNASSIGN
                                    }
                                    selectedRowIds={selectedRowIds}
                                    setSelectedRowIds={setSelectedRowIds}
                                    setSortColumn={setSortColumn}
                                    setSortOrder={setSortOrder}
                                    setPage={setPage}
                                    pageSize={pageSize}
                                />
                            </div>

                            <div>
                                {unassignedTimeCapsuleList?.pageResponse
                                    ?.totalRecords > PAGE_SIZE && (
                                    <CustomPagination
                                    customClassName="timeCapsuleImplementation__unassignedPagination"
                                        totalRecords={
                                            unassignedTimeCapsuleList
                                                ?.pageResponse?.totalRecords
                                        }
                                        setPage={setPage}
                                        page={page}
                                        setPageSize={setPageSize}
                                        pageSize={pageSize}
                                        defaultPageSize={pageSize}
                                        isPositionFixed={false}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="timeCapsuleEmptyDataComponent">
                            <EmptyDataComponent
                                textValue={t(
                                    'implementation.timeCapsule.noTimeCapsuleCreatedText1'
                                )}
                                secondaryTextValue={t(
                                    'implementation.timeCapsule.noTimeCapsuleCreatedText2'
                                )}
                            />
                        </div>
                    )}


                        <div className="timeCapsuleFooter">
                            <Divider />
                            <Row className="timeCapsuleFooter__btns">
                                <Col span={4} className="cancelBtn">
                                    <CustomButton
                                        type={BUTTONTYPE?.cancel}
                                        disabled={false}
                                        handleClick={() => {
                                            setSelectedRowIds([]);
                                            setAddTimeCapsule(false);
                                        }}
                                    />
                                </Col>
                                <Col span={4} className="saveBtn">
                                    <CustomButton
                                        type={BUTTONTYPE?.assign}
                                        disabled={!selectedRowIds?.length}
                                        typeOfButton={'submit'}
                                        handleClick={() => {
                                            setShowModal(true);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                   
                </div>
            ) : (
                <AssignedTimeCapsule setAddTimeCapsule={setAddTimeCapsule} />
            )}

            {showModal && (
                <ConfirmationModal
                    customClassName="confirmationModal timeCapsulAssignModal"
                    icon={<QuestionMarkIcon />}
                    open={showModal}
                    onOk={() => {
                        setAddTimeCapsule(false);
                        setShowModal(false);
                        dispatch(
                            assignTimeCapsuleToAsset({
                                assetId: selectedAsset?.key,
                                timeCapsuleId: selectedRowIds,
                                childConfigurationFlag: switchState,
                                doAssign: implementationAssignStatus?.ASSIGN,
                                requestedBy: details?.username,
                            })
                        );
                        setSwitchState(false);
                        setSelectedRowIds([]);
                    }}
                    onCancel={() => {
                        setShowModal(false);
                        setSwitchState(false);
                        setSelectedRowIds([]);
                    }}
                    text={t(
                        'implementation.timeCapsule.timeCapsuleAssigningModalText'
                    )}
                    subText={
                        selectedAsset?.children?.length &&
                        t('implementation.mappingToChildNodesText')
                    }
                    onSwitchChecked={handleSwitchChecked}
                />
            )}
        </>
    );
};
export default TimeCapsule;
