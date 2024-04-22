import { Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import './index.scss';
import CustomButton from 'components/common/CustomButton';
import { cancelHandle, modalShow, okHandle } from 'utils/modalFunction';
import CustomModal from 'components/common/Modals/CustomModal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DATE_FORMAT } from 'utils/constants';
import {
    getAllReasonCode,
    setReasoncode,
} from 'redux/actions/ReasonCodeActions/reasonCodeActions';
import ReasonCodeModal from '../ReasonCodeModal';
import { reasonCodeLanguage } from 'types/enums';
import { reasonCodeMarathiLanguage } from 'types/enums/reasonCodeMarathiLanguage';

const ReasonCodeTable: React.FC<any> = ({
    data,
    payload,
    filter,
    setPage,
    languageState,
}) => {
    const [tableData, setTableData] = useState<any>([]);
    const downTimesDataLoading = useSelector(
        (state: any) => state.reasonCode?.downTimesListLoading
    );

    const reasonCodeList = useSelector(
        (state: any) => state.reasonCode?.reasonCode
    );

    const dispatch = useDispatch();
    const [modalLanguageState, setModalLanguageState] = useState<any>(
        reasonCodeLanguage?.MARATHI
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDownTimeData, setSelectedDownTimeData] = useState<any>(null);
    const [reasonCodeId, setReasonCodeId] = useState<any>(null);

    const durationCalculator = (record: any): string => {
        const startTimestamp = moment(record?.startTimestamp, DATE_FORMAT);
        const endTimestamp = moment(record?.endTimestamp, DATE_FORMAT);

        // Calculate the difference in milliseconds
        const diffInMilliseconds = endTimestamp.diff(startTimestamp);

        // Convert the difference to hours, minutes, and seconds
        const diffDuration = moment.duration(diffInMilliseconds);

        // Format the difference as "HH:mm:ss"
        const hours = Math.floor(diffDuration.asHours())
            .toString()
            .padStart(2, '0');
        const minutes = moment.utc(diffInMilliseconds).format('mm');
        const seconds = moment.utc(diffInMilliseconds).format('ss');

        const formattedDiff = `${hours}:${minutes}:${seconds}`;

        return formattedDiff;
    };

    const onOkHandler = (): any => {
        dispatch(
            setReasoncode({
                downTimeDetailsId: Number(
                    selectedDownTimeData?.stoppageEventId
                ),
                reasonCodeId: Number(reasonCodeId),
            })
        );
        setSelectedDownTimeData(null);
        setReasonCodeId(null);
        setIsModalOpen(false);
    };

    const onCancelHandler = (): any => {
        setSelectedDownTimeData(null);
        setReasonCodeId(null);
        cancelHandle(isModalOpen, setIsModalOpen);
    };

    const [isSaveDisable, setIsSaveDisable] = useState(true);

    useEffect(() => {
        if (reasonCodeId) {
            if (isSaveDisable) {
                setIsSaveDisable(false);
            }
        } else {
            if (!isSaveDisable) {
                setIsSaveDisable(true);
            }
        }
    }, [reasonCodeId]);

    const tableDataMapper = (): [] => {
        const temp: any = [];
        data?.map((item: any, index: number) => {
            temp.push({
                ...item,
                key: item.id,
                startTime: moment(item?.startTimestamp).format(DATE_FORMAT),
                endTime: moment(item?.endTimestamp).format(DATE_FORMAT),
            });
        });
        return temp;
    };
    useEffect(() => {
        setTableData(tableDataMapper());
    }, [data]);

    const onAssignReasonCodeHandler = (record: any): any => {
        dispatch(getAllReasonCode());
        setSelectedDownTimeData(record);
        modalShow(isModalOpen, setIsModalOpen);
    };

    const TableColumns = [
        {
            key: 'reasonCode',
            className: 'column__reasonCode',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>
                        {languageState === reasonCodeLanguage.MARATHI
                            ? reasonCodeMarathiLanguage?.reasonCode?.marathiName
                            : reasonCodeMarathiLanguage?.reasonCode?.name}
                    </div>
                </div>
            ),
            dataIndex: 'reasonCode',
            render: (_: any, record: any) => (
                <>
                    <div className="userTableWrapper__reasonCode">
                        {record.reasonCodeName ? (
                            languageState === reasonCodeLanguage.MARATHI ? (
                                record?.reasonCodeMarathiName
                            ) : (
                                record?.reasonCodeName
                            )
                        ) : (
                            <div className="button__reasonCode">
                                {' '}
                                <CustomButton
                                    type={
                                        languageState ===
                                        reasonCodeLanguage.MARATHI
                                            ? reasonCodeMarathiLanguage
                                                  ?.enterReasonCode?.marathiName
                                            : reasonCodeMarathiLanguage
                                                  ?.enterReasonCode?.name
                                    }
                                    disabled={false}
                                    handleClick={() => {
                                        onAssignReasonCodeHandler(record);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </>
            ),
        },
        {
            key: 'startTime',
            className: 'column__startTime',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>
                        {languageState === reasonCodeLanguage.MARATHI
                            ? reasonCodeMarathiLanguage?.startTime?.marathiName
                            : reasonCodeMarathiLanguage?.startTime?.name}
                    </div>
                </div>
            ),
            dataIndex: 'startTime',
            render: (_: any, record: any) => (
                <>
                    <div className="userTableWrapper__startTime">
                        {record?.startTimestamp
                            ? moment(record?.startTimestamp).format(DATE_FORMAT)
                            : '--'}
                    </div>
                </>
            ),
        },
        {
            key: 'endTime',
            className: 'column__endTime',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>
                        {languageState === reasonCodeLanguage.MARATHI
                            ? reasonCodeMarathiLanguage?.endTime?.marathiName
                            : reasonCodeMarathiLanguage?.endTime?.name}
                    </div>
                </div>
            ),
            dataIndex: 'endTime',
            render: (_: any, record: any) => (
                <>
                    <div className="userTableWrapper__endTime">
                        {record?.endTimestamp
                            ? moment(record?.endTimestamp).format(DATE_FORMAT)
                            : '--'}
                    </div>
                </>
            ),
        },
        {
            key: 'duration',
            className: 'column__duration',
            title: (
                <div className="userTableWrapper__columnTitle">
                    <div>
                        {languageState === reasonCodeLanguage.MARATHI
                            ? reasonCodeMarathiLanguage?.duration?.marathiName
                            : reasonCodeMarathiLanguage?.duration?.name}
                    </div>
                </div>
            ),
            dataIndex: 'duration',
            render: (_: any, record: any) => (
                <>
                    <div className="userTableWrapper__duration">
                        {record?.endTimestamp
                            ? durationCalculator(record)
                            : '--'}
                    </div>
                </>
            ),
        },
    ];
    return (
        <>
            {downTimesDataLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <div className="reasonCodeTableWrapper">
                    <Table
                        pagination={false}
                        columns={TableColumns}
                        dataSource={tableData}
                    />
                </div>
            )}
            <CustomModal
                customClassName="reasonCodeModal"
                open={isModalOpen}
                footer={true}
                onOk={() => {
                    okHandle(isModalOpen, setIsModalOpen);
                }}
                onCancel={onCancelHandler}
            >
                {!selectedDownTimeData ? (
                    <div className="view__loader">
                        <Spin />
                    </div>
                ) : (
                    <div>
                        <ReasonCodeModal
                            reasonCodeData={reasonCodeList.reduce(
                                (acc: any, curr: any) => {
                                    return acc.concat(curr.reasonCodes);
                                },
                                []
                            )}
                            setReasonCodeId={setReasonCodeId}
                            reasonCodeId={reasonCodeId}
                            modalLanguageState={modalLanguageState}
                            setModalLanguageState={setModalLanguageState}
                        />
                        <div className="reasonCodeModal__footerWrapper">
                            <div className="reasonCodeModal__footerContent">
                                <CustomButton
                                    type={
                                        modalLanguageState ===
                                        reasonCodeLanguage?.MARATHI
                                            ? reasonCodeMarathiLanguage?.Back
                                                  ?.marathiName
                                            : reasonCodeMarathiLanguage?.Back
                                                  ?.name
                                    }
                                    disabled={false}
                                    handleClick={onCancelHandler}
                                />
                                <CustomButton
                                    type={
                                        modalLanguageState ===
                                        reasonCodeLanguage?.MARATHI
                                            ? reasonCodeMarathiLanguage?.Submit
                                                  ?.marathiName
                                            : reasonCodeMarathiLanguage?.Submit
                                                  ?.name
                                    }
                                    typeOfButton="submit"
                                    disabled={isSaveDisable}
                                    handleClick={() => onOkHandler()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </CustomModal>
        </>
    );
};
export default ReasonCodeTable;
