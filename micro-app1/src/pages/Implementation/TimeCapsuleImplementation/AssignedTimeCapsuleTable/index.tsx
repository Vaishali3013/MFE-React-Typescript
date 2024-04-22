import { Row, Col, Divider, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import { BUTTONTYPE, EMPTY, implementationAssignStatus, implementationTabItems } from 'types/enums';
import AssignedTimeCapsuleTable from './AssignedTimeCapsuleTable';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import './index.scss';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignedTimeCapsuleList } from 'redux/actions/ImplementationActions/timeCapsuleActions';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
const AssignedTimeCapsule = ({ setAddTimeCapsule }: any): any => {
    const { t } = useTranslation('translation');
    const { currentTab } = useParams();
    const [sortOrder, setSortOrder] = useState<number | null>(null);
    const [sortColumn, setSortColumn] = useState<number | null>(null);
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const dispatch = useDispatch();
    const [search, setSearch] = useState<string | null>(null);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [timeCapsuleSearchTimeout, settimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );

    const assignTimeCapsuleToAsset = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.assignTimeCapsuleToAsset
    );

    const isTimeCapsuleRemovedFromAsset = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.isTimeCapsuleRemovedFromAsset
    );

    useEffect(() => {
        dispatch(
            getAssignedTimeCapsuleList({
                page: page,
                pageSize: pageSize,
                isAssign: implementationAssignStatus?.ASSIGN,
                assetId: selectedAsset?.key,
                search: search ?? EMPTY?.string,
                sortColumn: sortColumn,
                sortOrder: sortOrder,
            })
        );
        setSelectedRowIds([]);
    }, [
        assignTimeCapsuleToAsset,
        selectedAsset?.key,
        page,
        pageSize,
        sortColumn,
        sortOrder,
    ]);

    useEffect(() => {
        if(currentTab === implementationTabItems.TIMECAPSULE){
            dispatch(
                getAssignedTimeCapsuleList({
                    page: PAGE,
                    pageSize: PAGE_SIZE,
                    isAssign: implementationAssignStatus?.ASSIGN,
                    assetId: selectedAsset?.key,
                    search: EMPTY?.string,
                })
            );
            setSearch(null);
            setPageSize(PAGE_SIZE);
            setSelectedRowIds([]);
            setPage(PAGE)
        }
       
    }, [isTimeCapsuleRemovedFromAsset, selectedAsset?.key, currentTab]);

    const assignedTimeCapsuleList = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.assignedTimeCapsuleList
    );

    return (
        <>
            {assignedTimeCapsuleList?.pageResponse?.totalRecords > 0 ||
            search !== null ? (
                <div className="assignedTimeCapsule">
                    <Row className="assignedTimeCapsule__header">
                        <Col span={20}>
                            <span className="fw-500 fs-16 assignedTimeCapsule__assignText">
                                {t(
                                    'implementation.timeCapsule.assignedTimeCapsules'
                                )}
                            </span>
                        </Col>

                        <Col span={4}>
                            <div className="assignedTimeCapsule__assignMoreBtn">
                                <CustomButton
                                    type={BUTTONTYPE.assignMore}
                                    disabled={false}
                                    handleClick={() => {
                                        setAddTimeCapsule(true);
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Divider />
                    <div className="assignedTimeCapsule__searchBox">
                        <Input
                            allowClear
                            className="assignedTimeCapsule__search"
                            placeholder={t('commonStr.search')}
                            prefix={<SearchOutlined />}
                            value={search ?? EMPTY?.string}
                            onChange={(e) => {
                                setPage(PAGE);
                                setSearch(e.target.value);
                                if (timeCapsuleSearchTimeout) {
                                    clearTimeout(timeCapsuleSearchTimeout);
                                }
                                settimeCapsuleSearchTimeout(
                                    setTimeout(() => {
                                        dispatch(
                                            getAssignedTimeCapsuleList({
                                                page: PAGE,
                                                pageSize: pageSize,
                                                assetId: selectedAsset?.key,
                                                isAssign:
                                                    implementationAssignStatus?.ASSIGN,
                                                search: e.target.value,
                                                sortColumn: sortColumn,
                                                sortOrder: sortOrder,
                                            })
                                        );
                                        setSelectedRowIds([]);
                                    }, 1000)
                                );
                            }}
                        />
                    </div>

                    <div className="assignedTimeCapsuleTable">
                        <AssignedTimeCapsuleTable
                            data={
                                assignedTimeCapsuleList?.pageResponse?.records
                            }
                            assetId={selectedAsset?.key}
                            isAssign={implementationAssignStatus?.ASSIGN}
                            setSortOrder={setSortOrder}
                            setSortColumn={setSortColumn}
                            setPage={setPage}
                            selectedRowIds={selectedRowIds}
                            setSelectedRowIds={setSelectedRowIds}
                        />
                    </div>

                    <div>
                        {assignedTimeCapsuleList?.pageResponse?.totalRecords >
                            PAGE_SIZE && (
                            <CustomPagination
                                totalRecords={
                                    assignedTimeCapsuleList?.pageResponse
                                        ?.totalRecords
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
                <div className="implementationEmptyDataComponent">
                    <EmptyDataComponent
                        textValue={t(
                            'implementation.timeCapsule.noAssignedTimeCapsule'
                        )}
                        buttonType={{
                            name: BUTTONTYPE.assignTimeCapsules,
                            disable: false,
                        }}
                        buttonClickHandler={() => {
                            setAddTimeCapsule(true);
                        }}
                    />
                </div>
            )}
        </>
    );
};
export default AssignedTimeCapsule;
