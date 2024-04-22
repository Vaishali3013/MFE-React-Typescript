import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Divider, Row, Col, Empty, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.scss';
import { type GroupDrawerProps } from 'types/interfaces/PropsInterfaces/UserManagement/groupPropsInterface';
import CustomButton from 'components/common/CustomButton';
import { ReactComponent as EditIcon } from 'assets/icons/editIcon.svg';
import {
    createGroup,
    editGroup,
    getGroupsList,
    getResourceByTypeByResourceId,
    getResourceType,
} from 'redux/actions/UserManagementActions/groupsAction';
import { useDispatch, useSelector } from 'react-redux';
import { type CheckboxValueType } from 'antd/es/checkbox/Group';
import { parseJwt } from 'utils/jwtTokenFunction';
import { useTranslation } from 'react-i18next';

const { Option } = Select;
const GroupDrawer: React.FC<GroupDrawerProps> = ({
    onClose,
    editData,
    formDisable,
    openEditDrawer,
    onEditClick,
    paginationPayload,
}) => {
    const { t } = useTranslation('translation');
    const resourceTypeValue = useSelector(
        (state: any) => state.userManagement.groups.resourceType
    );

    const [selectedOption, setSelectedOption] = useState<string>('');
    const option: any = resourceTypeValue?.find(
        (item: any) => item.resourceTypeName === selectedOption
    );
    const dataById = useSelector(
        (state: any) => state.userManagement.groups.dataByGroupId
    );

    const resourceTypeById = useSelector(
        (state: any) => state.userManagement.groups.resourceTypeDataById
    );

    const [selectedOptionData, setSelectedOptionData] =
        useState<string>(option);
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const selectedItems = (): any => {
        const selectedValues: any = [];
        editData?.resourceList?.map((item: any) => {
            selectedValues.push(item.resourceId);
        });
        return selectedValues;
    };

    useEffect(() => {
        setCheckedItems(selectedItems());
    }, [dataById]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getResourceType());
    }, []);

    const details = parseJwt();

    const onChange = (checkedValues: CheckboxValueType[]): void => {};
    useEffect(() => {
        if (editData)
            dispatch(getResourceByTypeByResourceId(editData?.resourceType?.id));
    }, [editData]);

    useEffect(() => {
        if (editData) {
            setSelectedOptionData(editData?.resourceType?.resourceTypeName);
            selectedItems();
            const allChecked =
                editData?.resourceList?.length === resourceTypeById?.length &&
                editData?.resourceList?.length > 0;
            const someChecked =
                editData?.resourceList?.length > 0 && !allChecked;
            setCheckAll(() => allChecked);
            setIndeterminate(() => someChecked);
        }
    }, [resourceTypeById]);

    const [payload, setPayload] = useState({
        createdBy: details.username,
        updatedBy: details.username,
        id: 0,
        groupName: '',
        resourceType: {
            id: '',
            resourceTypeName: '',
        },
        resourceList: [
            {
                resourceId: '',
                resourceType: {
                    id: '',
                },
            },
        ],
    });

    const { groupName } = payload;

    const handleChange = (value: string): void => {
        setSelectedOptionData(value);
        setSelectedOption(value);
        setCheckedItems([]);
    };

    const handleSelectAll = (checked: boolean): void => {
        if (checked) {
            const updatedCheckedItems = resourceTypeById?.map(
                (item: any) => item.resourceId
            );
            setCheckedItems(updatedCheckedItems);
        } else {
            setCheckedItems([]);
        }
        setIndeterminate(false);
        setCheckAll(checked);
    };

    const initialValues = {
        groupName: editData?.groupName || '',
        resourceType: editData?.resourceType?.resourceTypeName || '',
        id: editData?.id || '',
    };

    const editDrawer = (): void => {
        if (onEditClick) {
            onEditClick();
        }
        if (openEditDrawer) {
            openEditDrawer(true);
        }
    };

    const handleSubItemChange = (
        resourceId: string,
        checked: boolean
    ): void => {
        // LOGIC-- updatedCheckedItems contains copy of checkItems.If value of checked is true (i.e. if resourceItem is checked),
        // then its resourceId is appended in updatedCheckedItems & if the checked is false(i.e the resource item is unchecked).
        // In that case, it finds the index of resourceId in the updatedCheckedItems array using indexOf.
        // If the index is not -1 (means resourceId was found in the array),it removes the element at that index using the splice method.
        const updatedCheckedItems = checkedItems ? [...checkedItems] : [];
        if (checked) {
            updatedCheckedItems.push(resourceId);
        } else {
            const index = updatedCheckedItems.indexOf(resourceId);
            if (index !== -1) {
                updatedCheckedItems.splice(index, 1);
            }
        }

        setCheckedItems(updatedCheckedItems);
        // LOGIC-- Here checking if all the resource items are checked by comparing values of updatedCheckedItems.length and resourceTypeById.length , then assigning to variable- allChecked.
        // and if some resourceItems are checked then verifying that updatedCheckedItems has a length > 0 and allChecked is false, then assigning to variable someChecked.
        const allChecked =
            updatedCheckedItems?.length === resourceTypeById?.length;
        const someChecked = updatedCheckedItems?.length > 0 && !allChecked;

        setIndeterminate(someChecked);
        setCheckAll(allChecked);
    };

    useEffect(() => {
        setPayload({
            ...payload,
            groupName: editData ? editData?.groupName : groupName,
            id: editData ? editData?.id : '',
            resourceType: {
                id: editData ? editData?.resourceType?.id : option?.id,
                resourceTypeName: editData
                    ? editData?.resourceType?.resourceTypeName
                    : option?.resourceTypeName,
            },
            resourceList: editData
                ? editData?.resourceList?.map((item: any) => ({
                      resourceId: item.resourceId,
                      resourceType: {
                          id: editData?.resourceType?.id,
                      },
                  }))
                : checkedItems?.map((item: any) => ({
                      resourceId: item,
                      resourceType: {
                          id: option?.id,
                      },
                  })),
        });
    }, [checkedItems, editData, option]);

    const submitHandler = (values: any): any => {
        if (editData) {
            dispatch(
                editGroup({
                    ...payload,
                    groupName: values.groupName,
                    resourceList: checkedItems?.map((item: any) => ({
                        resourceId: item,
                        resourceType: {
                            id: editData?.resourceType?.id,
                        },
                    })),
                    paginationPayload: paginationPayload,
                })
            );
            dispatch(
                editGroup({
                    ...payload,
                    groupName: values.groupName,
                    resourceList: checkedItems?.map((item: any) => ({
                        resourceId: item,
                        resourceType: {
                            id: editData?.resourceType?.id,
                        },
                    })),
                    paginationPayload: paginationPayload,
                })
            );
            onClose();
        } else {
            dispatch(
                createGroup({
                    ...payload,
                    groupName: values.groupName,
                    paginationPayload: paginationPayload,
                })
            );
            onClose();
        }
    };

    const subItems = (name: string, id: string): void => {
        dispatch(getResourceByTypeByResourceId(id));
    };
    const filteredItems = resourceTypeById.filter((item: any): void =>
        item.resourceName.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="groupDrawer__wrapper">
            <Form
                layout="vertical"
                initialValues={initialValues}
                disabled={formDisable}
                onFinish={submitHandler}
            >
                <Form.Item
                    name="groupName"
                    label={
                        <div className="groupDrawer__labelContainer">
                            <span className="groupDrawer__label">
                                Group Name
                            </span>
                            {formDisable && (
                                <span className="groupDrawer__editLink">
                                    <a
                                        onClick={() => {
                                            editDrawer();
                                        }}
                                    >
                                        <EditIcon className="editIcon" />
                                        Edit
                                    </a>
                                </span>
                            )}
                        </div>
                    }
                    rules={[{ required: true }]}
                >
                    <Input
                        placeholder="Enter Group Name"
                        className="groupDrawer__Input"
                        value={groupName}
                    />
                </Form.Item>
                <Form.Item
                    name="resourceType"
                    label="Select Resource Type"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select"
                        className="groupDrawer__Input"
                        onChange={handleChange}
                        value={selectedOption}
                        onSelect={(value, option) => {
                            subItems(value, option.key);
                        }}
                    >
                        {resourceTypeValue?.map((item: any) => (
                            <Option key={item.id} value={item.resourceTypeName}>
                                {item.resourceTypeName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <div className="groupDrawer__selectAll">
                    <Checkbox
                        className="groupDrawer__subItems"
                        checked={checkAll}
                        indeterminate={indeterminate}
                        onChange={(e) => {
                            handleSelectAll(e.target.checked);
                        }}
                    >
                        Sub Items
                    </Checkbox>
                </div>
                <Input
                    className="groupDrawer__search"
                    prefix={<SearchOutlined />}
                    placeholder="Search From the List"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
                {selectedOptionData ? (
                    <div className="list-container">
                        <ul>
                            <Checkbox.Group
                                onChange={onChange}
                                className="checkBox-group"
                                value={checkedItems}
                            >
                                {filteredItems?.map((item: any) => (
                                    <>
                                        <li
                                            key={item.resourceId}
                                            className="groupDrawer__listItem"
                                        >
                                            <Checkbox
                                                value={item.resourceId}
                                                onChange={(e) => {
                                                    handleSubItemChange(
                                                        item.resourceId,
                                                        e.target.checked
                                                    );
                                                }}
                                            >
                                                {item.resourceName}
                                            </Checkbox>
                                        </li>
                                        <Divider />
                                    </>
                                ))}
                            </Checkbox.Group>
                        </ul>
                    </div>
                ) : (
                    <div className="groupDrawer__noData">
                        <Empty
                            description={
                                <span className="empty-description">
                                    {t('groups.selectAccessControl')}
                                </span>
                            }
                        />
                    </div>
                )}

                {!formDisable && (
                    <div className="button">
                        <Divider />
                        <Row className="footerButtons">
                            <Col span={8}>
                                <CustomButton
                                    type={'Cancel'}
                                    disabled={false}
                                    handleClick={() => {
                                        dispatch(getGroupsList());
                                        onClose();
                                    }}
                                />
                            </Col>
                            <Col span={8}>
                                {checkedItems?.length !== 0 ? (
                                    <CustomButton
                                        type={'Save'}
                                        disabled={false}
                                        typeOfButton={'submit'}
                                    />
                                ) : (
                                    <CustomButton
                                        type={'Save'}
                                        disabled={true}
                                        typeOfButton={'submit'}
                                    />
                                )}
                            </Col>
                        </Row>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default GroupDrawer;
