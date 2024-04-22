import { Col, Row, Form } from 'antd';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import './index.scss';
import CountAnalytics from 'components/common/CountAnalytics';
import { ReactComponent as ClockIcon } from 'assets/icons/clockIcon.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendarIconOutlined.svg';
import AssetsGroup from './AssetsGroup';
import AllConfigurationBox from './CalendarConfigTable';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const CalenderConfigurator = (): any => {
    const assetDetails = useSelector(
        (state: any) => state?.calendarConfigurator?.assetDetails
    );
    const [form] = Form.useForm();
    const getCountAnalyticsDetails = (): any => {
        return [
            {
                title: 'Number of Shifts/Day',
                count:
                    assetDetails?.shiftPerDay !== undefined
                        ? assetDetails?.shiftPerDay
                        : '--',
                icon: <ClockIcon />,
            },
            {
                title: 'Number of Days/Week',
                count:
                    assetDetails?.workWeekIds !== undefined
                        ? assetDetails?.workWeekIds?.length
                        : '--',
                icon: <CalendarIcon />,
            },
        ];
    };

    const [selectedAsset, setSelectedAsset] = useState<any>();
    const [selectedAssetChildrenKey, setSelectedAssetChildrenKey] = useState(
        []
    );
    const [dropdownClicked, setDropdownClicked] = useState(false);

    return (
        <>
            <div className="calendarConfigurator">
                <Row className="calendarConfigurator__headerWrapper">
                    <Col span={18}>
                        <ScreenNameHeading
                            heading={'Calendar Configurator'}
                            subHeading={
                                'You can add, edit, or modify the calendar and shifts.'
                            }
                        />
                    </Col>
                    <Col span={6}>
                        <CountAnalytics
                            countDetails={getCountAnalyticsDetails()}
                            customClassName="calendarCountAnalytics"
                        />
                    </Col>
                </Row>
            </div>
            <div>
                <Row>
                    <Col span={6}>
                        <AssetsGroup
                            setSelectedAsset={setSelectedAsset}
                            setSelectedAssetChildrenKey={
                                setSelectedAssetChildrenKey
                            }
                            setDropdownClicked={setDropdownClicked}
                        />
                    </Col>
                    <Col span={18} className="config_box">
                        <AllConfigurationBox
                            form={form}
                            selectedAsset={selectedAsset}
                            selectedAssetChildrenKey={selectedAssetChildrenKey}
                            setDropdownClicked={setDropdownClicked}
                            dropdownClicked={dropdownClicked}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default CalenderConfigurator;
