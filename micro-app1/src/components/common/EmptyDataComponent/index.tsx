import React, { useEffect, useState } from 'react';
import {
    Button,
    Col,
    Dropdown,
    Empty,
    type MenuProps,
    Row,
    message,
    Spin,
} from 'antd';
import { type EmptyDataComponentProps } from 'types/interfaces/PropsInterfaces';
import CustomButton from '../CustomButton';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import { getUrlForApiService } from 'utils/urlHandler';
import Api from 'redux/services';
import './index.scss';
import { getTemplate } from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { useDispatch } from 'react-redux';
import { ApiService } from 'types/enums';
const EmptyDataComponent: React.FC<EmptyDataComponentProps> = ({
    textValue,
    buttonType,
    bulkImport,
    secondaryTextValue,
    loading = false,
    buttonClickHandler,
    customClassName,
}) => {
    const [buttonValue, setButtonValue] = useState({
        name: '',
        visible: false,
    });
    const dispatch = useDispatch();

    const [typeOfUpload, setTypeOfUpload] = useState<string>('');
    function handleChange(event: any): void {
        event.preventDefault();
        const url =
            getUrlForApiService(ApiService.USER_MANAGEMENT) +
            '/users/importusers';
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        event.target.value = '';
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        Api.post(url, formData, config)
            .then((response) => {
                message.success('File Uploaded Successfully');
            })
            .catch(() => {
                message.error(
                    'Could not upload, please check the contents of file.'
                );
            });
    }

    useEffect(() => {
        if (typeOfUpload === 'downloadTemplate') dispatch(getTemplate());
        setTypeOfUpload('');
    }, [typeOfUpload]);
    const items: MenuProps['items'] = [
        {
            label: <div>Upload CSV</div>,
            key: 'uploadCSV',
            icon: <CSVIcon />,
            disabled: true,
        },
        {
            label: (
                <>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        onChange={handleChange}
                        id="file-upload-users"
                    />
                    <label
                        onClick={() => {
                            document
                                .getElementById('file-upload-users')
                                ?.click();
                        }}
                    >
                        Upload as Excel
                    </label>
                </>
            ),
            key: 'uploadExcel',
            icon: <ExcelIcon />,
        },
        {
            label: (
                <div
                    onClick={() => {
                        setTypeOfUpload('downloadTemplate');
                    }}
                >
                    Download Template
                </div>
            ),
            key: 'downloadTemplate',
            icon: <ExcelIcon />,
        },
    ];

    useEffect(() => {
        buttonType &&
            setButtonValue({
                name: buttonType?.name,
                visible: buttonType?.disable,
            });
    }, []);

    return (
        <>
            <Row className={customClassName ?? "EmptyDataComponent"}>
                <Col span={24} className={customClassName ? `${customClassName}__image` : "EmptyDataComponent__image"}>
                    <Empty
                        description={
                            secondaryTextValue ? (
                                <span>
                                    {textValue} <br />
                                    {secondaryTextValue}
                                </span>
                            ) : (
                                textValue
                            )
                        }
                    />
                </Col>
            </Row>
            {buttonType && (
                <div className="bulk-importbtn">
                    {buttonValue.name ? (
                        <>
                            <div className="EmptyDataComponent__buttons__customButton">
                                {bulkImport && (
                                    <Dropdown
                                        menu={{ items }}
                                        className="dropdown-bulk-upload"
                                    >
                                        <Button>
                                            Bulk Upload
                                            <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                )}
                                <CustomButton
                                    type={buttonValue?.name}
                                    disabled={buttonValue?.visible}
                                    handleClick={buttonClickHandler}
                                />
                            </div>
                        </>
                    ) : (
                        <Spin />
                    )}
                </div>
            )}
        </>
    );
};

export default EmptyDataComponent;
