import React, { useEffect } from 'react';
import { Card, Spin } from 'antd';
import './index.scss';
import CustomHeader from '../../components/common/CustomHeader';
import DataComponent from './components/ManualEntryDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllManualParamsAction,
    getManualParamsValueAction,
} from 'redux/actions/ManualEntryActions/manualEntryActions';

const ManualEntry: React.FC = () => {
    const dispatch = useDispatch();
    const allManualDataParam = useSelector(
        (state: any) => state?.manualEntry?.allManualEntryParams
    );
    const manualDataParamValue = useSelector(
        (state: any) => state?.manualEntry?.manualEntryValueParams
    );

    const createManualDataParamValue = useSelector(
        (state: any) => state?.manualEntry?.setManualEntryValueParams
    );

    useEffect(() => {
        dispatch(getAllManualParamsAction());
    }, [createManualDataParamValue]);

    useEffect(() => {
        const idList: any = [];
        allManualDataParam?.data &&
            allManualDataParam?.data?.map((item: any) => {
                idList.push(item?.id);
            });
        idList.length && dispatch(getManualParamsValueAction({ id: idList }));
    }, [allManualDataParam]);

    return (
        <div className="manualEntry">
            <CustomHeader
                heading="Manual Entry"
                customDateTimePicker={false}
                currentTimePicker={true}
                infoTooltip={true}
            />
            <div className="manualEntryWrapperScrolContent">
                {allManualDataParam?.loader ? (
                    <div className="view__loader">
                        <Spin />
                    </div>
                ) : (
                    <div className="manualEntryWrapper">
                        <Card
                            bordered={false}
                            className="manualEntryWrapper__cardContent"
                        >
                            <div className="manualEntryWrapper__cardBody">
                                {allManualDataParam?.data?.length &&
                                    allManualDataParam?.data?.map(
                                        (item: any) => {
                                            const matchingItem =
                                                manualDataParamValue?.data?.find(
                                                    (manualItem: any) =>
                                                        manualItem.id ===
                                                        item.id
                                                );
                                            return (
                                                <DataComponent
                                                    title={item.name}
                                                    titleUnits={
                                                        item?.unit?.name
                                                    }
                                                    timeStampValue={
                                                        matchingItem?.timestamp
                                                    }
                                                    descriptionValue={
                                                        matchingItem?.value
                                                    }
                                                    key={item.id}
                                                    id={item.id}
                                                />
                                            );
                                        }
                                    )}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManualEntry;
