import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Col, Input, Row, Spin } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import EditAttributeTable from './EditAttributeTable';
import { ReactComponent as RedClosedIcon } from 'assets/icons/redClosedIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import {
    assignTimeCapsule,
    getTimeCapsuleDetails,
    setTimeCapsuleState,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import CustomModal from 'components/common/Modals/CustomModal';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import UnAssignAttributeTable from './UnAssignedAttributeTable';
import CustomPagination from 'components/common/CustomPagination';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import { TIMECAPSULETYPE, assignUnassignEnum } from 'types/enums';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const EditTimeCapsuleStep2: React.FC<any> = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [searchState, setSearchState] = useState('');
    const [showAssignAttribute, setShowAssignAttributeList] = useState(false);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const handlePage = (page: any): any => {
        setPage(page);
    };

    const handlePageSize = (current: any): any => {
        setPageSize(current);
    };

    const [timeCapsuleSearchTimeout, setTimeCapsuleSearchTimeout] =
        useState<any>(undefined);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');

    const timeCapsuleDetailLoading = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetailLoading
    );

    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );

    const assignTimeCapsuleResponse = useSelector(
        (state: any) => state?.configure?.timeCapsule?.assignTimeCapsule
    );

    const details = parseJwt();

    const onOkHandler = (): any => {
        dispatch(
            assignTimeCapsule({
                id: timeCapsuleDetails?.id,
                attributesId: selectedRowIds || [],
                doAssign: assignUnassignEnum?.unAssign,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (timeCapsuleDetails?.id) {
            dispatch(
                getTimeCapsuleDetails({
                    id: timeCapsuleDetails?.id,
                    page,
                    pageSize,
                })
            );
        }
    }, [page, pageSize]);

    useEffect(() => {
        assignTimeCapsuleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [assignTimeCapsuleResponse]);

    return (
        <div className="editCapsuleWrapper__createRoleContent3">
            <Row className="editCapsuleWrapper__headingContainer">
                <div className="editCapsuleWrapper__headingAttribute">
                    {t(
                        'timeCapsuleDefinition.editTimeCapsule.assignedAttributes'
                    )}
                </div>
            </Row>
            <Row className="editCapsuleWrapper__headingSearchContainer">
                <Col span={14}>
                    <Input
                        allowClear
                        className="timeCapsuleWrapper__search"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        value={searchState}
                        onChange={(e) => {
                            setSearchState(e.target.value);
                            if (timeCapsuleSearchTimeout) {
                                clearTimeout(timeCapsuleSearchTimeout);
                            }
                            // Debouncing for search implemented
                            setTimeCapsuleSearchTimeout(
                                setTimeout(() => {
                                    dispatch(
                                        getTimeCapsuleDetails({
                                            id: timeCapsuleDetails?.id,
                                            page,
                                            pageSize,
                                            search: e.target.value,
                                        })
                                    );
                                }, 1000)
                            );
                        }}
                    />
                </Col>
                <Col span={10} className="editCapsuleWrapper__buttonContainer">
                    {selectedRowIds?.length ? (
                        <div>
                            <Button
                                className="custom-buttonUnassign"
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                            >
                                <RedClosedIcon />
                                {t(
                                    'timeCapsuleDefinition.editTimeCapsule.unassignAttributeFromTimeCapsule'
                                )}
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                    <div>
                        <Button
                            className="custom-buttonAssign"
                            onClick={() => {
                                setShowAssignAttributeList(true);
                            }}
                        >
                            <PlusOutlined />
                            {t(
                                'timeCapsuleDefinition.editTimeCapsule.assignAttributeButton'
                            )}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row className={'editCapsuleWrapper__timeCapsuleListPagination'}>
                <Col span={24}>
                    {timeCapsuleDetailLoading ? (
                        <div className="view__loader">
                            <Spin />
                        </div>
                    ) : (
                        <>
                            <EditAttributeTable
                                data={timeCapsuleDetails?.pageResponse?.records}
                                payload={{ page, pageSize }}
                                search={searchState}
                                capsuleId={timeCapsuleDetails?.id}
                                setSelectedRowIds={setSelectedRowIds}
                                selectedRowIds={selectedRowIds}
                            />
                            <CustomPagination
                                totalRecords={
                                    timeCapsuleDetails?.pageResponse
                                        ?.totalRecords
                                }
                                setPage={handlePage}
                                page={page}
                                setPageSize={handlePageSize}
                                pageSize={pageSize}
                            />
                        </>
                    )}
                </Col>
            </Row>
            <CustomModal
                open={showAssignAttribute}
                onCancel={() => {
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
                onOk={() => {
                    okHandle(showAssignAttribute, setShowAssignAttributeList);
                }}
                customClassName="assignAttributeModal"
                footer={null}
            >
                <UnAssignAttributeTable
                    showAssignAttribute={showAssignAttribute}
                    setShowAssignAttributeList={setShowAssignAttributeList}
                />
            </CustomModal>
            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onOk={() => onOkHandler()}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('timeCapsuleDefinition.modal.conformationMessage')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => {
                    dispatch(setTimeCapsuleState(TIMECAPSULETYPE.display));
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                }}
                text={'Time Capsule Saved Successfully'}
            />
        </div>
    );
};

export default EditTimeCapsuleStep2;
