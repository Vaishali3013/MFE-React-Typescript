import { Row, Col, Divider } from 'antd';
import './index.scss';
import CalendarConfigHeader from './CalendarConfigHeader';
import Card from './Common/Card';
import { useState, useEffect } from 'react';
import { CalendarConfig } from 'types/enums';
import { configSidebarList } from '../Fields';
import TableComponant from './Common/Table/Table';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import {  defaultConfigTypeFalse } from 'redux/actions/CalendarConfiguratorActions';

const AllConfigurationBox: React.FC<any> = ({
    form,
    selectedAsset,
    selectedAssetChildrenKey,
    setDropdownClicked,
    dropdownClicked
}) => {
    const isDefaultConfigType = useSelector(
        (state: any) => state?.calendarConfigurator?.isDefaultConfigType
    );
    const [configType, setConfigType] = useState(
        CalendarConfig.dayConfiguration
    );

    const dispatch = useDispatch();
    const selectConfigTypeHandler = (label: any): any => {
        dispatch(defaultConfigTypeFalse());
        setConfigType(label);
        if(configType !== label){
            setDropdownClicked(false);
        }
    };

    // const [dropdownClicked, setDropdownClicked] = useState(false);

    const defaultPayload = {
        timeZoneId: 0,
        weekStartId: 0,
        yearStartId: 0,
        workWeekIds: [],
        assetIds: [selectedAsset?.key],
    };
    const [payload, setPayload] = useState(defaultPayload);
    useEffect(() => {
        if (selectedAsset) {
            setPayload((prevPayload) => ({
                ...prevPayload,
                assetIds: [selectedAsset.key],
            }));
        }
    }, [selectedAsset]);
    const [originalData, setOriginalData] = useState(defaultPayload);

    useEffect(() => {
        setOriginalData(defaultPayload);
    }, [selectedAsset]);

    if (isDefaultConfigType && configType !== CalendarConfig.dayConfiguration) {
        setConfigType(CalendarConfig.dayConfiguration);
    }

    return selectedAsset ? (
        <div className="configAllBox">
            <CalendarConfigHeader
                selectedAsset={selectedAsset}
                setDropdownClicked={setDropdownClicked}
                setPayload={setPayload}
            />
            <Divider style={{ margin: '0px' }} />
            <Row gutter={10} className="configAllBox__tableBox">
                <Col span={4} className="configAllBox__col">
                    <Row align="middle" gutter={10}>
                        {configSidebarList.map((cardInfo: any): any => {
                            return (
                                <Col
                                    className="configAllBox__col2"
                                    span={24}
                                    key={cardInfo.label}
                                >
                                    <Card
                                        configType={configType}
                                        icon={cardInfo.icon}
                                        label={cardInfo.label}
                                        clickHandler={() =>
                                            selectConfigTypeHandler(
                                                cardInfo.label
                                            )
                                        }
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
                <Col span={20} className="configAllBox__tableArea">
                    <TableComponant
                        configType={configType}
                        form={form}
                        selectedAsset={selectedAsset}
                        dropdownClicked={dropdownClicked}
                        assetPayload={payload}
                        selectedAssetChildrenKey={selectedAssetChildrenKey}
                        setDropdownClicked={setDropdownClicked}
                        resetData={() => {
                            setPayload(originalData);
                        }}
                    />
                </Col>
            </Row>
        </div>
    ) : (
        <div className="configAllBox__noData">
            <EmptyDataComponent textValue="Please select an Asset to configure calendar" />
        </div>
    );
};

export default AllConfigurationBox;
