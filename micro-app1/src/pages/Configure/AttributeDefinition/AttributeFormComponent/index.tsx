import { useEffect, useState } from 'react';
import {
    Cascader,
    Col,
    Form,
    Input,
    Popover,
    Row,
    Select,
    TreeSelect,
} from 'antd';
import './index.scss';
import TextArea from 'antd/es/input/TextArea';
import {
    attributeFieldsValues,
    getCategoryList,
    getDataReferenceList,
    getIndustryList,
    getPropertyList,
    getUomList,
    getValueTypeList,
} from 'redux/actions/ConfigureActions/attributeActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as AddIcon } from 'assets/icons/Plus.svg';
import { ATTRIBUTETYPE, dataTypeWithId } from 'types/enums';
import CategoryCreationContent from './CreateCategory';
import CategoryIndustryContent from './CreateIndustry';
import { useParams } from 'react-router-dom';

function AttributeFormComponent({ form, setIsUomOpen }: any): any {
    const dispatch = useDispatch();
    const attributeState = useSelector(
        (state: any) => state?.configure?.attributes?.attributeState
    );

    const industryList = useSelector(
        (state: any) => state?.configure?.attributes?.industryList
    );

    const categoryList = useSelector(
        (state: any) => state?.configure?.attributes?.categoryList
    );

    const valueTypeList = useSelector(
        (state: any) => state?.configure?.attributes?.valueTypeList
    );

    const propertyList = useSelector(
        (state: any) => state?.configure?.attributes?.propertyList
    );

    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );

    const dataReferenceList = useSelector(
        (state: any) => state?.configure?.attributes?.dataReferenceList
    );

    const attributeDetails = useSelector(
        (state: any) => state?.configure?.attributes?.attributeDetails
    );

    const [, setSelectedValues] = useState<any>([]);
    const [categoryCreate, setCategoryCreate] = useState(false);
    const [industryCreate, setIndustryCreate] = useState(false);
    // const industry = Form.useWatch('industry', form);
    const valueType = Form.useWatch('valueType', form);
    const uom = Form.useWatch('uom', form);
    const isViewPage = attributeState === ATTRIBUTETYPE.view || false;
    const { SHOW_CHILD } = Cascader;
    useEffect(() => {
        dispatch(getIndustryList());
        dispatch(getCategoryList());
        dispatch(getValueTypeList());
        dispatch(getPropertyList());
        dispatch(getDataReferenceList());
        dispatch(getUomList());
    }, []);
    const getAllFieldsValues = form.getFieldsValue();
    const selectValues = (value: any, selectedOptions: any): any => {
        setSelectedValues(value.flat());
    };
    const cascaderOptions = industryList?.map((item: any) => ({
        value: item.id,
        label: item.name.toString(),
    }));

    const filter = (inputValue: any, path: any): any =>
        path?.some((option: any): any =>
            (option?.label as string)
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase())
        );

    const { currentTab } = useParams();
    useEffect(() => {
        setSelectedValues([]);
    }, [currentTab]);

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

    // searching the child node of TreeSelect
    const filterTreeNode = (input: any, treeNode: any): any => {
        const title = treeNode.title.toLowerCase();
        return title.includes(input.toLowerCase());
    };

    const addUomHandler = (): any => {
        if (!isViewPage) {
            dispatch(
                attributeFieldsValues({
                    name: getAllFieldsValues?.name,
                    properties: getAllFieldsValues?.properties,
                    category: getAllFieldsValues?.category,
                    uom: getAllFieldsValues?.uom,
                    valueType: getAllFieldsValues?.valueType,
                    dataReference: getAllFieldsValues?.dataReference,
                    displayDigit: getAllFieldsValues?.displayDigit,
                    industry: getAllFieldsValues?.industry,
                    description: getAllFieldsValues?.description,
                })
            );
            setIsUomOpen(true);
        }
    };

    return (
        <div className="attributeFormWrapper">
            <div className="attributeFormWrapper__form">
                <div className="attributeFormWrapper__content__wrapper">
                    <div className="attributeFormWrapper__wrapper">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    initialValue={attributeDetails?.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter name',
                                        },
                                        {
                                            max: 100,
                                            message:
                                                'Maximum length is 100 characters',
                                        },
                                    ]}
                                >
                                    <Input
                                        defaultValue={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                                ? attributeDetails?.name
                                                : ''
                                        }
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        maxLength={100}
                                        placeholder="Enter Attribute Name"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    className="dropdown"
                                    label="Properties"
                                    name="properties"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select Properties',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        className="dropdown"
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={propertyList?.map(
                                            (item: {
                                                id: string;
                                                name: string;
                                            }) => ({
                                                value: item?.id,
                                                label: item?.name,
                                                key: item?.id,
                                            })
                                        )}
                                        placeholder="Select"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label={
                                        <Row className="labelRowForAdd">
                                            <Col span={20}>Category</Col>
                                            <Col span={4}>
                                                <Popover
                                                    className="createCategoryPopOver"
                                                    content={
                                                        <CategoryCreationContent
                                                            setCategoryCreate={
                                                                setCategoryCreate
                                                            }
                                                        />
                                                    }
                                                    trigger="click"
                                                    open={categoryCreate}
                                                    placement="bottomLeft"
                                                    overlayStyle={{
                                                        width: '411px',
                                                        margin: '5px',
                                                        padding: '0 !important',
                                                    }}
                                                />
                                                <Row
                                                    className="addItemsButton"
                                                    onClick={() => {
                                                        if (!isViewPage) {
                                                            setIndustryCreate(
                                                                false
                                                            );
                                                            setCategoryCreate(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {attributeState !==
                                                    ATTRIBUTETYPE.view ? (
                                                        <>
                                                            <Col span={8}>
                                                                <AddIcon />
                                                            </Col>
                                                            <Col span={16}>
                                                                add
                                                            </Col>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select Category',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        allowClear
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={categoryList?.map(
                                            (item: {
                                                id: string;
                                                name: string;
                                            }) => ({
                                                value: item?.id,
                                                label: item?.name,
                                                key: item?.id,
                                            })
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label={
                                        <Row className="labelRowForAdd">
                                            <Col span={20}>UOM</Col>
                                            <Col span={4}>
                                                <Row
                                                    className="addItemsButton"
                                                    onClick={() =>
                                                        addUomHandler()
                                                    }
                                                >
                                                    {attributeState !==
                                                    ATTRIBUTETYPE.view ? (
                                                        <>
                                                            <Col span={8}>
                                                                <AddIcon />
                                                            </Col>
                                                            <Col span={16}>
                                                                add
                                                            </Col>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    name="uom"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select uom',
                                        },
                                    ]}
                                >
                                    {uom ? (
                                        <TreeSelect
                                            placeholder="Select"
                                            disabled={
                                                attributeState ===
                                                ATTRIBUTETYPE.view
                                            }
                                            filterTreeNode={filterTreeNode}
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                            }}
                                            allowClear
                                            treeData={convertDataToTreeData(
                                                uomList?.uomMap || []
                                            )}
                                        ></TreeSelect>
                                    ) : (
                                        <TreeSelect
                                            showSearch
                                            placeholder="Select"
                                            filterTreeNode={filterTreeNode}
                                            disabled={
                                                attributeState ===
                                                ATTRIBUTETYPE.view
                                            }
                                            dropdownStyle={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                            }}
                                            allowClear
                                            treeData={convertDataToTreeData(
                                                uomList?.uomMap || []
                                            )}
                                        ></TreeSelect>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label="Value Type"
                                    name="valueType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select value type',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={valueTypeList?.map(
                                            (item: {
                                                id: string;
                                                name: string;
                                            }) => ({
                                                value: item?.id,
                                                label: item?.name,
                                                key: item?.id,
                                            })
                                        )}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    label="Data Reference"
                                    name="dataReference"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select Data Reference',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={dataReferenceList?.map(
                                            (item: {
                                                id: string;
                                                name: string;
                                            }) => ({
                                                value: item?.id,
                                                label: item?.name,
                                                key: item?.id,
                                            })
                                        )}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            {(valueType === dataTypeWithId?.float ||
                                valueType === dataTypeWithId?.double) && (
                                <Col span={12}>
                                    <Form.Item
                                        label="Display Digit"
                                        name="displayDigit"
                                    >
                                        <Input
                                            disabled={
                                                attributeState ===
                                                ATTRIBUTETYPE.view
                                            }
                                            maxLength={1}
                                        />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col span={12}>
                                <Form.Item
                                    label={
                                        <Row className="labelRowForAdd">
                                            <Col span={20}>Industry</Col>
                                            <Col span={4}>
                                                <Popover
                                                    className="createIndustryPopOver"
                                                    content={
                                                        <CategoryIndustryContent
                                                            setIndustryCreate={
                                                                setIndustryCreate
                                                            }
                                                        />
                                                    }
                                                    trigger="click"
                                                    open={industryCreate}
                                                    placement="bottomLeft"
                                                    overlayStyle={{
                                                        width: '411px',
                                                        margin: '5px',
                                                        padding: '0 !important',
                                                    }}
                                                />
                                                <Row
                                                    className="addItemsButton"
                                                    onClick={() => {
                                                        if (!isViewPage) {
                                                            setCategoryCreate(
                                                                false
                                                            );
                                                            setIndustryCreate(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {attributeState !==
                                                    ATTRIBUTETYPE.view ? (
                                                        <>
                                                            <Col span={8}>
                                                                <AddIcon />
                                                            </Col>
                                                            <Col span={16}>
                                                                add
                                                            </Col>
                                                        </>
                                                    ) : (
                                                        ''
                                                    )}
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    name="industry"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select Industry',
                                        },
                                    ]}
                                >
                                    <Cascader
                                        multiple
                                        options={cascaderOptions}
                                        showSearch={{ filter }}
                                        placeholder="Select"
                                        onChange={selectValues}
                                        maxTagCount="responsive"
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        showCheckedStrategy={SHOW_CHILD}
                                    />

                                    {/* Will use it 
                                    {industryList?.map((item: any) => (
                                            <Option
                                                key={item?.id}
                                                id={item?.id}
                                                value={item?.id}
                                            >
                                                <Checkbox
                                                    checked={
                                                        industry?.includes(
                                                            (item?.id)
                                                        ) || false
                                                    }
                                                >
                                                    {item?.name}
                                                </Checkbox>
                                            </Option>
                                        ))}
                                    </Select> */}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={24}>
                                <Form.Item
                                    className="DescriptionBox"
                                    label="Description"
                                    name="description"
                                    rules={[
                                        {
                                            max: 200,
                                            message:
                                                'Maximum length is 200 characters',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        disabled={
                                            attributeState ===
                                            ATTRIBUTETYPE.view
                                        }
                                        rows={4}
                                        maxLength={200}
                                        placeholder="Enter Description"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {/* </Form> */}
        </div>
    );
}

export default AttributeFormComponent;
