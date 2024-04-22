import { Col, Row, Switch, Tabs, Typography } from 'antd';
import EditDevicesTable from 'pages/DeviceManagement/Devices/EditDevices/editDevicesTable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    activateDeactivateDevices,
    getDeviceDetails,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import {
    getAllTagList,
    getTagListByDeviceId,
} from 'redux/actions/DeviceManagementActions/tagAction';
import { StatusType, screenName } from 'types/enums';
import { parseJwt } from 'utils/jwtTokenFunction';

const TagListing: React.FC<any> = ({ openAddTag, setOpenAddTag, screen }) => {
    const dispatch = useDispatch();
    const details = parseJwt();

    const [deviceTagPage, setDeviceTagPage] = useState<number>(1);
    const [deviceTagPageSize, setDeviceTagPageSize] = useState<number>(50);
    const [currentTabKey, setCurrentTabKey] = useState('1');
    const [deviceTagStatus, setDeviceTagStatus] = useState(0);

    const tagsList = useSelector(
        (state: any) => state.deviceManagement.tags.tagsList
    );
    const allTagsByDeviceId = useSelector(
        (state: any) => state.deviceManagement.tags.tagListByDeviceId
    );
    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );
    const deviceId = useSelector(
        (state: any) => state.deviceManagement.devices.deviceId
    );
    const deviceStatusChanged = useSelector(
        (state: any) => state.deviceManagement.devices.deviceStatusChanged
    );
    const record = deviceDetails;
    useEffect(() => {
        deviceId && dispatch(getDeviceDetails(deviceId));
    }, [deviceId, deviceStatusChanged]);

    useEffect(() => {
        const payload = { deviceId: deviceId };
        dispatch(getAllTagList(payload));
    }, [deviceId, openAddTag]);
    useEffect(() => {
        // this for wizard tag listing with pagination will use later
        // dispatch(
        //     getTagList({
        //         page: deviceTagPage,
        //         pageSize: deviceTagPageSize,
        //         deviceId: record.deviceId,
        //         status: deviceTagStatus,
        //     })
        // );
        dispatch(
            getTagListByDeviceId({
                deviceId: record?.deviceId,
                status: deviceTagStatus,
            })
        );
    }, [record, deviceTagStatus, openAddTag, deviceStatusChanged]);
    const onChange = (key: string): void => {
        setCurrentTabKey(key);
        if (key === '2') {
            setDeviceTagStatus(StatusType.Active);
            setDeviceTagPage(StatusType.Active);
        } else if (key === '3') {
            setDeviceTagStatus(StatusType.Deactivate);
            setDeviceTagPage(StatusType.Deactivate);
        } else {
            setDeviceTagStatus(StatusType.All);
            setDeviceTagPage(StatusType.All);
        }
    };
    return (
        <>
            <Row className="addBlaWrapper__tableHeader fw-500 fs-16">
                <Col span={24}>
                    <Tabs
                        className="tagListing__tabs"
                        activeKey={currentTabKey}
                        onChange={onChange}
                        defaultActiveKey="1"
                        items={[
                            {
                                key: '1',
                                label: `All Tags`,
                                children: (
                                    <>
                                        <EditDevicesTable
                                            openInWizard={'device'}
                                            editState={true}
                                            tagListByDeviceId={
                                                screen === 'devices'
                                                    ? allTagsByDeviceId
                                                    : tagsList
                                                          ?.paginatedResponse
                                                          ?.records
                                            }
                                            deviceTagPageSize={
                                                deviceTagPageSize
                                            }
                                            deviceTagPage={deviceTagPage}
                                            setDeviceTagPage={setDeviceTagPage}
                                            setDeviceTagPageSize={
                                                setDeviceTagPageSize
                                            }
                                            record={record}
                                            setOpenAddTag={setOpenAddTag}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: '2',
                                label: `Active`,
                                children: (
                                    <>
                                        <EditDevicesTable
                                            openInWizard={'device'}
                                            editState={true}
                                            tagListByDeviceId={
                                                screen ===
                                                screenName.deviceManagementDevices
                                                    ? allTagsByDeviceId
                                                    : tagsList
                                                          ?.paginatedResponse
                                                          ?.records
                                            }
                                            deviceTagPageSize={
                                                deviceTagPageSize
                                            }
                                            deviceTagPage={deviceTagPage}
                                            setDeviceTagPage={setDeviceTagPage}
                                            setDeviceTagPageSize={
                                                setDeviceTagPageSize
                                            }
                                            record={record}
                                            setOpenAddTag={setOpenAddTag}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: '3',
                                label: `Inactive`,
                                children: (
                                    <>
                                        <>
                                            <EditDevicesTable
                                                openInWizard={'device'}
                                                editState={true}
                                                tagListByDeviceId={
                                                    screen === 'devices'
                                                        ? allTagsByDeviceId
                                                        : tagsList
                                                              ?.paginatedResponse
                                                              ?.records
                                                }
                                                deviceTagPageSize={
                                                    deviceTagPageSize
                                                }
                                                deviceTagPage={deviceTagPage}
                                                setDeviceTagPage={
                                                    setDeviceTagPage
                                                }
                                                setDeviceTagPageSize={
                                                    setDeviceTagPageSize
                                                }
                                                record={record}
                                                setOpenAddTag={setOpenAddTag}
                                            />
                                        </>
                                    </>
                                ),
                            },
                        ]}
                        tabBarExtraContent={{
                            right: (
                                <div className="editBlaDrawer__tabContent fw-400 fs-14">
                                    <Typography.Text type="secondary">
                                        UUID: {deviceDetails?.deviceUUID}
                                    </Typography.Text>
                                    <Switch
                                        key={deviceDetails?.isActive}
                                        className="editBlaDrawer__switch"
                                        size="small"
                                        defaultChecked={deviceDetails?.isActive}
                                        onChange={() => {
                                            dispatch(
                                                activateDeactivateDevices({
                                                    id: [
                                                        deviceDetails?.deviceId,
                                                    ],
                                                    isActive:
                                                        !deviceDetails?.isActive,
                                                    requestedBy:
                                                        details?.username,
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            ),
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default TagListing;
