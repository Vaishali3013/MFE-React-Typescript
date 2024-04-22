import { Row, Col } from 'antd';
import CountAnalytics from 'components/common/CountAnalytics';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import { useSelector } from 'react-redux';

const Heading: React.FC<any> = ({ viewDetailState }) => {
    const kpiDetail = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.KpiDetailsData
    );

    return (
        <>
            <div className="calendarConfigurator">
                <Row className="calendarConfigurator__headerWrapper">
                    <Col span={18}>
                        <ScreenNameHeading
                            heading={'KPI Implementation'}
                            subHeading={
                                'Implement KPIs on assets or asset groups'
                            }
                        />
                    </Col>
                    {viewDetailState ? (
                        <Col span={6}>
                            <CountAnalytics
                                customClassName="implementationCountAnalytics"
                                countDetails={[
                                    {
                                        title: 'Validated',
                                        count:
                                            kpiDetail?.totalValidCount > 0
                                                ? kpiDetail?.totalValidCount
                                                : '--',
                                        icon: <ActiveUserIcon />,
                                    },
                                    {
                                        title: 'Pending',
                                        count:
                                            kpiDetail?.totalInValidCount > 0
                                                ? kpiDetail?.totalInValidCount
                                                : '--',
                                        icon: <DeactivateUserIcon />,
                                    },
                                ]}
                            />
                        </Col>
                    ) : (
                        <></>
                    )}
                </Row>
            </div>
        </>
    );
};
export default Heading;
