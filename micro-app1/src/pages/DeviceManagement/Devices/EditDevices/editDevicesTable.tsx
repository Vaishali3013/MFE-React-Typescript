import React, { type ReactNode, useState, useEffect } from 'react';
import {
    Col,
    Input,
    Row,
    Table,
    Button,
    Dropdown,
    Popover,
    Pagination,
} from 'antd';
import './index.scss';
import { type ColumnsType } from 'antd/es/table';
import {
    MoreOutlined,
    PlusOutlined,
    DownOutlined,
    DisconnectOutlined,
} from '@ant-design/icons';
import { ReactComponent as ActiveDotIcon } from 'assets/icons/activeDot.svg';
import { ReactComponent as InactiveDotIcon } from 'assets/icons/inactiveDot.svg';
import { ReactComponent as DeactivateGroupIcon } from 'assets/icons/deactivateIconBlack.svg';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/searchIcon.svg';
import { editBlaTableData } from 'json/DeviceManagement/blas';
import {
    getTemplate,
    uploadTags,
} from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import { parseJwt } from 'utils/jwtTokenFunction';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import {
    ascendingSort,
    decendingSort,
    searchTagFilter,
} from 'utils/commonFunction';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import {
    activateDeactivateTags,
    setTagResponseState,
} from 'redux/actions/DeviceManagementActions/tagAction';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import ActivateDeactivateMultipleModal from 'components/common/Modals/ActivateDeactivateMultipleModal';
import { deviceManagement } from 'types/enums';
import { useTranslation } from 'react-i18next';

const EditDevicesTable: React.FC<any> = ({
    editState,
    tagListByDeviceId,
    recordsLength,
    setDeviceTagPage,
    setDeviceTagPageSize,
    deviceTagPage,
    deviceTagPageSize,
    setOpenAddTag,
    openInWizard,
    successModalOpen,
    setSuccessModalOpen,
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const { t } = useTranslation('translation');
    const [searchValue, setSearchValue] = useState('');
    const [deviceList, setDeviceList] = useState(tableData);
    const [selectedActiveIds, setSelectedActiveIds] = useState<any>([]);
    const [selectedInactiveIds, setSelectedInactiveIds] = useState<any>([]);
    const [confirmationModalState, setConfirmationModalState] = useState<
        String | any
    >(null);
    const [headerPopoverVisible, setHeaderPopoverVisible] = useState(false);
    const dispatch = useDispatch();
    const tableDataMapper = (): [] => {
        const temp: any = [];
        tagListByDeviceId?.map((item: any) => {
            temp.push({
                ...item,
                key: item.timeSeriesId,
            });
        });
        return temp;
    };
    const [popoverVisible, setPopoverVisible] = useState<
        Record<string, boolean>
    >({});
    const [selectedTag, setSelectedTag] = useState<any>({});
    const [deactivateModalState, setDeactivateModalState] = useState<
        string | null
    >(null);
    const [multipleModalState, setMultipleModalState] = useState<string | null>(
        null
    );
    const tagStatusChanged = useSelector(
        (state: any) => state.deviceManagement.tags.tagStatusChanged
    );
    const [isPopoverVisibles, setIsPopoverVisibles] = useState<
        Record<string, boolean>
    >({});
    const handlePopoverVisibleChanges = (visible: any): any => {
        setIsPopoverVisibles(visible);
    };

    useEffect(() => {
        setTableData(tableDataMapper());
    }, [tagListByDeviceId]);

    const onShowSizeChange: any = (current: any, pageSize: any) => {
        setDeviceTagPageSize(pageSize);
    };
    useEffect(() => {
        if (tagStatusChanged && deactivateModalState) {
            setSuccessModalOpen(`${deactivateModalState}`);
        } else if (tagStatusChanged && multipleModalState) {
            setSuccessModalOpen(`${multipleModalState}`);
        }
        setDeactivateModalState(null);
        setMultipleModalState(null);
    }, [tagStatusChanged]);

    useEffect(() => {
        searchTagFilter(tableData, searchValue, setDeviceList);
    }, [searchValue, tableData]);

    const moreContent = (record: any, setPopoverVisible: any): ReactNode => {
        const values = [
            {
                title: record.isActive ? 'Deactivate' : 'Activate',
                icon: <DeactivateGroupIcon />,
            },
        ];
        if (record?.activeTagsCount > 0 || record?.inactiveTagsCount > 0) {
            values.splice(1, 1);
        }

        return (
            <>
                <div className="more-container">
                    <div className={`more-content`}>
                        <ul>
                            {values &&
                                values.length > 0 &&
                                values.map((item) => (
                                    <li
                                        key={item.title}
                                        className="moreContent__deviceItems"
                                    >
                                        <span
                                            className="moreContent__option"
                                            onClick={() => {
                                                setSelectedTag(record);
                                                if (item.title === 'Activate') {
                                                    setDeactivateModalState(
                                                        'activate'
                                                    );
                                                } else if (
                                                    item.title === 'Deactivate'
                                                ) {
                                                    setDeactivateModalState(
                                                        'deactivate'
                                                    );
                                                }
                                                setPopoverVisible(false);
                                            }}
                                        >
                                            <span className="moreContentIcon">
                                                {item.icon}
                                            </span>
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const handlePopoverVisibleChange = (
        visible: boolean,
        record: any
    ): void => {
        setPopoverVisible((prevState) => ({
            ...prevState,
            [record.key]: visible,
        }));
    };

    const headerDropdown = (): ReactNode => {
        const values = [
            {
                title: '',
                icon: <DisconnectOutlined />,
            },
        ];
        if (selectedActiveIds.length > 0 && selectedInactiveIds.length > 0) {
            values[0].title = 'Activate/Deactivate';
        } else if (
            selectedActiveIds.length > 0 &&
            selectedInactiveIds.length === 0
        ) {
            values[0].title = 'Deactivate';
        } else if (
            selectedActiveIds.length === 0 &&
            selectedInactiveIds.length > 0
        ) {
            values[0].title = 'Activate';
        }
        return (
            <>
                <div className="more-container">
                    <div className={`more-content`}>
                        <ul>
                            {values &&
                                values.length > 0 &&
                                values.map((item) => (
                                    <li
                                        key={item.title}
                                        className="blaMoreContent_items"
                                    >
                                        <span
                                            className="moreContent__option"
                                            onClick={() => {
                                                if (
                                                    selectedActiveIds.length >
                                                        0 &&
                                                    selectedInactiveIds.length >
                                                        0
                                                ) {
                                                    setConfirmationModalState(
                                                        true
                                                    );
                                                } else if (
                                                    selectedActiveIds.length >
                                                        0 &&
                                                    selectedInactiveIds.length ===
                                                        0
                                                ) {
                                                    setMultipleModalState(
                                                        'deactivate'
                                                    );
                                                } else if (
                                                    selectedActiveIds.length ===
                                                        0 &&
                                                    selectedInactiveIds.length >
                                                        0
                                                ) {
                                                    setMultipleModalState(
                                                        'activate'
                                                    );
                                                }
                                                setHeaderPopoverVisible(false);
                                            }}
                                        >
                                            <span className="moreContentIcon">
                                                {item.icon}
                                            </span>
                                            {item.title}
                                        </span>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const handleSorterChange = (
        pagination: any,
        filters: any,
        sorter: any
    ): any => {
        if (sorter.order === 'ascend') {
            setDeviceList(ascendingSort(sorter.columnKey, [...deviceList]));
        } else {
            setDeviceList(decendingSort(sorter.columnKey, [...deviceList]));
        }
    };

    const TableColumns: ColumnsType<any> = [
        {
            title: (
                <div>
                    {!openInWizard &&
                        (selectedActiveIds.length > 0 ||
                            selectedInactiveIds.length > 0) && (
                            <Popover
                                overlayClassName="deviceDrawerMultiplePopover"
                                content={
                                    <div className="blaTableWrapper__popover">
                                        {headerDropdown()}
                                    </div>
                                }
                                placement="bottomLeft"
                                trigger="click"
                                visible={headerPopoverVisible}
                                onVisibleChange={setHeaderPopoverVisible}
                            >
                                <MoreOutlined />
                            </Popover>
                        )}
                </div>
            ),
            key: 'more',
            width: 26,
            render: (_: any, record: any) => {
                return (
                    <>
                        <div>
                            {!openInWizard && (
                                <Popover
                                    overlayClassName="deviceDrawerPopover"
                                    className="blaTableWrapper__popover"
                                    content={moreContent(
                                        record,
                                        setPopoverVisible
                                    )}
                                    placement="bottomLeft"
                                    visible={popoverVisible[record.key]}
                                    onVisibleChange={(visible) => {
                                        handlePopoverVisibleChange(
                                            visible,
                                            record
                                        );
                                    }}
                                    trigger={'click'}
                                >
                                    <MoreOutlined />
                                </Popover>
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            key: 'tagName',
            sorter: true,
            title: (
                <>
                    <div className="blaTableWrapper__columnTitle__namePopup">
                        <div className="pl-15">{t('commonStr.tagname')}</div>
                    </div>
                </>
            ),
            dataIndex: 'tagName',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="blaTableWrapper__nameData">
                            <div className="blaTableWrapper__status">
                                {record.isActive ? (
                                    <>
                                        <ActiveDotIcon />
                                    </>
                                ) : (
                                    <InactiveDotIcon />
                                )}
                                <span className="fs-14 fw-500 name">
                                    {record?.tagName?.length <
                                    deviceManagement.blaNameLength ? (
                                        record?.tagName
                                    ) : (
                                        <Popover
                                            overlayClassName="customOverlay"
                                            content={
                                                <div className="blaName">
                                                    {record?.tagName}
                                                </div>
                                            }
                                            visible={
                                                isPopoverVisibles[record?.key]
                                            }
                                            onVisibleChange={
                                                handlePopoverVisibleChanges
                                            }
                                            placement="topLeft"
                                        >
                                            {record?.tagName?.length >
                                            deviceManagement.blaNameLength
                                                ? `${record?.tagName?.slice(
                                                      0,
                                                      deviceManagement.blaNameLength
                                                  )}...`
                                                : record?.tagName}
                                        </Popover>
                                    )}
                                </span>{' '}
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            key: 'address',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{'Address'}</div>
                </div>
            ),
            dataIndex: 'address',
            render: (_: any, record: any) => {
                return (
                    <>
                        <div className="blaTableWrapper__status">
                            <span className="fs-14 fw-500">
                                {record?.address?.length <
                                deviceManagement.blaNameLength ? (
                                    record?.address
                                ) : (
                                    <Popover
                                        overlayClassName="customOverlay"
                                        content={
                                            <div className="blaName">
                                                {record?.address}
                                            </div>
                                        }
                                        visible={isPopoverVisibles[record?.key]}
                                        onVisibleChange={
                                            handlePopoverVisibleChanges
                                        }
                                        placement="topLeft"
                                    >
                                        {record?.address?.length >
                                        deviceManagement.blaNameLength
                                            ? `${record?.address?.slice(
                                                  0,
                                                  deviceManagement.blaNameLength
                                              )}...`
                                            : record?.address}
                                    </Popover>
                                )}
                            </span>{' '}
                        </div>
                    </>
                );
            },
        },
        {
            key: 'dataType',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('commonStr.dataType')}</div>
                </div>
            ),
            dataIndex: 'dataType',
        },
        {
            key: 'createdOn',
            sorter: true,
            title: (
                <div className="blaTableWrapper__columnTitle">
                    <div>{t('commonStr.createdOn')}</div>
                </div>
            ),
            dataIndex: 'createdOn',
        },
    ];

    const onChange = (pageNumber: number): void => {
        setDeviceTagPage(pageNumber);
    };

    const [typeOfDownload, setTypeOfDownload] = useState<string>('');

    useEffect(() => {
        if (typeOfDownload)
            dispatch(
                getTemplate({
                    screenType: 'deviceManagementTags',
                    typeOfDownload,
                })
            );
        setTypeOfDownload('');
    }, [typeOfDownload]);
    const details = parseJwt();
    const handleChange = (event: any, fileType: string): void => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        dispatch(
            uploadTags({ formData, fileType, createdBy: details.username })
        );
    };
    const rowSelection: any = {
        onSelect: (record: any, selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.timeSeriesId)
                    : selectedInactiveRows.push(item.timeSeriesId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onSelectAll: (selected: any, selectedRows: any) => {
            const selectedActiveRows: number[] = [];
            const selectedInactiveRows: number[] = [];
            selectedRows.map((item: any) =>
                item.isActive
                    ? selectedActiveRows.push(item.timeSeriesId)
                    : selectedInactiveRows.push(item.timeSeriesId)
            );
            setSelectedActiveIds([...selectedActiveRows]);
            setSelectedInactiveIds([...selectedInactiveRows]);
        },
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {},
    };
    const handleActivate = (): void => {
        setMultipleModalState('activate');
        setConfirmationModalState(false);
    };
    const handleDeactivate = (): void => {
        setMultipleModalState('deactivate');
        setConfirmationModalState(false);
    };
    const items = [
        {
            label: (
                <>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e: any) => {
                            handleChange(e, 'csv');
                        }}
                        id="file-upload-tag-csv"
                    />
                    <label
                        onClick={() => {
                            document
                                .getElementById('file-upload-tag-csv')
                                ?.click();
                        }}
                    >
                        {t('commonStr.uploadCsv')}
                    </label>
                </>
            ),
            key: 'uploadCSV',
            icon: <CSVIcon />,
        },
        {
            label: (
                <>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={(e: any) => {
                            handleChange(e, 'excel');
                        }}
                        id="file-upload-tag-excel"
                    />
                    <label
                        onClick={() => {
                            document
                                .getElementById('file-upload-tag-excel')
                                ?.click();
                        }}
                    >
                        {t('commonStr.uploadExcel')}
                    </label>
                </>
            ),
            key: 'uploadExcel',
            icon: <ExcelIcon />,
        },
        {
            label: 'Download Template',
            key: 'downloadTemplate',
            icon: <CSVIcon />,
            children: [
                {
                    key: 'csv',
                    label: (
                        <div
                            onClick={() => {
                                setTypeOfDownload('downloadTemplateCSV');
                            }}
                        >
                            {t('commonStr.asCsv')}
                        </div>
                    ),
                },
                {
                    key: 'excel',
                    label: (
                        <div
                            onClick={() => {
                                setTypeOfDownload('downloadTemplateExcel');
                            }}
                        >
                            {t('commonStr.asExcel')}
                        </div>
                    ),
                },
            ],
        },
    ];

    return (
        <>
            <div
                className={
                    openInWizard ? 'editBlaWrapper' : 'editBlaWrapperNoPadding'
                }
            >
                {' '}
                <div
                    className={
                        openInWizard
                            ? openInWizard === 'bla'
                                ? 'editBlaWrapper__cardInBlaWizard'
                                : 'editBlaWrapper__cardInDeviceWizard'
                            : 'editBlaWrapper__card'
                    }
                >
                    {editBlaTableData.length > 0 ? (
                        <>
                            <Row>
                                <Col
                                    span={24}
                                    className="editBlaWrapper__header"
                                >
                                    <Input
                                        className="editBlaWrapper__search"
                                        placeholder="Search for Devices"
                                        prefix={<SearchIcon />}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                        }}
                                    />

                                    <Dropdown
                                        menu={{ items }}
                                        overlayClassName="bluk__upload"
                                    >
                                        <Button>
                                            {t('commonStr.bulkUpload')}
                                            <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Button
                                        icon={<PlusOutlined />}
                                        className="editBlaWrapper__buttonGroup"
                                        onClick={() => setOpenAddTag(true)}
                                    >
                                        <span className="fw-400 fs-14">
                                            {'Add New Tags'}
                                        </span>
                                    </Button>
                                </Col>
                            </Row>
                            <Row
                                className={
                                    editState
                                        ? 'editBlaWrapper__blaEditList'
                                        : 'editBlaWrapper__blaList'
                                }
                            >
                                <Col span={24}>
                                    <div className="blaTableWrapper">
                                        <Table
                                            rowSelection={{
                                                type: 'checkbox',
                                                ...rowSelection,
                                            }}
                                            pagination={false}
                                            columns={TableColumns}
                                            dataSource={deviceList}
                                            onChange={handleSorterChange}
                                            showSorterTooltip={false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <div className="editBlaWrapper__tableEmpty">
                                <EmptyDataComponent
                                    textValue={t('deviceMang.devices.noBlaAdded')}
                                    buttonType={{
                                        name: 'Add BLA',
                                        disable: false,
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
                <ActivateDeactivateMultipleModal
                    open={confirmationModalState}
                    text={t('commonStr.tags')}
                    onCancel={setConfirmationModalState}
                    activeIds={selectedActiveIds}
                    inActiveIds={selectedInactiveIds}
                    handleActivate={handleActivate}
                    handleDeactivate={handleDeactivate}
                />
                <ConfirmationModal
                    open={multipleModalState}
                    icon={
                        multipleModalState === 'activate' ? (
                            <ActivateIcon />
                        ) : (
                            <DeactivateIcon />
                        )
                    }
                    onOk={() => {
                        if (multipleModalState === 'activate') {
                            dispatch(
                                activateDeactivateTags({
                                    id: selectedInactiveIds,
                                    active: true,
                                    updatedBy: details.username,
                                })
                            );
                        } else if (multipleModalState === 'deactivate') {
                            dispatch(
                                activateDeactivateTags({
                                    id: selectedActiveIds,
                                    active: false,
                                    updatedBy: details.username,
                                })
                            );
                        }
                    }}
                    onCancel={() => {
                        setMultipleModalState(null);
                    }}
                    text={`Are you sure you want to ${multipleModalState} selected tag(s)?`}
                />
                <ConfirmationModal
                    open={deactivateModalState}
                    icon={
                        deactivateModalState === 'activate' ? (
                            <ActivateIcon />
                        ) : (
                            <DeactivateIcon />
                        )
                    }
                    onOk={() => {
                        dispatch(
                            activateDeactivateTags({
                                id: [selectedTag?.timeSeriesId],
                                active: !selectedTag?.isActive,
                                updatedBy: details?.username,
                            })
                        );
                    }}
                    onCancel={() => {
                        setDeactivateModalState(null);
                    }}
                    text={`Are you sure you want to ${deactivateModalState} selected tag(s)?`}
                />
                <SuccessfulModal
                    open={successModalOpen}
                    onOk={() => {
                        setSuccessModalOpen(null);
                        dispatch(setTagResponseState());
                    }}
                    onCancel={() => {
                        setSuccessModalOpen(null);
                        dispatch(setTagResponseState());
                    }}
                    text={
                        successModalOpen === 'deactivate'
                            ? t('commonStr.deactivateSuccess')
                            : t('commonStr.activateSuccess')
                    }
                />
                {recordsLength > 50 ? (
                    <>
                        <div className="editBlaPagination">
                            <Pagination
                                total={recordsLength}
                                showTotal={(total: Number) =>
                                    `${deviceTagPage ?? '1'} of ${Math.ceil(
                                        Number(total) /
                                            Number(deviceTagPageSize)
                                    )} pages`
                                }
                                defaultCurrent={1}
                                defaultPageSize={50}
                                showSizeChanger
                                onChange={onChange}
                                onShowSizeChange={onShowSizeChange}
                                pageSizeOptions={[50, 100, 200]}
                            />
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </>
    );
};
export default EditDevicesTable;
