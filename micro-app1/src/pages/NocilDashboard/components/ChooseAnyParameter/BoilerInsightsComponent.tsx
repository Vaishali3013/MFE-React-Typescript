import React, { useEffect, useState } from 'react';
import CustomListItem from './CustomListItem';
import { Collapse } from 'antd';
import { type CheckboxChangeEvent } from 'antd/es/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { updateParameters } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';
import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';
import { findValueByKey } from 'utils/commonFunction';
import { DataManipulation } from 'types/enums';
import { useTranslation } from 'react-i18next';

const BoilerInsightsComponent: React.FC<any> = ({
    uniqueColors,
    steamFlow,
    oxygenPercentage,
    steamTemp,
    steamPressure,
    parametersSelector,
    onHeaderCheckboxChange,
    headerCheck,
    onIndividualCheckBoxChange,
    checkBox,
    setParametersSelector,
}) => {
    const { Panel } = Collapse;
    const dispatch = useDispatch();
    const { t } = useTranslation('translation');
    const [headerCheckbox, setHeaderCheckbox] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [boilerInsightsChecked, setBoilerInsightsChecked] = useState<any>([
        { steamFlow: false, id: KPIDataId.averageSteamFlow },
        { oxygenPercent: false, id: KPIDataId.excessOxygen },
        { steamPressure: false, id: KPIDataId.averageSteamPressure },
        { steamTemp: false, id: KPIDataId.averageSteamTemperature },
    ]);
    const parametersValue = useSelector(
        (state: any) => state?.nocilDashboard?.parameters
    );
    useEffect(() => {
        if (headerCheck === false) {
            setHeaderCheckbox(false);
        }
    }, [headerCheck]);

    useEffect(() => {
        if (checkBox === false) {
            const updatedCheckedValues = boilerInsightsChecked.map(
                (item: any) => {
                    return {
                        ...item,
                        [Object.keys(item)[0]]: false,
                    };
                }
            );
            setBoilerInsightsChecked(updatedCheckedValues);
            dispatch(
                updateParameters(parametersValue, DataManipulation.Remove)
            );
            setSelectedIds([]);
        }
    }, [checkBox, boilerInsightsChecked]);

    const boilerInsights = [
        {
            checkedDefaultVal: findValueByKey(
                boilerInsightsChecked,
                'steamFlow'
            ),

            name: 'steamFlow',
            label: 'Steam Flow',
            value: {
                textVal: steamFlow,
                colorVal: uniqueColors[0],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                boilerInsightsChecked,
                'oxygenPercent'
            ),
            name: 'oxygenPercent',
            label: 'Oxygen Percent',
            value: {
                textVal: oxygenPercentage,
                colorVal: uniqueColors[1],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                boilerInsightsChecked,
                'steamPressure'
            ),

            name: 'steamPressure',
            label: 'Steam Pressure',
            value: {
                textVal: steamPressure,
                colorVal: uniqueColors[2],
            },
        },
        {
            checkedDefaultVal: findValueByKey(
                boilerInsightsChecked,
                'steamTemp'
            ),

            name: 'steamTemp',
            label: 'Steam Temperature',
            value: {
                textVal: steamTemp,
                colorVal: uniqueColors[3],
            },
        },
    ];
    const checkedList: any = (): any => {
        const resultArray: any = [];
        boilerInsights.map((item) => {
            if (item.checkedDefaultVal)
                resultArray.push(item.checkedDefaultVal);
        });
        return resultArray;
    };
    const handleHeaderCheck = (): any => {
        if (
            checkedList().length > 0 &&
            checkedList().length < boilerInsights.length
        ) {
            setHeaderCheckbox(true);
            const updatedCheckedValues = boilerInsightsChecked?.map(
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
            setBoilerInsightsChecked(updatedCheckedValues);
            setSelectedIds([...updatedCheckedValues]);
        } else {
            setHeaderCheckbox(!headerCheckbox);
        }
    };

    const handleCheckboxChange =
        (keyName: string) => (event: CheckboxChangeEvent) => {
            const updatedState = boilerInsightsChecked.map((item: any) => {
                // eslint-disable-next-line no-prototype-builtins
                if (item.hasOwnProperty(keyName)) {
                    return { ...item, [keyName]: !item[keyName] }; // Toggle the value
                }
                return item;
            });
            const resultObject = boilerInsightsChecked.find((obj: any) =>
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
            setBoilerInsightsChecked(updatedState);
            !event.target.checked && setParametersSelector(false);
        };
    useEffect(() => {
        onIndividualCheckBoxChange(true);
    }, [selectedIds]);
    useEffect(() => {
        if (parametersSelector) {
            setHeaderCheckbox(parametersSelector);
            const updatedCheckedValues = boilerInsightsChecked?.map(
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
            setBoilerInsightsChecked(updatedCheckedValues);
            setSelectedIds([...updatedCheckedValues]);
        }
    }, [parametersSelector]);

    useEffect(() => {
        const idsArray = boilerInsightsChecked.map((obj: any) => obj.id);
        if (headerCheckbox) {
            const filteredArray = idsArray.filter(
                (element: any) => !parametersValue.includes(element)
            );

            dispatch(updateParameters(filteredArray, DataManipulation.Add));
        } else {
            dispatch(updateParameters(idsArray, DataManipulation.Remove));
        }
        setBoilerInsightsChecked([
            { steamFlow: headerCheckbox, id: KPIDataId.averageSteamFlow },
            { oxygenPercent: headerCheckbox, id: KPIDataId.excessOxygen },
            {
                steamPressure: headerCheckbox,
                id: KPIDataId.averageSteamPressure,
            },
            {
                steamTemp: headerCheckbox,
                id: KPIDataId.averageSteamTemperature,
            },
        ]);
        onHeaderCheckboxChange(headerCheckbox);
    }, [headerCheckbox]);

    const indeterminate =
        checkedList().length > 0 &&
        checkedList().length < boilerInsights.length;

    return (
        <Collapse accordion expandIconPosition="end" defaultActiveKey="1">
            <Panel
                header={
                    <CustomListItem
                        checked={
                            indeterminate
                                ? false
                                : headerCheckbox ||
                                  checkedList().length === boilerInsights.length
                        }
                        checkboxChange={handleHeaderCheck}
                        label={t('nocil.boilerInsights')}
                        value={headerCheckbox}
                        indeterminate={indeterminate}
                        parent={true}
                    />
                }
                key="1"
            >
                {boilerInsights.map((item, index) => (
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

export default BoilerInsightsComponent;
