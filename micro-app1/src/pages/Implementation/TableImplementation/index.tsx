import { Col, Divider, Input, Row } from 'antd';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import {
    BUTTONTYPE,
    EMPTY,
    implementationTableAssignStatus,
    implementationTableState,
} from 'types/enums';
import { useEffect, useState } from 'react';
import UnassignedTable from './UnassignedTable';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    assignTableToAsset,
    getAssignedTableList,
    getUnassignedTableList,
} from 'redux/actions/ImplementationActions/tableActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import { RESET_ASSIGN_TABLE_STATUS } from 'redux/types/implementationTypes';
import AssignedTable from './AssignedTable';
import ViewTableValues from './ViewTableValues';
import ValidateTableValues from './ValidateTableValues';
import EditTableValues from './EditTableValues';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const TableImplementation = (): any => {
    const { t } = useTranslation('translation');
    const { currentTab } = useParams();
    const dispatch = useDispatch();
    const details = parseJwt();
    const [assignMore, setAssignMore] = useState(false);
    const [showTableDetails, setShowTableDetails] = useState<string | null>(
        null
    );
    const [selectedTable, setSelectedTable] = useState({});
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [searchAssigned, setSearchAssigned] = useState<string | null>(null);
    const [searchUnassigned, setSearchUnassigned] = useState<string | null>(
        null
    );
    const [switchState, setSwitchState] = useState(false);
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const tableListLoading = useSelector(
        (state: any) => state?.implementation?.table?.tableListLoading
    );
    const assignedTable = useSelector(
        (state: any) => state?.implementation?.table?.assignedTableList
    );
    const assignedTotalCount = useSelector(
        (state: any) => state?.implementation?.table?.assignedTotalCount
    );
    const unassignedTable = useSelector(
        (state: any) => state?.implementation?.table?.unassignedTableList
    );
    const unassignedTotalCount = useSelector(
        (state: any) => state?.implementation?.table?.unassignedTotalCount
    );
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const tableAssigned = useSelector(
        (state: any) => state?.implementation?.table?.tableAssigned
    );
    useEffect(() => {
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
        setSearchAssigned(null);
        setSearchUnassigned(null);
        setSelectedRowIds([]);
        setSortColumn(null);
        setSortOrder(null);
    }, [assignMore]);
    useEffect(() => {
        if (tableAssigned) {
            setIsSaveModalOpen(false);
            setAssignMore(false);
            dispatch({ type: RESET_ASSIGN_TABLE_STATUS });
            setPage(PAGE);
            setPageSize(PAGE_SIZE);
            searchAssigned === EMPTY.string && setSearchAssigned(null);
        }
    }, [tableAssigned]);

    useEffect(() => {
        setSelectedRowIds([]);
        assignMore
            ? dispatch(
                  getUnassignedTableList({
                      assetId: selectedAsset?.key,
                      assignStatus: implementationTableAssignStatus.unassign,
                      search: searchUnassigned,
                      page: page,
                      pageSize: pageSize,
                      sortOrder: sortOrder,
                      sortColumn: sortColumn,
                  })
              )
            : dispatch(
                  getAssignedTableList({
                      assetId: selectedAsset?.key,
                      assignStatus: implementationTableAssignStatus.assign,
                      search: searchAssigned,
                      page: page,
                      pageSize: pageSize,
                      sortOrder: sortOrder,
                      sortColumn: sortColumn,
                  })
              );
    }, [
        page,
        pageSize,
        assignMore,
        sortOrder,
        sortColumn,
        selectedAsset,
        tableAssigned,
    ]);
    useEffect(() => {
        setSearchAssigned(null);
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
        setAssignMore(false);
        setSelectedRowIds([]);
        setSortColumn(null);
        setSortOrder(null);
        setShowTableDetails(null);
        setSelectedTable({});
        searchAssigned &&
            dispatch(
                getAssignedTableList({
                    assetId: selectedAsset?.key,
                    assignStatus: implementationTableAssignStatus.assign,
                    search: EMPTY.string,
                    page: PAGE,
                    pageSize: PAGE_SIZE,
                })
            );
    }, [selectedAsset, currentTab]);
    useEffect(() => {
        setSearchAssigned(null);
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
        setSelectedRowIds([]);
        setSortColumn(null);
        setSortOrder(null);
        dispatch(
            getAssignedTableList({
                assetId: selectedAsset?.key,
                assignStatus: implementationTableAssignStatus.assign,
                search: EMPTY.string,
                page: PAGE,
                pageSize: PAGE_SIZE,
            })
        );
    }, [showTableDetails]);
    const handleSwitchChecked = (checked: boolean): void => {
        setSwitchState(checked);
    };

    return (
        <>
            {showTableDetails ? (
                <>
                    {showTableDetails === implementationTableState.VIEW ? (
                        <ViewTableValues
                            setShowTableDetails={setShowTableDetails}
                            selectedTable={selectedTable}
                        ></ViewTableValues>
                    ) : showTableDetails ===
                      implementationTableState.VALIDATE ? (
                        <ValidateTableValues
                            setShowTableDetails={setShowTableDetails}
                            selectedTable={selectedTable}
                        />
                    ) : showTableDetails === implementationTableState.EDIT ? (
                        <EditTableValues
                            setShowTableDetails={setShowTableDetails}
                            selectedTable={selectedTable}
                        />
                    ) : null}
                </>
            ) : (
                <>
                    {assignMore ? (
                        <>
                            <div className="tableImplementation">
                                <Row className="tableImplementation__header">
                                    <Col span={20}>
                                        <BackIcon
                                            className="tableImplementation__backIcon"
                                            onClick={() => {
                                                setAssignMore(false);
                                            }}
                                        />
                                        <span className="fw-500 fs-16 tableImplementation__assignText">
                                            {t(
                                                'implementation.table.assignTable'
                                            )}
                                        </span>
                                    </Col>
                                </Row>
                                <Divider />
                                {unassignedTable?.length ||
                                searchUnassigned !== null ||
                                tableListLoading ? (
                                    <>
                                        <div className="tableImplementation__searchBox">
                                            <Input
                                                allowClear
                                                className="tableImplementation__search"
                                                placeholder={t(
                                                    'commonStr.search'
                                                )}
                                                prefix={<SearchOutlined />}
                                                value={
                                                    searchUnassigned ??
                                                    EMPTY.string
                                                }
                                                onChange={(e: any) => {
                                                    setSearchUnassigned(
                                                        e.target.value
                                                    );
                                                    setPage(PAGE);
                                                    if (
                                                        attributeSearchTimeout
                                                    ) {
                                                        clearTimeout(
                                                            attributeSearchTimeout
                                                        );
                                                    }
                                                    setAttributeSearchTimeout(
                                                        setTimeout(() => {
                                                            dispatch(
                                                                getUnassignedTableList(
                                                                    {
                                                                        assetId:
                                                                            selectedAsset?.key,
                                                                        assignStatus:
                                                                            implementationTableAssignStatus.unassign,
                                                                        page: PAGE,
                                                                        pageSize:
                                                                            pageSize,
                                                                        search: e
                                                                            .target
                                                                            .value,
                                                                        sortColumn:
                                                                            sortColumn,
                                                                        sortOrder:
                                                                            sortOrder,
                                                                    }
                                                                )
                                                            );
                                                        }, 1000)
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div
                                            className={
                                                'tableImplementationTable'
                                            }
                                        >
                                            <UnassignedTable
                                                search={
                                                    searchUnassigned ??
                                                    EMPTY.string
                                                }
                                                setSearchUnassigned={
                                                    setSearchUnassigned
                                                }
                                                selectedRowIds={selectedRowIds}
                                                setSelectedRowIds={
                                                    setSelectedRowIds
                                                }
                                                pageSize={pageSize}
                                                setPage={setPage}
                                                setPageSize={setPageSize}
                                                setSortColumn={setSortColumn}
                                                setSortOrder={setSortOrder}
                                            />
                                            <div>
                                                {unassignedTotalCount >
                                                    PAGE_SIZE && (
                                                    <CustomPagination
                                                        defaultPageSize={
                                                            pageSize
                                                        }
                                                        customClassName="tableImplementation__unassignedPagination"
                                                        totalRecords={
                                                            unassignedTotalCount
                                                        }
                                                        setPage={setPage}
                                                        page={page}
                                                        setPageSize={
                                                            setPageSize
                                                        }
                                                        pageSize={pageSize}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="tableImplementationFooter">
                                            <Divider />
                                            <Row className="tableImplementationFooter__btns">
                                                <Col
                                                    span={4}
                                                    className="cancelBtn"
                                                >
                                                    <CustomButton
                                                        type={BUTTONTYPE.cancel}
                                                        disabled={false}
                                                        handleClick={() => {
                                                            setAssignMore(
                                                                false
                                                            );
                                                        }}
                                                    />
                                                </Col>
                                                <Col
                                                    span={4}
                                                    className="saveBtn"
                                                >
                                                    <CustomButton
                                                        type={BUTTONTYPE.assign}
                                                        disabled={
                                                            !selectedRowIds?.length
                                                        }
                                                        typeOfButton={'submit'}
                                                        handleClick={() => {
                                                            setIsSaveModalOpen(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                ) : (
                                    <div className="unassignedTableEmptyDataComponent">
                                        <EmptyDataComponent
                                            textValue={
                                                assignedTotalCount
                                                    ? t(
                                                          'implementation.table.noTableAvailable'
                                                      )
                                                    : t(
                                                          'implementation.table.noTableCreated'
                                                      )
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            {tableListLoading ||
                            searchAssigned !== null ||
                            assignedTable?.length ? (
                                <div className="tableImplementation">
                                    <Row className="tableImplementation__header">
                                        <Col span={20}>
                                            <span className="fw-500 fs-16 tableImplementation__assignText">
                                                {assignMore
                                                    ? t(
                                                          'implementation.table.assignTable'
                                                      )
                                                    : t(
                                                          'implementation.table.assignedTables'
                                                      )}
                                            </span>
                                        </Col>
                                        <Col span={4}>
                                            <div className="tableImplementation__assignMoreBtn">
                                                <CustomButton
                                                    type={BUTTONTYPE.assignMore}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        setAssignMore(true);
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <div className="tableImplementation__searchBox">
                                        <Input
                                            allowClear
                                            className="tableImplementation__search"
                                            placeholder={t('commonStr.search')}
                                            prefix={<SearchOutlined />}
                                            value={
                                                searchAssigned ?? EMPTY.string
                                            }
                                            onChange={(e: any) => {
                                                setSearchAssigned(
                                                    e.target.value
                                                );
                                                if (attributeSearchTimeout) {
                                                    clearTimeout(
                                                        attributeSearchTimeout
                                                    );
                                                }
                                                setPage(PAGE);
                                                setAttributeSearchTimeout(
                                                    setTimeout(() => {
                                                        dispatch(
                                                            getAssignedTableList(
                                                                {
                                                                    assetId:
                                                                        selectedAsset?.key,
                                                                    assignStatus:
                                                                        implementationTableAssignStatus.assign,
                                                                    page: PAGE,
                                                                    pageSize:
                                                                        pageSize,
                                                                    search: e
                                                                        .target
                                                                        .value,
                                                                    sortColumn:
                                                                        sortColumn,
                                                                    sortOrder:
                                                                        sortOrder,
                                                                }
                                                            )
                                                        );
                                                    }, 1000)
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="tableImplementationTable">
                                        <AssignedTable
                                            assignedTableData={assignedTable}
                                            setSelectedTable={setSelectedTable}
                                            setSearchAssigned={
                                                setSearchAssigned
                                            }
                                            search={
                                                searchAssigned ?? EMPTY.string
                                            }
                                            page={page}
                                            pageSize={pageSize}
                                            setPage={setPage}
                                            setPageSize={setPageSize}
                                            setShowTableDetails={
                                                setShowTableDetails
                                            }
                                            setSortColumn={setSortColumn}
                                            setSortOrder={setSortOrder}
                                        />
                                    </div>
                                    <div>
                                        {assignedTotalCount > PAGE_SIZE && (
                                            <CustomPagination
                                                defaultPageSize={pageSize}
                                                customClassName="tableImplementation__assignedPagination"
                                                totalRecords={
                                                    assignedTotalCount
                                                }
                                                setPage={setPage}
                                                page={page}
                                                setPageSize={setPageSize}
                                                pageSize={pageSize}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="implementationEmptyDataComponent">
                                    <EmptyDataComponent
                                        textValue={t(
                                            'implementation.table.noAssignedTableText1'
                                        )}
                                        secondaryTextValue={t(
                                            'implementation.table.noAssignedTableText2'
                                        )}
                                        buttonType={{
                                            name: BUTTONTYPE.assignTable,
                                            disable: false,
                                        }}
                                        buttonClickHandler={() => {
                                            setAssignMore(true);
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

            {isSaveModalOpen && (
                <ConfirmationModal
                    customClassName="confirmationModal tableImplementationModal"
                    icon={<QuestionMarkIcon />}
                    open={isSaveModalOpen}
                    onOk={() => {
                        dispatch(
                            assignTableToAsset({
                                tableList: selectedRowIds,
                                assetId: selectedAsset?.key,
                                doAssign: 1,
                                childNode: switchState,
                                updatedBy: details?.username,
                            })
                        );
                        setSwitchState(false);
                        setSelectedRowIds([]);
                    }}
                    onCancel={() => {
                        setIsSaveModalOpen(false);
                        setSwitchState(false);
                        setSelectedRowIds([]);
                    }}
                    onSwitchChecked={handleSwitchChecked}
                    text={t('implementation.table.tableAssigningModalText')}
                    subText={
                        selectedAsset?.children?.length
                            ? t('implementation.mappingToChildNodesText')
                            : EMPTY.string
                    }
                />
            )}
        </>
    );
};
export default TableImplementation;
