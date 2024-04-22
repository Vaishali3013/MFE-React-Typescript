import { Modal } from 'antd';
import React, { type ReactNode } from 'react';
import './index.scss';
import { type ModalProps } from 'types/interfaces/PropsInterfaces';
import { ReactComponent as SuccessIcon } from 'assets/icons/successIcon.svg';

const SuccessfulModal: React.FC<ModalProps> = ({
    open,
    onCancel,
    onOk,
    text,
    customClassName,
}) => {
    const icon: ReactNode = <SuccessIcon />;
    return (
            <Modal
                centered
                open={open}
                destroyOnClose={true}
                onCancel={() => onCancel()}
                okText="Yes"
                className={customClassName ?? `successfulModal`}
                footer={null}
            >
                {icon}
                <span className="fw-400  fs-20">{text}</span>
            </Modal>
    );
};

export default SuccessfulModal;
