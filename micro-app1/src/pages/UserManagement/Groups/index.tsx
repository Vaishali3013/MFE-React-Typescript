import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card, Col, Row, Cascader, Spin, Dropdown, Menu, Button } from 'antd';
import CustomButton from 'components/common/CustomButton';
import CustomPagination from 'components/common/CustomPagination';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import {
    getGroupsList,
    getAllGroups,
} from 'redux/actions/UserManagementActions/groupsAction';
import SideDrawer from 'components/common/SideDrawer';
import GroupDrawer from 'components/common/SideDrawer/GroupDrawer';
import GroupTable from './GroupTable';
import { useParams } from 'react-router-dom';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { exportGroups } from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { File_TO_DOWNLOAD, PERMISSIONS, resourceName } from 'types/enums';
import { getObjectByResourceName, hasPermission } from 'utils/rbacFunction';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';

const Groups: React.FC = () => {
    const { t } = useTranslation('translation');
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [userPermissionDetails, setUserPermissionDetails] = useState({});

    const [payload, setPayload] = useState({
        page,
        pageSize,
    });
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const groupListLoading = useSelector(
        (state: any) => state.userManagement?.groups?.groupListLoading
    );
    const { SHOW_CHILD } = Cascader;
    const dispatch = useDispatch();
    const { currentTab } = useParams();
    useEffect(() => {
        setSelectedValues([]);
    }, [currentTab]);

    const groupDataCreated = useSelector(
        (state: any) => state.userManagement.groups.isCreated
    );

    const groupDataEdited = useSelector(
        (state: any) => state.userManagement.groups.isEdited
    );

    useEffect(() => {
        dispatch(getAllGroups());
    }, [groupDataCreated, groupDataEdited]);

    const groupData = useSelector(
        (state: any) => state.userManagement.groups.groupsList
    );
    const allGroupsData = useSelector(
        (state: any) => state.userManagement.groups.allGroupsData
    );

    const loggedInUserPermissionData = useSelector(
        (state: any) =>
            state.userManagement.users?.loggedInUserScreenPermissionList
    );

    const loggedInUserDetails = useSelector(
        (state: any) => state.userManagement.users?.loggedInUserDetails
    );

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        dispatch(getGroupsList({ ...payload, search: selectedValues }));
    }, [payload, selectedValues, groupDataCreated, groupDataEdited]);

    const selectValues = (value: any, selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };
    const tableDataMapper = (): [] => {
        const temp: any = [];
        allGroupsData?.map((item: any, index: number) => {
            temp.push({
                value: item.id,
                label: `${item.groupName}`,
            });
        });
        return temp;
    };
    const filter = (inputValue: any, path: any): any =>
        path?.some((option: any): any =>
            (option?.label as string)
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase())
        );
    const exportItems = [
        {
            label: (
                <label
                    onClick={() => {
                        dispatch(
                            exportGroups({
                                templateType: File_TO_DOWNLOAD.CSV,
                            })
                        );
                    }}
                >
                    {t('groups.exportCSV')}
                </label>
            ),
            key: 'exportCSV',
            icon: <CSVIcon />,
        },
        {
            label: (
                <label
                    onClick={() => {
                        dispatch(
                            exportGroups({
                                templateType: File_TO_DOWNLOAD.EXCEL,
                            })
                        );
                    }}
                >
                    {t('groups.exportExcel')}
                </label>
            ),
            key: 'exportExcel',
            icon: <ExcelIcon />,
        },
    ];

    useEffect(() => {
        setUserPermissionDetails(
            getObjectByResourceName(
                resourceName.groups,
                loggedInUserPermissionData
            )
        );
    }, [loggedInUserPermissionData]);

    return (
        <>
            <>
                <div className="groupsWrapper">
                    <Card bordered={false}>
                        <PermissionComponent screenName={resourceName.groups}>
                            {groupData?.totalRecords > 0 ? (
                                <>
                                    <Row className="usersWrapper-head">
                                        <Col span={16}>
                                            <Cascader
                                                key={currentTab}
                                                multiple
                                                maxTagCount="responsive"
                                                options={tableDataMapper()}
                                                onChange={selectValues}
                                                className="usersWrapper__search"
                                                placeholder={t(
                                                    ' groups.searchGroupName'
                                                )}
                                                showSearch={{ filter }}
                                                showCheckedStrategy={SHOW_CHILD}
                                            />
                                        </Col>

                                        <Col span={5}>
                                            <div className="export-option">
                                                <Dropdown
                                                    overlay={
                                                        <Menu>
                                                            {exportItems.map(
                                                                (item) => (
                                                                    <Menu.Item
                                                                        key={
                                                                            item.key
                                                                        }
                                                                    >
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </Menu.Item>
                                                                )
                                                            )}
                                                        </Menu>
                                                    }
                                                >
                                                    <Button>
                                                        {t('groups.export')}
                                                        <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                                <CustomButton
                                                    type={t(
                                                        'groups.createGroup'
                                                    )}
                                                    disabled={
                                                        hasPermission(
                                                            userPermissionDetails,
                                                            PERMISSIONS.write
                                                        )
                                                            ? false
                                                            : !loggedInUserDetails.admin
                                                    }
                                                    handleClick={() => {
                                                        setOpenSideDrawer(true);
                                                    }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    {groupListLoading ? (
                                        <div className="view__loader">
                                            <Spin />
                                        </div>
                                    ) : (
                                        <Row className="groupTableWrapper">
                                            <Col span={24}>
                                                <GroupTable
                                                    data={groupData?.records}
                                                    payload={payload}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </>
                            ) : (
                                <div className="groupsWrapper__noData">
                                    <EmptyDataComponent
                                        textValue={t(
                                            'groups.noGroupsCreatedText'
                                        )}
                                        buttonType={{
                                            name: t('groups.createGroup'),
                                            disable: false,
                                        }}
                                        loading={groupListLoading}
                                        buttonClickHandler={() => {
                                            setOpenSideDrawer(true);
                                        }}
                                    />
                                </div>
                            )}
                        </PermissionComponent>
                    </Card>
                </div>
            </>

            {groupData?.totalRecords > 50 ? (
                <>
                    <CustomPagination
                        totalRecords={groupData?.totalRecords}
                        page={page}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        pageSize={pageSize}
                    />
                </>
            ) : (
                ''
            )}
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
                        paginationPayload={payload}
                    />
                </SideDrawer>
            )}
        </>
    );
};

export default Groups;
