import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Card, Cascader, Col, Dropdown, Row, message } from 'antd';
import CustomButton from 'components/common/CustomButton';
import TagTable from './tagTable';
import CustomPagination from 'components/common/CustomPagination';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import AddTagDrawer from './addTagDrawer';
import ViewTagDrawer from './viewTagDrawer';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllTagList,
    getTagList,
    setAddTagData,
    setTagResponseState,
} from 'redux/actions/DeviceManagementActions/tagAction';
import { DownOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import {
    getTemplate,
    uploadTags,
} from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import { ROLETYPE, resourceName } from 'types/enums';
import {
    removeLastSelectedBlaFromRedux,
    getAllBlasList,
} from 'redux/actions/DeviceManagementActions/blasAction';
import {
    getAllDevicesList,
    getDeviceDetails,
} from 'redux/actions/DeviceManagementActions/deviceAction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as NoBlaIcon } from 'assets/icons/noBla.svg';
import { cancelHandle } from 'utils/modalFunction';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';
import CreateAttribute from 'pages/Configure/AttributeDefinition/CreateUom';

const Tags: React.FC = () => {
    const { t } = useTranslation('translation');
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState<number>(50);
    const [openAddTag, setOpenAddTag] = useState<string | null>(null);
    const [openViewTag, setOpenViewTag] = useState(false);
    const [isUomOpen, setIsUomOpen] = useState(false);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successModalState, setSuccessModalState] = useState<String | any>(
        null
    );
    const { SHOW_CHILD } = Cascader;
    const dispatch = useDispatch();
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const [record, setRecord] = useState<any>('');
    const tagTableDataList = useSelector(
        (state: any) => state.deviceManagement.tags.tagsList
    );

    const allTagsData = useSelector(
        (state: any) => state.deviceManagement.tags.allTagsList
    );

    const isEdited = useSelector(
        (state: any) => state.deviceManagement?.tags?.isEdited
    );

    const allDevicesList = useSelector(
        (state: any) => state.deviceManagement.devices.allDevicesList
    );

    const uploadedTagsSuccess = useSelector(
        (state: any) => state.deviceManagement.tags.uploadedTags
    );
    const allBlasList = useSelector(
        (state: any) => state.deviceManagement.blas.allBlasList
    );

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        dispatch(removeLastSelectedBlaFromRedux());
        dispatch(getAllTagList());
        dispatch(getAllBlasList());
    }, []);

    useEffect(() => {
        if (isEdited || (!successModalState && !openAddTag)) {
            dispatch(getTagList({ ...payload, search: selectedValues }));
            dispatch(getAllDevicesList());
            dispatch(getAllTagList());
        }
    }, [
        payload,
        selectedValues,
        successModalState,
        openAddTag,
        isEdited,
        uploadedTagsSuccess,
    ]);

    const { currentTab } = useParams();

    useEffect(() => {
        setSelectedValues([]);
        setOpenAddTag(null);
        setIsUomOpen(false);
        dispatch(setAddTagData({}));
    }, [currentTab]);

    const deviceDetails = useSelector(
        (state: any) => state.deviceManagement.devices.deviceDetails
    );
    useEffect(() => {
        record && dispatch(getDeviceDetails(record?.deviceId));
    }, [record]);

    const selectValues = (value: any, selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        allTagsData?.map((item: any, index: number) => {
            temp.push({
                ...item,
                value: item?.timeSeriesId,
                label: `${item?.tagName}`,
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
        resetFileInput(`file-upload-tag-${fileType}`);
    };
    const resetFileInput = (id: string): any => {
        const fileInput = document.getElementById(
            id
        ) as HTMLInputElement | null;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const tagStatusResponse = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagStatusResponse
    );
    const items = [
        {
            label: (
                <>
                    <div>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            onChange={(e: any) => {
                                handleChange(e, 'csv');
                            }}
                            id="file-upload-tag-csv"
                        />
                        <div
                            onClick={() => {
                                document
                                    .getElementById('file-upload-tag-csv')
                                    ?.click();
                            }}
                        >
                            {t('commonStr.uploadCsv')}
                        </div>
                    </div>
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
                    <div
                        onClick={() => {
                            document
                                .getElementById('file-upload-tag-excel')
                                ?.click();
                        }}
                    >
                        {t('commonStr.uploadExcel')}
                    </div>
                </>
            ),
            key: 'uploadExcel',
            icon: <ExcelIcon />,
        },
        {
            label: t('commonStr.downlaodTemp'),
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

    const uploadLoader = useSelector(
        (state: any) => state.root.bulkUploadLoader
    );

    useEffect(() => {
        if (uploadLoader)
            message.open({
                type: 'loading',
                content: 'Uploading in progress ... ',
            });
        // if (!uploadLoader) message.destroy();
    }, [uploadLoader]);
    const navigation = (): any => {
        if (allBlasList?.length === 0 && allDevicesList?.length === 0) {
            navigate('/device-management/blas');
            setIsModalOpen(false);
        } else if (allDevicesList?.length === 0 && allBlasList?.length > 0) {
            navigate('/device-management/devices');
            setIsModalOpen(false);
        }
    };
    return (
        <>
            <div className="tagWrapper">
                {isUomOpen ? (
                    <CreateAttribute setIsUomOpen={setIsUomOpen} />
                ) : (
                    <>
                        {' '}
                        <Card bordered={false}>
                            <PermissionComponent screenName={resourceName.tags}>
                                {tagTableDataList?.paginatedResponse
                                    ?.totalRecords > 0 ? (
                                    <>
                                        <Row>
                                            <Col
                                                span={24}
                                                className="tagWrapper__header"
                                            >
                                                <Cascader
                                                    key={currentTab}
                                                    multiple
                                                    maxTagCount="responsive"
                                                    options={tableDataMapper()}
                                                    onChange={selectValues}
                                                    className="tagWrapper__search"
                                                    placeholder={t(
                                                        'deviceMang.tags.searchBlaDeviceTag'
                                                    )}
                                                    showSearch={{ filter }}
                                                    showCheckedStrategy={
                                                        SHOW_CHILD
                                                    }
                                                />
                                                <Dropdown
                                                    menu={{ items }}
                                                    overlayClassName="bluk__upload"
                                                >
                                                    <Button>
                                                        {t(
                                                            'commonStr.bulkUpload'
                                                        )}
                                                        <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                                <CustomButton
                                                    type={'Add Tag'}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        setOpenAddTag('add');
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="tagWrapper__tagList">
                                            <Col span={24}>
                                                <TagTable
                                                    setViewDrawerState={
                                                        setOpenViewTag
                                                    }
                                                    setOpenAddTag={
                                                        setOpenAddTag
                                                    }
                                                    tagData={
                                                        tagTableDataList
                                                            ?.paginatedResponse
                                                            ?.records
                                                    }
                                                    search={selectedValues}
                                                    pageType={payload}
                                                    setRecord={setRecord}
                                                    setSuccessModalState={
                                                        setSuccessModalState
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <div className="tagWrapper__tableEmpty">
                                            <EmptyDataComponent
                                                textValue={
                                                    'No Tags have been added'
                                                }
                                                buttonType={{
                                                    name: 'Add Tag',
                                                    disable: false,
                                                }}
                                                buttonClickHandler={() => {
                                                    if (
                                                        allTagsData?.length ===
                                                            0 &&
                                                        allDevicesList?.length >
                                                            0
                                                    ) {
                                                        setOpenAddTag(
                                                            ROLETYPE.add
                                                        );
                                                    } else {
                                                        setIsModalOpen(true);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </PermissionComponent>
                        </Card>
                        {openAddTag && (
                            <AddTagDrawer
                                open={openAddTag}
                                setAddDrawerState={setOpenAddTag}
                                record={record}
                                setRecord={setRecord}
                                allDevicesList={allDevicesList}
                                deviceDetails={deviceDetails}
                                setSuccessModalState={setSuccessModalState}
                                successModalState={successModalState}
                                setIsUomOpen={setIsUomOpen}
                            />
                        )}
                        <ViewTagDrawer
                            open={openViewTag}
                            setViewDrawerState={setOpenViewTag}
                            setEditState={setOpenAddTag}
                            details={record}
                            setRecord={setRecord}
                        />
                        {tagTableDataList?.paginatedResponse?.totalRecords >
                        50 ? (
                            <>
                                <CustomPagination
                                    totalRecords={
                                        tagTableDataList?.paginatedResponse
                                            ?.totalRecords
                                    }
                                    setPage={setPage}
                                    page={page}
                                    setPageSize={setPageSize}
                                    pageSize={pageSize}
                                />
                            </>
                        ) : null}
                    </>
                )}
            </div>
            <ConfirmationModal
                customClassName="confirmationModal noBla"
                open={isModalOpen}
                icon={<NoBlaIcon />}
                onCancel={() => cancelHandle(isModalOpen, setIsModalOpen)}
                text={t('deviceMang.tags.noDevicesAddedClick')}
                onOk={() => {
                    navigation();
                }}
            />
            {currentTab === 'tags' && (
                <SuccessfulModal
                    open={tagStatusResponse}
                    onOk={() => {
                        setSuccessModalState(null);
                        dispatch(setTagResponseState());
                    }}
                    onCancel={() => {
                        setSuccessModalState(null);
                        dispatch(setTagResponseState());
                    }}
                    text={
                        successModalState === 'activate'
                            ? 'Activated Successfully'
                            : 'Deactivated Successfully'
                    }
                />
            )}
        </>
    );
};

export default Tags;
