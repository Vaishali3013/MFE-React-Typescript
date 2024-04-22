import { Row, Col } from 'antd';
import CountAnalytics from 'components/common/CountAnalytics';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Heading: React.FC<{ activeTabKey: any }> = ({ activeTabKey }) => {
    const { t } = useTranslation('translation');
    const attributeAssignedData = useSelector(
        (state: any) => state.implementation?.attribute?.assignedAttributeList)
    const assignedTimeCapsuleList = useSelector(
        (state: any) =>
            state?.implementation?.timeCapsule?.assignedTimeCapsuleList
    );
    const assignedTotalCount = useSelector(
        (state: any) => state?.implementation?.table?.assignedTotalCount
    );
    const nonValidatedTableCount = useSelector(
        (state: any) => state?.implementation?.table?.notValidatedCount
    );
    const validatedTableCount = useSelector(
        (state: any) => state?.implementation?.table?.validatedCount
    );
    const getCountAnalyticsDetails = (): any => {
        switch (activeTabKey) {
            case 'table':
                return [
                    {
                        title: t('implementation.table.validTables'),
                        count:
                            assignedTotalCount > 0 ? validatedTableCount : '--',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('implementation.table.invalidTables'),
                        count:
                            assignedTotalCount > 0
                                ? nonValidatedTableCount
                                : '--',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            case 'kpi':
                return [
                    {
                        title: 'Valid KPIs',
                        count: '--',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: 'Invalid KPIs',
                        count: '--',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            case 'time-Capsule':
                return [
                    {
                        title: t(
                            'implementation.timeCapsule.validTimeCapsules'
                        ),
                        count:
                            assignedTimeCapsuleList?.pageResponse
                                ?.totalRecords > 0
                                ? assignedTimeCapsuleList?.totalValidCount
                                : '--',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t(
                            'implementation.timeCapsule.invalidTimeCapsules'
                        ),
                        count:
                            assignedTimeCapsuleList?.pageResponse
                                ?.totalRecords > 0
                                ? assignedTimeCapsuleList?.totalInValidCount
                                : '--',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            default:
                return [
                    {
                        title: t('implementation.attribute.validAttributes'),
                        count:
                            attributeAssignedData?.pageResponse?.totalRecords >
                            0
                                ? attributeAssignedData?.validatedAttributeCount
                                : '--',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('implementation.attribute.invalidAttributes'),
                        count:
                            attributeAssignedData?.pageResponse?.totalRecords >
                            0
                                ? attributeAssignedData?.nonValidatedAttributeCount
                                : '--',
                        icon: <DeactivateUserIcon />,
                    },
                ];
        }
    };

    return (
        <>
            <div className="calendarConfigurator">
                <Row className="calendarConfigurator__headerWrapper">
                    <Col span={18}>
                        <ScreenNameHeading
                            heading={t('implementation.heading')}
                            subHeading={t('implementation.subHeading')}
                        />
                    </Col>
                    <Col span={6}>
                        <CountAnalytics
                            customClassName="implementationCountAnalytics"
                            countDetails={getCountAnalyticsDetails()}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};
export default Heading;
