import { Row, Col } from 'antd';
import Heading from './Heading';
import ImplementationAssetsGroup from './ImplementationAssetsGroup';
import TabsComponent from 'components/common/TabsComponent';
import { hasTabPermission } from 'utils/commonFunction';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.scss';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import AttributeImplemenation from './AttributeImplementation';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TimeCapsule from './TimeCapsuleImplementation';
import {
    CLEAR_ASSIGNED_ATTRIBUTE_DATA,
    CLEAR_ASSIGNED_TIME_CAPSULE_DATA,
    CLEAR_TABLE_DATA,
} from 'redux/types/implementationTypes';
import TableImplementation from './TableImplementation';

const Implementation: React.FC<{ activate: any }> = ({ activate }) => {
    const { t } = useTranslation('translation');
    const { currentTab = 'attribute' } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTabKey, setActiveTabKey] = useState(currentTab);
    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );
    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const allowedTabList = useSelector(
        (state: any) => state?.root?.allowedMenuList
    );
    useEffect(() => {
        !selectedAsset?.key &&
            dispatch({ type: CLEAR_ASSIGNED_TIME_CAPSULE_DATA });
        !selectedAsset?.key && dispatch({ type: CLEAR_TABLE_DATA });
        !selectedAsset?.key &&
            dispatch({ type: CLEAR_ASSIGNED_ATTRIBUTE_DATA });
    }, [selectedAsset]);
    useEffect(() => {
        setActiveTabKey(currentTab);
    }, [currentTab]);

    useEffect(() => {
        navigate(`/configure/implementation/${activeTabKey}`, {
            replace: true,
        });
    }, [activeTabKey]);
    const tabItems = [
        {
            id: 1,
            permissionKey: 'Attribute Implementation',
            key: 'attribute',
            label: `Attribute`,
            children: Object.keys(selectedAsset)?.length ? (
                <AttributeImplemenation selectedAssetkey={selectedAsset} />
            ) : (
                <div className="implementationEmptyDataComponent">
                    <EmptyDataComponent
                        textValue={t('implementation.noAssetSelectedText1')}
                        secondaryTextValue={t(
                            'implementation.noAssetSelectedText2'
                        )}
                    />{' '}
                </div>
            ),
        },
        {
            id: 2,
            permissionKey: 'Time Capsule Implementation',
            key: 'time-Capsule',
            label: `Time Capsule`,
            children: Object.keys(selectedAsset)?.length ? (
                <TimeCapsule />
            ) : (
                <div className="implementationEmptyDataComponent">
                    <EmptyDataComponent
                        textValue={t('implementation.noAssetSelectedText1')}
                        secondaryTextValue={t(
                            'implementation.noAssetSelectedText2'
                        )}
                    />
                </div>
            ),
        },
        {
            id: 3,
            permissionKey: 'Table Implementation',
            key: 'table',
            label: `Table`,
            children: Object.keys(selectedAsset)?.length ? (
                <TableImplementation />
            ) : (
                <div className="implementationEmptyDataComponent">
                    <EmptyDataComponent
                        textValue={t('implementation.noAssetSelectedText1')}
                        secondaryTextValue={t(
                            'implementation.noAssetSelectedText2'
                        )}
                    />
                </div>
            ),
        },
    ];
    return (
        <>
            <div>
                <Heading activeTabKey={activeTabKey} />
            </div>
            <div className="implementation">
                <Row>
                    <Col span={6}>
                        <ImplementationAssetsGroup />
                    </Col>
                    <Col span={18} className="tabsSection">
                        <TabsComponent
                            customClassName="implementation__tabsSection"
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
export default Implementation;
