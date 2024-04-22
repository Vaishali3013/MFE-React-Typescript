import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import RoleProgress from 'components/common/RoleProgress';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import type { rolePermissionTypes } from 'types/interfaces/PropsInterfaces';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import {
    setEditRoleState,
    createRoles,
    setResourceTypePayload,
} from 'redux/actions/UserManagementActions/rolesAction';
import { ROLETYPE, screenName } from 'types/enums';
import CreateRoleStep1 from './CreateRoleResourceSelection';
import CreateRoleStep2 from './CreateRoleUserSelection';
import CreateRoleStep3 from './CreateRoleWithMeta';
import { useTranslation } from 'react-i18next';
import { parseJwt } from 'utils/jwtTokenFunction';

const CreateRole: React.FC = () => {
    const { t } = useTranslation('translation');
    const details = parseJwt();
    const [count, setCount] = useState(1);
    const [nameState, setNameState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');
    const [rolesPermissionListState, setRolesPermissionListState] = useState<
        rolePermissionTypes[]
    >([]);

    const dispatch = useDispatch();

    const createRoleResponse = useSelector(
        (state: any) => state.userManagement.roles.createRoleState
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);

    const onOkHandler = (): any => {
        dispatch(createRoles(payload));
    };

    useEffect(() => {
        createRoleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createRoleResponse]);

    const selectedRowData = useSelector(
        (state: any) => state.userManagement.roles.usersRoleListPayload
    );

    const payload = {
        roleName: nameState,
        roleDescription: descriptionState,
        resourcePermissionList: rolesPermissionListState,
        active: false,
        deleted: false,
        createdBy: details?.username,
        userMetaDataList: selectedRowData,
    };

    return (
        <>
            <div className="createRolesWrapper">
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row className="createRolesWrapper__headerWrapper">
                        <Col span={18} className="createRolesWrapper__heading">
                            <div className="createRolesWrapper__backIcon">
                                <BackIcon
                                    onClick={() =>
                                        dispatch(
                                            setEditRoleState(ROLETYPE.view)
                                        )
                                    }
                                />
                            </div>
                            <ScreenNameHeading
                                heading={t('roles.createRole')}
                                subHeading={t('roles.roledescp')}
                            />
                        </Col>
                        <Col span={6}>
                            <RoleProgress
                                count={count}
                                screen={screenName.userManagementRoles}
                            />
                        </Col>
                    </Row>

                    <div className="createRolesWrapper__scrollContent">
                        {count === 1 ? (
                            <CreateRoleStep1
                                rolesPermissionListState={
                                    rolesPermissionListState
                                }
                                setRolesPermissionListState={
                                    setRolesPermissionListState
                                }
                            />
                        ) : count === 2 ? (
                            <CreateRoleStep2 />
                        ) : (
                            <CreateRoleStep3
                                setNameState={setNameState}
                                setDescriptionState={setDescriptionState}
                            />
                        )}
                    </div>

                    <div className="createRolesWrapper__createRoleFooter">
                        <div className="createRolesWrapper__footerButtonWrapper">
                            <CustomButton
                                type={
                                    count === 1
                                        ? t('commonStr.cancel')
                                        : t('commonStr.back')
                                }
                                disabled={false}
                                handleClick={() => {
                                    count === 1
                                        ? dispatch(
                                              setEditRoleState(ROLETYPE.view)
                                          )
                                        : setCount(count - 1);
                                }}
                            />
                        </div>
                        <div className="createRolesWrapper__footerButtonWrapper">
                            {count === 3 ? (
                                <CustomButton
                                    type={t('commonStr.save')}
                                    disabled={nameState === ''}
                                    handleClick={() => {
                                        modalShow(isModalOpen, setIsModalOpen);
                                    }}
                                />
                            ) : (
                                <CustomButton
                                    type={t('commonStr.next')}
                                    disabled={
                                        rolesPermissionListState.length === 0
                                    }
                                    handleClick={() => {
                                        dispatch(
                                            setResourceTypePayload(
                                                rolesPermissionListState
                                            )
                                        );
                                        setCount(count + 1);
                                    }}
                                />
                            )}
                        </div>
                        {count > 1 && count < 3 && (
                            <div className="createRolesWrapper__footerButtonWrapper">
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                >
                                    {'Skip>>'}
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onOk={() => onOkHandler()}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('roles.confirmText')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => {
                    dispatch(setEditRoleState(ROLETYPE.view));
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                }}
                text={t('roles.savetext')}
            />
        </>
    );
};

export default CreateRole;
