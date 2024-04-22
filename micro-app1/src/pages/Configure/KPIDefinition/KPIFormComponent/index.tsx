import { useEffect } from 'react';
import { Col, Form, Input, Row, Select, TreeSelect } from 'antd';
import './index.scss';
import TextArea from 'antd/es/input/TextArea';
import {
    getUomList,
    getValueTypeList,
} from 'redux/actions/ConfigureActions/attributeActions';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as AddIcon } from 'assets/icons/Plus.svg';
import { KPITYPE, dataTypeWithId } from 'types/enums';
import {
    getAggregationTypeList,
    getKpiTypeList,
    getNodeLevelList,
    getTargetTypeList,
    kpiFieldsValues,
} from 'redux/actions/ConfigureActions/kpiActions';

function KPIFormComponent({ form, setIsUomOpen }: any): any {
    const dispatch = useDispatch();
    const kpiState = useSelector(
        (state: any) => state?.configure?.kpi?.kpiState
    );

    const nodeLevelList = useSelector(
        (state: any) => state?.configure?.kpi?.nodeLevelList
    );

    const valueTypeList = useSelector(
        (state: any) => state?.configure?.attributes?.valueTypeList
    );

    const kpiTypeList = useSelector(
        (state: any) => state?.configure?.kpi?.kpiTypeList
    );

    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );

    const aggregationTypeList = useSelector(
        (state: any) => state?.configure?.kpi?.aggregationTypeList
    );

    const targetTypeList = useSelector(
        (state: any) => state?.configure?.kpi?.targetTypeList
    );

    const attributeDetails = useSelector(
        (state: any) => state?.configure?.attributes?.attributeDetails
    );

    const valueType = Form.useWatch('valueType', form);
    const uom = Form.useWatch('uom', form);
    const isViewPage = kpiState === KPITYPE.view || false;

    useEffect(() => {
        dispatch(getNodeLevelList());
        dispatch(getTargetTypeList());
        dispatch(getValueTypeList());
        dispatch(getKpiTypeList());
        dispatch(getAggregationTypeList());
        dispatch(getUomList());
    }, []);
    const getAllFieldsValues = form.getFieldsValue();

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
                kpiFieldsValues({
                    name: getAllFieldsValues?.name,
                    type: getAllFieldsValues?.type,
                    nodeLevel: getAllFieldsValues?.nodeLevel,
                    uom: getAllFieldsValues?.uom,
                    valueType: getAllFieldsValues?.valueType,
                    aggregationType: getAllFieldsValues?.aggregationType,
                    displayDigit: getAllFieldsValues?.displayDigit || 2,
                    targetType: getAllFieldsValues?.targetType,
                    description: getAllFieldsValues?.description,
                })
            );
            setIsUomOpen(true);
        }
    };

    return (
        <div className="kpiFormWrapper">
            <div className="kpiFormWrapper__form">
                <div className="kpiFormWrapper__content__wrapper">
                    <div className="kpiFormWrapper__wrapper">
                        {kpiState === KPITYPE?.edit && (
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        className="DescriptionBox"
                                        label=""
                                        name="formula"
                                        rules={[
                                            {
                                                max: 200,
                                                message:
                                                    'Maximum length is 200 characters',
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            disabled={kpiState === KPITYPE.edit}
                                            rows={6}
                                            maxLength={200}
                                            placeholder="Enter Formula"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        )}
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    className="NameInputBox"
                                    label={<div>KPIs Name</div>}
                                    name="name"
                                    initialValue={attributeDetails?.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter KPIs name',
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
                                            kpiState === KPITYPE.view
                                                ? attributeDetails?.name
                                                : ''
                                        }
                                        disabled={kpiState === KPITYPE.view}
                                        maxLength={100}
                                        placeholder="Enter KPIs Name"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    className="dropdown"
                                    label={<div>Type</div>}
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select Type',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        className="dropdown"
                                        disabled={kpiState === KPITYPE.view}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={kpiTypeList?.map(
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
                                    label={<div>Node Level</div>}
                                    name="nodeLevel"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select node level',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        disabled={kpiState === KPITYPE.view}
                                        allowClear
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={nodeLevelList?.map(
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
                                    className="formItem__uomLabel"
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
                                                    {kpiState !==
                                                    KPITYPE.view ? (
                                                        <>
                                                            <Col span={6}>
                                                                <AddIcon />
                                                            </Col>
                                                            <Col span={12}>
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
                                            disabled={kpiState === KPITYPE.view}
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
                                            disabled={kpiState === KPITYPE.view}
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
                                    label={<div>Value Type</div>}
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
                                        disabled={kpiState === KPITYPE.view}
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
                                    label={<div>Aggregation Type</div>}
                                    name="aggregationType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select aggregation type',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={kpiState === KPITYPE.view}
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={aggregationTypeList?.map(
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
                                        className="NameInputBox"
                                        label={<div>Display Digit</div>}
                                        name="displayDigit"
                                    >
                                        <Input
                                            disabled={kpiState === KPITYPE.view}
                                            maxLength={1}
                                        />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col span={12}>
                                <Form.Item
                                    label={<div>Target Type</div>}
                                    name="targetType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'select target type',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        allowClear
                                        disabled={kpiState === KPITYPE.view}
                                        placeholder="Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label as string)
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={targetTypeList?.map(
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
                            <Col span={24}>
                                <Form.Item
                                    className="DescriptionBox"
                                    label={<div>Description</div>}
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
                                        disabled={kpiState === KPITYPE.view}
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

export default KPIFormComponent;
