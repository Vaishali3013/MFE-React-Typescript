import {
    Button,
    Checkbox,
    DatePicker,
    Select,
    Switch,
    notification,
} from 'antd';
import './index.scss';
import { ReactComponent as GreenTick } from 'assets/icons/tick-circle-green.svg';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { type RangePickerProps } from 'antd/es/date-picker';
import '../../../../styles/_colorVariable.scss';
import { setValidate } from 'redux/actions/KpisActions/kpiImplementationActions';
import { dateFormat } from 'types/enums';

const KpiViewGridPage: React.FC<any> = ({
    data,
    assetList,
    setAssetList,
    kpiId,
    setSelectValidate,
}) => {
    const key = data?.node?.id;
    const dispatch = useDispatch();

    const kpiCalculationCycleList = useSelector(
        (state: any) => state.kpi?.kpiImplementation?.kpiCalculationCycleList
    );

    const handleValidate = (): any => {
        if (data?.calculationCycle !== 0 && data?.validFrom !== '') {
            dispatch(
                setValidate({
                    kpiEngineId: kpiId,
                    validateKpiReqList: [
                        {
                            id: 0,
                            nodeId: data?.node?.id,
                            calculationCycleId: data?.calculationCycle,
                            fromValidate: data?.validFrom?.$d?.valueOf() / 1000, // Note- To convert timestamp to seconds for epoch value
                            isActive: data?.isActive,
                        },
                    ],
                })
            );
        } else {
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
        }
        setSelectValidate(data?.node?.id);
    };

    const handleCopyToSelected = (rowIndex: any): any => {
        const valueObj = assetList?.filter(
            (item: any) => item?.node?.id === key
        );
        const updatedSelectedRows = assetList?.map((item: any) => {
            if (item?.checked) {
                return {
                    ...item,
                    calculationCycle: valueObj[0]?.calculationCycle,
                    validFrom: valueObj[0]?.validFrom,
                    isActive: valueObj[0]?.isActive,
                };
            } else {
                return {
                    ...item,
                };
            }
        });
        setAssetList(updatedSelectedRows);
    };
    const disabledDate: RangePickerProps['disabledDate'] = (current : any) => {
        // Can not select days before today
        return current && dayjs(current).isBefore(dayjs(), 'day');
    };
    const handleCheckboxChange = (checked: boolean, id: number): any => {
        const checkSelectArray: any[] = [];
        assetList?.map((item: any) => {
            if (item?.node?.id === id) {
                checkSelectArray.push({
                    ...item,
                    checked: checked,
                });
            } else {
                checkSelectArray.push({
                    ...item,
                });
            }
        });
        setAssetList(checkSelectArray);
    };

    const handleSelectCycleChange = (value: number): any => {
        const checkSelectArray: any[] = [];
        assetList?.map((item: any) => {
            if (item?.node?.id === key) {
                checkSelectArray.push({
                    ...item,
                    calculationCycle: value,
                });
            } else {
                checkSelectArray.push({
                    ...item,
                });
            }
        });
        setAssetList(checkSelectArray);
    };

    const handleToggleChange = (checked: boolean): any => {
        const checkSelectArray: any[] = [];
        assetList?.map((item: any) => {
            if (item?.node?.id === key) {
                checkSelectArray.push({
                    ...item,
                    isActive: checked,
                });
            } else {
                checkSelectArray.push({
                    ...item,
                });
            }
        });
        setAssetList(checkSelectArray);
    };

    const handleDateChange = (date: any, dateString: any): any => {
        const checkSelectArray: any[] = [];
        assetList?.map((item: any) => {
            if (item?.node?.id === key) {
                checkSelectArray.push({
                    ...item,
                    validFrom:
                        dateString !== ''
                            ? dayjs(dateString, dateFormat.formatWithoutTime)
                            : '',
                });
            } else {
                checkSelectArray.push({
                    ...item,
                });
            }
        });
        setAssetList(checkSelectArray);
    };

    const kpis = [
        { id: 1, name: 'KPI 1' },
        { id: 2, name: 'KPI 2' },
        { id: 3, name: 'KPI 3' },
    ];
    const attributes = [
        { id: 1, name: 'Attribute 1' },
        { id: 2, name: 'Attribute 2' },
        { id: 3, name: 'Attribute 3' },
    ];

    return (
        <div
            className="kpiGridViewWrapper"
            style={{ backgroundColor: data?.isValid ? 'var(--green-1)' : '' }}
        >
            <div>
                <div className="kpiGridViewWrapper__cardGrid">
                    <span className="kpiGridViewWrapper__checkbox">
                        <Checkbox
                            key={key}
                            checked={data?.checked}
                            onChange={(e) => {
                                handleCheckboxChange(e.target.checked, key);
                            }}
                        />
                    </span>
                    <span className="kpiGridViewWrapper__heading">
                        {data?.node?.name}
                    </span>
                    <span
                        className="kpiGridViewWrapper__state"
                        style={{
                            backgroundColor: data.isValid
                                ? 'var(--green-2)'
                                : '',
                            color: data.isValid ? 'var(--green-3)' : '',
                        }}
                    >
                        {data?.isValid ? 'Validated' : 'Pending'}
                    </span>
                </div>
                <div className="kpiGridViewWrapper__kpi">
                    <span className="kpiGridViewWrapper__headingKpi">
                        KPIs :
                    </span>
                    {kpis?.map((kpi) => (
                        <div
                            key={kpi?.id}
                            className="kpiGridViewWrapper__cardGridKpi"
                        >
                            <span className="kpiGridViewWrapper__icon">
                                <GreenTick /> {kpi?.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="kpiGridViewWrapper__attribute">
                    <span className="kpiGridViewWrapper__headingAttribute">
                        Attribute :
                    </span>
                    {attributes?.map((attribute) => (
                        <div
                            key={attribute?.id}
                            className="kpiGridViewWrapper__cardGridAttribute"
                        >
                            <span className="kpiGridViewWrapper__icon">
                                <GreenTick /> {attribute?.name}
                            </span>
                        </div>
                    ))}
                    <span className="kpiGridViewWrapper__viewMore">
                        View More
                    </span>
                </div>
            </div>
            <div className="kpiGridViewWrapper__dropdownWrapper">
                <div className="kpiGridViewWrapper__dropdown">
                    <Select
                        key={key}
                        style={{ width: '205px' }}
                        value={
                            data?.calculationCycle > 0
                                ? data?.calculationCycle
                                : 'Select Calculation Cycle'
                        }
                        onChange={(value) => {
                            handleSelectCycleChange(value);
                        }}
                        options={kpiCalculationCycleList?.map(
                            (item: { id: string; name: string }) => ({
                                value: item?.id,
                                label: item?.name,
                                key: item?.id,
                            })
                        )}
                    ></Select>
                </div>
                <div className="kpiGridViewWrapper__datePicker">
                    <DatePicker
                        key={key}
                        defaultValue={data?.validFrom ? data?.validFrom : ''}
                        format={dateFormat?.formatWithoutTime}
                        value={data?.validFrom}
                        style={{ width: '195px' }}
                        placeholder="Pick Date"
                        onChange={(date, dateString) =>
                            handleDateChange(date, dateString)
                        }
                        disabledDate={disabledDate}
                    />
                </div>
                <div className={'kpiGridViewWrapper__toggle'}>
                    <div
                        className={
                            data?.isActive
                                ? 'kpiGridViewWrapper__inactiveToggle'
                                : 'kpiGridViewWrapper__activeToggle'
                        }
                    >
                        Inactive{' '}
                    </div>
                    <Switch
                        key={key}
                        checked={data?.isActive}
                        onChange={handleToggleChange}
                        size="small"
                    />
                    <div
                        className={
                            data?.isActive
                                ? 'kpiGridViewWrapper__activeToggle'
                                : 'kpiGridViewWrapper__inactiveToggle'
                        }
                    >
                        Active
                    </div>
                </div>
            </div>
            <div className="kpiGridViewWrapper__copyWrapper">
                <div className="kpiGridViewWrapper__copyToClipBoard">
                    <Button key={key} onClick={() => handleCopyToSelected(key)}>
                        Copy to Selected
                    </Button>
                </div>
                <div className="kpiGridViewWrapper__validateButton">
                    <Button
                        className="viewPageKpiImplementationWrapper__validateSelectedButton"
                        type="primary"
                        onClick={() => handleValidate()}
                    >
                        Validate
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default KpiViewGridPage;
