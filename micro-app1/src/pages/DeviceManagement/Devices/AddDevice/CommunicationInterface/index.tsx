import React, { useEffect, useState } from 'react';
import './index.scss';
import { communicationInterfaceOptions } from 'utils/configOptions';
import { Drawer, Tooltip } from 'antd';
import { InfoCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { CreateOPCForm } from './Forms/opcForm';
import { CreatePLCForm } from './Forms/createPLCForm';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { communicationInterfaceDevice } from 'types/enums';

const CommunicationInterface: React.FC<any> = ({
    blaDetails,
    setShowAddNewDeviceWizard,
    
}) => {
    const [selectedCommunicationInterface, setSelectedCommunicationInterface] =
        useState<undefined | string>();
    const [showDrawer, setShowDrawer] = useState(false);
    const [showActive, setShowActive] = useState(false);

    const cardSelectHandler = (value: string, index: number): void => {
        communicationInterfaceOptions.map((item, currentIndex) => {
            item.active = currentIndex === index;
            if (currentIndex === index)
                setSelectedCommunicationInterface(item.value);
            return item.value;
        });
    };

    const [currentForm, setCurrentForm] = useState<any>();
    const { t } = useTranslation('translation');
    useEffect(() => {
        if (
            selectedCommunicationInterface === communicationInterfaceDevice.OPC ||
            selectedCommunicationInterface === communicationInterfaceDevice.OPCDA ||
            selectedCommunicationInterface === communicationInterfaceDevice.BACNET ||
            selectedCommunicationInterface === communicationInterfaceDevice.MODBUSTCPDEVICES
        ) {
            setCurrentForm(
                <CreateOPCForm
                    blaDetails={blaDetails}
                    setShowDrawer={setShowDrawer}
                    selectedCommunicationInterface={
                        selectedCommunicationInterface
                    }
                />
            );
        } else if (
            selectedCommunicationInterface === communicationInterfaceDevice.INDUSTRIALCONTROLLER
        ) {
            setCurrentForm(
                <CreatePLCForm
                    blaDetails={blaDetails}
                    setShowDrawer={setShowDrawer}
                    selectedCommunicationInterface={
                        selectedCommunicationInterface
                    }
                />
            );
        } 
    }, [selectedCommunicationInterface]);

    useEffect(() => {
        !showDrawer &&
            communicationInterfaceOptions.map((item) => {
                item.active = false;
            });
        setShowActive(!showActive);
    }, [showDrawer]);

    const options = (
        <div key={`${showActive}`} className="device-selection-container">
            {communicationInterfaceOptions.map((element, index) => (
                <div
                    key={element.value}
                    onClick={() => {
                        if (!element.disabled) {
                            cardSelectHandler(element.value, index);
                            setShowDrawer(!showDrawer);
                        }
                    }}
                    className={
                        element.active
                            ? 'device-selection-box active-box'
                            : 'device-selection-box inactive-box'
                    }
                >
                    <div className="image-block">
                        <div
                            className={
                                element.active
                                    ? 'circle active-circle'
                                    : 'circle normal-circle'
                            }
                        >
                            <img src={element.image} />
                        </div>
                        <p
                            className={
                                element.active ? 'heading-active' : 'heading'
                            }
                        >
                            {element.heading}
                        </p>
                        <Tooltip
                            title={
                                element.tooltip
                                    ? element.tooltip
                                    : 'prompt text'
                            }
                        >
                            <InfoCircleOutlined />
                        </Tooltip>
                    </div>
                    <p className="device-info">{element.info}</p>
                </div>
            ))}
        </div>
    );

    const lastAddedDevice = useSelector(
        (state: any) => state.deviceManagement.devices.lastAddedDevice
    );

    useEffect(() => {
        lastAddedDevice &&
            setShowAddNewDeviceWizard &&
            setShowAddNewDeviceWizard(false);
    }, [lastAddedDevice]);

    return (
        <>
            <div className="selectInterfaceContainer">
                <h1 className="title">
                    {blaDetails ? (
                        <ArrowLeftOutlined
                            onClick={() => {
                                setShowAddNewDeviceWizard(false);
                            }}
                        />
                    ) : null}
                    {t('deviceMang.devices.selectCommunication')}
                </h1>
                <div className="optionsContainer">
                    <p className="select-text">
                        {t('deviceMang.devices.selectAvailableInterfaces')}
                    </p>
                    {options}
                </div>
            </div>
            <Drawer
                width={340}
                getContainer={false}
                className="communicationInterface__container"
                // title={selectedCommunicationInterface}
                closable={false}
                placement="right"
                open={showDrawer}
                onClose={() => {
                    setShowDrawer(false);
                    setSelectedCommunicationInterface('');
                }}
            >
                {currentForm}
            </Drawer>
        </>
    );
};

export default CommunicationInterface;
