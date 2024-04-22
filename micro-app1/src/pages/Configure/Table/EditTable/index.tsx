import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import './index.scss';
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    Spin,
    Table,
    TreeSelect,
} from 'antd';
import { useEffect, useState } from 'react';
import { BUTTONTYPE, TABLETYPE } from 'types/enums';
import {
    deleteTableRowAction,
    getTableDetails,
    setTableState,
    updateTable,
} from 'redux/actions/ConfigureActions/tableAction';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from 'components/common/CustomButton';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { ReactComponent as DeleteRedIcon } from 'assets/icons/deleteIcon.svg';
import { ReactComponent as Checkbox } from 'assets/icons/verticalListIcon.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/DeleteIconTable.svg';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const EditTable: React.FC<any> = () => {
    const tableDetails = useSelector(
        (state: any) => state.configure?.table?.tableDetails
    );

    const [nameFieldValue, setNameFieldValue] = useState('');
    const [searchState] = useState('');
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [descriptionFieldValue, setDescriptionFieldValue] = useState('');
    const [isEditChanges, setIsEditChanges] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const { t } = useTranslation('translation');
    const [dataSource, setDataSource] = useState<any>([]);
    const dispatch = useDispatch();
    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );
    const updateTableResponse = useSelector(
        (state: any) => state?.configure?.table?.updateTable
    );
    const deleteTableRowResponse = useSelector(
        (state: any) => state?.configure?.table?.deleteTableRow
    );

    const details = parseJwt();

    const handleConfirmationModalYes = async (): Promise<void> => {
        const mappedDataSource = dataSource?.map((item: any) => {
            return {
                uomId: item?.uom,
                dataTypeId: item?.dataType,
                name: item?.columnName,
                id: item?.id,
            };
        });
        const payload = {
            id: tableDetails?.id,
            name: nameFieldValue,
            desc: descriptionFieldValue || null,
            columnList: mappedDataSource,
            requestedBy: details?.username,
        };

        dispatch(updateTable(payload));
    };

    const valueTypeList = useSelector(
        (state: any) => state?.configure?.attributes?.valueTypeList
    );
    const tableDetailLoading = useSelector(
        (state: any) => state.configure?.table?.tableDetailLoading
    );

    const tableData = (): [] => {
        const temp: any = [];
        tableDetails?.columnList?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: index + 1,
                id: item?.id || null,
                columnName: item?.name,
                dataType: item?.dataType?.id,
                uom: item?.unitOfMeasurement?.id,
            });
        });
        return temp;
    };

    useEffect(() => {
        setNameFieldValue(tableDetails?.name);
        setDescriptionFieldValue(tableDetails?.description);
        setDataSource(tableData());
    }, [tableDetails]);

    useEffect(() => {
        if (tableDetails?.id) {
            dispatch(getTableDetails(tableDetails?.id));
        }
        if (tableData && tableData.length > 0) {
            setDataSource(tableData);
        }
    }, [tableDetails?.id, searchState]);

    useEffect(() => {
        if (updateTableResponse) {
            dispatch(setTableState(TABLETYPE.display));
        }
    }, [updateTableResponse]);

    useEffect(() => {
        if (deleteTableRowResponse) {
            dispatch(getTableDetails(tableDetails?.id));
        }
    }, [deleteTableRowResponse]);

    const convertDataToTreeData = (data: any): any => {
        return (
            data &&
            Object.keys(data).map((category) => ({
                title: category,
                value: category,
                selectable: false,
                children: data[category].map((item: any) => ({
                    key: item.id,
                    title: item.name,
                    value: item.id,
                    id: item.id,
                    abbreviation: item.abbreviation,
                })),
            }))
        );
    };

    const filterTreeNode = (input: any, treeNode: any): any => {
        const title = treeNode.title.toLowerCase();
        return title.includes(input.toLowerCase());
    };

    const columns = [
        {
            title: '',
            dataIndex: 'icon',
            key: 'icon',
            width: '5%',
            render: (text: any, record: any) => (
                <Checkbox style={{ marginRight: 8 }} />
            ),
        },
        {
            title: 'Column Name',
            dataIndex: 'columnName',
            key: 'columnName',
            width: '40%',
            className: 'columnName',
            render: (text: any, record: any, index: any) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        handleInputChange(e, 'columnName', record.key, index);
                    }}
                    placeholder="Enter Name"
                    bordered={false}
                />
            ),
        },
        {
            title: 'Data Type',
            dataIndex: 'dataType',
            key: 'dataType',
            width: '20%',
            className: 'dataType',
            render: (text: any, record: any, index: any) => (
                <Select
                    showSearch
                    allowClear
                    value={text || null}
                    bordered={false}
                    onChange={(value) => {
                        handleDropdownChange(
                            value,
                            'dataType',
                            record.key,
                            index
                        );
                    }}
                    placeholder="Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label as string)
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    options={valueTypeList?.map(
                        (item: { id: string; name: string }) => ({
                            value: item?.id,
                            label: item?.name,
                            key: item?.id,
                        })
                    )}
                />
            ),
        },
        {
            title: 'UOM',
            dataIndex: 'uom',
            key: 'uom',
            width: '20%',
            className: 'uom',
            render: (text: any, record: any, index: any) => (
                <TreeSelect
                    placeholder="Select UOM"
                    value={text || null}
                    bordered={false}
                    onChange={(value) => {
                        handleDropdownChange(value, 'uom', record.key, index);
                    }}
                    filterTreeNode={filterTreeNode}
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    allowClear
                    treeData={convertDataToTreeData(uomList?.uomMap || [])}
                ></TreeSelect>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            className: 'column__action',
            render: (_: any, record: any) =>
                dataSource.length >= 1 ? (
                    <a className="deleteicon">
                        <DeleteIcon
                            onClick={() => {
                                handleDelete(record);
                            }}
                        />
                    </a>
                ) : null,
        },
    ];

    const showDeleteModal = (record: any): void => {
        setSelectedRecord(record);
        setIsDeleteModalVisible(true);
    };

    // Function to handle closing the delete confirmation modal
    const handleCancelDelete = (): void => {
        setIsDeleteModalVisible(false);
    };

    // Modified handleDelete function to open the delete confirmation modal
    const handleDelete = (record: any): void => {
        showDeleteModal(record);
    };

    const handleConfirmDelete = (): void => {
        // Check if the row is from the API or added locally
        if (selectedRecord?.id) {
            // If the row is from the API, dispatch an action to delete it from the server
            dispatch(
                deleteTableRowAction({
                    tableId: tableDetails?.id,
                    columnIdList: [selectedRecord?.id],
                    requestedBy: details?.username,
                })
            );
            setIsDeleteModalVisible(false);
        } else {
            // If the row is added locally, delete it from the local state
            handleLocalDelete(selectedRecord?.key);
            setIsDeleteModalVisible(false);
        }
    };

    const handleLocalDelete = (key: any): any => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const handleInputChange = (
        e: any,
        field: any,
        key: any,
        indexValue: any
    ): any => {
        const newData = dataSource.map((item: any, index: any): any => {
            if (indexValue === index) {
                return { ...item, [field]: e.target.value };
            }
            return item;
        });

        setDataSource(newData);
        setIsEditChanges(true);
    };

    const checkAllRequiredFields = (dataSource: any): boolean => {
        const data = dataSource.map((item: any): any => {
            const { updatedBy, ...rest } = item; // Destructure the object, leaving out 'updatedBy'
            return rest; // Return the object without 'updatedBy'
        });
        for (const obj of data) {
            for (const key in obj) {
                if (
                    obj[key] === undefined ||
                    obj[key] === '' ||
                    obj?.columnName.trim() === ''
                ) {
                    return true;
                }
            }
        }
        if (!nameFieldValue) {
            return true;
        }
        if (!isEditChanges) {
            return true;
        }
        return false;
    };

    const handleAdd = (): any => {
        const totalRecordsInATable = dataSource?.length;
        const newData = {
            key: totalRecordsInATable + 1,
            columnName: '',
            dataType: '',
            uom: '',
        };

        setDataSource([...dataSource, { ...newData }]);
    };

    const handleDropdownChange = (
        value: any,
        field: any,
        key: any,
        indexValue: any
    ): any => {
        const newData = dataSource?.map((item: any, index: any) => {
            if (indexValue === index) {
                return { ...item, [field]: value };
            }
            return item;
        });

        setDataSource(newData);
        setIsEditChanges(true);
    };

    const handleNameChange = (value: string): any => {
        setNameFieldValue(value);
        setIsEditChanges(true);
    };

    const handleDescriptionChange = (value: string): any => {
        setDescriptionFieldValue(value);
        setIsEditChanges(true);
    };

    const [form] = Form.useForm();

    // Use initialValues to set initial values for the form
    const initialValues = {
        name: tableDetails?.name || '',
        description: tableDetails?.description || '',
    };

    return (
        <>
            {tableDetailLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                tableDetails?.name && (
                    <div className="editTable-template">
                        <Card>
                            <div className="wrapper">
                                <div>
                                    <ArrowLeftOutlined
                                        onClick={() =>
                                            dispatch(
                                                setTableState(TABLETYPE.display)
                                            )
                                        }
                                        style={{
                                            color: 'rgba(0, 0, 0, 0.45)',
                                        }}
                                    />
                                    <span>
                                        {' '}
                                        {t(
                                            'tableDefinition.editTable.editTableTemplate'
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="form">
                                <div className="name-description">
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        initialValues={initialValues}
                                    >
                                        <Form.Item
                                            label={t('tableDefinition.name')}
                                            name="name"
                                            className="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input name!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                onChange={(e) =>
                                                    handleNameChange(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={t(
                                                'tableDefinition.description'
                                            )}
                                            name="description"
                                            className="description"
                                        >
                                            <Input
                                                onChange={(e) =>
                                                    handleDescriptionChange(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                    </Form>
                                    <div className="EditTableCreateTable">
                                        <div className="EditTableCreateTable__Wrapper__button">
                                            <Button
                                                onClick={handleAdd}
                                                className="custom-add-button"
                                                type="default"
                                                style={{
                                                    marginBottom: 16,
                                                }}
                                                icon={
                                                    <PlusOutlined className="addIcon" />
                                                }
                                            >
                                                {t('tableDefinition.add')}
                                            </Button>
                                        </div>
                                        <div className="EditTableCreateTable__Wrapper__Table">
                                            <Table
                                                dataSource={dataSource}
                                                columns={columns}
                                                pagination={false}
                                                scroll={{
                                                    y: 'calc(100vh - 580px)',
                                                }}
                                            />
                                        </div>
                                        <div className="EditTableCreateTable__Wrapper__Footer">
                                            <div className="EditTableCreateTable__Wrapper__FooterWrapper">
                                                <CustomButton
                                                    type={BUTTONTYPE.cancel}
                                                    disabled={false}
                                                    handleClick={() => {
                                                        dispatch(
                                                            setTableState(
                                                                TABLETYPE.display
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="EditTableCreateTable__Wrapper__FooterWrapper">
                                                <CustomButton
                                                    type={BUTTONTYPE.save}
                                                    disabled={checkAllRequiredFields(
                                                        dataSource
                                                    )}
                                                    typeOfButton={'submit'}
                                                    handleClick={() => {
                                                        setIsSaveModalOpen(
                                                            true
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {isSaveModalOpen && (
                                            <ConfirmationModal
                                                customClassName="confirmationModal attributeImplementationModal"
                                                icon={<QuestionMarkIcon />}
                                                open={isSaveModalOpen}
                                                onOk={() => {
                                                    handleConfirmationModalYes();
                                                }}
                                                onCancel={() => {
                                                    setIsSaveModalOpen(false);
                                                }}
                                                text={t(
                                                    'tableDefinition.confirmationMessage'
                                                )}
                                            />
                                        )}
                                        {isDeleteModalVisible && (
                                            <ConfirmationModal
                                                customClassName="confirmationModal attributeImplementationModal"
                                                icon={<DeleteRedIcon />}
                                                open={isDeleteModalVisible}
                                                onOk={handleConfirmDelete}
                                                onCancel={handleCancelDelete}
                                                text={t(
                                                    'tableDefinition.deleteMessage'
                                                )}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            )}
        </>
    );
};

export default EditTable;
