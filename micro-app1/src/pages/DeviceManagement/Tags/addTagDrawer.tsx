import React, { useEffect, useState } from 'react';
import './index.scss';
import {
    Row,
    Col,
    Drawer,
    Button,
    Divider,
    Input,
    Switch,
    Select,
    Form,
    InputNumber,
    TreeSelect,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CustomButton from 'components/common/CustomButton';
import { BUTTONTYPE, ROLETYPE } from 'types/enums';
import { useDispatch, useSelector } from 'react-redux';
import {
    createTag,
    getTagProperties,
    getDatatypes,
    editTags,
    removeCreatedTagStatus,
    activateDeactivateTags,
    getTagDetails,
    getAggregateMethodList,
    setAddTagData,
} from 'redux/actions/DeviceManagementActions/tagAction';
import { parseJwt } from 'utils/jwtTokenFunction';
import { handleKeyInput, useCharacterLimit } from 'utils/commonFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { ReactComponent as AddIcon } from 'assets/icons/Plus.svg';
import {
    maxInputLength,
    maxInputNumberLength,
    maxTagNameLength,
} from 'utils/constants';
import { useTranslation } from 'react-i18next';
import { getUomList } from 'redux/actions/ConfigureActions/attributeActions';

const AddTagDrawer: React.FC<any> = ({
    open,
    setAddDrawerState,
    record,
    deviceId,
    type,
    setRecord,
    allDevicesList,
    deviceDetails,
    setSuccessModalState,
    successModalState,
    setIsUomOpen,
}) => {
    const details = parseJwt();
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const { showInputError } = useCharacterLimit();
    const isDisabled = record && Object.keys(record).length > 0;
    const tagStatusChanged = useSelector(
        (state: any) => state.deviceManagement.tags.tagStatusChanged
    );
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const [form] = Form.useForm();
    useEffect(() => {
        open === ROLETYPE.edit &&
            !successModalState &&
            dispatch(getTagDetails(record?.timeSeriesId));
    }, [open, successModalState]);

    useEffect(() => {
        setPayload({
            ...payload,
            deviceId: deviceId,
        });
    }, [deviceId]);

    const tagStatus = useSelector(
        (state: any) => state.deviceManagement.tags.tagDetails
    );

    const [payload, setPayload] = useState({
        deviceId: deviceId ?? 0,
        tagId: '',
        requestedBy: parseJwt().username,
        displayName: '',
        description: '',
        uniqueName: '',
        alias: '',
        dataType: '',
        pollingInterval: 5000,
        additionalProperties: '',
        timeSeriesId: record?.timeSeriesId,
        multiplicationFactor: 1,
        engineeringUnit: null,
        additionalFactor: 0,
        aggregateMethodId: null,
    });
    const {
        tagId,
        displayName,
        uniqueName,
        multiplicationFactor,
        engineeringUnit,
        additionalFactor,
        pollingInterval,
    } = payload;

    const dataTypes = useSelector(
        (state: any) => state?.deviceManagement?.tags?.dataTypes
    );
    const dataTypeItems = dataTypes.map((dataType: any, index: any) => ({
        label: dataType,
        key: index.toString(),
    }));

    const selectDevice = (key: number): void => {
        dispatch(getDatatypes({ deviceTypeId: key }));
    };
    useEffect(() => {
        deviceDetails?.communicationInterfaceId &&
            dispatch(
                getDatatypes({
                    deviceTypeId: deviceDetails?.communicationInterfaceId,
                })
            );
    }, [deviceDetails]);

    const { Option } = Select;
    const createTagState = useSelector(
        (state: any) => state.deviceManagement?.tags?.createTagState
    );

    const tagPropertiesData = useSelector(
        (state: any) => state.deviceManagement?.tags?.tagProperties
    );

    const tagUpdatedData = useSelector(
        (state: any) => state.deviceManagement?.tags?.updatedTagData
    );

    const uomList = useSelector(
        (state: any) => state?.configure?.attributes?.uomList
    );

    const methodList = useSelector(
        (state: any) => state?.deviceManagement?.tags?.methodList
    );

    const tagPropertiesDataItems = tagPropertiesData?.map(
        (item: any, index: any) => ({
            label: item,
            key: index.toString(),
        })
    );
    useEffect(() => {
        if (tagStatusChanged && confirmModalState) {
            setSuccessModalState(`${confirmModalState}`);
        }
        setConfirmModalState(null);
    }, [tagStatusChanged]);

    useEffect(() => {
        dispatch(getTagProperties());
        dispatch(getUomList());
        dispatch(getAggregateMethodList());
    }, []);
    useEffect(() => {
        dispatch(removeCreatedTagStatus());
    }, [createTagState]);

    const onOkHandler = (values: any): any => {
        if (type === ROLETYPE.add) {
            dispatch(createTag(payload));
        } else if (record) {
            dispatch(
                editTags({
                    ...payload,
                    displayName: values.tagName,
                    requestedBy: details.username,
                    timeSeriesId: record?.timeSeriesId,
                    uniqueName: values.address,
                    dataType: values.dataType,
                    additionalProperties: values.property,
                    pollingInterval: values.pollingInterval,
                    multiplicationFactor: values.multiplicationFactor,
                    additionalFactor: values.additionalFactor,
                    aggregateMethodId: values.aggregateMethodId,
                })
            );
            setAddDrawerState(null);
            dispatch(setAddTagData({}));
            record && setRecord?.('');
        } else {
            dispatch(createTag(payload));
        }
    };

    useEffect(() => {
        createTagState && setAddDrawerState(null);
    }, [createTagState]);

    const initialValues = {
        tagName: record?.name || '',
        tagID: record?.tagId || '',
        address: record?.address || '',
        property: record?.additionalProperties || '',
        device: record?.deviceName || '',
        dataType: record?.dataType || '',
        pollingInterval: record?.pollingInterval || 5000,
        engineeringUnit: record?.unit || null,
        additionalFactor: record?.additionalFactor || 0,
        multiplicationFactor: record?.multiplicationFactor || 1,
        aggregateMethod: record?.aggregateMethod || null,
    };

    // searching the child node of TreeSelect
    const filterTreeNode = (input: any, treeNode: any): any => {
        const title = treeNode.title.toLowerCase();
        return title.includes(input.toLowerCase());
    };

    const openUomForm = (): any => {
        const fieldValues = {
            ...form.getFieldsValue(),
            engineeringUnit:
                payload?.engineeringUnit !== null
                    ? payload?.engineeringUnit
                    : initialValues?.engineeringUnit,
        };
        setIsUomOpen(true);
        dispatch(setAddTagData(fieldValues));
    };

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

    return (
        <>
            <Drawer
                className="addTagDrawer"
                placement="right"
                getContainer={false}
                size="large"
                closable={false}
                open={open}
                destroyOnClose={true}
            >
                <>
                    <div>
                        <Row className="addTagDrawer__headerRow">
                            <Col span={16}>
                                <Row>
                                    <Col
                                        span={24}
                                        className="addTagDrawer__heading fw-1000 fs-14"
                                    >
                                        <span>
                                            {record && setRecord
                                                ? 'Edit Tag'
                                                : 'Add Tag'}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            {open === ROLETYPE.edit ? (
                                <Col span={6} className="addTagDrawer__switch">
                                    <span>
                                        {tagStatus?.isActive
                                            ? 'Active'
                                            : 'Inactive'}
                                    </span>
                                    <Switch
                                        size="small"
                                        checked={tagStatus?.isActive}
                                        onChange={() => {
                                            setConfirmModalState(
                                                tagStatus?.isActive
                                                    ? 'deactivate'
                                                    : 'activate'
                                            );
                                        }}
                                    />
                                </Col>
                            ) : (
                                <Col span={6}></Col>
                            )}
                            <Col span={2}>
                                <Button
                                    className="addTagDrawer__icon"
                                    type="text"
                                    onClick={() => {
                                        setAddDrawerState(null);
                                        dispatch(setAddTagData({}));
                                        record && setRecord?.('');
                                    }}
                                    icon={<CloseOutlined />}
                                ></Button>
                            </Col>
                        </Row>
                        <Divider className="addTagDrawer__divider" />
                        <Form
                            form={form}
                            className="addTagDrawer__formDiv"
                            layout="vertical"
                            initialValues={
                                Object.keys(tagUpdatedData)?.length
                                    ? tagUpdatedData
                                    : initialValues
                            }
                            onFinish={onOkHandler}
                        >
                            <Row className="addTagDrawer__footerButtons">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={t('commonStr.tagname')}
                                        name="tagName"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'deviceMang.tags.tagNameRequired'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="addTagDrawer__input"
                                            value={displayName}
                                            onChange={(e) => {
                                                setPayload({
                                                    ...payload,
                                                    displayName: e.target.value,
                                                });
                                            }}
                                            onKeyPress={(e) => {
                                                if (
                                                    payload?.displayName
                                                        ?.length ===
                                                    maxTagNameLength
                                                ) {
                                                    showInputError(
                                                        maxTagNameLength
                                                    );
                                                }
                                                handleKeyInput(e, displayName);
                                            }}
                                            maxLength={maxTagNameLength}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionRight"
                                >
                                    <Form.Item
                                        label={t('commonStr.tagId')}
                                        name="tagID"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'deviceMang.tags.tagIdRequired'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="addTagDrawer__input"
                                            value={tagId}
                                            onChange={(e) => {
                                                setPayload({
                                                    ...payload,
                                                    tagId: e.target.value,
                                                });
                                            }}
                                            onKeyPress={() => {
                                                if (
                                                    payload?.tagId?.length ===
                                                    maxInputLength
                                                ) {
                                                    showInputError(
                                                        maxInputLength
                                                    );
                                                }
                                            }}
                                            disabled={
                                                type === ROLETYPE.add
                                                    ? false
                                                    : isDisabled
                                            }
                                            maxLength={maxInputLength}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="addTagDrawer__form">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={t('commonStr.device')}
                                        name="device"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'deviceMang.tags.deviceRequired'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="addTagDrawer__select"
                                            placeholder={t('commonStr.select')}
                                            onSelect={(value, option) => {
                                                selectDevice(
                                                    option?.communicationId
                                                );
                                                setPayload({
                                                    ...payload,
                                                    deviceId: value,
                                                });
                                            }}
                                            disabled={
                                                isDisabled ||
                                                type === ROLETYPE.add
                                            }
                                            defaultValue={record?.deviceName}
                                            notFoundContent="No active device"
                                        >
                                            {allDevicesList?.map(
                                                (item: any) => {
                                                    return (
                                                        item?.isActive && (
                                                            <Option
                                                                value={
                                                                    item?.deviceId
                                                                }
                                                                key={
                                                                    item?.deviceId
                                                                }
                                                                communicationId={
                                                                    item?.communicationInterfaceId
                                                                }
                                                            >
                                                                {
                                                                    item?.deviceName
                                                                }
                                                            </Option>
                                                        )
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionRight"
                                >
                                    <Form.Item
                                        label={t('commonStr.dataType')}
                                        name="dataType"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'deviceMang.tags.dataTypeRequired'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="addTagDrawer__select"
                                            placeholder={t('commonStr.select')}
                                            onChange={(value, option) => {
                                                setPayload({
                                                    ...payload,
                                                    dataType: value,
                                                });
                                            }}
                                        >
                                            {dataTypeItems?.map((item: any) => {
                                                return (
                                                    <Option
                                                        value={item?.label}
                                                        key={item?.key}
                                                    >
                                                        {item?.label}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="addTagDrawer__form">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={t('commonStr.address')}
                                        name="address"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: t(
                                                    'deviceMang.tags.addressRequired'
                                                ),
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="addTagDrawer__input"
                                            value={uniqueName}
                                            onChange={(e) => {
                                                setPayload({
                                                    ...payload,
                                                    uniqueName: e.target.value,
                                                });
                                            }}
                                            onKeyPress={() => {
                                                if (
                                                    payload?.uniqueName
                                                        ?.length ===
                                                    maxInputLength
                                                ) {
                                                    showInputError(
                                                        maxInputLength
                                                    );
                                                }
                                            }}
                                            maxLength={maxInputLength}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionRight"
                                >
                                    <Form.Item
                                        label={t('commonStr.property')}
                                        name="property"
                                        className="addTagDrawer__formItem"
                                    >
                                        <Select
                                            className="addTagDrawer__select"
                                            placeholder={t('commonStr.select')}
                                            onChange={(value, option) => {
                                                setPayload({
                                                    ...payload,
                                                    additionalProperties: value,
                                                });
                                            }}
                                        >
                                            {tagPropertiesDataItems?.map(
                                                (item: any) => {
                                                    return (
                                                        <Option
                                                            value={item.label}
                                                            key={item.key}
                                                        >
                                                            {item.label}
                                                        </Option>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="addTagDrawer__form">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={
                                            <Row className="addTagDrawer__addNewLabel">
                                                <Col span={20}>UOM</Col>
                                                <Col span={4}>
                                                    <Row
                                                        className="addItemsButton"
                                                        onClick={() =>
                                                            openUomForm()
                                                        }
                                                    >
                                                        <>
                                                            <Col span={8}>
                                                                <AddIcon />
                                                            </Col>
                                                            <Col span={16}>
                                                                add
                                                            </Col>
                                                        </>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        }
                                        name="engineeringUnit"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'UOM is required',
                                            },
                                        ]}
                                    >
                                        {engineeringUnit ? (
                                            <TreeSelect
                                                className="addTagDrawer__select"
                                                placeholder="Select"
                                                filterTreeNode={filterTreeNode}
                                                dropdownStyle={{
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                }}
                                                allowClear
                                                treeData={convertDataToTreeData(
                                                    uomList?.uomMap || []
                                                )}
                                                onChange={(
                                                    value,
                                                    label: any
                                                ) => {
                                                    setPayload({
                                                        ...payload,
                                                        engineeringUnit:
                                                            label[0],
                                                    });
                                                }}
                                            ></TreeSelect>
                                        ) : (
                                            <TreeSelect
                                                className="addTagDrawer__select"
                                                showSearch
                                                placeholder="Select"
                                                filterTreeNode={filterTreeNode}
                                                dropdownStyle={{
                                                    maxHeight: 400,
                                                    overflow: 'auto',
                                                }}
                                                allowClear
                                                treeData={convertDataToTreeData(
                                                    uomList?.uomMap || []
                                                )}
                                                onChange={(
                                                    value,
                                                    label: any
                                                ) => {
                                                    setPayload({
                                                        ...payload,
                                                        engineeringUnit:
                                                            label[0],
                                                    });
                                                }}
                                            ></TreeSelect>
                                        )}
                                    </Form.Item>
                                </Col>

                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionRight"
                                >
                                    <Form.Item
                                        label={'Multiplication Factor'}
                                        name="multiplicationFactor"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                type: 'number',
                                                message: 'Not a number',
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Multiplication Factor is required',
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            className="addTagDrawer__input"
                                            value={multiplicationFactor}
                                            onChange={(value: any) => {
                                                setPayload({
                                                    ...payload,
                                                    multiplicationFactor: value,
                                                });
                                            }}
                                            maxLength={maxInputNumberLength}
                                            controls={false}
                                            onKeyPress={(e: any) => {
                                                if (
                                                    /^[a-zA-Z!@#$%^&*()_=\\[\]{};':"|,<>?]*$/.test(
                                                        e?.key
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="addTagDrawer__form">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={'Addition Factor'}
                                        name="additionalFactor"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                type: 'number',
                                                message: 'Not a number',
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Addition Factor is required',
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            className="addTagDrawer__input"
                                            value={additionalFactor}
                                            onChange={(value: any) => {
                                                setPayload({
                                                    ...payload,
                                                    additionalFactor: value,
                                                });
                                            }}
                                            maxLength={maxInputNumberLength}
                                            controls={false}
                                            onKeyPress={(e: any) => {
                                                if (
                                                    /^[a-zA-Z!@#$%^&*()_=\\[\]{};':"|,<>?]*$/.test(
                                                        e?.key
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionRight"
                                >
                                    <Form.Item
                                        label={'Polling Interval (ms)'}
                                        name="pollingInterval"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                type: 'number',
                                                message: 'Not a number',
                                            },
                                            {
                                                required: true,
                                                message:
                                                    'Polling Interval is required',
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            className="addTagDrawer__input"
                                            value={pollingInterval}
                                            onChange={(value: any) => {
                                                setPayload({
                                                    ...payload,
                                                    pollingInterval: value,
                                                });
                                            }}
                                            maxLength={maxInputNumberLength}
                                            controls={false}
                                            onKeyPress={(e: any) => {
                                                if (
                                                    /^[a-zA-Z!@#$%^&*()_=\\[\]{};':"|,<>?]*$/.test(
                                                        e?.key
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row className="addTagDrawer__form">
                                <Col
                                    span={12}
                                    className="addTagDrawer__formSectionLeft"
                                >
                                    <Form.Item
                                        label={'Aggregation Method'}
                                        name="aggregateMethod"
                                        className="addTagDrawer__formItem"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Aggregation Method is required',
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="addTagDrawer__select"
                                            placeholder={t('commonStr.select')}
                                            onChange={(value, option: any) => {
                                                setPayload({
                                                    ...payload,
                                                    aggregateMethodId:
                                                        option?.key,
                                                });
                                            }}
                                        >
                                            {methodList?.map((item: any) => {
                                                return (
                                                    <Option
                                                        value={
                                                            item.aggregationMethod
                                                        }
                                                        key={
                                                            item.aggregationMethodId
                                                        }
                                                    >
                                                        {item.aggregationMethod}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="addTagDrawer__button">
                                <Divider />
                                <Row className="addTagDrawer__footerButtons">
                                    <Col
                                        span={4}
                                        className="addTagDrawer__cancelButton"
                                    >
                                        <CustomButton
                                            type={BUTTONTYPE.cancel}
                                            disabled={false}
                                            handleClick={() => {
                                                setAddDrawerState(null);
                                                dispatch(setAddTagData({}));
                                                record && setRecord?.('');
                                            }}
                                        />
                                    </Col>
                                    <Col
                                        span={4}
                                        className="addTagDrawer__saveButton"
                                    >
                                        <CustomButton
                                            type={BUTTONTYPE.save}
                                            disabled={
                                                !(
                                                    (form.getFieldValue(
                                                        'pollingInterval'
                                                    ) ||
                                                        form.getFieldValue(
                                                            'pollingInterval'
                                                        ) === 0) &&
                                                    form.getFieldValue(
                                                        'tagID'
                                                    ) &&
                                                    form.getFieldValue(
                                                        'tagName'
                                                    ) &&
                                                    form.getFieldValue(
                                                        'device'
                                                    ) &&
                                                    form.getFieldValue(
                                                        'dataType'
                                                    ) &&
                                                    form.getFieldValue(
                                                        'address'
                                                    ) &&
                                                    form.getFieldValue(
                                                        'engineeringUnit'
                                                    ) &&
                                                    (form.getFieldValue(
                                                        'multiplicationFactor'
                                                    ) ||
                                                        form.getFieldValue(
                                                            'multiplicationFactor'
                                                        ) === 0) &&
                                                    (form.getFieldValue(
                                                        'additionalFactor'
                                                    ) ||
                                                        form.getFieldValue(
                                                            'additionalFactor'
                                                        ) === 0) &&
                                                    form.getFieldValue(
                                                        'aggregateMethod'
                                                    )
                                                )
                                            }
                                            typeOfButton={'submit'}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </>
            </Drawer>
            <ConfirmationModal
                open={confirmModalState}
                icon={
                    confirmModalState === 'activate' ? (
                        <ActivateIcon />
                    ) : (
                        <DeactivateIcon />
                    )
                }
                onOk={() => {
                    if (confirmModalState === 'activate') {
                        dispatch(
                            activateDeactivateTags({
                                id: [parseInt(record?.timeSeriesId)],
                                active: true,
                                updatedBy: details.username,
                            })
                        );
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateTags({
                                id: [parseInt(record?.timeSeriesId)],
                                active: false,
                                updatedBy: details.username,
                            })
                        );
                    }
                }}
                onCancel={() => {
                    setConfirmModalState(null);
                }}
                text={`Are you sure you want to ${confirmModalState} selected tag?`}
            />
        </>
    );
};

export default AddTagDrawer;
