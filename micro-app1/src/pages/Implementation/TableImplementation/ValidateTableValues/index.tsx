import { Button, Col, Divider, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { BUTTONTYPE } from 'types/enums';
import { useEffect, useState } from 'react';
import ConfirmationModal from 'components/common/Modals/ConfirmationModal';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/questionMark.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTableValues,
    validateTable,
} from 'redux/actions/ImplementationActions/tableActions';
import { parseJwt } from 'utils/jwtTokenFunction';
import ValidateTable from './ValidateTable';
import { ReactComponent as BackIcon } from 'assets/icons/backIcon.svg';
import { RESET_VALIDATE_TABLE_STATUS } from 'redux/types/implementationTypes';
import { useTranslation } from 'react-i18next';
const ValidateTableValues: React.FC<any> = ({
    setShowTableDetails,
    selectedTable,
}) => {
    const { t } = useTranslation('translation');
    const dispatch = useDispatch();
    const details = parseJwt();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [count, setCount] = useState(1);

    const selectedAsset = useSelector(
        (state: any) => state?.implementation?.attribute?.selectedAsset
    );
    const tableColumnList = useSelector(
        (state: any) => state?.implementation?.table?.tableColumnsList
    );
    const tableValidated = useSelector(
        (state: any) => state?.implementation?.table?.tableValidated
    );

    useEffect(() => {
        dispatch(
            getTableValues({
                assetId: selectedAsset?.key,
                tableId: selectedTable?.id,
            })
        );
    }, []);
    useEffect(() => {
        tableValidated &&
            setShowTableDetails(null) &&
            setIsSaveModalOpen(false);
        dispatch({ type: RESET_VALIDATE_TABLE_STATUS });
    }, [tableValidated]);

    const handleAdd = (): any => {
        const newData: any = {};
        tableColumnList?.map((item: any) => {
            newData[item.columnName] = '';
        });
        newData.key = count;
        newData.error = false;
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleValidate = (): any => {
        const tempdataList = dataSource?.map((obj) => {
            const { key, error, ...rest } = obj;
            return rest;
        });
        dispatch(
            validateTable({
                rowDataList: tempdataList,
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
                                setShowTableDetails(null);
                            }}
                        />
                        <span className="fw-500 fs-16 tableImplementation__assignText">
                            {`${t('implementation.validate')} ${
                                selectedTable?.name
                            }`}
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
                    <ValidateTable
                        dataSource={dataSource}
                        setDataSource={setDataSource}
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
                                    setShowTableDetails(null);
                                }}
                            />
                        </Col>
                        <Col span={4} className="saveBtn">
                            <CustomButton
                                type={BUTTONTYPE.save}
                                disabled={
                                    !dataSource.length ||
                                    dataSource?.some((obj) =>
                                        Object.values(obj).some(
                                            (value) => value === ''
                                        )
                                    ) ||
                                    dataSource?.some(
                                        (obj) => obj.error === true
                                    )
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
                        handleValidate();
                    }}
                    onCancel={() => {
                        setIsSaveModalOpen(false);
                    }}
                    text={t('implementation.table.validateTableModalText')}
                />
            )}
        </>
    );
};
export default ValidateTableValues;
