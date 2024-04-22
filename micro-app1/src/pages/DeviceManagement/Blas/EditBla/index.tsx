import React, { useState, useEffect } from 'react';
import './index.scss';
import {
    Row,
    Col,
    Drawer,
    Tabs,
    Button,
    Switch,
    Typography,
    Divider,
    Tooltip,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CloseOutlined } from '@ant-design/icons';
import EditBlaTable from './editBlaTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    getBlaDetails,
    editBla,
    activateDeactivateBlas,
    removeSelectedDeviceFromRedux,
} from 'redux/actions/DeviceManagementActions/blasAction';
import CustomButton from 'components/common/CustomButton';
import { parseJwt } from 'utils/jwtTokenFunction';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as DeactivateIcon } from 'assets/icons/blaDeactivateIcon.svg';
import { ReactComponent as ActivateIcon } from 'assets/icons/blaActivateIcon.svg';
import { maxInputLength } from 'utils/constants';
import PopOverComponent from 'components/common/PopOverComponent';
import { useCharacterLimit } from 'utils/commonFunction';
import { useTranslation } from 'react-i18next';

const EditBla: React.FC<any> = ({
    open,
    setBlaState,
    record,
    setOpenEditBla,
    setShowAddNewDeviceWizard,
    setSuccessModalState,
}) => {
    const [editState, setEditState] = useState(false);
    const [currentTabKey, setCurrentTabKey] = useState('1');
    const dispatch = useDispatch();
    const { showInputError } = useCharacterLimit();
    const blaDetails = useSelector(
        (state: any) => state.deviceManagement.blas.blaDetails
    );
    const [description, setDescription] = useState('');
    const [confirmModalState, setConfirmModalState] = useState<String | any>(
        null
    );
    const details = parseJwt();
    const { t } = useTranslation('translation');
    const blaStatusChanged = useSelector(
        (state: any) => state.deviceManagement.blas.blaStatusChanged
    );

    useEffect(() => {
        record && dispatch(getBlaDetails(record?.blaId));
    }, [record, blaStatusChanged]);

    useEffect(() => {
        editState && setDescription(blaDetails?.description || '');
    }, [editState]);

    const handleDescriptionChange = (event: any): any => {
        const { value } = event.target;
        setDescription(value);
    };

    const editBlaTableData = useSelector(
        (state: any) => state.deviceManagement.blas.devicesInBlaList
    );

    const saveDetails = (): void => {
        dispatch(
            editBla({
                blaName: blaDetails?.blaName,
                description: description,
                updatedBy: details?.username,
                blaId: blaDetails?.blaId,
            })
        );
        setEditState(false);
        setOpenEditBla(false);
    };
    const onChange = (key: string): void => {
        setCurrentTabKey(key);
    };

    useEffect(() => {
        dispatch(removeSelectedDeviceFromRedux());
    }, []);

    return (
        <>
            <Drawer
                key={open}
                className="editBlaDrawer"
                placement="right"
                getContainer={false}
                size="large"
                closable={false}
                open={open}
            >
                <>
                    <div>
                        <Row key={blaDetails}>
                            <Col span={16}>
                                <Row>
                                    <Col
                                        span={24}
                                        className="editBlaDrawer__heading fw-500 fs-18"
                                    >
                                        <PopOverComponent
                                            text={blaDetails?.name}
                                            record={record}
                                        />
                                    </Col>
                                    <Col
                                        span={24}
                                        className="editBlaDrawer__subHeading fw-400 fs-14"
                                    >
                                        {editState ? (
                                            <TextArea
                                                className="addBlaWrapper__textArea"
                                                value={description}
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                                onKeyPress={() => {
                                                    if (
                                                        description?.length ===
                                                        maxInputLength
                                                    ) {
                                                        showInputError(
                                                            maxInputLength
                                                        );
                                                    }
                                                }}
                                                maxLength={maxInputLength}
                                            />
                                        ) : (
                                            <span>
                                                {blaDetails?.description}
                                            </span>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                            {editState ? (
                                <Col span={6}></Col>
                            ) : (
                                <Col span={6}>
                                    <Button
                                        disabled={!blaDetails?.isActive}
                                        className="editBlaDrawer__icon"
                                        onClick={() => {
                                            setEditState(true);
                                        }}
                                        type="primary"
                                        ghost
                                    >
                                        {t('deviceMang.bla.edit')}
                                    </Button>
                                </Col>
                            )}

                            <Col span={2}>
                                <Button
                                    className="editBlaDrawer__icon"
                                    type="text"
                                    onClick={() => {
                                        setEditState(false);
                                        setBlaState(false);
                                        setCurrentTabKey('1');
                                    }}
                                    icon={<CloseOutlined />}
                                ></Button>
                            </Col>
                        </Row>
                        <Row
                            className={`${
                                blaDetails?.isActive
                                    ? ''
                                    : 'editBlaDrawer__table'
                            } fw-500 fs-16 blaEditDrawer`}
                        >
                            <Col span={24}>
                                <Tabs
                                    activeKey={currentTabKey}
                                    onChange={onChange}
                                    key={`${currentTabKey}_${blaDetails?.blaId}`}
                                    defaultActiveKey="1"
                                    items={[
                                        {
                                            key: '1',
                                            label: `All`,
                                            children: (
                                                <EditBlaTable
                                                    editState={editState}
                                                    editBlaTableData={
                                                        editBlaTableData
                                                    }
                                                    blaId={blaDetails?.blaId}
                                                    status={0}
                                                    setShowAddNewDeviceWizard={
                                                        setShowAddNewDeviceWizard
                                                    }
                                                    emptyText={t(
                                                        'deviceMang.bla.noDeviceFound'
                                                    )}
                                                />
                                            ),
                                        },
                                        {
                                            key: '2',
                                            label: `Active`,
                                            children: (
                                                <EditBlaTable
                                                    editState={editState}
                                                    editBlaTableData={
                                                        editBlaTableData
                                                    }
                                                    blaId={blaDetails?.blaId}
                                                    status={1}
                                                    setShowAddNewDeviceWizard={
                                                        setShowAddNewDeviceWizard
                                                    }
                                                    emptyText={t(
                                                        'deviceMang.bla.noActiveDevicesFound'
                                                    )}
                                                />
                                            ),
                                        },
                                        {
                                            key: '3',
                                            label: `Inactive`,
                                            children: (
                                                <EditBlaTable
                                                    editState={editState}
                                                    editBlaTableData={
                                                        editBlaTableData
                                                    }
                                                    blaId={blaDetails?.blaId}
                                                    status={2}
                                                    setShowAddNewDeviceWizard={
                                                        setShowAddNewDeviceWizard
                                                    }
                                                    emptyText={t(
                                                        ' deviceMang.bla.noInactiveDevicesFound'
                                                    )}
                                                />
                                            ),
                                        },
                                    ]}
                                    tabBarExtraContent={{
                                        right: (
                                            <div className="editBlaDrawer__tabContent fw-400 fs-14">
                                                <Typography.Text type="secondary">
                                                    {t(
                                                        'deviceMang.bla.uniqueId'
                                                    )}{' '}
                                                    {blaDetails?.uuid}
                                                </Typography.Text>
                                                <Tooltip
                                                    title={
                                                        blaDetails?.isActive
                                                            ? 'Deactivate BLA'
                                                            : 'Activate BLA'
                                                    }
                                                    trigger="hover"
                                                    placement="topLeft"
                                                >
                                                    <Switch
                                                        key={
                                                            blaDetails?.isActive
                                                        }
                                                        className="editBlaDrawer__switch"
                                                        size="small"
                                                        checked={
                                                            blaDetails?.isActive
                                                        }
                                                        onChange={() => {
                                                            setConfirmModalState(
                                                                blaDetails?.isActive
                                                                    ? 'deactivate'
                                                                    : 'activate'
                                                            );
                                                        }}
                                                    />
                                                </Tooltip>
                                            </div>
                                        ),
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                    {editState && (
                        <div className="editBlaDrawer__button">
                            <Divider />
                            <Row className="editBlaDrawer__footerButtons">
                                <Col
                                    span={4}
                                    className="editBlaDrawer__cancelButton"
                                >
                                    <CustomButton
                                        type={'Cancel'}
                                        disabled={false}
                                        handleClick={() => {
                                            setEditState(false);
                                        }}
                                    />
                                </Col>
                                <Col
                                    span={4}
                                    className="editBlaDrawer__saveButton"
                                >
                                    <CustomButton
                                        type={'Save'}
                                        disabled={false}
                                        typeOfButton={'submit'}
                                        handleClick={() => {
                                            saveDetails();
                                        }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    )}
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
                            activateDeactivateBlas({
                                id: [blaDetails?.blaId],
                                active: true,
                                updatedBy: details.username,
                            })
                        );
                    } else if (confirmModalState === 'deactivate') {
                        dispatch(
                            activateDeactivateBlas({
                                id: [blaDetails?.blaId],
                                active: false,
                                updatedBy: details.username,
                            })
                        );
                    }
                    setSuccessModalState(`${confirmModalState}`);
                    setConfirmModalState(null);
                }}
                onCancel={() => {
                    setConfirmModalState(null);
                }}
                text={
                    blaDetails?.activeDevicesCount &&
                    confirmModalState === 'deactivate'
                        ? t('deviceMang.bla.deactivatingBla')
                        : `${t(
                              'commonStr.areyouSureWant'
                          )} ${confirmModalState}  ${t(
                              'commonStr.selectedBla'
                          )}`
                }
            />
        </>
    );
};

export default EditBla;
