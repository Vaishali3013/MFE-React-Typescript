import { Card, Col, Radio, Row, Select, Spin } from 'antd';
import './index.scss';
import ScreenNameHeading from 'components/common/ScreenNameHeading';
import DataModel from './DataModel';
import ReasonCodeTable from './ReasonCodeTable';
import { useEffect, useState } from 'react';
import CustomPagination from 'components/common/CustomPagination';
import { PAGE, PAGE_SIZE } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllDownTimes,
    getReasonCodeNodeDetails,
} from 'redux/actions/ReasonCodeActions/reasonCodeActions';
import { reasonCodeFilterOptions, reasonCodeLanguage } from 'types/enums';
import { reasonCodeMarathiLanguage } from 'types/enums/reasonCodeMarathiLanguage';

const ReasonCode: React.FC = () => {
    const [page, setPage] = useState<number>(PAGE);
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
    const [assetId, setAssetId] = useState<any>(null);
    const dispatch = useDispatch();
    const downTimesData = useSelector(
        (state: any) => state?.reasonCode?.downTimesList
    );
    const [filterState, setFilterState] = useState(reasonCodeFilterOptions.ALL);

    const downTimesDataLoading = useSelector(
        (state: any) => state?.reasonCode?.downTimesListLoading
    );

    const createReasonCodeResponse = useSelector(
        (state: any) => state?.reasonCode?.createReasonCode
    );

    const nodeDetails = useSelector(
        (state: any) => state?.reasonCode?.nodeDetails
    );

    const nodeDetailsLoading = useSelector(
        (state: any) => state?.reasonCode?.nodeDetailsLoading
    );

    const [languageState, setLanguageState] = useState<any>(
        reasonCodeLanguage?.MARATHI
    );

    const handleChange = (value: any): any => {
        setFilterState(value);
        dispatch(
            getAllDownTimes({
                page,
                pageSize,
                assetId: assetId,
                assignFilterId: value,
            })
        );
        setPage(PAGE);
        setPageSize(PAGE_SIZE);
    };

    useEffect(() => {
        if (assetId) {
            dispatch(
                getAllDownTimes({
                    page,
                    pageSize,
                    assetId: assetId,
                    assignFilterId: filterState,
                })
            );
        }
    }, [page, pageSize, assetId]);

    useEffect(() => {
        createReasonCodeResponse &&
            dispatch(
                getAllDownTimes({
                    page,
                    pageSize,
                    assetId: assetId,
                    assignFilterId: filterState,
                })
            );
    }, [createReasonCodeResponse]);

    useEffect(() => {
        setFilterState(reasonCodeFilterOptions.ALL);
        dispatch(getReasonCodeNodeDetails());
        dispatch(
            getAllDownTimes({
                page,
                pageSize,
                assetId: assetId,
                assignFilterId: reasonCodeFilterOptions.ALL,
            })
        );
    }, [assetId]);

    return (
        <>
            {nodeDetailsLoading ? (
                <div className="view__loader">
                    <Spin />
                </div>
            ) : (
                <div className="reasonCode">
                    <Row className="reasonCode__headerWrapper">
                        <Col span={24}>
                            <ScreenNameHeading
                                heading={'Reason Code Selection'}
                                subHeading={
                                    'You can Define, Edit or Deactivate Data Models.'
                                }
                            />
                        </Col>
                    </Row>
                    <div className="reasonCode__content">
                        <Card bordered={false} className="reasonCode__card">
                            <Row className="reasonCode__data">
                                <Col span={4} className="reasonCode__dataModel">
                                    <DataModel
                                        languageState={languageState}
                                        dataModel={
                                            nodeDetails?.node?.childNodes
                                        }
                                        setAssetId={setAssetId}
                                        assetId={assetId}
                                    />
                                </Col>
                                <Col
                                    span={20}
                                    className="reasonCode__tableWrapper"
                                >
                                    <div className="reasonCode__tableHeaderWrapper">
                                        <Select
                                            defaultValue="all-stoppage"
                                            style={{ width: 195 }}
                                            onChange={handleChange}
                                            key={assetId}
                                            value={filterState}
                                            options={[
                                                {
                                                    value: reasonCodeFilterOptions.ALL,
                                                    label: `${
                                                        languageState ===
                                                        reasonCodeLanguage.MARATHI
                                                            ? reasonCodeMarathiLanguage
                                                                  ?.AllStoppages
                                                                  ?.marathiName
                                                            : reasonCodeMarathiLanguage
                                                                  ?.AllStoppages
                                                                  ?.name
                                                    }`,
                                                },
                                                {
                                                    value: reasonCodeFilterOptions.UNASSIGNED,
                                                    label: `${
                                                        languageState ===
                                                        reasonCodeLanguage.MARATHI
                                                            ? reasonCodeMarathiLanguage
                                                                  ?.UnassignedStoppages
                                                                  ?.marathiName
                                                            : reasonCodeMarathiLanguage
                                                                  ?.UnassignedStoppages
                                                                  ?.name
                                                    }`,
                                                },
                                                {
                                                    value: reasonCodeFilterOptions.ASSIGNED,
                                                    label: `${
                                                        languageState ===
                                                        reasonCodeLanguage.MARATHI
                                                            ? reasonCodeMarathiLanguage
                                                                  ?.AssignedStoppages
                                                                  ?.marathiName
                                                            : reasonCodeMarathiLanguage
                                                                  ?.AssignedStoppages
                                                                  ?.name
                                                    }`,
                                                },
                                            ]}
                                        />
                                        <div>
                                            <Radio.Group
                                                value={languageState}
                                                onChange={(e: any) => {
                                                    setLanguageState(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                <Radio.Button
                                                    value={
                                                        reasonCodeLanguage.MARATHI
                                                    }
                                                >
                                                    {reasonCodeLanguage.MARATHI}
                                                </Radio.Button>
                                                <Radio.Button
                                                    value={
                                                        reasonCodeLanguage.ENGLISH
                                                    }
                                                >
                                                    {reasonCodeLanguage.ENGLISH}
                                                </Radio.Button>
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    {downTimesDataLoading ? (
                                        <div className="view__loader">
                                            <Spin />
                                        </div>
                                    ) : (
                                        <Row
                                            className={
                                                downTimesData?.totalRecords > 50
                                                    ? 'reasonCodeWrapper__downTimeListPagination'
                                                    : 'reasonCodeWrapper__downTimeList'
                                            }
                                        >
                                            <Col span={24}>
                                                <ReasonCodeTable
                                                    languageState={
                                                        languageState
                                                    }
                                                    data={
                                                        downTimesData?.records
                                                    }
                                                    payload={{ page, pageSize }}
                                                    filter={filterState}
                                                    setPage={setPage}
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                    {downTimesDataLoading?.totalRecords > 50 ? (
                                        <CustomPagination
                                            totalRecords={
                                                downTimesDataLoading?.totalRecords
                                            }
                                            setPage={setPage}
                                            page={page}
                                            setPageSize={setPageSize}
                                            pageSize={pageSize}
                                            isPositionFixed={true}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
};
export default ReasonCode;
