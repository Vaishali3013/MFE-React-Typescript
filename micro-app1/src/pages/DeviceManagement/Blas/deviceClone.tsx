import { Checkbox, Col, Row, Select, Form, Input } from 'antd';
import CustomButton from 'components/common/CustomButton';
import React, { useEffect, useState } from 'react';
import { okHandle } from 'utils/modalFunction';

import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { useDispatch } from 'react-redux';
import { getTagListByDeviceId } from 'redux/actions/DeviceManagementActions/tagAction';
import { cloneTag } from 'redux/actions/DeviceManagementActions/deviceAction';
import { maxDeviceNameLength } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const DeviceClone: React.FC<{
    cloneFormModal: any;
    setCloneFormModal: any;
    selectedDevice: any;
    allBlasList: any;
    handleCancle: any;
}> = ({
    cloneFormModal,
    setCloneFormModal,
    selectedDevice,
    allBlasList,
    handleCancle,
}) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [blaDevices, setBlaDevices] = useState<string>();
    const [mapTagSelected, setMapTagSelected] = useState<boolean>(false);
    const [editMappedTags, setEditMappedTags] = useState(0);

    // will use in next phase
    // const [selectedTagKey, setSelectedTagKey] = useState<any>([]);

    // const tagListByDeviceId = useSelector(
    //     (state: any) => state.deviceManagement.tags.tagListByDeviceId
    // );

    const onFinish = (values: {}): void => {
        dispatch(
            cloneTag({
                ...values,
                deviceId: selectedDevice.deviceId,
                cloneTag: mapTagSelected,
            })
        );
        okHandle(cloneFormModal, setCloneFormModal);
    };

    const onFinishFailed = (errorInfo: any): void => {};

    const handleSelectChange = (value: any): any => {
        setBlaDevices(value);
    };
    useEffect(() => {
        dispatch(getTagListByDeviceId({ deviceId: selectedDevice.deviceId }));
    }, [selectedDevice]);

    return (
        <>
            <div className="customModal__body__header fs-16 fw-500">
                {editMappedTags === 1 && (
                    <div className="cloneDeviceModal__title">
                        <BackIcon
                            onClick={() => {
                                setEditMappedTags(editMappedTags - 1);
                            }}
                        />
                        <span>{t('deviceMang.bla.editTags')}</span>
                    </div>
                )}
                {editMappedTags === 0 && (
                    <span>{t('deviceMang.bla.cloneSelectedDevices')}</span>
                )}
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {/* will use in next phase */}
                {/* {editMappedTags === 1 && (
                    <EditDeviceMappedTag
                        selectedTagKey={selectedTagKey}
                        setSelectedTagKey={setSelectedTagKey}
                    />
                )}
                {editMappedTags === 0 && ( */}
                <div className="cloneDeviceModal__body">
                    <Row className="bla__row">
                        <Col span={22}>
                            <Form.Item label="Select BLA" name="blaId">
                                <Select
                                    placeholder={t('commonStr.select')}
                                    onChange={handleSelectChange}
                                >
                                    {allBlasList?.map((item: any) => {
                                        return (
                                            <Option
                                                value={item?.blaId}
                                                key={item?.blaId}
                                            >
                                                {item?.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={48}>
                        <Col span={24}>
                            <Form.Item label="Device Name" name="deviceName">
                                <Input
                                    placeholder={t(
                                        'deviceMang.bla.enterFirstName'
                                    )}
                                    disabled={blaDevices === undefined}
                                    maxLength={maxDeviceNameLength}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={10} className="map__tags__row">
                        <Col span={18}>
                            <Form.Item name="cloneTag">
                                <Checkbox
                                    disabled={blaDevices === undefined}
                                    onChange={(e) => {
                                        setMapTagSelected(e.target.checked);
                                    }}
                                >
                                    {t('deviceMang.bla.mapTags')}
                                </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <div className="map__tags__edit">
                                {/* {will use in next phase} */}
                                {/* {mapTagSelected && (
                                    <>
                                        <div>
                                            {tagListByDeviceId.length} Tags
                                        </div>
                                        <div
                                            className="map__tags__edit__link"
                                            onClick={() => {
                                                setEditMappedTags(
                                                    editMappedTags + 1
                                                );
                                            }}
                                        >
                                            Edit Tags
                                        </div>
                                    </>
                                )} */}
                            </div>
                        </Col>
                    </Row>
                </div>
                {/* )} */}
                <div className="userCreationTypeWrapper__footerWrapper">
                    <div className="userCreationTypeWrapper__footerContent">
                        <CustomButton
                            type={'Cancel'}
                            disabled={false}
                            handleClick={handleCancle}
                        />
                        {/* will use in next phase */}
                        {/* {editMappedTags === 1 && (
                            <CustomButton
                                type={'Save'}
                                disabled={false}
                                handleClick={() => {
                                    setEditMappedTags(editMappedTags - 1);
                                }}
                            />
                        )}
                        {editMappedTags === 0 && ( */}
                        <CustomButton
                            type={'Clone'}
                            typeOfButton="submit"
                            disabled={false}
                        />
                        {/* )} */}
                    </div>
                </div>
            </Form>
        </>
    );
};

export default DeviceClone;
