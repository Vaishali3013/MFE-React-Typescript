import React, { useEffect, useState } from 'react';
import { Col, Input, Row, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import {
    AssignStatus,
    StatusType,
    TIMECAPSULETYPE,
    assignUnassignEnum,
} from 'types/enums';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import CustomPagination from 'components/common/CustomPagination';
import AssignAttributeTable from '../../CreateTimeCapsule/AssignAttributeTable.tsx';
import {
    assignTimeCapsule,
    getTimeCapsuleDetails,
    setTimeCapsuleState,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const UnAssignAttributeTable: React.FC<any> = ({
    showAssignAttribute,
    setShowAssignAttributeList,
}: any) => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const dispatch = useDispatch();
    const [attributeSearchTimeout, setAttributeSearchTimeout] =
        useState<any>(undefined);
    const [searchState, setSearchState] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attributesSelectedIds, setAttributesSelectedIds] = useState<any>([]);

    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const details = parseJwt();
    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );
    const { t } = useTranslation('translation');
    const timeCapsuleListLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
    );

    const assignTimeCapsuleResponse = useSelector(
        (state: any) => state?.configure?.timeCapsule?.assignTimeCapsule
    );

    useEffect(() => {
        assignTimeCapsuleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [assignTimeCapsuleResponse]);

    const handlePage = (page: any): any => {
        setPage(page);
    };

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    useEffect(() => {
        dispatch(
            getTimeCapsuleDetails({
                id: timeCapsuleDetails?.id,
                page,
                pageSize,
                status: StatusType.All,
                isAssign: AssignStatus?.UNASSIGNED,
                search: searchState,
            })
        );
    }, [page, pageSize]);

    const onOkHandler = (): any => {
        dispatch(
            assignTimeCapsule({
                id: timeCapsuleDetails?.id,
                attributesId: attributesSelectedIds || [],
                doAssign: assignUnassignEnum?.assign,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    const handleSearchChange = (e: any): any => {
        setSearchState(e.target.value);
        if (attributeSearchTimeout) {
            clearTimeout(attributeSearchTimeout);
        }
        // Debouncing for search implemented
        setAttributeSearchTimeout(
            setTimeout(() => {
                dispatch(
                    getTimeCapsuleDetails({
                        id: timeCapsuleDetails?.id,
                        page,
                        pageSize,
                        status: StatusType.All,
                        isAssign: AssignStatus?.UNASSIGNED,
                        search: e.target.value,
                    })
                );
            }, 1000)
        );
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
    };

    return (
        <div>
            <div className="assignTimeCapsuleWrapper">
                <Row className="viewCapsuleWrapper__headingContainer">
                    <div className="viewCapsuleWrapper__headingAttribute">
                        {t(
                            'timeCapsuleDefinition.editTimeCapsule.selectAttributeToAssign'
                        )}
                    </div>
                </Row>
                <Row className="viewCapsuleWrapper__headingSearchContainer">
                    <Input
                        allowClear
                        className="timeCapsuleWrapper__search"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        value={searchState}
                        onChange={handleSearchChange}
                    />
                </Row>
                <>
                    {timeCapsuleListLoading ? (
                        <div className="view__loader">
                            <Spin />
                        </div>
                    ) : (
                        <>
                            <Row
                                className={
                                    timeCapsuleDetails?.pageResponse
                                        ?.totalRecords > 50
                                        ? 'attributeWrapper__attributeListPagination'
                                        : 'attributeWrapper__attributeList'
                                }
                            >
                                <Col span={24}>
                                    <AssignAttributeTable
                                        data={
                                            timeCapsuleDetails?.pageResponse
                                                ?.records
                                        }
                                        payload={{ page, pageSize }}
                                        capsuleId={timeCapsuleDetails?.id}
                                        isAssign={AssignStatus?.UNASSIGNED}
                                        search={searchState}
                                        status={StatusType.All}
                                        setAttributesSelectedIds={
                                            setAttributesSelectedIds
                                        }
                                        totalCountWithoutSearch={
                                            timeCapsuleDetails?.pageResponse
                                                ?.totalRecords
                                        }
                                    />

                                    {timeCapsuleDetails?.pageResponse
                                        ?.totalRecords > 50 ? (
                                        <CustomPagination
                                            totalRecords={
                                                timeCapsuleDetails?.pageResponse
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
                            <div className="createCapsuleWrapper__createRoleFooter">
                                <div className="createCapsuleWrapper__footerButtonWrapper">
                                    <CustomButton
                                        type={'Back'}
                                        disabled={false}
                                        handleClick={() => {
                                            cancelHandle(
                                                showAssignAttribute,
                                                setShowAssignAttributeList
                                            );
                                            dispatch(
                                                getTimeCapsuleDetails({
                                                    id: timeCapsuleDetails?.id,
                                                    page,
                                                    pageSize,
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div className="createCapsuleWrapper__footerButtonWrapper">
                                    <CustomButton
                                        type={'Assign'}
                                        disabled={
                                            !attributesSelectedIds?.length
                                        }
                                        handleClick={() => {
                                            setIsModalOpen(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <ConfirmationModal
                        open={isModalOpen}
                        icon={<ConfirmationIcon />}
                        onOk={() => onOkHandler()}
                        onCancel={() =>
                            cancelHandle(isModalOpen, setIsModalOpen)
                        }
                        text={t(
                            'timeCapsuleDefinition.modal.conformationMessage'
                        )}
                    />
                    <SuccessfulModal
                        open={activeSuccessModalOpen}
                        onOk={() => onOkHandler()}
                        onCancel={() => {
                            dispatch(
                                setTimeCapsuleState(TIMECAPSULETYPE.display)
                            );
                            cancelHandle(
                                activeSuccessModalOpen,
                                setActiveSuccessModalOpen
                            );
                        }}
                        text={'Time Capsule Saved Successfully'}
                    />
                </>
            </div>
        </div>
    );
};

export default UnAssignAttributeTable;
