import { Button, Col, Divider, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { BUTTONTYPE, implementationTableState } from 'types/enums';
import { useEffect, useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    editTable,
    getTableValues,
} from 'redux/actions/ImplementationActions/tableActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import EditTable from './EditTable';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { RESET_VALIDATE_TABLE_STATUS } from 'redux/types/implementationTypes';
import { useTranslation } from 'react-i18next';
const EditTableValues: React.FC<any> = ({
    setShowTableDetails,
    selectedTable,
}) => {
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const details = parseJwt();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [editedData, setEditedData] = useState<any[]>([]);
    const [deletedList, setDeletedList] = useState<any[]>([]);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [count, setCount] = useState(1);

    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const tableColumnList = useSelector(
        (state: any) => state?.implementation?.table?.tableColumnsList
    );
    const tableUpdated = useSelector(
        (state: any) => state?.implementation?.table?.tableUpdated
    );
    const tableValuesList = useSelector(
        (state: any) => state?.implementation?.table?.tableValuesList?.records
    );

    useEffect(() => {
        dispatch(
            getTableValues({
                assetId: selectedAsset?.key,
                tableId: selectedTable?.id,
                isPaginationRequired: false,
            })
        );
    }, []);
    useEffect(() => {
        setCount(
            tableValuesList[tableValuesList?.length - 1]?.row_sequence_id + 1
        );
    }, [tableValuesList]);
    useEffect(() => {
        tableUpdated &&
            setShowTableDetails(implementationTableState.VIEW) &&
            setIsSaveModalOpen(false);
        dispatch({ type: RESET_VALIDATE_TABLE_STATUS });
    }, [tableUpdated]);

    const handleAdd = (): any => {
        const newData: any = {};
        tableColumnList?.map((item: any) => {
            newData[item.columnName] = '';
        });

        newData.key = count;
        newData.error = false;
        setDataSource([...dataSource, newData]);
        setEditedData([...editedData, newData]);
        setCount(count + 1);
    };

    const handleEdit = (): any => {
        const tempdataList = editedData?.map((obj) => {
            const { key, error, ...rest } = obj;
            return rest;
        });
        dispatch(
            editTable({
                rowDataList: tempdataList,
                deleteRowSequenceList: deletedList,
                assetId: selectedAsset?.key,
                tableId: selectedTable?.id,
                requestedBy: details?.username,
            })
        );
    };

    return (
        <>
            <div className="tableImplementation">
                <Row className="tableImplementation__header">
                    <Col span={20}>
                        <BackIcon
                            className="tableImplementation__backIcon"
                            onClick={() => {
                                setShowTableDetails(
                                    implementationTableState.VIEW
                                );
                            }}
                        />
                        <span className="fw-500 fs-16 tableImplementation__assignText">
                            {`${t('commonStr.edit')} ${selectedTable?.name}`}
                        </span>
                    </Col>
                    <Col span={4}>
                        <div className="newRowBtn">
                            <Button
                                type="primary"
                                ghost
                                onClick={() => {
                                    handleAdd();
                                }}
                                icon={<PlusOutlined />}
                            >
                                New Row
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Divider />
                <div className="tableImplementationTable">
                    <EditTable
                        dataSource={dataSource}
                        setDataSource={setDataSource}
                        editedData={editedData}
                        setEditedData={setEditedData}
                        deletedList={deletedList}
                        setDeletedList={setDeletedList}
                    />
                </div>
                <div className="tableImplementationFooter">
                    <Divider />
                    <Row className="tableImplementationFooter__btns">
                        <Col span={4} className="cancelBtn">
                            <CustomButton
                                type={BUTTONTYPE.cancel}
                                disabled={false}
                                handleClick={() => {
                                    setShowTableDetails(
                                        implementationTableState.VIEW
                                    );
                                }}
                            />
                        </Col>
                        <Col span={4} className="saveBtn">
                            <CustomButton
                                type={BUTTONTYPE.save}
                                disabled={
                                    !deletedList?.length &&
                                    !editedData?.length ||
                                    !dataSource?.length ||
                                    dataSource?.some((obj) =>
                                        Object.values(obj).some(
                                            (value) => value === ''
                                        )
                                    ) ||
                                    dataSource.some((obj) => obj.error === true)
                                }
                                typeOfButton={'submit'}
                                handleClick={() => {
                                    setIsSaveModalOpen(true);
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            {isSaveModalOpen && (
                <ConfirmationModal
                    customClassName="confirmationModal tableImplementationModal"
                    icon={<QuestionMarkIcon />}
                    open={isSaveModalOpen}
                    onOk={() => {
                        handleEdit();
                    }}
                    onCancel={() => {
                        setIsSaveModalOpen(false);
                    }}
                    text={t('implementation.table.updateChangesModalText')}
                />
            )}
        </>
    );
};
export default EditTableValues;
