import React, { useEffect, useState } from 'react';
import {
    Card,
    Col,
    Input,
    Row,
    Typography,
    Collapse,
    List,
    Checkbox,
    Button,
    Avatar,
    Drawer,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { ReactComponent as EditIcon } from 'assets/icons/editIcon.svg';
import { ReactComponent as ConfirmationIcon } from 'assets/icons/confirmationIcon.svg';
import { rolesStatusOptionsData } from 'json/UserManagement/roles';
import type { rolePermissionTypes } from 'types/interfaces/PropsInterfaces';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InActiveDotIcon } from 'assets/icons/inactiveDot.svg';
import CustomDropDown from 'components/common/CustomDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { getIntials, randomBackgroundColour } from 'utils/commonFunction';
import {
    getResourceType,
    getResourcetypeDetails,
    getRoleDetails,
    removeResourceTypeSubItems,
    setEditRoleState,
    setResourceTypePayload,
    setResourceTypeSubItems,
    setUserRolePayload,
    updateRole,
} from 'redux/actions/UserManagementActions/rolesAction';
import { PERMISSIONS, ROLETYPE } from 'types/enums';
import RoleSwitch from './RoleSwitch';
import EditUsers from './EditUsers';
import { useTranslation } from 'react-i18next';
import { parseJwt } from 'utils/jwtTokenFunction';

const { Text } = Typography;
const { Panel } = Collapse;

const EditRole: React.FC = () => {
    const [editRolesState, setEditRolesState] = useState(false);
    const [resourceTypeId, setResourceTypeId] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSuccessModalOpen, setActiveSuccessModalOpen] = useState(false);
    const [rolesPermissionListState, setRolesPermissionListState] = useState<
        rolePermissionTypes[]
    >([]);
    const [keyProp, setKeyProp] = useState(0);
    const [unfilteredPermissionList, setUnfilteredPermissionList] = useState(
        []
    );
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const dispatch = useDispatch();

    const setResourceTypeSubItemsList = useSelector(
        (state: any) => state.userManagement.roles.resourceTypeSubItemsList
    );

    const permissionListPayload = useSelector(
        (state: any) => state.userManagement.roles.resourcePermissionListPayload
    );

    const editRecordData = useSelector(
        (state: any) => state.userManagement.roles.roleData
    );

    const roleDetails = useSelector(
        (state: any) => state.userManagement.roles.roleDetails
    );

    const updateRoleState = useSelector(
        (state: any) => state.userManagement.roles.updateRole
    );

    const resourcetypeList = useSelector(
        (state: any) => state.userManagement.groups.resourceType
    );

    const resouceTypeDetails = useSelector(
        (state: any) => state.userManagement.roles.resourceTypeDetails
    );

    const selectedRowDataList = useSelector(
        (state: any) => state.userManagement.roles.usersRoleListPayload
    );
    const { t } = useTranslation('translation');
    useEffect(() => {
        dispatch(setUserRolePayload(roleDetails?.userMetaDataList));
    }, [roleDetails]);

    const getResourceListData: any = () => {
        return setResourceTypeSubItemsList.map((item: any) => {
            // To find default value of permissions
            const roleDetailItemPermissions =
                roleDetails?.resourcePermissionList?.find(
                    (obj: any) => obj?.resource?.resourceId === item?.resourceId
                );
            return {
                resource: {
                    resourceId: item?.resourceId,
                    resourceName: item?.resourceName,
                    resourceType: {
                        id: resourceTypeId?.id,
                        resourceTypeName: resourceTypeId?.resourceTypeName,
                    },
                },
                permission: roleDetailItemPermissions
                    ? [...roleDetailItemPermissions?.permission]
                    : [],
                id: roleDetailItemPermissions?.id,
            };
        });
    };

    const filterRolePermissions: any = () => {
        // Filter to remove common resources
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
        permissionListPayload.length > 0
            ? setUnfilteredPermissionList(permissionListPayload)
            : setUnfilteredPermissionList(getResourceListData());
    }, [setResourceTypeSubItemsList, permissionListPayload]);

    useEffect(() => {
        setRolesPermissionListState(filterRolePermissions());
    }, [unfilteredPermissionList]);

    useEffect(() => {
        dispatch(getResourceType());
    }, []);

    useEffect(() => {
        dispatch(getRoleDetails(editRecordData.roleId));
    }, [editRecordData]);

    const onOkHandler = (): any => {
        dispatch(updateRole(payload));
    };

    useEffect(() => {
        updateRoleState &&
            modalShow(activeSuccessModalOpen, setActiveSuccessModalOpen);
        okHandle(isModalOpen, setIsModalOpen);
    }, [updateRoleState]);

    const loggedInUserId = parseJwt();

    const payload = {
        roleId: roleDetails?.roleId,
        roleName: roleDetails?.roleName,
        roleDescription: roleDetails?.roleDescription,
        resourcePermissionList: rolesPermissionListState,
        userMetaDataList: selectedRowDataList,
        active: true,
        deleted: false,
        updatedBy: loggedInUserId.username,
    };

    return (
        <>
            <div className="editRolesWrapper">
                <Card bordered={false}>
                    <Row className="editRolesWrapper__headerWrapper">
                        <Col span={20} className="editRolesWrapper__heading">
                            <div className="editRolesWrapper__backIcon">
                                <BackIcon
                                    onClick={() =>
                                        dispatch(
                                            setEditRoleState(ROLETYPE.view)
                                        )
                                    }
                                />
                            </div>
                            <ScreenNameHeading
                                heading={roleDetails?.roleName}
                                subHeading={''}
                            />
                        </Col>
                        <Col
                            span={4}
                            onClick={() => {
                                setOpenSideDrawer(true);
                            }}
                        >
                            {selectedRowDataList?.length > 0 ? (
                                <Avatar.Group
                                    maxCount={4}
                                    maxPopoverTrigger="click"
                                    size="large"
                                    className="editRolesWrapper__avatarGroup"
                                >
                                    {selectedRowDataList?.map(
                                        (item: any, index: number) => (
                                            <Avatar
                                                key={index}
                                                style={{
                                                    backgroundColor:
                                                        randomBackgroundColour(),
                                                }}
                                                src={item?.profileImage}
                                            >
                                                {item &&
                                                    getIntials(
                                                        item?.firstName
                                                    ) &&
                                                    getIntials(item?.lastName)}
                                            </Avatar>
                                        )
                                    )}
                                </Avatar.Group>
                            ) : (
                                <div className="editRolesWrapper__addButton">
                                    <Button
                                        icon={
                                            <PlusOutlined className="editRolesWrapper__buttonGroupIcon" />
                                        }
                                        className="editRolesWrapper__editButtonGroup"
                                    >
                                        <span className="fw-400 fs-14">
                                            {'Add Users'}
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>

                    <div
                        className={
                            editRolesState
                                ? 'editRolesWrapper__scrollContent'
                                : 'editRolesWrapper__scrollContentDisabled'
                        }
                    >
                        <div className="editRolesWrapper__editRowHeader">
                            <Input
                                className="editRolesWrapper__search"
                                placeholder="Search Group / Sub-Group"
                                prefix={<SearchOutlined />}
                            />
                            <div className="editRolesWrapper__headerRight">
                                {editRolesState ? (
                                    <>
                                        <CustomDropDown
                                            optionsData={rolesStatusOptionsData}
                                            placeholder="Status"
                                        />

                                        <Button
                                            icon={
                                                <PlusOutlined className="editRolesWrapper__buttonGroupIcon" />
                                            }
                                            className="editRolesWrapper__buttonGroup"
                                        >
                                            <span className="fw-400 fs-14">
                                                {'Create Group'}
                                            </span>
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="statusWrapper__status">
                                            {roleDetails.active === true ? (
                                                <ActiveDotIcon />
                                            ) : (
                                                <InActiveDotIcon />
                                            )}
                                            <span>
                                                {roleDetails.active === true
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </div>

                                        <div className="editRolesWrapper__editButton">
                                            <Button
                                                icon={
                                                    <EditIcon className="editRolesWrapper__buttonGroupIcon" />
                                                }
                                                disabled={
                                                    rolesPermissionListState.length <=
                                                    0
                                                }
                                                onClick={() => {
                                                    setEditRolesState(true);
                                                }}
                                                className="editRolesWrapper__editButtonGroup"
                                            >
                                                <span className="fw-400 fs-14">
                                                    {'Edit Role'}
                                                </span>
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className={
                                editRolesState
                                    ? 'editRolesWrapper__createRolesContent'
                                    : 'editRolesWrapper__createRolesContentDisabled'
                            }
                        >
                            <div className="editRolesWrapper__createRolesDropdownContent">
                                <Text type="secondary" strong>
                                    {t('roles.resourceType')}
                                </Text>
                                <div className="editRolesWrapper__createRolesDropdownCollapse">
                                    <Collapse
                                        accordion
                                        onChange={(e) => {
                                            e[0] &&
                                                dispatch(
                                                    // To get resource type id from resourcetypeList
                                                    getResourcetypeDetails(
                                                        resourcetypeList[
                                                            Number(e[0]) - 1
                                                        ].id
                                                    )
                                                ) &&
                                                setResourceTypeId(
                                                    resourcetypeList[
                                                        Number(e[0]) - 1
                                                    ]
                                                );
                                        }}
                                    >
                                        {resourcetypeList?.length &&
                                            resourcetypeList?.map(
                                                (item: any) => (
                                                    <Panel
                                                        header={
                                                            item.resourceTypeName
                                                        }
                                                        key={item.id}
                                                    >
                                                        {resouceTypeDetails?.length >
                                                            0 && (
                                                            <List
                                                                split={false}
                                                                dataSource={
                                                                    resouceTypeDetails
                                                                }
                                                                renderItem={(
                                                                    data: any
                                                                ) =>
                                                                    data
                                                                        ?.resourceType
                                                                        ?.resourceTypeName ===
                                                                        item.resourceTypeName && (
                                                                        <List.Item>
                                                                            <Checkbox
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    e
                                                                                        .target
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
                                                )
                                            )}
                                    </Collapse>
                                </div>
                            </div>
                            <div
                                className={
                                    editRolesState
                                        ? 'editRolesWrapper__createRolesTableContent'
                                        : 'editRolesWrapper__createRolesTableContentDisabled'
                                }
                            >
                                <Row
                                    className={
                                        'editRolesWrapper__createRolesTableContentRowHeader'
                                    }
                                >
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
                                            switchDisabled={!editRolesState}
                                            switchBoolean={true}
                                            key={keyProp}
                                            checked={
                                                rolesPermissionListState.length >
                                                    0 &&
                                                rolesPermissionListState.every(
                                                    (item: any) =>
                                                        item.permission.includes(
                                                            PERMISSIONS.read
                                                        )
                                                )
                                            }
                                            onChangeFunction={(
                                                eventProp: boolean
                                            ) => {
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
                                                                PERMISSIONS.read
                                                            );
                                                        }
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
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
                                                            listItems[
                                                                i
                                                            ].permission =
                                                                listItems[
                                                                    i
                                                                ].permission.filter(
                                                                    (
                                                                        permission: any
                                                                    ) =>
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
                                            switchDisabled={!editRolesState}
                                            key={keyProp}
                                            switchBoolean={true}
                                            checked={
                                                rolesPermissionListState.length >
                                                    0 &&
                                                rolesPermissionListState.every(
                                                    (item: any) =>
                                                        item.permission.includes(
                                                            PERMISSIONS.write
                                                        )
                                                )
                                            }
                                            onChangeFunction={(
                                                eventProp: boolean
                                            ) => {
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
                                                                PERMISSIONS.write
                                                            );
                                                        }
                                                        if (
                                                            !listItems[
                                                                i
                                                            ].permission.includes(
                                                                PERMISSIONS.update
                                                            )
                                                        ) {
                                                            listItems[
                                                                i
                                                            ].permission.push(
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
                                                                PERMISSIONS.read
                                                            );
                                                        }
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
                                                    setKeyProp(keyProp + 1);
                                                } else {
                                                    for (
                                                        let i = 0;
                                                        i < listItems.length;
                                                        i++
                                                    ) {
                                                        listItems[
                                                            i
                                                        ].permission =
                                                            listItems[
                                                                i
                                                            ].permission.filter(
                                                                (
                                                                    permission: any
                                                                ) =>
                                                                    permission !==
                                                                    PERMISSIONS.write
                                                            );
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
                                                    setKeyProp(keyProp - 1);
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <RoleSwitch
                                            types="secondary"
                                            text={'Edit'}
                                            key={keyProp}
                                            switchDisabled={!editRolesState}
                                            switchBoolean={true}
                                            checked={
                                                rolesPermissionListState.length >
                                                    0 &&
                                                rolesPermissionListState.every(
                                                    (item: any) =>
                                                        item.permission.includes(
                                                            PERMISSIONS.update
                                                        )
                                                )
                                            }
                                            onChangeFunction={(
                                                eventProp: boolean
                                            ) => {
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
                                                                PERMISSIONS.read
                                                            );
                                                        }
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
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
                                                            listItems[
                                                                i
                                                            ].permission =
                                                                listItems[
                                                                    i
                                                                ].permission.filter(
                                                                    (
                                                                        permission: any
                                                                    ) =>
                                                                        permission !==
                                                                        PERMISSIONS.update
                                                                );
                                                        }
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
                                                    setKeyProp(keyProp - 1);
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <RoleSwitch
                                            types="secondary"
                                            text={'Delete'}
                                            switchDisabled={!editRolesState}
                                            switchBoolean={true}
                                            key={keyProp}
                                            checked={
                                                rolesPermissionListState.length >
                                                    0 &&
                                                rolesPermissionListState.every(
                                                    (item: any) =>
                                                        item.permission.includes(
                                                            PERMISSIONS.delete
                                                        )
                                                )
                                            }
                                            onChangeFunction={(
                                                eventProp: boolean
                                            ) => {
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
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
                                                            listItems[
                                                                i
                                                            ].permission.push(
                                                                PERMISSIONS.read
                                                            );
                                                        }
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
                                                    setKeyProp(keyProp + 1);
                                                } else {
                                                    for (
                                                        let i = 0;
                                                        i < listItems.length;
                                                        i++
                                                    ) {
                                                        listItems[
                                                            i
                                                        ].permission =
                                                            listItems[
                                                                i
                                                            ].permission.filter(
                                                                (
                                                                    permission: any
                                                                ) =>
                                                                    permission !==
                                                                    PERMISSIONS.delete
                                                            );
                                                    }
                                                    setRolesPermissionListState(
                                                        listItems
                                                    );
                                                    setKeyProp(keyProp - 1);
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {rolesPermissionListState?.length > 0 && (
                                    <List
                                        className="editRolesWrapper__createRoleList"
                                        split={false}
                                        bordered
                                        dataSource={rolesPermissionListState}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Row className="editRolesWrapper__createRolesTableContentRow">
                                                    <Col span={8}>
                                                        <RoleSwitch
                                                            text={
                                                                item.resource
                                                                    .resourceName
                                                            }
                                                            switchBoolean={
                                                                false
                                                            }
                                                        />
                                                    </Col>

                                                    <Col span={4}>
                                                        <RoleSwitch
                                                            switchBoolean={true}
                                                            switchDisabled={
                                                                !editRolesState
                                                            }
                                                            key={keyProp}
                                                            checked={item.permission.includes(
                                                                PERMISSIONS.read
                                                            )}
                                                            onChangeFunction={(
                                                                eventProp: boolean
                                                            ) => {
                                                                const itemToBeChangedIndex =
                                                                    rolesPermissionListState.findIndex(
                                                                        (
                                                                            data: any
                                                                        ) =>
                                                                            data
                                                                                .resource
                                                                                .resourceId ===
                                                                            item
                                                                                .resource
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
                                                                        ] =
                                                                            itemToBeChanged;
                                                                        setRolesPermissionListState(
                                                                            listItems
                                                                        );
                                                                    }
                                                                    setKeyProp(
                                                                        keyProp +
                                                                            1
                                                                    );
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
                                                                        ].some(
                                                                            (
                                                                                value
                                                                            ) =>
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
                                                                        setKeyProp(
                                                                            keyProp -
                                                                                1
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col span={4}>
                                                        <RoleSwitch
                                                            switchBoolean={true}
                                                            switchDisabled={
                                                                !editRolesState
                                                            }
                                                            key={keyProp}
                                                            checked={item.permission.includes(
                                                                PERMISSIONS.write
                                                            )}
                                                            onChangeFunction={(
                                                                eventProp: boolean
                                                            ) => {
                                                                const itemToBeChangedIndex =
                                                                    rolesPermissionListState.findIndex(
                                                                        (
                                                                            data: any
                                                                        ) =>
                                                                            data
                                                                                .resource
                                                                                .resourceId ===
                                                                            item
                                                                                .resource
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
                                                                        ] =
                                                                            itemToBeChanged;
                                                                        setRolesPermissionListState(
                                                                            listItems
                                                                        );
                                                                        setKeyProp(
                                                                            keyProp +
                                                                                1
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
                                                                            keyProp -
                                                                                1
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col span={4}>
                                                        <RoleSwitch
                                                            switchBoolean={true}
                                                            switchDisabled={
                                                                !editRolesState
                                                            }
                                                            key={keyProp}
                                                            checked={item.permission.includes(
                                                                PERMISSIONS.update
                                                            )}
                                                            onChangeFunction={(
                                                                eventProp: boolean
                                                            ) => {
                                                                const itemToBeChangedIndex =
                                                                    rolesPermissionListState.findIndex(
                                                                        (
                                                                            data: any
                                                                        ) =>
                                                                            data
                                                                                .resource
                                                                                .resourceId ===
                                                                            item
                                                                                .resource
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
                                                                        ] =
                                                                            itemToBeChanged;
                                                                        setRolesPermissionListState(
                                                                            listItems
                                                                        );
                                                                        setKeyProp(
                                                                            keyProp +
                                                                                1
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
                                                                            keyProp -
                                                                                1
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col span={4}>
                                                        <RoleSwitch
                                                            switchBoolean={true}
                                                            switchDisabled={
                                                                !editRolesState
                                                            }
                                                            key={keyProp}
                                                            checked={item.permission.includes(
                                                                PERMISSIONS.delete
                                                            )}
                                                            onChangeFunction={(
                                                                eventProp: boolean
                                                            ) => {
                                                                const itemToBeChangedIndex =
                                                                    rolesPermissionListState.findIndex(
                                                                        (
                                                                            data: any
                                                                        ) =>
                                                                            data
                                                                                .resource
                                                                                .resourceId ===
                                                                            item
                                                                                .resource
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
                                                                        ] =
                                                                            itemToBeChanged;
                                                                        setRolesPermissionListState(
                                                                            listItems
                                                                        );
                                                                        setKeyProp(
                                                                            keyProp +
                                                                                1
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
                                                                        ] =
                                                                            itemToBeChanged;
                                                                        setRolesPermissionListState(
                                                                            listItems
                                                                        );
                                                                        setKeyProp(
                                                                            keyProp -
                                                                                1
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
                    </div>

                    {editRolesState ? (
                        <div className="editRolesWrapper__createRoleFooter">
                            <div className="editRolesWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={t('commonStr.back')}
                                    disabled
                                    handleClick={() => {}}
                                />
                            </div>
                            <div className="editRolesWrapper__footerButtonWrapper">
                                <CustomButton
                                    type={t('commonStr.save')}
                                    disabled={
                                        rolesPermissionListState.length <= 0
                                    }
                                    handleClick={() => {
                                        dispatch(
                                            setResourceTypePayload(
                                                rolesPermissionListState
                                            )
                                        );
                                        modalShow(isModalOpen, setIsModalOpen);
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </Card>
            </div>

            <ConfirmationModal
                open={isModalOpen}
                icon={<ConfirmationIcon />}
                onOk={() => onOkHandler()}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('roles.confirmText')}
            />
            <SuccessfulModal
                open={activeSuccessModalOpen}
                onOk={() => onOkHandler()}
                onCancel={() => {
                    dispatch(setEditRoleState(ROLETYPE.view));
                    cancelHandle(
                        activeSuccessModalOpen,
                        setActiveSuccessModalOpen
                    );
                }}
                text={t('roles.savetext')}
            />
            {openSideDrawer && (
                <Drawer
                    className="editDrawer__wrapper"
                    title={'Edit Users'}
                    placement="right"
                    open={openSideDrawer}
                    onClose={() => {
                        setOpenSideDrawer(false);
                    }}
                    size="large"
                >
                    <EditUsers
                        onClose={() => {
                            setOpenSideDrawer(false);
                        }}
                    />
                </Drawer>
            )}
        </>
    );
};

export default EditRole;
