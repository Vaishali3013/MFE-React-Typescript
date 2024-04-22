import React, { useState } from 'react';
import './index.scss';
import { Button, Input, Typography } from 'antd';
import { cancelHandle, okHandle } from 'utils/modalFunction';
import ManualEntryConfirmationModal from 'components/common/Modals/ManualEntryModal';
import { ReactComponent as AddIcon } from 'assets/icons/AddModalIcon.svg';
import { useDispatch } from 'react-redux';
import { setManualParamsValueAction } from 'redux/actions/ManualEntryActions/manualEntryActions';
import dayjs from 'dayjs';
import { DATE_FORMAT_MANUAL_ENTRY } from 'utils/constants';
import { handleKeyPressForNumberInput } from 'utils/commonFunction';

const DataComponent: React.FC<any> = ({
    key,
    id,
    title,
    titleUnits,
    descriptionValue,
    timeStampValue,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paramValue, setParamValue] = useState<any>();
    const dispatch = useDispatch();

    return (
        <>
            <div className="dataComponentWrapper">
                <div className="dataComponentWrapper__titleSection">
                    {title} ({titleUnits})
                </div>
                <div className="dataComponentWrapper__inputSection">
                    <Input
                        key={key}
                        type="text"
                        placeholder="Enter Value"
                        onKeyPress={handleKeyPressForNumberInput}
                        onChange={(e: any) => {
                            const inputValue = e.target.value;
                            if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                                setParamValue(inputValue);
                            } else {
                                setParamValue('');
                            }
                        }}
                        value={paramValue}
                    />
                    <Typography className="dataComponentWrapper__dscriptionSection">
                        Last Entered value:
                        <span className="fw-500 fs-16">
                            {descriptionValue ?? 'Not Found'}
                        </span>
                    </Typography>
                    <Typography className="dataComponentWrapper__dscriptionSection">
                        {timeStampValue
                            ? dayjs(timeStampValue).format(
                                  DATE_FORMAT_MANUAL_ENTRY
                              )
                            : ''}
                    </Typography>
                </div>
                <div>
                    <Button
                        className="dataComponentWrapper__saveButton"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                        disabled={!paramValue}
                    >
                        <span className="fw-400 fs-14">{'Save'}</span>
                    </Button>
                </div>
            </div>
            <ManualEntryConfirmationModal
                open={isModalOpen}
                onOk={() => {
                    dispatch(
                        setManualParamsValueAction({
                            id: id,
                            value: paramValue,
                        })
                    );
                    okHandle(isModalOpen, setIsModalOpen);
                }}
                onCancel={() => {
                    cancelHandle(isModalOpen, setIsModalOpen);
                }}
                text="Do you wish to save this new value?"
                title={`Entered ${title} value is`}
                titleValue={paramValue}
                icon={<AddIcon />}
            />
        </>
    );
};

export default DataComponent;
