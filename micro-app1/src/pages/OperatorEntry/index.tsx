import React, { useEffect, useState } from 'react';
import './index.scss';
import CustomHeader from 'components/common/CustomHeader';
import { Card, Col, Row } from 'antd';
import OperatorEntryDataComponents from './components/OperatorEntryDataComponent';
import AssetsGroup from 'pages/CalenderConfigurator/AssetsGroup';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllOperatorParamsAction,
    getAllSupervisorParamsAction,
    getOperatorLastShiftDataAction,
} from 'redux/actions/OperatorEntryActions/operatorEntryAction';
import { operatorEnumRoleIds } from 'types/enums/operatorEnum';

const OperatorEntry: React.FC = () => {
    const [selectedAsset, setSelectedAsset] = useState<any>();
    const [assetId, setAssetId] = useState<any>(null);
    const [, setSelectedAssetChildrenKey] = useState([]);

    const dispatch = useDispatch();
    const allSupervisorDataParam = useSelector(
        (state: any): any => state?.operatorEntry?.allSuperVisorParams?.data
    );
    const [updateKey, setUpdateKey] = useState<number>(0);
    const allOperatorDataParam = useSelector(
        (state: any): any => state?.operatorEntry?.allOperatorEntryParams?.data
    );
    const fetchSupervisorParams = (roleId: number): any => {
        dispatch(getAllSupervisorParamsAction({ roleId }));
    };
    const fetchOperatorParams = (roleId: number): any => {
        dispatch(getAllOperatorParamsAction({ roleId }));
    };
    const operatorUpdatedData = useSelector(
        (state: any): any => state?.operatorEntry?.operatorLastShiftData?.data
    );
    useEffect(() => {
        setAssetId(selectedAsset?.value);
    }, [selectedAsset, operatorUpdatedData?.lastUpdateTime]);

    useEffect(() => {
        fetchSupervisorParams(operatorEnumRoleIds?.superVisorId);
        fetchOperatorParams(operatorEnumRoleIds?.operatorId);
    }, []);
    useEffect(() => {
        if (assetId !== null && undefined) {
            dispatch(getOperatorLastShiftDataAction(assetId));
        }
    }, [assetId]);

    useEffect(() => {
        // updating key to render OperatorEntryDataComponents whenever there is change in operator
        if (operatorUpdatedData?.lastUpdateTime) {
            setUpdateKey((prevKey) => prevKey + 1);
        }
    }, [operatorUpdatedData?.lastUpdateTime]);
    return (
        <div className="operatorEntry">
            <CustomHeader
                heading="Operator Entry"
                customDateTimePicker={false}
                currentTimePicker={true}
            />
            <div className="operatorEntryWrapperScrolContent">
                <Row>
                    <Col span={6}>
                        <AssetsGroup
                            setSelectedAsset={setSelectedAsset}
                            setSelectedAssetChildrenKey={
                                setSelectedAssetChildrenKey
                            }
                        />
                    </Col>
                    <Col span={18} className="config_box">
                        <div className="operatorEntryWrapper">
                            <Card
                                bordered={false}
                                className="operatorEntryWrapper__cardContent"
                            >
                                <div className="operatorEntryWrapper__cardBody">
                                    {assetId && (
                                        <OperatorEntryDataComponents
                                            assetIdVal={assetId}
                                            key={updateKey}
                                            allSupervisorDataParam={
                                                allSupervisorDataParam
                                            }
                                            allOperatorDataParam={
                                                allOperatorDataParam
                                            }
                                            fetchOperatorParams={
                                                fetchOperatorParams
                                            }
                                        />
                                    )}
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default OperatorEntry;
