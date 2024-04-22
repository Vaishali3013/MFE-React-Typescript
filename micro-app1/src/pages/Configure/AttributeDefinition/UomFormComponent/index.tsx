import { useEffect, useState } from 'react';
import { Col, Form, Input, Popover, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './index.scss';
import { ReactComponent as AddIcon } from 'assets/icons/Plus.svg';
import CategoryUOMClassContent from './CreateUOMClass';
import {
    getUomClassList,
    getUomMetricList,
} from 'redux/actions/ConfigureActions/attributeActions';
import { useDispatch, useSelector } from 'react-redux';

function UomFormComponent({ form }: any): any {
    const [uomClassCreate, setUomClassCreate] = useState(false);
    const { Option } = Select;
    const dispatch = useDispatch();
    const uomClassList = useSelector(
        (state: any) => state?.configure?.attributes?.uomClassList
    );

    const uomMetricList = useSelector(
        (state: any) => state?.configure?.attributes?.uomMetricList
    );

    useEffect(() => {
        dispatch(getUomClassList());
        dispatch(getUomMetricList());
    }, []);

    return (
        <div className="attributeFormWrapper">
            <div className="attributeFormWrapper__content__wrapper">
                <div className="attributeFormWrapper__wrapper">
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label={<div>Name of Unit</div>}
                                name="nameOfUnit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter Unit',
                                    },
                                    {
                                        max: 100,
                                        message:
                                            'Maximum length is 100 characters',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter Unit"
                                    maxLength={100}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<div>Abbreviation</div>}
                                name="abbreviation"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter Unit Abbreviation',
                                    },
                                    {
                                        pattern:
                                            /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
                                        message:
                                            'Only letters, numbers, and special characters are allowed',
                                    },
                                    {
                                        max: 50,
                                        message:
                                            'Maximum length is 50 characters',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter Unit Abbreviation"
                                    maxLength={50}
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
                                    rows={4}
                                    placeholder="Add the description here"
                                    maxLength={200}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                label={
                                    <Row className="labelRowForAdd">
                                        <Col span={20}>UOM Classes</Col>
                                        <Col span={4}>
                                            <Popover
                                                className="createCategoryPopOver"
                                                content={
                                                    <CategoryUOMClassContent
                                                        setUomClassCreate={
                                                            setUomClassCreate
                                                        }
                                                    />
                                                }
                                                trigger="click"
                                                open={uomClassCreate}
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
                                                    setUomClassCreate(true);
                                                }}
                                            >
                                                <Col span={8}>
                                                    <AddIcon />
                                                </Col>
                                                <Col span={16}>add</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                }
                                name="uomClasses"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select category',
                                    },
                                ]}
                            >
                                <Select placeholder="Select">
                                    {uomClassList?.map((item: any) => {
                                        return (
                                            <Option key={item?.id}>
                                                {item?.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<div>Metric System</div>}
                                name="metricSystem"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Select UOM',
                                    },
                                ]}
                            >
                                <Select placeholder="Select">
                                    {uomMetricList?.map((item: any) => {
                                        return (
                                            <Option key={item?.id}>
                                                {item?.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default UomFormComponent;
