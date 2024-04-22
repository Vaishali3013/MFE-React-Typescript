import React, { useEffect, useState } from 'react';
import './index.scss';
import { Col, Row } from 'antd';
import CountAnalytics from 'components/common/CountAnalytics';
import TabsComponent from 'components/common/TabsComponent';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { useNavigate, useParams } from 'react-router-dom';
import AttributeDefinition from './AttributeDefinition';
import { useDispatch, useSelector } from 'react-redux';
import {
    ATTRIBUTETYPE,
    KPITYPE,
    TIMECAPSULETYPE,
    timeCapsuleEnum,
    TABLETYPE,
} from 'types/enums';
import CreateAttribute from './AttributeDefinition/CreateAttribute';
import EditAttribute from './AttributeDefinition/EditAttribute';
import ViewAttribute from './AttributeDefinition/ViewAttribute/Index';
import CreateUom from './AttributeDefinition/CreateUom';
import { ReactComponent as ActiveUserIcon } from 'assets/icons/activeUserCountIcon.svg';
import { ReactComponent as DeactivateUserIcon } from 'assets/icons/deacticeUserCountIcon.svg';
import { setAttributeState } from 'redux/actions/ConfigureActions/attributeActions';
import { hasTabPermission } from 'utils/commonFunction';
import Table from './Table';
import ViewTable from './Table/ViewTable';
import EditTable from './Table/EditTable';
import CreateTable from './Table/CreateTable';
import { setTableState } from 'redux/actions/ConfigureActions/tableAction';
import TimeCapsule from './TimeCapsule';
import { setTimeCapsuleState } from 'redux/actions/ConfigureActions/timeCapsuleActions';
import CreateTimeCapsule from './TimeCapsule/CreateTimeCapsule';
import EditTimeCapsule from './TimeCapsule/EditTimeCapsule';
import ViewTimeCapsule from './TimeCapsule/ViewTimeCapsule';
import { useTranslation } from 'react-i18next';
import { setKpiState } from 'redux/actions/ConfigureActions/kpiActions';
import KPI from './KPIDefinition';
import CreateKpi from './KPIDefinition/CreateKpi';
import EditKpi from './KPIDefinition/EditKpi';
import ViewKpi from './KPIDefinition/ViewKpi';

const Configure: React.FC<{ activate: any }> = ({ activate }) => {
    const { currentTab = 'attribute' } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTabKey, setActiveTabKey] = useState(currentTab);
    const [isUomOpen, setIsUomOpen] = useState<any>(false);
    const { t } = useTranslation('translation');
    useEffect(() => {
        setActiveTabKey(currentTab);
        dispatch(setAttributeState(ATTRIBUTETYPE.display));
        dispatch(setTableState(TABLETYPE.display));
        dispatch(setTimeCapsuleState(TIMECAPSULETYPE.display));
        dispatch(setKpiState(KPITYPE.display));
    }, [currentTab]);

    useEffect(() => {
        navigate(`/configure/data-dictionary/${activeTabKey}`, {
            replace: true,
        });
    }, [activeTabKey]);

    const attributeState = useSelector(
        (state: any) => state?.configure?.attributes?.attributeState
    );
    const timeCapsuleState = useSelector(
        (state: any) => state?.configure?.timeCapsule?.timeCapsuleState
    );

    const kpiState = useSelector(
        (state: any) => state?.configure?.kpi?.kpiState
    );
    const tableState = useSelector(
        (state: any) => state?.configure?.table?.tableState
    );

    const attributeData = useSelector(
        (state: any) => state.configure?.attributes?.attributesList
    );

    const tableData = useSelector(
        (state: any) => state.configure?.table?.tableList
    );
    const timeCapsuleData = useSelector(
        (state: any) => state.configure?.timeCapsule?.timeCapsuleList
    );

    const kpiData = useSelector((state: any) => state.configure?.kpi?.kpiList);

    const allowedTabList = useSelector(
        (state: any) => state.root.allowedMenuList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    useEffect(() => {
        dispatch(setAttributeState(ATTRIBUTETYPE.display));
        dispatch(setTableState(TABLETYPE.display));
        dispatch(setTimeCapsuleState(TIMECAPSULETYPE.display));
        dispatch(setKpiState(KPITYPE.display));
    }, []);

    const tabItems = [
        {
            id: 1,
            permissionKey: 'Attribute Definition',
            key: 'attribute',
            label: `Attribute`,
            children: isUomOpen ? (
                <CreateUom setIsUomOpen={setIsUomOpen} />
            ) : attributeState === ATTRIBUTETYPE.display ? (
                <AttributeDefinition />
            ) : attributeState === ATTRIBUTETYPE.create ? (
                <CreateAttribute setIsUomOpen={setIsUomOpen} />
            ) : attributeState === ATTRIBUTETYPE.edit ? (
                <EditAttribute setIsUomOpen={setIsUomOpen} />
            ) : attributeState === ATTRIBUTETYPE.view ? (
                <ViewAttribute setIsUomOpen={setIsUomOpen} />
            ) : (
                ''
            ),
        },
        {
            id: 2,
            permissionKey: 'Time Capsule Definition',
            key: 'time-capsule',
            label: `Time Capsule`,
            children:
                timeCapsuleState === TIMECAPSULETYPE.display ? (
                    <TimeCapsule />
                ) : timeCapsuleState === TIMECAPSULETYPE.create ? (
                    <CreateTimeCapsule />
                ) : timeCapsuleState === TIMECAPSULETYPE.edit ? (
                    <EditTimeCapsule />
                ) : timeCapsuleState === TIMECAPSULETYPE.view ? (
                    <ViewTimeCapsule />
                ) : (
                    ''
                ),
        },
        {
            id: 3,
            permissionKey: 'Table Definition',
            key: 'table',
            label: `Table`,
            children:
                tableState === TABLETYPE.display ? (
                    <Table />
                ) : tableState === TABLETYPE.create ? (
                    <CreateTable />
                ) : tableState === TABLETYPE.edit ? (
                    <EditTable />
                ) : tableState === TABLETYPE.view ? (
                    <ViewTable />
                ) : (
                    ''
                ),
        },
        {
            id: 4,
            permissionKey: 'KPI Definition',
            key: 'kpi',
            label: `KPIs `,
            children: isUomOpen ? (
                <CreateUom setIsUomOpen={setIsUomOpen} />
            ) : kpiState === KPITYPE.display ? (
                <KPI />
            ) : kpiState === KPITYPE.create ? (
                <CreateKpi setIsUomOpen={setIsUomOpen} />
            ) : kpiState === KPITYPE.edit ? (
                <EditKpi setIsUomOpen={setIsUomOpen} />
            ) : kpiState === KPITYPE.view ? (
                <ViewKpi setIsUomOpen={setIsUomOpen} />
            ) : (
                ''
            ),
        },
    ];

    const getCountAnalyticsDetails = (): any => {
        switch (activeTabKey) {
            case timeCapsuleEnum.table:
                return [
                    {
                        title: 'Active Table',
                        count: tableData?.activeTableCount
                            ? `${tableData?.activeTableCount}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: 'Inactive Table',
                        count: tableData?.inActiveTableCount
                            ? `${tableData?.inActiveTableCount}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            case timeCapsuleEnum.kpi:
                return [
                    {
                        title: t('kpiDefinition.commonHeader.activeKpi'),
                        count: kpiData?.totalActiveKpi
                            ? `${kpiData?.totalActiveKpi}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t('kpiDefinition.commonHeader.inActiveKpi'),
                        count: kpiData?.totalInActiveKpi
                            ? `${kpiData?.totalInActiveKpi}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            case timeCapsuleEnum.timeCapsule:
                return [
                    {
                        title: t(
                            'timeCapsuleDefinition.commonHeader.activeTimeCapsule'
                        ),
                        count: timeCapsuleData?.totalActiveCount
                            ? `${timeCapsuleData?.totalActiveCount}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: t(
                            'timeCapsuleDefinition.commonHeader.inActiveTimeCapsule'
                        ),
                        count: timeCapsuleData?.totalInactiveCount
                            ? `${timeCapsuleData?.totalInactiveCount}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
            default:
                return [
                    {
                        title: 'Active Attributes',
                        count: attributeData?.totalActiveAttribute
                            ? `${attributeData?.totalActiveAttribute}`
                            : '0',
                        icon: <ActiveUserIcon />,
                    },
                    {
                        title: 'Inactive Attributes',
                        count: attributeData?.totalDeactivateAttribute
                            ? `${attributeData?.totalDeactivateAttribute}`
                            : '0',
                        icon: <DeactivateUserIcon />,
                    },
                ];
        }
    };

    const getHeading = (): any => {
        switch (activeTabKey) {
            case timeCapsuleEnum.table:
                return 'Table are created to provide Contextual Information regarding Assets';
            case timeCapsuleEnum.kpi:
                return 'You can Define, Edit or Deactivate KPIs';
            case timeCapsuleEnum.timeCapsule:
                return 'You can Define, Edit or Deactivate Time Capsule';
            default:
                return 'You can Define, Edit or Deactivate Attributes';
        }
    };

    return (
        <>
            <div className="configure">
                <Row className="configure__headerWrapper">
                    <Col span={16}>
                        <ScreenNameHeading
                            heading={'Data Dictionary'}
                            subHeading={getHeading()}
                        />
                    </Col>
                    <Col span={8}>
                        <CountAnalytics
                            countDetails={getCountAnalyticsDetails()}
                        />
                    </Col>
                </Row>
                <Row className="configure__tabswrapper fw-500 fs-16">
                    <Col span={24}>
                        <TabsComponent
                            tabItem={
                                loggedInUserDetails?.admin
                                    ? tabItems
                                    : hasTabPermission(tabItems, allowedTabList)
                            }
                            setTabKey={activate}
                            setActiveTabKey={setActiveTabKey}
                            activeTabKey={activeTabKey}
                        />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Configure;
