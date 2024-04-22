import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import './index.scss';
import {
    Button,
    Card,
    Form,
    Input,
    Popconfirm,
    Select,
    Table,
    TreeSelect,
} from 'antd';
import { useEffect, useState } from 'react';
import { BUTTONTYPE, TABLETYPE, EMPTY } from 'types/enums';
import {
    createTable,
    setTableState,
} from 'redux/actions/ConfigureActions/tableAction';
import { useDispatch, useSelector } from 'react-redux';
import { parseJwt } from 'utils/jwtTokenFunction';
import CustomButton from 'components/common/CustomButton';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/DeleteIconTable.svg';
import { ReactComponent as Checkbox } from 'assets/icons/verticalListIcon.svg';
import { useTranslation } from 'react-i18next';
import {
    getUomList,
    getValueTypeList,
} from 'redux/actions/ConfigureActions/attributeActions';

const CreateTable: React.FC<any> = () => {
    const [nameFieldValue, setNameFieldValue] = useState(EMPTY.string);
    const [descriptionFieldValue, setDescriptionFieldValue] = useState(
        EMPTY.string
    );
    const [dataSource, setDataSource] = useState([
        {
            key: 0,
            columnName: '',
            dataType: '',
            uom: '',
        },
    ]);
    const dispatch = useDispatch();
    const [count, setCount] = useState(1);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const { t } = useTranslation('translation');
    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );
    const createTableResponse = useSelector(
        (state: any) => state?.configure?.table?.createTable
    );
    const valueTypeList = useSelector(
        (state: any) => state?.configure?.attributes?.valueTypeList
    );

    const details = parseJwt();

    useEffect(() => {
        dispatch(getUomList());
        dispatch(getValueTypeList());
    }, []);

    useEffect(() => {
        if (createTableResponse) {
            dispatch(setTableState(TABLETYPE.display));
        }
    }, [createTableResponse]);

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
            title: 'Column Name' + ' *',
            dataIndex: 'columnName',
            key: 'columnName',
            width: '40%',
            className: 'columnName',
            render: (text: any, record: any) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        handleInputChange(e, 'columnName', record.key);
                    }}
                    placeholder={t(
                        'tableDefinition.CreateTable.columnPlaceHolder'
                    )}
                    bordered={false}
                />
            ),
        },
        {
            title: 'Data Type',
            dataIndex: 'dataTypeId',
            key: 'dataType',
            width: '20%',
            className: 'dataType',
            render: (text: any, record: any) => (
                <Select
                    style={{ width: '100%' }}
                    showSearch
                    allowClear
                    value={text}
                    bordered={false}
                    onChange={(value) => {
                        handleDropdownChange(value, 'dataType', record.key);
                    }}
                    placeholder={t(
                        'tableDefinition.CreateTable.dataTypePlaceHolder'
                    )}
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
            dataIndex: 'uomId',
            key: 'uom',
            width: '20%',
            className: 'uom',
            render: (text: any, record: any) => (
                <TreeSelect
                    style={{ width: '100%' }}
                    placeholder={t(
                        'tableDefinition.CreateTable.uomPlaceHolder'
                    )}
                    value={text}
                    bordered={false}
                    onChange={(value) => {
                        handleDropdownChange(value, 'uom', record.key);
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
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <a className="deleteicon">
                            <DeleteIcon />
                        </a>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleInputChange = (e: any, field: any, key: any): any => {
        const newData = dataSource.map((item) => {
            if (item.key === key) {
                return { ...item, [field]: e.target.value };
            }
            return item;
        });

        setDataSource(newData);
    };

    const handleDropdownChange = (value: any, field: any, key: any): any => {
        const newData = dataSource.map((item) => {
            if (item.key === key) {
                return { ...item, [field]: value };
            }
            return item;
        });

        setDataSource(newData);
    };

    const handleAdd = (): any => {
        const newData = {
            key: count,
            columnName: '',
            dataType: '',
            uom: '',
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleDelete = (key: any): any => {
        const newData = dataSource.filter((item: any) => item.key !== key);
        setDataSource(newData);
    };

    const checkAllRequiredFields = (dataSource: any): boolean => {
        for (const obj of dataSource) {
            for (const key in obj) {
                if (
                    obj[key] === undefined ||
                    obj[key] === '' ||
                    obj?.columnName?.trim() === ''
                ) {
                    return true;
                }
            }
        }
        if (!dataSource?.length) {
            return true;
        }
        if (!nameFieldValue) {
            return true;
        }
        return false;
    };

    const handleConfirmationModalYes = (): any => {
        const mappedDataSource = dataSource.map((item) => {
            return {
                ...item,
                uomId: item.uom,
                dataTypeId: item.dataType,
                name: item.columnName,
            };
        });
        const payload = {
            name: nameFieldValue,
            desc: descriptionFieldValue,
            columnList: mappedDataSource,
            requestedBy: details.username,
        };
        dispatch(createTable(payload));
        setIsSaveModalOpen(false);
    };

    const handleNameChange = (value: any): any => {
        setNameFieldValue(value);
    };

    const handleDescriptionChange = (value: any): any => {
        setDescriptionFieldValue(value);
    };

    return (
        <div className="create-table-template">
            <Card>
                <div className="wrapper">
                    <div className="header">
                        <ArrowLeftOutlined
                            onClick={() =>
                                dispatch(setTableState(TABLETYPE.display))
                            }
                            style={{
                                color: 'rgba(0, 0, 0, 0.45)',
                            }}
                        />
                        <div>
                            {t(
                                'tableDefinition.CreateTable.createTableTemplate'
                            )}
                        </div>
                    </div>
                </div>
                <div className="form">
                    <div className="name-description">
                        <Form layout="vertical">
                            <Form.Item
                                label={t('tableDefinition.name')}
                                name="name"
                                className="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input name!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder={t(
                                        'tableDefinition.namePlaceHolder'
                                    )}
                                    onChange={(e) =>
                                        handleNameChange(e.target.value)
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label={t('tableDefinition.description')}
                                name="description"
                                className="description"
                            >
                                <Input
                                    placeholder={t(
                                        'tableDefinition.descriptionPlaceHolder'
                                    )}
                                    onChange={(e) =>
                                        handleDescriptionChange(e.target.value)
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
                                    icon={<PlusOutlined className="addIcon" />}
                                >
                                    {t('tableDefinition.add')}
                                </Button>
                            </div>

                            <div className="EditTableCreateTable__Wrapper__Table">
                                <Table
                                    dataSource={dataSource}
                                    columns={columns}
                                    pagination={false}
                                    scroll={{ y: 'calc(100vh - 64vh)' }}
                                />
                            </div>
                            <div className="EditTableCreateTable__Wrapper__Footer">
                                <div className="EditTableCreateTable__Wrapper__FooterWrapper">
                                    <CustomButton
                                        type={BUTTONTYPE.cancel}
                                        disabled={false}
                                        handleClick={() => {
                                            dispatch(
                                                setTableState(TABLETYPE.display)
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
                                            setIsSaveModalOpen(true);
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
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CreateTable;
