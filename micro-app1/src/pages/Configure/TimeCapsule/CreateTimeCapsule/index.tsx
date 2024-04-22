import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import './index.scss';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { useDispatch, useSelector } from 'react-redux';
import { TIMECAPSULETYPE, screenName } from 'types/enums';
import {
    changeSuccessStateOfTimeCapsule,
    createTimeCapsule,
    setTimeCapsuleState,
    updateTimeCapsuleDataForLocal,
} from 'redux/actions/ConfigureActions/timeCapsuleActions';
import TimeCapsuleProgress from 'components/common/TimeCapsuleProgress';
import CreateTimeCapsuleStep1 from './CreateTimeCapsuleBasicDetails';
import CreateTimeCapsuleStep2 from './CreateTimeCapsuleAttributeAssign';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const CreateTimeCapsule: React.FC<any> = (): any => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const { t } = useTranslation('translation');
    const [nameState, setNameState] = useState('');
    const [descriptionState, setDescriptionState] = useState('');
    const createTimeCapsuleResponse = useSelector(
        (state: any) => state?.configure?.timeCapsule?.createTimeCapsule
    );

    const [attributesSelectedIds, setAttributesSelectedIds] = useState<any>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const details = parseJwt();

    const onOkHandler = (): any => {
        dispatch(
            createTimeCapsule({
                name: nameState,
                description: descriptionState,
                attributeIdList: attributesSelectedIds,
                requestedBy: details?.username,
            })
        );
        setIsModalOpen(false);
    };

    useEffect(() => {
        createTimeCapsuleResponse &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [createTimeCapsuleResponse]);

    return (
        <>
            <div className="createCapsuleWrapper">
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                    <Row className="createCapsuleWrapper__headerWrapper">
                        <Col span={18}>
                            <div className="createCapsuleWrapper__heading">
                                <div className="createCapsuleWrapper__backIcon">
                                    <BackIcon
                                        onClick={() => {
                                            count === 1
                                                ? dispatch(
                                                      setTimeCapsuleState(
                                                          TIMECAPSULETYPE.display
                                                      )
                                                  )
                                                : setCount(count - 1);
                                        }}
                                    />
                                </div>
                                <div className="createCapsuleWrapper__headingName fw-500 fs-20">
                                    {t(
                                        'timeCapsuleDefinition.createTimeCapsule.createTimeCapsule'
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <TimeCapsuleProgress
                                count={count}
                                screen={screenName.timeCapsule}
                            />
                        </Col>
                    </Row>
                    {count === 1 ? (
                        <div className="createCapsuleWrapper__scrollContent">
                            <CreateTimeCapsuleStep1
                                setNameState={setNameState}
                                setDescriptionState={setDescriptionState}
                            />
                        </div>
                    ) : count === 2 ? (
                        <div className="createCapsuleWrapper__scrollContentTable">
                            <CreateTimeCapsuleStep2
                                setAttributesSelectedIds={
                                    setAttributesSelectedIds
                                }
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </Card>
                <div className="createCapsuleWrapper__createRoleFooter">
                    <div className="createCapsuleWrapper__footerButtonWrapper">
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
                                          setTimeCapsuleState(
                                              TIMECAPSULETYPE.display
                                          )
                                      )
                                    : setCount(count - 1);
                            }}
                        />
                    </div>
                    <div className="createCapsuleWrapper__footerButtonWrapper">
                        {count === 2 ? (
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
                                disabled={nameState?.trim() === ''}
                                handleClick={() => {
                                    setCount(count + 1);
                                    dispatch(
                                        updateTimeCapsuleDataForLocal({
                                            nameState: nameState,
                                            descriptionState: descriptionState,
                                        })
                                    );
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onOk={() => onOkHandler()}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('timeCapsuleDefinition.modal.saveConformationMessage')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => {
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                    dispatch(changeSuccessStateOfTimeCapsule());
                    dispatch(setTimeCapsuleState(TIMECAPSULETYPE.display));
                }}
                text={'Time Capsule Saved Successfully'}
            />
        </>
    );
};

export default CreateTimeCapsule;
