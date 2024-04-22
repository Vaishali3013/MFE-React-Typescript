import React from 'react';
import { Modal, Typography } from 'antd';
import './index.scss';
import { type ManualEntryModalProps } from 'types/interfaces/PropsInterfaces';

const ManualEntryConfirmationModal: React.FC<ManualEntryModalProps> = ({
    open,
    onCancel,
    onOk,
    text,
    title,
    titleValue,
    icon,
    customClassName,
    buttonText,
}) => {
    return (
        <>
            <Modal
                centered
                open={open}
                destroyOnClose={true}
                onOk={() => onOk()}
                onCancel={() => onCancel()}
                okText={buttonText ?? 'Yes'}
                className={customClassName ?? `manualEntryConfirmationModal`}
            >
                {icon}
                <div className="titleContainer">
                    <Typography className="titleConfirmationModal">
                        {title}
                    </Typography>
                    <Typography className="titleValueConfirmationModal">
                        {titleValue}
                    </Typography>
                </div>
                <span className="textConfirmationModal">{text}</span>
            </Modal>
        </>
    );
};

export default ManualEntryConfirmationModal;
