import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input, notification } from 'antd';
import { useSelector } from 'react-redux';
import { EMPTY } from 'types/enums';
import {
    type EditableCellProps,
    type EditableRowProps,
} from 'types/interfaces/PropsInterfaces/Implementation';
import { useTranslation } from 'react-i18next';
const EditableContext = React.createContext<any | null>(null);
export const EditableRow: React.FC<EditableRowProps> = ({
    index,
    ...props
}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

export const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    dataType,
    dataSource,
    handleSave,
    ...restProps
}) => {
    const { t } = useTranslation('translation');

    const tableColumnList = useSelector(
        (state: any) => state?.implementation?.table?.tableColumnsList
    );
    const customValidator: any = async (rule: any, value: any) => {
        const dataTypeCol = tableColumnList?.find(
            (col: any) => col?.columnName === rule?.field
        );
        switch (dataTypeCol?.dataTypeName) {
            case 'string':
                return EMPTY.string;
            case 'Int':
                if (value === EMPTY.string || /^\d+$/.test(value)) {
                    return EMPTY.string;
                } else {
                    notification.error({
                        message: t('implementation.table.intIncorrectDataType'),
                        duration: 3,
                        style: {
                            backgroundColor: '#fff1f0',
                            border: '1px solid #FFCCC7',
                        },
                    });
                    throw new Error(EMPTY.string);
                }
            case 'Float':
                if (value === EMPTY.string || !isNaN(value)) {
                    return EMPTY.string;
                } else {
                    notification.error({
                        message: t(
                            'implementation.table.floatIncorrectDataType'
                        ),
                        duration: 3,
                        style: {
                            backgroundColor: '#fff1f0',
                            border: '1px solid #FFCCC7',
                        },
                    });
                    throw new Error(EMPTY.string);
                }
            case 'Double':
                if (value === EMPTY.string || !isNaN(value)) {
                    return EMPTY.string;
                } else {
                    notification.error({
                        message: t(
                            'implementation.table.doubleIncorrectDataType'
                        ),
                        duration: 3,
                        style: {
                            backgroundColor: '#fff1f0',
                            border: '1px solid #FFCCC7',
                        },
                    });
                    throw new Error(EMPTY.string);
                }
            case 'Timestamp':
                if (
                    value === EMPTY.string ||
                    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/gm.test(
                        value
                    )
                ) {
                    return EMPTY.string;
                } else {
                    notification.error({
                        message: t(
                            'implementation.table.timeStampIncorrectDataType'
                        ),
                        duration: 3,
                        style: {
                            backgroundColor: '#fff1f0',
                            border: '1px solid #FFCCC7',
                        },
                    });
                    throw new Error(EMPTY.string);
                }
            case 'Date':
                if (
                    value === EMPTY.string ||
                    /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
                        value
                    )
                ) {
                    return EMPTY.string;
                } else {
                    notification.error({
                        message: t(
                            'implementation.table.dateIncorrectDataType'
                        ),
                        duration: 3,
                        style: {
                            backgroundColor: '#fff1f0',
                            border: '1px solid #FFCCC7',
                        },
                    });
                    throw new Error(EMPTY.string);
                }
            default:
                return EMPTY.string;
        }
    };
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<any | null>(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit: any = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save: any = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave(
                {
                    ...record,
                    ...values,
                    error: false,
                },
                dataSource
            );
        } catch (errInfo: any) {
            handleSave(
                {
                    ...record,
                    ...errInfo?.values,
                    error: true,
                },
                dataSource
            );
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                validateTrigger="custom"
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        validator: customValidator,
                    },
                ]}
            >
                <Input
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                    bordered={false}
                />
            </Form.Item>
        ) : (
            <Input
                className="editable-cell-value-wrap"
                bordered={false}
                onFocusCapture={toggleEdit}
                placeholder={t('implementation.table.enterValuePlaceholder')}
                value={children[1]}
            ></Input>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
