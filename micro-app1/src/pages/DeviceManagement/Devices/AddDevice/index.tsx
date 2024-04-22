import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, message } from 'antd';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import RoleProgress from 'components/common/RoleProgress';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import Blas from 'pages/DeviceManagement/Blas';
import CommunicationInterface from './CommunicationInterface';
import { useDispatch, useSelector } from 'react-redux';
import AddBla from 'pages/DeviceManagement/Blas/AddBla';
import {
    getDeviceDetails,
    setAddDeviceState,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import { getAllTagList } from 'redux/actions/DeviceManagementActions/tagAction';
import TagListing from 'components/common/WizardCommonComponents/TagListing';
import { ROLETYPE, screenName } from 'types/enums';
import AddTagDrawer from 'pages/DeviceManagement/Tags/addTagDrawer';
import {
    removeSelectedDeviceFromRedux,
    setBlaId,
    setDeviceId,
} from 'redux/actions/DeviceManagementActions/blasAction';
import { useTranslation } from 'react-i18next';
import CreateAttribute from 'pages/Configure/AttributeDefinition/CreateUom';

const AddDevice: React.FC<any> = ({ isAddDeviceClicked }) => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [openAddTag, setOpenAddTag] = useState(false);
    const [isUomOpen, setIsUomOpen] = useState(false);

    const addBlaState = useSelector(
        (state: any) => state.deviceManagement.blas.addBlaState
    );
    const selectedBla = useSelector(
        (state: any) => state.deviceManagement.devices.selectedBla
    );
    const blaId = useSelector(
        (state: any) => state.deviceManagement.blas.blaId
    );

    const lastAddedDevice = useSelector(
        (state: any) => state.deviceManagement.devices.lastAddedDevice
    );
    const deviceId = useSelector(
        (state: any) => state.deviceManagement.blas.deviceId
    );
    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );
    useEffect(() => {
        lastAddedDevice && dispatch(setDeviceId(lastAddedDevice?.deviceId));
    }, [lastAddedDevice]);

    // NOTE- We are setting count=1, because everytime the wizard is opened, it should start from step 1.
    useEffect(() => {
        setCount(1);
    }, []);

    useEffect(() => {
        blaId && setCount(2);
    }, [blaId]);

    useEffect(() => {
        if (deviceId && count !== 3) {
            setCount(3);
            dispatch(getDeviceDetails(deviceId));
            dispatch(getAllTagList({ deviceId: deviceId }));
        }
    }, [deviceId, openAddTag]);

    return (
        <>
            {isUomOpen ? (
                <CreateAttribute setIsUomOpen={setIsUomOpen} />
            ) : (
                <>
                    {' '}
                    <div className="deviceWrapper">
                        <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            {addBlaState === 'view' ? (
                                <Row className="deviceWrapper__headerWrapper">
                                    <Col
                                        span={18}
                                        className="deviceWrapper__heading"
                                    >
                                        <div className="deviceWrapper__backIcon">
                                            <BackIcon
                                                onClick={() => {
                                                    dispatch(
                                                        setAddDeviceState(false)
                                                    );
                                                    dispatch(
                                                        removeSelectedDeviceFromRedux()       
                                                    );
                                                    dispatch(setBlaId(null));
                                                    dispatch(setDeviceId(null));
                                                }}
                                            />
                                        </div>
                                        <div className="deviceWrapper__screenNameHeading">
                                            <ScreenNameHeading
                                                heading={t(
                                                    'commonStr.addDevice'
                                                )}
                                                subHeading={''}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <RoleProgress
                                            count={count}
                                            screen={
                                                screenName.deviceManagementDevices
                                            }
                                        />
                                    </Col>
                                </Row>
                            ) : null}

                            {count === 1 ? (
                                <>
                                    {addBlaState === ROLETYPE.view ? (
                                        <div className="deviceWrapper__scrollContent">
                                            <Blas
                                                screen="devices"
                                                isAddDeviceClicked={
                                                    isAddDeviceClicked
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <AddBla screen="devices" />
                                    )}
                                </>
                            ) : count === 2 ? (
                                <CommunicationInterface />
                            ) : (
                                <TagListing
                                    screen="devices"
                                    openAddTag={openAddTag}
                                    setOpenAddTag={setOpenAddTag}
                                />
                            )}

                            {addBlaState === ROLETYPE.view ? (
                                <div className="deviceWrapper__createRoleFooter">
                                    <div className="deviceWrapper__footerButtonWrapper">
                                        <CustomButton
                                            type={
                                                count <= 1 ? 'Cancel' : 'Back'
                                            }
                                            disabled={
                                                count === 1
                                                    ? lastAddedDevice
                                                    : false
                                            }
                                            handleClick={() => {
                                                count <= 1
                                                    ? dispatch(
                                                          setAddDeviceState(
                                                              false
                                                          )
                                                      ) &&
                                                      dispatch(
                                                          setBlaId(null)
                                                      ) &&
                                                      dispatch(
                                                          setDeviceId(null)
                                                      )
                                                    : count === 3
                                                    ? dispatch(
                                                          setAddDeviceState(
                                                              false
                                                          )
                                                      ) &&
                                                      dispatch(
                                                          setBlaId(null)
                                                      ) &&
                                                      dispatch(
                                                          setDeviceId(null)
                                                      ) &&
                                                      dispatch(
                                                          removeSelectedDeviceFromRedux()
                                                      )
                                                    : dispatch(
                                                          setBlaId(null)
                                                      ) && setCount(count - 1);
                                            }}
                                        />
                                    </div>
                                    <div className="deviceWrapper__footerButtonWrapper">
                                        {count === 3 ? (
                                            <CustomButton
                                                type={'Finish'}
                                                disabled={false}
                                                handleClick={() => {
                                                    modalShow(
                                                        isModalOpen,
                                                        setIsModalOpen
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <CustomButton
                                                type={'Next'}
                                                disabled={false}
                                                handleClick={() => {
                                                    // Note: this needs a cleanup multiple if else condition
                                                    if (
                                                        selectedBla.length > 0
                                                    ) {
                                                        if (count === 1) {
                                                            dispatch(
                                                                setBlaId(
                                                                    selectedBla[0]
                                                                        ?.blaId
                                                                )
                                                            );
                                                            setCount(count + 1);
                                                        } else if (
                                                            lastAddedDevice
                                                        ) {
                                                            setCount(count + 1);
                                                        }
                                                    } else {
                                                        message.error(
                                                            'Select a BLA'
                                                        );
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                    {count > 1 && count < 3 && (
                                        <div className="deviceWrapper__footerButtonWrapper">
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    dispatch(
                                                        setAddDeviceState(false)
                                                    );
                                                    dispatch(setBlaId(null));
                                                    dispatch(setDeviceId(null));
                                                }}
                                            >
                                                {'Skip>>'}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </Card>
                    </div>{' '}
                    {openAddTag && (
                        <AddTagDrawer
                            open={openAddTag}
                            setAddDrawerState={setOpenAddTag}
                            deviceId={deviceId}
                            type="add"
                            deviceDetails={deviceDetails}
                            record={deviceDetails}
                            setIsUomOpen={setIsUomOpen}
                        />
                    )}
                </>
            )}
            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                onOk={() => {
                    dispatch(removeSelectedDeviceFromRedux());
                    modalShow(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                    okHandle(isModalOpen, setIsModalOpen);
                    dispatch(setBlaId(null));
                    dispatch(setDeviceId(null));
                    dispatch(setAddDeviceState(false));
                }}
                text={t('deviceMang.devices.wantToAddNewDevice')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onCancel={() => {
                    cancelHandle(isModalOpen, setIsModalOpen);
                    dispatch(setAddDeviceState(false));
                }}
                text={t('deviceMang.devices.newDeviceSuccess')}
            />
        </>
    );
};

export default AddDevice;
