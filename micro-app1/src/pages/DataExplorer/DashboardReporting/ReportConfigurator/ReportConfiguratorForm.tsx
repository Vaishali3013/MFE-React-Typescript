import { CloseOutlined } from '@ant-design/icons';
import { Card, Form, Input, message } from 'antd';
import CustomButton from 'components/common/CustomButton';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addDashboardUrlAction,
    deleteDashboardUrlAction,
    updateDashboardUrlAction,
} from 'redux/actions/DataExplorer/DashboardReportingActions';
import { BUTTONTYPE, ReportsMenuId } from 'types/enums';

const ReportConfiguratorForm: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const createdDashboardUrl = useSelector(
        (state: any) =>
            state.dataExplorer?.dashboardReporting?.createDashboardUrl
    );
    const deleteDashboardUrl = useSelector(
        (state: any) =>
            state.dataExplorer?.dashboardReporting?.deleteDashboardUrl
    );

    const getReportingList = useSelector(
        (state: any) => state.dataExplorer?.dashboardReporting?.reportingList
    );

    const [clickedMenuId, setClickedMenuId] = useState('');
    const [reportingList, setReportingList] = useState([]);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [indexId, setIndexId] = useState(0);
    const [originalValues, setOriginalValues] = useState<any>([]);

    useEffect(() => {
        if (createdDashboardUrl) {
            message.success('Menu Added Succesfully');
        }
        if (deleteDashboardUrl) {
            message.success('Menu Deleted Succesfully');
        }
    }, [createdDashboardUrl, deleteDashboardUrl]);

    useEffect(() => {
        setReportingList(getReportingList);
    }, [getReportingList]);

    useEffect(() => {
        if (reportingList && reportingList.length > 0) {
            const initialValues = reportingList.map(
                (item: any, index: any) => ({
                    id: item.id || '',
                    userUrl: item.userUrl || '',
                    menuName: item.menuName || '',
                    externalUrl: item.externalUrl || '',
                })
            );
            form.setFieldsValue({ items: initialValues });
            setOriginalValues(initialValues);
        }
    }, [reportingList, form]);

    const handleCardClick = (index: any): any => {
        const clickedItemId = form.getFieldValue(['items', index, 'id']);
        setClickedMenuId(clickedItemId);
        form.setFields([
            {
                name: ['items', index, 'isNew'],
                value: true,
            },
        ]);
    };

    const onFinish = (values: any): void => {
        const isNewFilteredItem = values?.items?.filter(
            (item: any) =>
                // eslint-disable-next-line no-prototype-builtins
                item?.hasOwnProperty('isNew') && !item.id
        );
        const getEdditedFilteredItem = values?.items?.filter(
            (item: any) => item.id === clickedMenuId
        );

        if (clickedMenuId && getEdditedFilteredItem) {
            dispatch(
                updateDashboardUrlAction({
                    id: clickedMenuId,
                    getEdditedFilteredItem: getEdditedFilteredItem[0],
                    parentId: ReportsMenuId.menuID,
                })
            );
        } else {
            dispatch(
                addDashboardUrlAction({
                    isNewFilteredItem: isNewFilteredItem,
                    parentId: ReportsMenuId.menuID,
                })
            );
        }
    };

    const handleDelete = (index?: any): void => {
        const itemId = form.getFieldValue(['items', index, 'id']);
        dispatch(deleteDashboardUrlAction(itemId));
        form.setFieldsValue({ items: originalValues });
        setClickedMenuId('');
        form.setFields([
            {
                name: ['items', index, 'isNew'],
                value: false,
            },
        ]);
        setDeleteModalState(false);
    };

    return (
        <>
            <Form
                key={`${reportingList.length}`}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                form={form}
                name="dynamic_form_complex"
                autoComplete="off"
                initialValues={{ items: [{}] }}
                onFinish={onFinish}
            >
                <Form.List name="items">
                    {(fields, { add, remove }) => (
                        <>
                            <div className="reportConfiguratorWrapper__addButton">
                                <CustomButton
                                    type={'Add New'}
                                    handleClick={() => {
                                        add({ isListField: false }, 0);
                                    }}
                                    disabled={false}
                                />
                            </div>
                            <div className="reportConfiguratorWrapper__cardBody">
                                <div className="reportConfiguratorWrapper__cards">
                                    {fields.map((field, index) => {
                                        return (
                                            <Card
                                                size="small"
                                                title={
                                                    form.getFieldValue([
                                                        'items',
                                                        index,
                                                        'menuName',
                                                    ]) || `Item ${index + 1}`
                                                }
                                                key={field.key}
                                                extra={
                                                    field?.key >=
                                                        reportingList?.length && (
                                                        <CloseOutlined
                                                            onClick={() => {
                                                                remove(
                                                                    field.name
                                                                );
                                                            }}
                                                        />
                                                    )
                                                }
                                                onClick={() => {
                                                    handleCardClick(index);
                                                }}
                                            >
                                                <Form.Item
                                                    label="User Url"
                                                    name={[
                                                        field.name,
                                                        'userUrl',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter User Url',
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Menu Name"
                                                    name={[
                                                        field.name,
                                                        'menuName',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter Menu Name',
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Dashboard Url"
                                                    name={[
                                                        field.name,
                                                        'externalUrl',
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Enter Dashboard Url',
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                {field?.key >=
                                                reportingList?.length ? (
                                                    <div className="reportConfigurator__footerContent">
                                                        <CustomButton
                                                            type={BUTTONTYPE.cancel}
                                                            disabled={false}
                                                            handleClick={() => {
                                                                remove(
                                                                    field.name
                                                                );
                                                            }}
                                                        />
                                                        <CustomButton
                                                            type={BUTTONTYPE.save}
                                                            typeOfButton="submit"
                                                            disabled={false}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="reportConfigurator__footerContent">
                                                        <CustomButton
                                                            type={BUTTONTYPE.delete}
                                                            disabled={false}
                                                            handleClick={() => {
                                                                setIndexId(index);
                                                                setDeleteModalState(
                                                                    true
                                                                );
                                                            }}
                                                        />
                                                        <CustomButton
                                                            type={BUTTONTYPE.edit}
                                                            typeOfButton="submit"
                                                            disabled={false}
                                                        />
                                                    </div>
                                                )}
                                            </Card>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </Form.List>
            </Form>
            <ConfirmationModal
                    open={deleteModalState}
                    onOk={() => {
                        handleDelete(indexId);
                    }}
                    onCancel={() => {
                        setDeleteModalState(false);
                    }}
                    text="Are you sure you want to delete the selected Menu?"
                />
        </>
    );
};
export default ReportConfiguratorForm;
