import React, { useEffect, useState } from 'react';
import {
    Col,
    Input,
    Row,
    Typography,
    Collapse,
    List,
    Checkbox,
    Button,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getResourceType,
    getResourcetypeDetails,
    setResourceTypeSubItems,
    removeResourceTypeSubItems,
} from 'redux/actions/UserManagementActions/rolesAction';
import { PERMISSIONS } from 'types/enums';
import RoleSwitch from './RoleSwitch';
import SideDrawer from 'components/common/SideDrawer';
import GroupDrawer from 'components/common/SideDrawer/GroupDrawer';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;
const { Panel } = Collapse;

const CreateRoleStep1: React.FC<any> = ({
    rolesPermissionListState,
    setRolesPermissionListState,
}) => {
    const dispatch = useDispatch();
    const setResourceTypeSubItemsList = useSelector(
        (state: any) => state.userManagement.roles.resourceTypeSubItemsList
    );
    const permissionListPayload = useSelector(
        (state: any) => state.userManagement.roles.resourcePermissionListPayload
    );
    const { t } = useTranslation('translation');
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const [keyProp, setKeyProp] = useState(0);
    const [unfilteredPermissionList, setUnfilteredPermissionList] = useState(
        []
    );
    const [resourceTypeId, setResourceTypeId] = useState<any>({});
    const getResourceListData: any = () => {
        return setResourceTypeSubItemsList.map((item: any) => {
            return {
                resource: {
                    resourceId: item?.resourceId,
                    resourceName: item?.resourceName,
                    resourceType: {
                        id: resourceTypeId?.id,
                        resourceTypeName: resourceTypeId?.resourceTypeName,
                    },
                },
                permission: [],
            };
        });
    };

    useEffect(() => {
        permissionListPayload.length > 0
            ? setUnfilteredPermissionList(permissionListPayload)
            : setUnfilteredPermissionList(getResourceListData());
    }, [setResourceTypeSubItemsList, permissionListPayload]);

    const filterRolePermissions: any = () => {
        return unfilteredPermissionList.filter((item: any, index, arr) => {
            return (
                arr.findIndex(
                    (existingItem: any) =>
                        existingItem.resource.resourceId ===
                        item.resource.resourceId
                ) === index
            );
        });
    };

    useEffect(() => {
        setRolesPermissionListState(filterRolePermissions());
    }, [unfilteredPermissionList]);

    const resourcetypeList = useSelector(
        (state: any) => state.userManagement.groups.resourceType
    );

    const resouceTypeDetails = useSelector(
        (state: any) => state.userManagement.roles.resourceTypeDetails
    );

    const createGroup = useSelector(
        (state: any) => state.userManagement.groups.isCreatedResponse
    );

    useEffect(() => {
        dispatch(getResourceType());
    }, [createGroup]);

    return (
        <>
            <div className="createRolesWrapper__createRowHeader">
                <Input
                    className="createRolesWrapper__search"
                    placeholder="Search Group / Sub-Group"
                    prefix={<SearchOutlined />}
                />

                <div className="createRolesWrapper__button">
                    <Button
                        icon={
                            <PlusOutlined className="createRolesWrapper__buttonGroupIcon" />
                        }
                        className="createRolesWrapper__buttonGroup"
                        onClick={() => {
                            setOpenSideDrawer(true);
                        }}
                    >
                        <span className="fw-400 fs-14">{'Create Group'}</span>
                    </Button>
                </div>
            </div>
            <div className="createRolesWrapper__createRolesContent">
                <div className="createRolesWrapper__createRolesDropdownContent">
                    <Text type="secondary" strong>
                        {t('roles.resourceType')}
                    </Text>
                    <div className="createRolesWrapper__createRolesDropdownCollapse">
                        <Collapse
                            accordion
                            onChange={(e) => {
                                e[0] &&
                                    dispatch(
                                        // To get resource type id from resourcetypeList
                                        getResourcetypeDetails(
                                            resourcetypeList[Number(e[0]) - 1]
                                                .id
                                        )
                                    ) &&
                                    setResourceTypeId(
                                        resourcetypeList[Number(e[0]) - 1]
                                    );
                            }}
                        >
                            {resourcetypeList?.length &&
                                resourcetypeList?.map((item: any) => (
                                    <Panel
                                        header={item.resourceTypeName}
                                        key={item.id}
                                    >
                                        {resouceTypeDetails?.length > 0 && (
                                            <List
                                                split={false}
                                                dataSource={resouceTypeDetails}
                                                renderItem={(data: any) =>
                                                    data?.resourceType
                                                        ?.resourceTypeName ===
                                                        item.resourceTypeName && (
                                                        <List.Item>
                                                            <Checkbox
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    e.target
                                                                        .checked
                                                                        ? dispatch(
                                                                              setResourceTypeSubItems(
                                                                                  data?.resourceList
                                                                              )
                                                                          )
                                                                        : dispatch(
                                                                              removeResourceTypeSubItems(
                                                                                  data?.resourceList
                                                                              )
                                                                          );
                                                                }}
                                                            >
                                                                {
                                                                    data?.groupName
                                                                }
                                                            </Checkbox>
                                                        </List.Item>
                                                    )
                                                }
                                            />
                                        )}
                                    </Panel>
                                ))}
                        </Collapse>
                    </div>
                </div>
                <div className="createRolesWrapper__createRolesTableContent">
                    <Row className="createRolesWrapper__createRolesTableContentRowHeader">
                        <Col span={8}>
                            <RoleSwitch
                                types="secondary"
                                text={'Sub Items'}
                                switchBoolean={false}
                            />
                        </Col>
                        <Col span={4}>
                            <RoleSwitch
                                types="secondary"
                                text={'Read'}
                                key={keyProp}
                                switchBoolean={true}
                                checked={
                                    rolesPermissionListState.length > 0 &&
                                    rolesPermissionListState.every(
                                        (item: any) =>
                                            item.permission.includes(
                                                PERMISSIONS.read
                                            )
                                    )
                                }
                                onChangeFunction={(eventProp: boolean) => {
                                    const listItems: any =
                                        rolesPermissionListState;
                                    if (eventProp) {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.read
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.read
                                                );
                                            }
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp + 1);
                                    } else {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                ![
                                                    PERMISSIONS.write,
                                                    PERMISSIONS.update,
                                                    PERMISSIONS.delete,
                                                ].some((value) =>
                                                    listItems[
                                                        i
                                                    ]?.permission?.includes(
                                                        value
                                                    )
                                                )
                                            ) {
                                                listItems[i].permission =
                                                    listItems[
                                                        i
                                                    ].permission.filter(
                                                        (permission: any) =>
                                                            permission !==
                                                            PERMISSIONS.read
                                                    );
                                            }
                                            setKeyProp(keyProp - 1);
                                            setRolesPermissionListState(
                                                listItems
                                            );
                                        }
                                    }
                                }}
                            />
                        </Col>
                        <Col span={4}>
                            <RoleSwitch
                                types="secondary"
                                text={'Write'}
                                key={keyProp}
                                switchBoolean={true}
                                checked={
                                    rolesPermissionListState.length > 0 &&
                                    rolesPermissionListState.every(
                                        (item: any) =>
                                            item.permission.includes(
                                                PERMISSIONS.write
                                            )
                                    )
                                }
                                onChangeFunction={(eventProp: boolean) => {
                                    const listItems: any =
                                        rolesPermissionListState;
                                    if (eventProp) {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.write
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.write
                                                );
                                            }

                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.read
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.read
                                                );
                                            }
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.update
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.update
                                                );
                                            }
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp + 1);
                                    } else {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            listItems[i].permission = listItems[
                                                i
                                            ].permission.filter(
                                                (permission: any) =>
                                                    permission !==
                                                    PERMISSIONS.write
                                            );
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp - 1);
                                    }
                                }}
                            />
                        </Col>
                        <Col span={4}>
                            <RoleSwitch
                                types="secondary"
                                text={'Edit'}
                                switchBoolean={true}
                                key={keyProp}
                                checked={
                                    rolesPermissionListState.length > 0 &&
                                    rolesPermissionListState.every(
                                        (item: any) =>
                                            item.permission.includes(
                                                PERMISSIONS.update
                                            )
                                    )
                                }
                                onChangeFunction={(eventProp: boolean) => {
                                    const listItems: any =
                                        rolesPermissionListState;
                                    if (eventProp) {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.update
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.update
                                                );
                                            }
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.read
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.read
                                                );
                                            }
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp + 1);
                                    } else {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.write
                                                )
                                            ) {
                                                listItems[i].permission =
                                                    listItems[
                                                        i
                                                    ].permission.filter(
                                                        (permission: any) =>
                                                            permission !==
                                                            PERMISSIONS.update
                                                    );
                                            }
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp - 1);
                                    }
                                }}
                            />
                        </Col>
                        <Col span={4}>
                            <RoleSwitch
                                types="secondary"
                                text={'Delete'}
                                switchBoolean={true}
                                key={keyProp}
                                checked={
                                    rolesPermissionListState.length > 0 &&
                                    rolesPermissionListState.every(
                                        (item: any) =>
                                            item.permission.includes(
                                                PERMISSIONS.delete
                                            )
                                    )
                                }
                                onChangeFunction={(eventProp: boolean) => {
                                    const listItems: any =
                                        rolesPermissionListState;
                                    if (eventProp) {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.delete
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.delete
                                                );
                                            }
                                            if (
                                                !listItems[
                                                    i
                                                ].permission.includes(
                                                    PERMISSIONS.read
                                                )
                                            ) {
                                                listItems[i].permission.push(
                                                    PERMISSIONS.read
                                                );
                                            }
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp + 1);
                                    } else {
                                        for (
                                            let i = 0;
                                            i < listItems.length;
                                            i++
                                        ) {
                                            listItems[i].permission = listItems[
                                                i
                                            ].permission.filter(
                                                (permission: any) =>
                                                    permission !==
                                                    PERMISSIONS.delete
                                            );
                                        }
                                        setRolesPermissionListState(listItems);
                                        setKeyProp(keyProp - 1);
                                    }
                                }}
                            />
                        </Col>
                    </Row>
                    {rolesPermissionListState?.length > 0 && (
                        <List
                            className="createRolesWrapper__createRoleList"
                            split={false}
                            bordered
                            dataSource={rolesPermissionListState}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Row className="createRolesWrapper__createRolesTableContentRow">
                                        <Col span={8}>
                                            <RoleSwitch
                                                text={
                                                    item.resource.resourceName
                                                }
                                                switchBoolean={false}
                                            />
                                        </Col>

                                        <Col span={4}>
                                            <RoleSwitch
                                                switchBoolean={true}
                                                key={keyProp}
                                                checked={
                                                    item.permission.indexOf(
                                                        PERMISSIONS.read
                                                    ) !== -1
                                                }
                                                onChangeFunction={(
                                                    eventProp: boolean
                                                ) => {
                                                    const itemToBeChangedIndex =
                                                        rolesPermissionListState.findIndex(
                                                            (data: any) =>
                                                                data.resource
                                                                    .resourceId ===
                                                                item.resource
                                                                    .resourceId
                                                        );

                                                    if (eventProp) {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            itemToBeChanged.permission =
                                                                [
                                                                    ...itemToBeChanged.permission,
                                                                    PERMISSIONS.read,
                                                                ];
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ] = itemToBeChanged;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                        }
                                                        setKeyProp(keyProp + 1);
                                                    } else {
                                                        const itemToBeChanged: any =
                                                            rolesPermissionListState[
                                                                itemToBeChangedIndex
                                                            ];
                                                        if (
                                                            ![
                                                                PERMISSIONS.write,
                                                                PERMISSIONS.update,
                                                                PERMISSIONS.delete,
                                                            ].some((value) =>
                                                                itemToBeChanged?.permission.includes(
                                                                    value
                                                                )
                                                            ) &&
                                                            itemToBeChangedIndex !==
                                                                -1
                                                        ) {
                                                            const filteredItem =
                                                                itemToBeChanged.permission.filter(
                                                                    (
                                                                        permission: any
                                                                    ) =>
                                                                        permission !==
                                                                        PERMISSIONS.read
                                                                );
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ].permission =
                                                                filteredItem;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                        }
                                                        setKeyProp(keyProp - 1);
                                                    }
                                                }}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <RoleSwitch
                                                switchBoolean={true}
                                                key={keyProp}
                                                checked={
                                                    item.permission.indexOf(
                                                        PERMISSIONS.write
                                                    ) !== -1
                                                }
                                                onChangeFunction={(
                                                    eventProp: boolean
                                                ) => {
                                                    const itemToBeChangedIndex =
                                                        rolesPermissionListState.findIndex(
                                                            (data: any) =>
                                                                data.resource
                                                                    .resourceId ===
                                                                item.resource
                                                                    .resourceId
                                                        );

                                                    if (eventProp) {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            itemToBeChanged.permission =
                                                                [
                                                                    ...itemToBeChanged.permission,
                                                                    PERMISSIONS.write,
                                                                ];
                                                            if (
                                                                !itemToBeChanged?.permission?.includes(
                                                                    PERMISSIONS.update
                                                                )
                                                            ) {
                                                                itemToBeChanged.permission =
                                                                    [
                                                                        ...itemToBeChanged.permission,
                                                                        PERMISSIONS.update,
                                                                    ];
                                                            }
                                                            if (
                                                                !itemToBeChanged?.permission?.includes(
                                                                    PERMISSIONS.read
                                                                )
                                                            ) {
                                                                itemToBeChanged.permission =
                                                                    [
                                                                        ...itemToBeChanged.permission,
                                                                        PERMISSIONS.read,
                                                                    ];
                                                            }
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ] = itemToBeChanged;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp + 1
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            const filteredItem =
                                                                itemToBeChanged.permission.filter(
                                                                    (
                                                                        permission: any
                                                                    ) =>
                                                                        permission !==
                                                                        PERMISSIONS.write
                                                                );
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ].permission =
                                                                filteredItem;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp - 1
                                                            );
                                                        }
                                                    }
                                                }}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <RoleSwitch
                                                switchBoolean={true}
                                                key={keyProp}
                                                checked={
                                                    item.permission.indexOf(
                                                        PERMISSIONS.update
                                                    ) !== -1
                                                }
                                                onChangeFunction={(
                                                    eventProp: boolean
                                                ) => {
                                                    const itemToBeChangedIndex =
                                                        rolesPermissionListState.findIndex(
                                                            (data: any) =>
                                                                data.resource
                                                                    .resourceId ===
                                                                item.resource
                                                                    .resourceId
                                                        );

                                                    if (eventProp) {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            itemToBeChanged.permission =
                                                                [
                                                                    ...itemToBeChanged.permission,
                                                                    PERMISSIONS.update,
                                                                ];
                                                            if (
                                                                !itemToBeChanged?.permission?.includes(
                                                                    PERMISSIONS.read
                                                                )
                                                            ) {
                                                                itemToBeChanged.permission =
                                                                    [
                                                                        ...itemToBeChanged.permission,
                                                                        PERMISSIONS.read,
                                                                    ];
                                                            }
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ] = itemToBeChanged;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp + 1
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            if (
                                                                !itemToBeChanged.permission.includes(
                                                                    PERMISSIONS.write
                                                                )
                                                            ) {
                                                                const filteredItem =
                                                                    itemToBeChanged.permission.filter(
                                                                        (
                                                                            permission: any
                                                                        ) =>
                                                                            permission !==
                                                                            PERMISSIONS.update
                                                                    );
                                                                listItems[
                                                                    itemToBeChangedIndex
                                                                ].permission =
                                                                    filteredItem;
                                                            }
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp - 1
                                                            );
                                                        }
                                                    }
                                                }}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <RoleSwitch
                                                switchBoolean={true}
                                                key={keyProp}
                                                checked={
                                                    item.permission.indexOf(
                                                        PERMISSIONS.delete
                                                    ) !== -1
                                                }
                                                onChangeFunction={(
                                                    eventProp: boolean
                                                ) => {
                                                    const itemToBeChangedIndex =
                                                        rolesPermissionListState.findIndex(
                                                            (data: any) =>
                                                                data.resource
                                                                    .resourceId ===
                                                                item.resource
                                                                    .resourceId
                                                        );

                                                    if (eventProp) {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            itemToBeChanged.permission =
                                                                [
                                                                    ...itemToBeChanged.permission,
                                                                    PERMISSIONS.delete,
                                                                ];
                                                            if (
                                                                !itemToBeChanged?.permission?.includes(
                                                                    PERMISSIONS.read
                                                                )
                                                            ) {
                                                                itemToBeChanged.permission =
                                                                    [
                                                                        ...itemToBeChanged.permission,
                                                                        PERMISSIONS.read,
                                                                    ];
                                                            }
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ] = itemToBeChanged;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp + 1
                                                            );
                                                        }
                                                    } else {
                                                        if (
                                                            itemToBeChangedIndex !==
                                                            -1
                                                        ) {
                                                            const itemToBeChanged: any =
                                                                rolesPermissionListState[
                                                                    itemToBeChangedIndex
                                                                ];
                                                            const indexOfItem =
                                                                itemToBeChanged.permission.indexOf(
                                                                    PERMISSIONS.delete
                                                                );
                                                            itemToBeChanged.permission.splice(
                                                                indexOfItem,
                                                                1
                                                            );
                                                            const listItems =
                                                                rolesPermissionListState;
                                                            listItems[
                                                                itemToBeChangedIndex
                                                            ] = itemToBeChanged;
                                                            setRolesPermissionListState(
                                                                listItems
                                                            );
                                                            setKeyProp(
                                                                keyProp - 1
                                                            );
                                                        }
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </div>
            {openSideDrawer && (
                <SideDrawer
                    title={t('groups.createGroup')}
                    Open={openSideDrawer}
                    onClose={() => {
                        setOpenSideDrawer(false);
                    }}
                >
                    <GroupDrawer
                        onClose={() => {
                            setOpenSideDrawer(false);
                        }}
                    />
                </SideDrawer>
            )}
        </>
    );
};

export default CreateRoleStep1;
