import React, { useEffect, useState } from 'react';
import { Card, Radio, Row } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { TIMECAPSULETYPE } from 'types/enums';
import {
    setTimeCapsuleState,
    updateTimeCapsule,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import EditTimeCapsuleStep1 from './EditTimeCapsuleBasicDetails';
import EditTimeCapsuleStep2 from './EditTimeCapsuleAttributeAssign';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const EditTimeCapsule: React.FC<any> = (): any => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [editEnabled, setEditEnabled] = useState(false);
    const [nameState, setNameState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');
    const updateTimeCapsuleResponse = useSelector(
        (state: any) => state?.configure?.timeCapsule?.updateTimeCapsule
    );

    const timeCapsuleDetails = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleDetails
    );

    useEffect(() => {
        setDescriptionState(timeCapsuleDetails?.description);
        setNameState(timeCapsuleDetails?.name);
    }, [timeCapsuleDetails]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const details = parseJwt();
    const { t } = useTranslation('translation');
    const onOkHandler = (): any => {
        if (count === 1) {
            dispatch(
                updateTimeCapsule({
                    timeCapsuleId: timeCapsuleDetails?.id,
                    name: nameState,
                    description: descriptionState,
                    requestedBy: details?.username,
                })
            );
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        updateTimeCapsuleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [updateTimeCapsuleResponse]);

    return (
        <>
            <div className="editCapsuleWrapper">
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row className="editCapsuleWrapper__headerWrapper">
                        <div className="editCapsuleWrapper__heading">
                            <div className="editCapsuleWrapper__backIcon">
                                <BackIcon
                                    onClick={() =>
                                        dispatch(
                                            setTimeCapsuleState(
                                                TIMECAPSULETYPE.display
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div className="editCapsuleWrapper__headingName fw-500 fs-20">
                                {t(
                                    'timeCapsuleDefinition.editTimeCapsule.editTimeCapsule'
                                )}
                            </div>
                        </div>
                    </Row>

                    <Row className="editCapsuleWrapper__tabContainer">
                        <Radio.Group
                            value={count}
                            onChange={(e: any) => {
                                setCount(e.target.value);
                            }}
                        >
                            <Radio.Button value={1}>
                                {t(
                                    'timeCapsuleDefinition.editTimeCapsule.basicDetails'
                                )}
                            </Radio.Button>
                            <Radio.Button value={2}>
                                {t(
                                    'timeCapsuleDefinition.editTimeCapsule.assignedAttributes'
                                )}
                            </Radio.Button>
                        </Radio.Group>
                    </Row>

                    <div className={'editCapsuleWrapper__scrollContent'}>
                        {count === 1 ? (
                            <EditTimeCapsuleStep1
                                setNameState={setNameState}
                                setDescriptionState={setDescriptionState}
                                setEditEnabled={setEditEnabled}
                                nameState={nameState}
                            />
                        ) : count === 2 ? (
                            <EditTimeCapsuleStep2 />
                        ) : (
                            ''
                        )}
                    </div>
                    {count === 1 && (
                        <div className="editCapsuleWrapper__createRoleFooter">
                            <div className="editCapsuleWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={'Cancel'}
                                    disabled={false}
                                    handleClick={() => {
                                        dispatch(
                                            setTimeCapsuleState(
                                                TIMECAPSULETYPE.display
                                            )
                                        );
                                    }}
                                />
                            </div>
                            <div className="editCapsuleWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={'Save'}
                                    disabled={!editEnabled}
                                    handleClick={() => {
                                        modalShow(isModalOpen, setIsModalOpen);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </Card>
            </div>

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
        </>
    );
};

export default EditTimeCapsule;
