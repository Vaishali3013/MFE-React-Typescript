import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { type TabItemProps } from 'types/interfaces/PropsInterfaces';
import './index.scss';
import { useDispatch } from 'react-redux';
import {
    setAddBlaState,
    setBlaId,
    setDeviceId,
} from 'redux/actions/DeviceManagementActions/blasAction';
import { setAddDeviceState } from 'redux/actions/DeviceManagementActions/deviceAction';

const TabsComponent: React.FC<TabItemProps> = ({
    tabItem,
    setTabKey,
    setActiveTabKey,
    activeTabKey,
    customClassName,
}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (setTabKey) {
            setActiveTabKey(setTabKey);
        }
    }, [setTabKey]);

    const onChange = (key: string): void => {
        setActiveTabKey(key);
        dispatch(setAddBlaState('view'));
        dispatch(setBlaId(null));
        dispatch(setDeviceId(null));
        dispatch(setAddDeviceState(false));
    };
    return (
        <div
            className={
                customClassName
                    ? `${customClassName}`
                    : 'tabsComponent'
            }
        >
            <Tabs
                activeKey={activeTabKey}
                onChange={onChange}
                items={tabItem}
            />
        </div>
    );
};

export default TabsComponent;
