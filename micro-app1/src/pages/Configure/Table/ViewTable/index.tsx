import { ArrowLeftOutlined } from '@ant-design/icons';
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
import { TABLETYPE } from 'types/enums';
import {
    getTableDetails,
    setTableState,
} from 'redux/actions/ConfigureActions/tableAction';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ViewTable: React.FC<any> = () => {
    const [, setNameFieldValue] = useState('');
    const [, setDescriptionFieldValue] = useState('');
    const [searchState] = useState('');
    const [dataSource, setDataSource] = useState([
        {
            key: 0,
            columnName: 'Enter Name',
            dataType: 'Select Data Type',
            uom: 'Select UOM',
        },
    ]);
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );

    const valueTypeList = useSelector(
        (state: any) => state?.configure?.attributes?.valueTypeList
    );

    const tableDetailLoading = useSelector(
        (state: any) => state.configure?.table?.tableDetailLoading
    );

    const tableDetails = useSelector(
        (state: any) => state.configure?.table?.tableDetails
    );

    const tableData = tableDetails?.columnList?.map((item: any) => ({
        key: item.id,
        columnName: item?.name,
        dataType: item?.dataType?.id,
        uom: item?.unitOfMeasurement?.id,
    }));

    useEffect(() => {
        if (tableDetails?.id) {
            dispatch(getTableDetails(tableDetails?.id));
        }
        if (tableData && tableData.length > 0) {
            setDataSource(tableData);
        }
    }, [tableDetails?.id, searchState]);

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
            title: 'Column Name',
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
                    placeholder="Enter Name"
                    disabled
                    bordered={false}
                />
            ),
        },
        {
            title: 'Data Type',
            dataIndex: 'dataType',
            key: 'dataType',
            width: '30%',
            className: 'dataType',
            render: (text: any, record: any) => (
                <Select
                    showSearch
                    allowClear
                    value={text}
                    disabled
                    bordered={false}
                    onChange={(value) => {
                        handleDropdownChange(value, 'dataType', record.key);
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
            width: '30%',
            className: 'uom',
            render: (text: any, record: any) => (
                <TreeSelect
                    placeholder="Select UOM"
                    disabled
                    value={text}
                    onChange={(value) => {
                        handleDropdownChange(value, 'uom', record.key);
                    }}
                    filterTreeNode={filterTreeNode}
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    allowClear
                    bordered={false}
                    treeData={convertDataToTreeData(uomList?.uomMap || [])}
                ></TreeSelect>
            ),
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

    const handleEdit = (): any => {
        dispatch(setTableState(TABLETYPE.edit));
    };

    const handleNameChange = (value: string): any => {
        setNameFieldValue(value);
    };

    const handleDescriptionChange = (value: string): any => {
        setDescriptionFieldValue(value);
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
                    <div className="viewTable-template">
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
                                        {t(
                                            'tableDefinition.viewTable.viewtableTemplate'
                                        )}
                                    </span>
                                </div>

                                <div>
                                    <Button
                                        onClick={handleEdit}
                                        type="primary"
                                        style={{
                                            marginBottom: 16,
                                        }}
                                        disabled={!tableDetails?.isActive}
                                    >
                                        {t('commonStr.edit')}
                                    </Button>
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
                                                disabled
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
                                                disabled
                                            />
                                        </Form.Item>
                                    </Form>
                                    <div className="EditTableCreateTable">
                                        <div className="EditTableCreateTable__Wrapper__Table">
                                            <Table
                                                dataSource={dataSource}
                                                columns={columns}
                                                pagination={false}
                                                scroll={{
                                                    y: 'calc(100vh - 570px)',
                                                }}
                                            />
                                        </div>
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

export default ViewTable;
