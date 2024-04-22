import React from 'react';
import { Modal, Switch } from 'antd';
import './index.scss';
import { type ModalProps } from 'types/interfaces/PropsInterfaces';

const ConfirmationModal: React.FC<ModalProps> = ({
    open,
    onCancel,
    onOk,
    text,
    icon,
    otpComponent,
    customClassName,
    countAnalytics,
    buttonText,
    popoverSwitch,
    popoverSwitchComponent,
    okButtonProp,
    subText,
    onSwitchChecked,
}) => {
    return (
        <>
            <Modal
                centered
                open={open}
                destroyOnClose={true}
                onOk={() => onOk()}
                onCancel={() => onCancel()}
                okText={otpComponent ? 'Send' : buttonText ?? 'Yes'}
                className={customClassName ?? `confirmationModal`}
                okButtonProps={okButtonProp}
            >
                {icon}
                <span
                    className={`${
                        customClassName ? 'text-center' : ''
                    } fw-400 fs-20`}
                >
                    {text}
                </span>
                {subText?.length > 0 && (
                    <div>
                        {subText}
                        <span className="switchSpan">
                            <Switch
                                onChange={(checked) => onSwitchChecked(checked)}
                            />
                        </span>
                    </div>
                )}

                {otpComponent && otpComponent}
                {countAnalytics && countAnalytics}
                {popoverSwitch && popoverSwitchComponent}
            </Modal>
        </>
    );
};

export default ConfirmationModal;
