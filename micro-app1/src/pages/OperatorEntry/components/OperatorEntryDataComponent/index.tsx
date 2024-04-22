import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Select, Typography } from 'antd';
import ManualEntryConfirmationModal from 'components/common/Modals/ManualEntryModal';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import {
    getOperatorLastShiftDataAction,
    setOperatorParamsValueAction,
} from 'redux/actions/OperatorEntryActions/operatorEntryAction';
import { cancelHandle, okHandle } from 'utils/modalFunction';
import { ReactComponent as AddIcon } from 'assets/icons/AddModalIcon.svg';
import { dateFormat } from 'types/enums';

const { Option } = Select;

const OperatorEntryDataComponents: React.FC<any> = ({
    allOperatorDataParam,
    allSupervisorDataParam,
    assetIdVal,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [SaveButtonFlag, setSaveButtonFlag] = useState(false);
    const [paramValue, setParamValue] = useState<any>({
        assetId: assetIdVal,
        superviserId: null,
        operatorId: null,
    });

    const operatorUpdatedData = useSelector(
        (state: any): any => state?.operatorEntry?.operatorLastShiftData?.data
    );
    const [updatedOperatorData, setUpdatedOperatorData] = useState<any>({
        operatorFirstName: operatorUpdatedData?.operatorFName,
        operatorLastName: operatorUpdatedData?.operatorLName,
        supervisorFirstName: operatorUpdatedData?.supervisorFName,
        supervisorLastName: operatorUpdatedData?.supervisorLName,
        dateTime: operatorUpdatedData?.lastUpdateTime
            ? dayjs(operatorUpdatedData?.lastUpdateTime).format(
                  dateFormat.format
              )
            : '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            (paramValue?.assetId !== null || undefined) &&
            (paramValue?.superviserId !== null || undefined) &&
            (paramValue?.operatorId !== null || undefined)
        ) {
            setSaveButtonFlag(true);
        } else {
            setSaveButtonFlag(false);
        }
    }, [paramValue]);

    useEffect(() => {
        setUpdatedOperatorData({
            operatorFirstName: operatorUpdatedData?.operatorFName,
            operatorLastName: operatorUpdatedData?.operatorLName,
            supervisorFirstName: operatorUpdatedData?.supervisorFName,
            supervisorLastName: operatorUpdatedData?.supervisorLName,
            dateTime: operatorUpdatedData?.lastUpdateTime
                ? dayjs(operatorUpdatedData?.lastUpdateTime).format(
                      dateFormat.format
                  )
                : '',
        });
    }, [operatorUpdatedData]);

    useEffect(() => {
        setParamValue((params: any) => ({
            ...params,
            assetId: assetIdVal,
        }));
        dispatch(getOperatorLastShiftDataAction(assetIdVal));
    }, [assetIdVal]);

    return (
        <>
            <div className="operatorComponentWrapper">
                <div className="operatorComponentWrapper__above">
                    <div className="operatorComponentWrapper__titleSection">
                        Shift Supervisior :
                    </div>
                    <div className="operatorComponentWrapper__inputSection">
                        <Select
                            placeholder="Select"
                            className="operatorComponentWrapper__section"
                            onChange={(value) => {
                                setParamValue((params: any) => ({
                                    ...params,
                                    superviserId: value,
                                }));
                            }}
                        >
                            {allSupervisorDataParam?.map((item: any): any => (
                                <Option
                                    key={item.contactId}
                                    value={item.contactId}
                                >
                                    {`${item.firstName} ${item.lastName}`}
                                </Option>
                            ))}
                        </Select>

                        <Typography className="operatorComponentWrapper__descriptionSection">
                            Last Entered Name : {' '}
                            <span className="fw-500 fs-16">
                                {updatedOperatorData?.supervisorFirstName
                                    ? `${updatedOperatorData?.supervisorFirstName} ${updatedOperatorData?.supervisorLastName}`
                                    : '-'}
                            </span>
                        </Typography>
                        <Typography className="operatorComponentWrapper__descriptionSection">
                            {updatedOperatorData?.supervisorFirstName
                                ? `${updatedOperatorData?.dateTime} `
                                : ''}
                        </Typography>
                    </div>
                </div>
                <div className="operatorComponentWrapper__above">
                    <div className="operatorComponentWrapper__titleSection">
                        Shift Operator :
                    </div>
                    <div className="operatorComponentWrapper__inputSection">
                        <Select
                            placeholder="Select"
                            className="operatorComponentWrapper__section"
                            onChange={(value) => {
                                setParamValue((params: any) => ({
                                    ...params,
                                    operatorId: value,
                                }));
                            }}
                        >
                            {allOperatorDataParam?.map((item: any): any => (
                                <Option
                                    key={item.contactId}
                                    value={item.contactId}
                                >
                                    {`${item.firstName} ${item.lastName}`}
                                </Option>
                            ))}
                        </Select>
                        <Typography className="operatorComponentWrapper__descriptionSection">
                            Last Entered Name : {' '}
                            <span className="fw-500 fs-16">
                                {updatedOperatorData?.operatorFirstName
                                    ? `${updatedOperatorData?.operatorFirstName} ${updatedOperatorData?.operatorLastName}`
                                    : '-'}
                            </span>
                        </Typography>
                        <Typography className="operatorComponentWrapper__descriptionSection">
                            {updatedOperatorData?.operatorFirstName
                                ? `${updatedOperatorData?.dateTime} `
                                : ''}
                        </Typography>
                    </div>
                </div>
                <div className="operatorComponentWrapper__save">
                    <Button
                        disabled={!SaveButtonFlag}
                        className="operatorComponentWrapper__saveButton"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        <span className="fw-400 fs-14">{'Save'}</span>
                    </Button>
                </div>
            </div>
            <ManualEntryConfirmationModal
                open={isModalOpen}
                onOk={() => {
                    dispatch(
                        setOperatorParamsValueAction({
                            paramValue: paramValue,
                            assetId: assetIdVal,
                        })
                    );
                    okHandle(isModalOpen, setIsModalOpen);
                }}
                onCancel={() => {
                    cancelHandle(isModalOpen, setIsModalOpen);
                }}
                text="Do you wish to save this?"
                icon={<AddIcon />}
            />
        </>
    );
};

export default OperatorEntryDataComponents;
