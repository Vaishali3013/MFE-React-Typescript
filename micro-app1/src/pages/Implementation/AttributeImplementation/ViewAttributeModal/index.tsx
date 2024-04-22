import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
const { TextArea } = Input;
const ViewAttributeModal: React.FC = () => {
    const [open, setOpen] = useState(true);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                className="staticValueModal"
                open={open}
                title="View-Attribute 1"
                onOk={showModal}
                onCancel={handleCancel}
                footer={[
                    <>
                        <CustomButton
                            type={'Cancel'}
                            disabled={false}
                            handleClick={() => {
                                // dispatch(
                                //     setAttributeState(
                                //         ATTRIBUTETYPE.create
                                //     )
                                // );
                            }}
                        />
                        <CustomButton
                            type={'Validate'}
                            disabled={true}
                            handleClick={() => {
                                // dispatch(
                                //     setAttributeState(
                                //         ATTRIBUTETYPE.create
                                //     )
                                // );
                            }}
                        />
                    </>,
                ]}
            >
                <div>
                    <p>Write Static Value for Attribut</p>
                    <TextArea rows={10} placeholder="Type Here" />
                </div>
            </Modal>
        </>
    );
};

export default ViewAttributeModal;
