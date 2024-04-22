import { ReactComponent as BackIcon } from 'assets/icons/grey-arrow-back.svg';
import './index.scss';
import { Button, Input, Select, notification } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import KpiViewGridPage from '../KpiViewGridPage';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCalculationCycleList,
    getKpiDetail,
    setKpiImplState,
    setValidate,
} from 'redux/actions/KpisActions/kpiImplementationActions';
import { KPIIMPLEMENTATION } from 'types/enums';
import dayjs from 'dayjs';
import { VALIDATE_STATE_UPDATE } from 'redux/types/kpiTypes';

const options = [
    { label: 'All', value: 'all' },
    { label: 'All Validated', value: 'all-validated' },
    { label: 'All Ready to Validate', value: 'all-ready-to-validate' },
    { label: 'None', value: 'none' },
];

const KpiViewPage: React.FC = () => {
    const [searchState, setSearchState] = useState('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [radioDropdownOpen, setRadioDropdownOpen] = useState(false);
    const [assetList, setAssetList] = useState<number[]>([]);
    const [searchList, setSearchList] = useState<number[]>([]);
    const [reloadKey, setReloadKey] = useState(0);
    const [selectValidate, setSelectValidate] = useState(0);

    const dispatch = useDispatch();
    const kpiDetail = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.KpiDetailsData
    );
    const kpiValidated = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.kpiValidated
    );
    useEffect(() => {
        if (kpiValidated && selectValidate) {
            const validateStatusArray: any[] = [];
            assetList?.map((item: any) => {
                if (item?.node?.id === selectValidate) {
                    validateStatusArray.push({
                        ...item,
                        isValid: true,
                    });
                } else {
                    validateStatusArray.push({
                        ...item,
                    });
                }
            });
            setAssetList(validateStatusArray);
        } else if (kpiValidated && selectValidate === 0) {
            const validateStatusArray: any[] = [];
            assetList?.map((item: any) => {
                if (item?.checked) {
                    validateStatusArray.push({
                        ...item,
                        isValid: true,
                    });
                } else {
                    validateStatusArray.push({
                        ...item,
                    });
                }
            });
            setAssetList(validateStatusArray);
        }
        dispatch({ type: VALIDATE_STATE_UPDATE });
    }, [kpiValidated]);

    useEffect(() => {
        dispatch(getCalculationCycleList());
    }, []);
    useEffect(() => {
        reloadKey && dispatch(getKpiDetail(kpiDetail?.id));
    }, [reloadKey]);
    useEffect(() => {
        const assetListArray = kpiDetail?.validateKpiResponses?.map(
            (item: any) => {
                return {
                    ...item,
                    calculationCycle: item?.calculationCycle?.id ?? 0,
                    validFrom: item?.validFrom
                        ? dayjs(item?.validFrom * 1000)
                        : '',
                };
            }
        );
        setAssetList(assetListArray);
    }, [kpiDetail]);

    useEffect(() => {
        const searchArray = assetList?.filter((item: any) =>
            item?.node?.name
                ?.toLowerCase()
                ?.includes(searchState?.toLowerCase())
        );
        setSearchList(searchArray);
    }, [searchState, assetList]);

    useEffect(() => {
        const checkSelectArray: any[] = [];
        if (selectedOption === 'all') {
            assetList?.map((item: any) => {
                checkSelectArray.push({
                    ...item,
                    checked: true,
                });
            });
        } else if (selectedOption === 'all-ready-to-validate') {
            assetList?.map((item: any) => {
                if (item?.isValid)
                    checkSelectArray.push({
                        ...item,
                        checked: false,
                    });
                else {
                    checkSelectArray.push({
                        ...item,
                        checked: true,
                    });
                }
            });
        } else if (selectedOption === 'all-validated') {
            assetList?.map((item: any) => {
                if (item?.isValid)
                    checkSelectArray.push({
                        ...item,
                        checked: true,
                    });
                else {
                    checkSelectArray.push({
                        ...item,
                        checked: false,
                    });
                }
            });
        } else {
            assetList?.map((item: any) => {
                checkSelectArray.push({
                    ...item,
                    checked: false,
                });
            });
        }
        setAssetList(checkSelectArray);
    }, [selectedOption]);

    const onOpenChange = (openStatus: any): any => {
        setRadioDropdownOpen(openStatus);
    };

    const handleDropdownChange = (key: any): void => {
        setSelectedOption(key);
    };

    const handleReload = (): any => {
        // Note:- To Reload the list when key changes
        setReloadKey(reloadKey + 1);
        setSelectedOption(null);
    };

    const handleValidateSelected = (): any => {
        // Filter out null entries from assetList
        setSelectValidate(0);
        const filteredData = assetList
            .filter((item: any) => item?.checked)
            ?.map((item: any) => {
                return {
                    id: 0,
                    nodeId: item?.node?.id,
                    calculationCycleId: item?.calculationCycle,
                    fromValidate:
                        item?.validFrom !== ''
                            ? item?.validFrom?.$d?.valueOf() / 1000 // Note- To convert timestamp to seconds for epoch value
                            : '',
                    isActive: item?.isActive,
                };
            });
        if (
            filteredData.some((data: any) => {
                return (
                    data?.calculationCycleId === 0 || data?.fromValidate === ''
                );
            })
        ) {
            notification.error({
                message: 'Fields are not selected',
                duration: 3,
                description:
                    'Calculation Cycle & Valid From are not selected, Kindly select these field and try again.',
                placement: 'top',
                style: {
                    backgroundColor: '#fff1f0',
                    border: '1px solid #FFCCC7',
                },
            });
        } else if (filteredData?.length > 0) {
            dispatch(
                setValidate({
                    kpiEngineId: kpiDetail?.id,
                    validateKpiReqList: filteredData,
                })
            );
        }
    };

    return (
        <>
            {kpiDetail && (
                <div className="viewPageKpiImplementationWrapper">
                    <div className="viewPageKpiImplementationWrapper__header">
                        <BackIcon
                            className="viewPageKpiImplementationWrapper__backBtn"
                            onClick={() => {
                                dispatch(
                                    setKpiImplState(KPIIMPLEMENTATION.display)
                                );
                            }}
                        />
                        <span className="viewPageKpiImplementationWrapper__headerName">
                            {kpiDetail?.name}
                        </span>
                    </div>
                    <div className="viewPageKpiImplementationWrapper__formula">
                        <span className="viewPageKpiImplementationWrapper__formulaBlue">
                            comp
                        </span>{' '}
                        <span className="viewPageKpiImplementationWrapper__formulaBold">
                            :=
                        </span>{' '}
                        (
                        <span className="viewPageKpiImplementationWrapper__formulaBlue">
                            avg
                        </span>
                        ([
                        <span className="viewPageKpiImplementationWrapper__formulaRed">
                            SEPARATOR_1-BOTTOM_REWINDER_TENSION
                        </span>
                        ]) -{' '}
                        <span className="viewPageKpiImplementationWrapper__formulaBlue">
                            avg
                        </span>
                        ([
                        <span className="viewPageKpiImplementationWrapper__formulaRed">
                            SEPARATOR_1-BOTTOM_REWINDER_TENSION_SET
                        </span>
                        ])) /{' '}
                        <span className="viewPageKpiImplementationWrapper__formulaBlue">
                            avg
                        </span>
                        ([
                        <span className="viewPageKpiImplementationWrapper__formulaRed">
                            SEPARATOR_1.BOTTOM_REWINDER_TENSION_SET
                        </span>
                        ])
                    </div>
                    <div className="viewPageKpiImplementationWrapper__subheading">
                        Assets List according to Node Level
                    </div>
                    <div className="viewPageKpiImplementationWrapper__searchWrapper">
                        <div className="viewPageKpiImplementationWrapper__search">
                            <Input
                                allowClear
                                className="kpiImplementationListWrapper__search"
                                placeholder="Search Assets"
                                prefix={<SearchOutlined />}
                                value={searchState}
                                onChange={(e) => {
                                    setSearchState(e.target.value);
                                }}
                                // preventing white spaces at start during search
                                onKeyDown={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    if (
                                        e.keyCode === 32 &&
                                        target.selectionStart === 0
                                    ) {
                                        e.preventDefault();
                                        setSearchState((prevSearchState) =>
                                            prevSearchState.trimStart()
                                        );
                                    }
                                }}
                            />
                            <Select
                                className="viewPageKpiImplementationWrapper__dropdown"
                                open={radioDropdownOpen}
                                value={selectedOption}
                                onChange={handleDropdownChange}
                                onDropdownVisibleChange={onOpenChange}
                                placeholder="Select"
                                options={options}
                            />
                        </div>
                        <div className="viewPageKpiImplementationWrapper__reload">
                            <div>
                                <Button
                                    className="viewPageKpiImplementationWrapper__reloadButton"
                                    onClick={() => {
                                        handleReload();
                                    }}
                                >
                                    Reload
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="viewPageKpiImplementationWrapper__validateSelectedButton"
                                    type="primary"
                                    onClick={() => handleValidateSelected()}
                                >
                                    Validate Selected
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="viewPageKpiImplementationWrapper__cardWrapper"
                        style={{
                            overflowY: 'auto',
                            maxHeight: 'calc(100vh - 372px)',
                        }}
                    >
                        {searchState?.length > 0 ? (
                            <>
                                {searchList?.map((item: any) => {
                                    return (
                                        <KpiViewGridPage
                                            key={`${item?.node?.id}_${reloadKey}_${item?.id}`}
                                            kpiId={kpiDetail?.id}
                                            data={item}
                                            setAssetList={setAssetList}
                                            assetList={assetList}
                                            setSelectValidate={
                                                setSelectValidate
                                            }
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {assetList?.map((item: any) => {
                                    return (
                                        <KpiViewGridPage
                                            key={`${item?.node?.id}_${reloadKey}_${item?.id}`}
                                            kpiId={kpiDetail?.id}
                                            data={item}
                                            setAssetList={setAssetList}
                                            assetList={assetList}
                                            setSelectValidate={
                                                setSelectValidate
                                            }
                                        />
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
export default KpiViewPage;
