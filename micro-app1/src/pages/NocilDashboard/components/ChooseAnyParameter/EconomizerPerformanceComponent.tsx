import React, { useEffect, useState } from 'react';
import CustomListItem from './CustomListItem';
import { Collapse } from 'antd';
import { type CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { findValueByKey } from 'utils/commonFunction';
import { updateParameters } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { DataManipulation } from 'types/enums';

const EconomizerPerformanceComponent: React.FC<any> = ({
    uniqueColors,
    fuelGasIn,
    fuelGasOut,
    waterIn,
    WaterOut,
    parametersSelector,
    onHeaderCheckboxChange,
    economizerHeaderCheck,
    onIndividualCheckBoxChange,
    checkBox,
    setParametersSelector,
}) => {
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const [headerCheckbox, setHeaderCheckbox] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [economizerPerformanceChecked, setEconomizerPerformanceChecked] =
        useState<any>([
            {
                flueGasInlet: false,
                id: KPIDataId.economizerFuelGasInletTemp,
            },
            {
                flueGasOutlet: false,
                id: KPIDataId.economizerFuelGasOuletTemp,
            },
            {
                waterInlet: false,
                id: KPIDataId.economizerWaterInletTemp,
            },
            {
                waterOutlet: false,
                id: KPIDataId.economizerWaterOuletTemp,
            },
        ]);
    const parametersValue = useSelector(
        (state: any) => state?.nocilDashboard?.parameters
    );
    useEffect(() => {
        if (economizerHeaderCheck === false) {
            setHeaderCheckbox(false);
        }
    }, [economizerHeaderCheck]);

    useEffect(() => {
        if (checkBox === false) {
            const updatedCheckedValues = economizerPerformanceChecked.map(
                (item: any) => {
                    return {
                        ...item,
                        [Object.keys(item)[0]]: false,
                    };
                }
            );
            setEconomizerPerformanceChecked(updatedCheckedValues);
            dispatch(
                updateParameters(parametersValue, DataManipulation.Remove)
            );

            setSelectedIds([]);
        }
    }, [checkBox, economizerPerformanceChecked]);

    const economizerPerformance = [
        {
            checkedDefaultVal: findValueByKey(
                economizerPerformanceChecked,
                'flueGasInlet'
            ),
            name: 'flueGasInlet',
            label: 'Flue Gas Inlet Temp',
            value: {
                textVal: fuelGasIn,
                colorVal: uniqueColors[4],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                economizerPerformanceChecked,
                'flueGasOutlet'
            ),
            name: 'flueGasOutlet',
            label: 'Flue Gas Outlet Temp',
            value: {
                textVal: fuelGasOut,
                colorVal: uniqueColors[5],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                economizerPerformanceChecked,
                'waterInlet'
            ),
            name: 'waterInlet',
            label: 'Water Inlet Temp',
            value: {
                textVal: waterIn,
                colorVal: uniqueColors[6],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                economizerPerformanceChecked,
                'waterOutlet'
            ),
            name: 'waterOutlet',
            label: 'Water Outlet Temp',
            value: {
                textVal: WaterOut,
                colorVal: uniqueColors[7],
            },
        },
    ];
    const checkedList: any = (): any => {
        const resultArray: any = [];
        economizerPerformance.map((item) => {
            if (item.checkedDefaultVal)
                resultArray.push(item.checkedDefaultVal);
        });
        return resultArray;
    };
    const handleHeaderCheck = (): any => {
        if (
            checkedList().length > 0 &&
            checkedList().length < economizerPerformance.length
        ) {
            setHeaderCheckbox(true);
            const updatedCheckedValues = economizerPerformanceChecked?.map(
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
            setEconomizerPerformanceChecked(updatedCheckedValues);
            setSelectedIds([...updatedCheckedValues]);
        } else {
            setHeaderCheckbox(!headerCheckbox);
        }
    };
    const handleCheckboxChange =
        (keyName: string) => (event: CheckboxChangeEvent) => {
            const updatedState = economizerPerformanceChecked.map(
                (item: any) => {
                    // eslint-disable-next-line no-prototype-builtins
                    if (item.hasOwnProperty(keyName)) {
                        return {
                            ...item,
                            [keyName]: !item[keyName],
                        }; // Toggle the value
                    }
                    return item;
                }
            );
            const resultObject = economizerPerformanceChecked.find((obj: any) =>
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
            setEconomizerPerformanceChecked(updatedState);
            !event.target.checked && setParametersSelector(false);
        };
    useEffect(() => {
        onIndividualCheckBoxChange(true);
    }, [selectedIds]);
    useEffect(() => {
        if (parametersSelector) {
            setHeaderCheckbox(parametersSelector);
            const updatedCheckedValues = economizerPerformanceChecked?.map(
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
            setEconomizerPerformanceChecked(updatedCheckedValues);

            setSelectedIds([...updatedCheckedValues]);
        }
    }, [parametersSelector]);

    useEffect(() => {
        const idsArray = economizerPerformanceChecked.map((obj: any) => obj.id);
        if (headerCheckbox) {
            const filteredArray = idsArray.filter(
                (element: any) => !parametersValue.includes(element)
            );

            dispatch(updateParameters(filteredArray, DataManipulation.Add));
        } else {
            dispatch(updateParameters(idsArray, DataManipulation.Remove));
        }
        setEconomizerPerformanceChecked([
            {
                flueGasInlet: headerCheckbox,
                id: KPIDataId.economizerFuelGasInletTemp,
            },
            {
                flueGasOutlet: headerCheckbox,
                id: KPIDataId.economizerFuelGasOuletTemp,
            },
            {
                waterInlet: headerCheckbox,
                id: KPIDataId.economizerWaterInletTemp,
            },
            {
                waterOutlet: headerCheckbox,
                id: KPIDataId.economizerWaterOuletTemp,
            },
        ]);
        onHeaderCheckboxChange(headerCheckbox);
    }, [headerCheckbox]);

    const indeterminate =
        checkedList().length > 0 &&
        checkedList().length < economizerPerformance.length;

    return (
        <Collapse accordion expandIconPosition="end" defaultActiveKey="1">
            <Panel
                header={
                    <CustomListItem
                        checked={
                            indeterminate
                                ? false
                                : headerCheckbox ||
                                  checkedList().length ===
                                      economizerPerformance.length
                        }
                        checkboxChange={handleHeaderCheck}
                        label="Economizer Performance"
                        value={headerCheckbox}
                        indeterminate={indeterminate}
                        parent={true}
                    />
                }
                key="1"
            >
                {economizerPerformance.map((item, index) => (
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

export default EconomizerPerformanceComponent;
