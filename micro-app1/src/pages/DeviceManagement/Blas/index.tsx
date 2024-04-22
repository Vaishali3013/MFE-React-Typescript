import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import {
    Card,
    Cascader,
    Col,
    Row,
    Button,
    Dropdown,
    Menu,
    message,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import BlaTable from './blaTable';
import CustomPagination from 'components/common/CustomPagination';
import EmptyDataComponent from 'components/common/EmptyDataComponent';
import EditBla from './EditBla';
import {
    getAllBlasList,
    getBlasList,
    removeLastSelectedBlaFromRedux,
    removeSelectedDeviceFromRedux,
    setAddBlaState,
} from 'redux/actions/DeviceManagementActions/blasAction';
import { useParams } from 'react-router-dom';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import {
    exportBla,
    getTemplate,
} from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { File_TO_DOWNLOAD, resourceName } from 'types/enums';
import SuccessfulModal from 'components/common/Modals/SuccessfulModal';
import CommunicationInterface from '../Devices/AddDevice/CommunicationInterface';
import PermissionComponent from 'components/common/PermissionComponent';
import { useTranslation } from 'react-i18next';

const Blas: React.FC<any> = ({ screen, isAddDeviceClicked }) => {
    const dispatch = useDispatch();
    const [selectedValues, setSelectedValues] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(50);
    const [payload, setPayload] = useState({
        page,
        pageSize,
    });
    const { SHOW_CHILD } = Cascader;
    const [openEditBla, setOpenEditBla] = useState(false);
    const [typeOfDownload, setTypeOfDownload] = useState<string>('');
    const [record, setRecord] = useState<any>('');
    const [successModalState, setSuccessModalState] = useState<String | any>(
        null
    );
    const [showAddNewDeviceWizard, setShowAddNewDeviceWizard] = useState(false);

    useEffect(() => {
        if (typeOfDownload)
            dispatch(
                getTemplate({
                    screenType: 'deviceManagement',
                    typeOfDownload,
                })
            );
        setTypeOfDownload('');
    }, [typeOfDownload]);
    // NOTE- can be used later for bulk upload, hence not removing this.

    // const details = parseJwt();
    // const handleChange = (event: any, fileType: string): void => {
    //     const formData = new FormData();
    //     formData.append('file', event.target.files[0]);
    //     dispatch(
    //         uploadBla({ formData, fileType, createdBy: details.username })
    //     );
    //     resetFileInput(`file-upload-bla-${fileType}`);
    // };
    // const resetFileInput = (id: string): any => {
    //     const fileInput = document.getElementById(
    //         id
    //     ) as HTMLInputElement | null;
    //     if (fileInput) {
    //         fileInput.value = '';
    //     }
    // };

    // NOTE- can be used later, hence not removing this.
    // const items = [
    //     {
    //         label: (
    //             <>
    //                 <input
    //                     style={{ display: 'none' }}
    //                     type="file"
    //                     onChange={(e: any) => {
    //                         handleChange(e, 'csv');
    //                     }}
    //                     id="file-upload-bla-csv"
    //                 />
    //                 <label
    //                     onClick={() => {
    //                         document
    //                             .getElementById('file-upload-bla-csv')
    //                             ?.click();
    //                     }}
    //                 >
    //                     Upload as CSV
    //                 </label>
    //             </>
    //         ),
    //         key: 'uploadCSV',
    //         icon: <CSVIcon />,
    //     },
    //     {
    //         label: (
    //             <>
    //                 <input
    //                     style={{ display: 'none' }}
    //                     type="file"
    //                     onChange={(e: any) => {
    //                         handleChange(e, 'excel');
    //                     }}
    //                     id="file-upload-bla-excel"
    //                 />
    //                 <label
    //                     onClick={() => {
    //                         document
    //                             .getElementById('file-upload-bla-excel')
    //                             ?.click();
    //                     }}
    //                 >
    //                     Upload as Excel
    //                 </label>
    //             </>
    //         ),
    //         key: 'uploadExcel',
    //         icon: <ExcelIcon />,
    //     },
    //     {
    //         label: 'Download Template',
    //         key: 'downloadTemplate',
    //         icon: <CSVIcon />,
    //         children: [
    //             {
    //                 key: 'csv',
    //                 label: (
    //                     <div
    //                         onClick={() => {
    //                             setTypeOfDownload('downloadTemplateCSV');
    //                         }}
    //                     >
    //                         As CSV
    //                     </div>
    //                 ),
    //             },
    //             {
    //                 key: 'excel',
    //                 label: (
    //                     <div
    //                         onClick={() => {
    //                             setTypeOfDownload('downloadTemplateExcel');
    //                         }}
    //                     >
    //                         As Excel
    //                     </div>
    //                 ),
    //             },
    //         ],
    //     },
    // ];
    const { t } = useTranslation('translation');
    const exportItems = [
        {
            label: (
                <label
                    onClick={() => {
                        dispatch(
                            exportBla({
                                templateType: File_TO_DOWNLOAD.CSV,
                            })
                        );
                    }}
                >
                    {t('commonStr.exportCSV')}
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
                            exportBla({
                                templateType: File_TO_DOWNLOAD.EXCEL,
                            })
                        );
                    }}
                >
                    {t('commonStr.exportExcel')}
                </label>
            ),
            key: 'exportExcel',
            icon: <ExcelIcon />,
        },
    ];

    const blaTableDataList = useSelector(
        (state: any) => state.deviceManagement.blas.blasList
    );

    const allBlasData = useSelector(
        (state: any) => state.deviceManagement.blas.allBlasList
    );

    const blasListLoading = useSelector(
        (state: any) => state.deviceManagement?.blas?.blasListLoading
    );
    const isEdited = useSelector(
        (state: any) => state.deviceManagement?.blas?.isEdited
    );

    useEffect(() => {
        setPayload({ ...payload, page, pageSize });
    }, [page, pageSize]);

    useEffect(() => {
        if (screen === 'devices') {
            dispatch(getAllBlasList());
        } else {
            (isEdited || (!successModalState && !openEditBla)) &&
                dispatch(getBlasList({ ...payload, search: selectedValues }));
        }
    }, [successModalState, payload, selectedValues, openEditBla, isEdited]);

    const { currentTab } = useParams();
    useEffect(() => {
        dispatch(getAllBlasList());
        setSelectedValues([]);
        setOpenEditBla(false);
        dispatch(removeSelectedDeviceFromRedux());
        setShowAddNewDeviceWizard(false);
    }, [currentTab]);

    const selectValues = (value: any, selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };

    const tableDataMapper = (): [] => {
        const temp: any = [];
        allBlasData?.map((item: any, index: number) => {
            temp?.push({
                ...item,
                value: item?.blaId,
                label: `${item?.name}`,
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

    useEffect(() => {
        tableDataMapper();
    }, [allBlasData]);

    useEffect(() => {
        dispatch(removeLastSelectedBlaFromRedux());
    }, []);

    const blaDetails = useSelector(
        (state: any) => state.deviceManagement.blas.blaDetails
    );
    const uploadLoader = useSelector(
        (state: any) => state.root.bulkUploadLoader
    );

    useEffect(() => {
        if (uploadLoader)
            message.open({
                type: 'loading',
                content: 'Uploading in progress ... ',
            });
    }, [uploadLoader]);

    return (
        <>
            {showAddNewDeviceWizard ? (
                <CommunicationInterface
                    blaDetails={blaDetails}
                    setShowAddNewDeviceWizard={setShowAddNewDeviceWizard}
                />
            ) : (
                <>
                    <div className="blaWrapper">
                        <Card bordered={false}>
                            <PermissionComponent screenName={resourceName.blas}>
                                {blaTableDataList?.paginatedResponse
                                    ?.totalRecords > 0 ||
                                allBlasData.length > 0 ? (
                                    <>
                                        <Row>
                                            <Col
                                                span={24}
                                                className="blaWrapper__header"
                                            >
                                                <Cascader
                                                    key={currentTab}
                                                    multiple
                                                    maxTagCount="responsive"
                                                    options={tableDataMapper()}
                                                    onChange={selectValues}
                                                    className="blaWrapper__search"
                                                    placeholder={t(
                                                        'deviceMang.bla.searchBlaDevice'
                                                    )}
                                                    showSearch={{ filter }}
                                                    showCheckedStrategy={
                                                        SHOW_CHILD
                                                    }
                                                />
                                                <Dropdown
                                                    overlayClassName="export"
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
                                                        {t('commonStr.export')}
                                                        <DownOutlined />
                                                    </Button>
                                                </Dropdown>
                                                {/* NOTE- can be used later, hence not removing this. */}
                                                {/* <Dropdown
                                                menu={{ items }}
                                                overlayClassName="bluk__upload"
                                                disabled={true}
                                            >
                                                <Button>
                                                    Bulk Upload
                                                    <DownOutlined />
                                                </Button>
                                            </Dropdown> */}
                                                <CustomButton
                                                    type={'Add BLA'}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        dispatch(
                                                            setAddBlaState(
                                                                'add'
                                                            )
                                                        );
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="blaWrapper__blaList">
                                            <Col span={24}>
                                                <BlaTable
                                                    setBlaState={setOpenEditBla}
                                                    blaTableDataList={
                                                        isAddDeviceClicked
                                                            ? tableDataMapper()
                                                            : blaTableDataList
                                                                  ?.paginatedResponse
                                                                  ?.records
                                                    }
                                                    search={selectedValues}
                                                    pageType={payload}
                                                    setRecord={setRecord}
                                                    screen={screen}
                                                    setSuccessModalState={
                                                        setSuccessModalState
                                                    }
                                                    isAddDeviceClicked={
                                                        isAddDeviceClicked
                                                    }
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <>
                                        <div className="blaWrapper__blaTableEmpty">
                                            <EmptyDataComponent
                                                textValue={t(
                                                    'deviceMang.bla.noBlaAdded'
                                                )}
                                                buttonType={{
                                                    name: 'Add BLA',
                                                    disable: false,
                                                }}
                                                loading={blasListLoading}
                                                buttonClickHandler={() =>
                                                    dispatch(
                                                        setAddBlaState('add')
                                                    )
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                            </PermissionComponent>
                        </Card>
                    </div>

                    {isAddDeviceClicked
                        ? null
                        : blaTableDataList?.paginatedResponse?.totalRecords >
                              50 && (
                              <>
                                  <CustomPagination
                                      totalRecords={
                                          blaTableDataList?.totalCount
                                      }
                                      setPage={setPage}
                                      page={page}
                                      setPageSize={setPageSize}
                                      pageSize={pageSize}
                                  />
                              </>
                          )}
                    {openEditBla && (
                        <EditBla
                            open={openEditBla}
                            setBlaState={setOpenEditBla}
                            record={record}
                            setOpenEditBla={setOpenEditBla}
                            setShowAddNewDeviceWizard={
                                setShowAddNewDeviceWizard
                            }
                            setSuccessModalState={setSuccessModalState}
                        />
                    )}
                    <SuccessfulModal
                        open={successModalState}
                        onOk={() => {
                            setSuccessModalState(null);
                        }}
                        onCancel={() => {
                            setSuccessModalState(null);
                        }}
                        text={
                            successModalState === 'activate'
                                ? 'Activated Successfully'
                                : 'Deactivated Successfully'
                        }
                    />
                </>
            )}
        </>
    );
};

export default Blas;
