import React, { useEffect, useState } from 'react';
import CustomListItem from './CustomListItem';
import { Collapse } from 'antd';
import { type CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { findValueByKey } from 'utils/commonFunction';
import { updateParameters } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { DataManipulation } from 'types/enums';

const APHPerformanceComponent: React.FC<any> = ({
    uniqueColors,
    airIn,
    airOut,
    gasIn,
    gasOut,
    parametersSelector,
    onHeaderCheckboxChange,
    aphHeaderCheck,
    onIndividualCheckBoxChange,
    checkBox,
    setParametersSelector,
}) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const parametersValue = useSelector(
        (state: any) => state?.nocilDashboard?.parameters
    );
    const [headerCheckbox, setHeaderCheckbox] = useState(false);

    const [aphPerformanceChecked, setAphPerformanceChecked] = useState<any>([
        { airInlet: false, id: KPIDataId.aphAirInletTemp },
        { airoutlet: false, id: KPIDataId.aphAirOuletTemp },
        { flueGasInlet: false, id: KPIDataId.aphFuelGasInletTemp },
        { flueGasOutlet: false, id: KPIDataId.aphFuelGasOuletTemp },
    ]);
    useEffect(() => {
        if (aphHeaderCheck === false) {
            setHeaderCheckbox(false);
        }
    }, [aphHeaderCheck]);

    useEffect(() => {
        if (checkBox === false) {
            const updatedCheckedValues = aphPerformanceChecked.map(
                (item: any) => {
                    return {
                        ...item,
                        [Object.keys(item)[0]]: false,
                    };
                }
            );
            setAphPerformanceChecked(updatedCheckedValues);
            dispatch(
                updateParameters(parametersValue, DataManipulation.Remove)
            );

            setSelectedIds([]);
        }
    }, [checkBox, aphPerformanceChecked]);

    const APHPerformance = [
        {
            checkedDefaultVal: findValueByKey(
                aphPerformanceChecked,
                'airInlet'
            ),
            name: 'airInlet',
            label: 'Air Inlet Temp',
            value: {
                textVal: airIn,
                colorVal: uniqueColors[8],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                aphPerformanceChecked,
                'airoutlet'
            ),

            name: 'airoutlet',
            label: 'Air Outlet Temp',
            value: {
                textVal: airOut,
                colorVal: uniqueColors[9],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                aphPerformanceChecked,
                'flueGasInlet'
            ),

            name: 'flueGasInlet',
            label: 'Flue Gas Inlet Temp',
            value: {
                textVal: gasIn,
                colorVal: uniqueColors[10],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                aphPerformanceChecked,
                'flueGasOutlet'
            ),

            name: 'flueGasOutlet',
            label: 'Flue Gas Outlet Temp',
            value: {
                textVal: gasOut,
                colorVal: uniqueColors[11],
            },
        },
    ];
    const checkedList: any = (): any => {
        const resultArray: any = [];
        APHPerformance.map((item) => {
            if (item.checkedDefaultVal)
                resultArray.push(item.checkedDefaultVal);
        });
        return resultArray;
    };
    const handleHeaderCheck = (): any => {
        if (
            checkedList().length > 0 &&
            checkedList().length < APHPerformance.length
        ) {
            setHeaderCheckbox(true);
            const updatedCheckedValues = aphPerformanceChecked?.map(
                (item: any) => {
                    return {
                        ...item,
                        [Object?.keys(item)[0]]: true,
                    };
                }
            );
            const idsArray = updatedCheckedValues?.map((obj: any) => obj?.id);
            const filteredArray = idsArray.filter(
                (element: any) => !parametersValue.includes(element)
            );
            dispatch(updateParameters(filteredArray, DataManipulation.Add));
            setAphPerformanceChecked(updatedCheckedValues);
            setSelectedIds([...updatedCheckedValues]);
        } else {
            setHeaderCheckbox(!headerCheckbox);
        }
    };

    const handleCheckboxChange =
        (keyName: string) => (event: CheckboxChangeEvent) => {
            const updatedState = aphPerformanceChecked.map((item: any) => {
                // eslint-disable-next-line no-prototype-builtins
                if (item.hasOwnProperty(keyName)) {
                    return { ...item, [keyName]: !item[keyName] }; // Toggle the value
                }
                return item;
            });
            const resultObject = aphPerformanceChecked.find((obj: any) =>
                // eslint-disable-next-line no-prototype-builtins
                obj.hasOwnProperty(keyName)
            );
            const idValue = resultObject ? resultObject.id : null;

            const operation = parametersValue.includes(idValue)
                ? DataManipulation.Remove
                : DataManipulation.Add;
            const updatedSelectedIds = event.target.checked
                ? [...selectedIds, idValue]
                : selectedIds.filter((id) => id !== idValue);
            setSelectedIds(updatedSelectedIds);
            dispatch(updateParameters([idValue], operation));
            setAphPerformanceChecked(updatedState);
            !event.target.checked && setParametersSelector(false);
        };
    useEffect(() => {
        onIndividualCheckBoxChange(true);
    }, [selectedIds]);
    useEffect(() => {
        if (parametersSelector) {
            setHeaderCheckbox(parametersSelector);
            const updatedCheckedValues = aphPerformanceChecked?.map(
                (item: any) => {
                    return {
                        ...item,
                        [Object?.keys(item)[0]]: true,
                    };
                }
            );
            const idsArray = updatedCheckedValues?.map((obj: any) => obj?.id);
            const filteredArray = idsArray.filter(
                (element: any) => !parametersValue.includes(element)
            );
            dispatch(updateParameters(filteredArray, DataManipulation.Add));
            setAphPerformanceChecked(updatedCheckedValues);
            setSelectedIds([...updatedCheckedValues]);
        }
    }, [parametersSelector]);
    useEffect(() => {
        const idsArray = aphPerformanceChecked.map((obj: any) => obj.id);
        if (headerCheckbox) {
            const filteredArray = idsArray.filter(
                (element: any) => !parametersValue.includes(element)
            );

            dispatch(updateParameters(filteredArray, DataManipulation.Add));
        } else {
            dispatch(updateParameters(idsArray, DataManipulation.Remove));
        }
        setAphPerformanceChecked([
            { airInlet: headerCheckbox, id: KPIDataId.aphAirInletTemp },
            { airoutlet: headerCheckbox, id: KPIDataId.aphAirOuletTemp },
            { flueGasInlet: headerCheckbox, id: KPIDataId.aphFuelGasInletTemp },
            {
                flueGasOutlet: headerCheckbox,
                id: KPIDataId.aphFuelGasOuletTemp,
            },
        ]);
        onHeaderCheckboxChange(headerCheckbox);
    }, [headerCheckbox]);

    const indeterminate =
        checkedList().length > 0 &&
        checkedList().length < APHPerformance.length;

    return (
        <Collapse accordion expandIconPosition="end" defaultActiveKey="1">
            <Panel
                header={
                    <CustomListItem
                        checked={
                            indeterminate
                                ? false
                                : headerCheckbox ||
                                  checkedList().length === APHPerformance.length
                        }
                        checkboxChange={handleHeaderCheck}
                        label="APH Performance"
                        value={headerCheckbox}
                        indeterminate={indeterminate}
                        parent={true}
                    />
                }
                key="1"
            >
                {APHPerformance.map((item, index) => (
                    <CustomListItem
                        key={item.name}
                        name={item.name}
                        label={item.label}
                        checked={item.checkedDefaultVal}
                        checkboxChange={handleCheckboxChange(item.name)}
                        value={item.value}
                    />
                ))}
            </Panel>
        </Collapse>
    );
};

export default APHPerformanceComponent;
