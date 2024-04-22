import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Dropdown, type MenuProps, Modal, message } from 'antd';
import { type ModalProps } from 'types/interfaces/PropsInterfaces';
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as CSVIcon } from 'assets/icons/csvIcon.svg';
import { ReactComponent as ExcelIcon } from 'assets/icons/excelIcon.svg';
import { EMPTY, ApiService } from 'types/enums';
import Api from 'redux/services';
import { getUrlForApiService } from 'utils/urlHandler';
import { getTemplate } from 'redux/actions/BulkUploadActions/bulkUploadActions';
import { useDispatch } from 'react-redux';
import rightArrow from 'assets/icons/rightarrow.svg';

const CustomModal: React.FC<ModalProps> = ({
    open,
    onCancel,
    onOk,
    children,
    title,
    userTypeValue,
    customClassName,
    footer,
    backIcon,
    setChangePasswordSelected,
}) => {
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

    const modalHeader = (
        <div className="customModal__body__header fs-16 fw-500">
            <div>
                {backIcon && (
                    <span
                        className="backIcon"
                        onClick={() => {
                            setChangePasswordSelected(false);
                        }}
                    >
                        <img src={rightArrow} alt="right-arrow-svg" />
                    </span>
                )}
                <span>{title}</span>
            </div>
            <div>
                {userTypeValue === 0 ? (
                    <Dropdown menu={{ items }} overlayClassName="bluk__upload">
                        <Button>
                            Bulk Upload
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                ) : (
                    EMPTY.string
                )}
            </div>
        </div>
    );

    return (
        <Modal
            centered
            open={open}
            destroyOnClose={true}
            onOk={() => {
                onOk();
            }}
            onCancel={() => {
                onCancel();
            }}
            footer={footer}
            wrapClassName={`customModal ${customClassName ?? ''}`}
        >
            <div className="customModal__body">
                {title ? modalHeader : ''}
                {children}
            </div>
        </Modal>
    );
};

export default CustomModal;
