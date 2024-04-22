import React, { useEffect, useState } from 'react';

import { type ChooseAnyParameterProps } from 'types/interfaces/PropsInterfaces/NocilDashboard/nocilPropsInterface';

import './index.scss';

import BoilerInsightsComponent from './BoilerInsightsComponent';

import EconomizerPerformanceComponent from './EconomizerPerformanceComponent';

import APHPerformanceComponent from './APHPerformanceComponent';

import { useDispatch, useSelector } from 'react-redux';

import { KPIDataId } from 'redux/services/KPIServices/servicesMetaData';

import { getChooseParamValues } from 'redux/actions/NocilDashboardActions/nocilDashboardAction';

import dayjs from 'dayjs';
import { MULTI_AXIS_CHART_COLORS } from 'utils/constants';
import { useTranslation } from 'react-i18next';

const ChooseAnyParameter: React.FC<ChooseAnyParameterProps> = ({ heading }) => {
    const [uniqueColors, setUniqueColors] = useState<string[]>([]);
    const { t } = useTranslation('translation');
    const idsToFind = [
        KPIDataId?.averageSteamFlow,

        KPIDataId?.excessOxygen,

        KPIDataId?.averageSteamPressure,

        KPIDataId?.averageSteamTemperature,

        KPIDataId?.economizerFuelGasInletTemp,

        KPIDataId?.economizerFuelGasOuletTemp,

        KPIDataId?.economizerWaterInletTemp,

        KPIDataId?.economizerWaterOuletTemp,

        KPIDataId?.aphAirInletTemp,

        KPIDataId?.aphAirOuletTemp,

        KPIDataId?.aphFuelGasInletTemp,

        KPIDataId?.aphFuelGasOuletTemp,
    ];

    const dispatch = useDispatch();

    const chooseParamData = useSelector(
        (state: any) => state?.nocilDashboard?.chooseParamValues?.data
    );

    const [chartDataChooseParam, setChartDataChooseParam] = useState<any>({
        averageSteamFlow: '',

        excessOxygen: '',

        averageSteamPressure: '',

        averageSteamTemperature: '',

        economizerFuelGasInletTemp: '',

        economizerFuelGasOuletTemp: '',

        economizerWaterInletTemp: '',

        economizerWaterOuletTemp: '',

        aphAirInletTemp: '',

        aphAirOuletTemp: '',

        aphFuelGasInletTemp: '',

        aphFuelGasOuletTemp: '',
    });

    const parametersLoader = useSelector(
        (state: any) => state?.nocilDashboard?.chooseParamValues?.loader
    );

    const startDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.startTime
    );

    const endDateRedux = useSelector(
        (state: any) => state?.nocilDashboard?.filterValues?.endTime
    );

    const [parametersSelector, setParametersSelector] = useState(false);

    useEffect(() => {
        const uniqueColorsArray = MULTI_AXIS_CHART_COLORS;

        setUniqueColors(uniqueColorsArray);
    }, []);

    useEffect(() => {
        setChartDataChooseParam({
            averageSteamFlow: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.averageSteamFlow)

                ?.value?.toFixed(2),

            excessOxygen: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.excessOxygen)

                ?.value?.toFixed(2),

            averageSteamPressure: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.averageSteamPressure)

                ?.value?.toFixed(2),

            averageSteamTemperature: chooseParamData

                ?.find(
                    (obj: any) => obj.id === KPIDataId?.averageSteamTemperature
                )

                ?.value?.toFixed(2),

            economizerFuelGasInletTemp: chooseParamData

                ?.find(
                    (obj: any) =>
                        obj.id === KPIDataId?.economizerFuelGasInletTemp
                )

                ?.value?.toFixed(2),

            economizerFuelGasOuletTemp: chooseParamData

                ?.find(
                    (obj: any) =>
                        obj.id === KPIDataId?.economizerFuelGasOuletTemp
                )

                ?.value?.toFixed(2),

            economizerWaterInletTemp: chooseParamData

                ?.find(
                    (obj: any) => obj.id === KPIDataId?.economizerWaterInletTemp
                )

                ?.value?.toFixed(2),

            economizerWaterOuletTemp: chooseParamData

                ?.find(
                    (obj: any) => obj.id === KPIDataId?.economizerWaterOuletTemp
                )

                ?.value?.toFixed(2),

            aphAirInletTemp: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.aphAirInletTemp)

                ?.value?.toFixed(2),

            aphAirOuletTemp: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.aphAirOuletTemp)

                ?.value?.toFixed(2),

            aphFuelGasInletTemp: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.aphFuelGasInletTemp)

                ?.value?.toFixed(2),

            aphFuelGasOuletTemp: chooseParamData

                ?.find((obj: any) => obj.id === KPIDataId?.aphFuelGasOuletTemp)

                ?.value?.toFixed(2),
        });
    }, [parametersLoader, chooseParamData]);

    useEffect(() => {
        dispatch(
            getChooseParamValues({
                startTime: dayjs(startDateRedux).valueOf(),

                endTime: dayjs(endDateRedux).valueOf(),

                id: idsToFind,
            })
        );
    }, []);

    useEffect(() => {
        dispatch(
            getChooseParamValues({
                startTime: dayjs(startDateRedux).valueOf(),

                endTime: dayjs(endDateRedux).valueOf(),

                id: [
                    KPIDataId?.averageSteamFlow,

                    KPIDataId?.excessOxygen,

                    KPIDataId?.averageSteamPressure,

                    KPIDataId?.averageSteamTemperature,

                    KPIDataId?.economizerFuelGasInletTemp,

                    KPIDataId?.economizerFuelGasOuletTemp,

                    KPIDataId?.economizerWaterInletTemp,

                    KPIDataId?.economizerWaterOuletTemp,

                    KPIDataId?.aphAirInletTemp,

                    KPIDataId?.aphAirOuletTemp,

                    KPIDataId?.aphFuelGasInletTemp,

                    KPIDataId?.aphFuelGasOuletTemp,
                ],
            })
        );
    }, []);
    const [boilerCheckBox, setBoilerCheckBox] = useState(false);
    const [headerCheck, setHeaderCheck] = useState(false);
    const [economizerHeaderCheck, setEconomizerHeaderCheck] = useState(false);
    const [aphHeaderCheck, setAphHeaderCheck] = useState(false);
    const [economizerCheckBox, setEconomizerCheckBox] = useState(false);
    const [aphCheckBox, setaphCheckBox] = useState(false);

    return (
        <>
            <div className="chooseAnyParamterWrapper">
                <div className="chooseAnyParamterContainer">
                    <span className="chooseAnyParamterContainer__heading">
                        {heading}
                    </span>

                    <div className="chooseAnyParamterContainer__selectDeselect">
                        <div className="chooseAnyParamterContainer__selectDeselect__buttons">
                            <span
                                className="select-all"
                                onClick={() => {
                                    setParametersSelector(true);
                                }}
                            >
                                {t('nocil.selectAll')}
                            </span>

                            <div className="horizontal"></div>

                            <span
                                className="clear-all"
                                onClick={() => {
                                    setHeaderCheck(false);
                                    setBoilerCheckBox(false);
                                    setEconomizerCheckBox(false);
                                    setaphCheckBox(false);
                                    setEconomizerHeaderCheck(false);
                                    setAphHeaderCheck(false);
                                    setParametersSelector(false);
                                }}
                            >
                                {t('nocil.clearAll')}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="chooseAnyParamterWrapper__accordion">
                    <BoilerInsightsComponent
                        headerCheck={headerCheck}
                        onHeaderCheckboxChange={(isChecked: boolean) => {
                            setHeaderCheck(isChecked);
                        }}
                        checkBox={boilerCheckBox}
                        onIndividualCheckBoxChange={(isChecked: boolean) => {
                            setBoilerCheckBox(isChecked);
                        }}
                        uniqueColors={uniqueColors}
                        parametersSelector={parametersSelector}
                        setParametersSelector={(isChecked: boolean) => {
                            setParametersSelector(isChecked);
                        }}
                        steamFlow={
                            chartDataChooseParam?.averageSteamFlow === undefined
                                ? '-'
                                : chartDataChooseParam?.averageSteamFlow
                        }
                        oxygenPercentage={
                            chartDataChooseParam?.excessOxygen === undefined
                                ? '-'
                                : chartDataChooseParam?.excessOxygen
                        }
                        steamPressure={
                            chartDataChooseParam?.averageSteamPressure ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.averageSteamPressure
                        }
                        steamTemp={
                            chartDataChooseParam?.averageSteamTemperature ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.averageSteamTemperature
                        }
                    />

                    <EconomizerPerformanceComponent
                        economizerHeaderCheck={economizerHeaderCheck}
                        onHeaderCheckboxChange={(isChecked: boolean) => {
                            setEconomizerHeaderCheck(isChecked);
                        }}
                        checkBox={economizerCheckBox}
                        onIndividualCheckBoxChange={(isChecked: boolean) => {
                            setEconomizerCheckBox(isChecked);
                        }}
                        uniqueColors={uniqueColors}
                        parametersSelector={parametersSelector}
                        setParametersSelector={(isChecked: boolean) => {
                            setParametersSelector(isChecked);
                        }}
                        fuelGasIn={
                            chartDataChooseParam?.economizerFuelGasInletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.economizerFuelGasInletTemp
                        }
                        fuelGasOut={
                            chartDataChooseParam?.economizerFuelGasOuletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.economizerFuelGasOuletTemp
                        }
                        waterIn={
                            chartDataChooseParam?.economizerWaterInletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.economizerWaterInletTemp
                        }
                        WaterOut={
                            chartDataChooseParam?.economizerWaterOuletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.economizerWaterOuletTemp
                        }
                    />

                    <APHPerformanceComponent
                        aphHeaderCheck={aphHeaderCheck}
                        onHeaderCheckboxChange={(isChecked: boolean) => {
                            setAphHeaderCheck(isChecked);
                        }}
                        checkBox={aphCheckBox}
                        onIndividualCheckBoxChange={(isChecked: boolean) => {
                            setaphCheckBox(isChecked);
                        }}
                        uniqueColors={uniqueColors}
                        parametersSelector={parametersSelector}
                        setParametersSelector={(isChecked: boolean) => {
                            setParametersSelector(isChecked);
                        }}
                        airIn={
                            chartDataChooseParam?.aphAirInletTemp === undefined
                                ? '-'
                                : chartDataChooseParam?.aphAirInletTemp
                        }
                        airOut={
                            chartDataChooseParam?.aphAirOuletTemp === undefined
                                ? '-'
                                : chartDataChooseParam?.aphAirOuletTemp
                        }
                        gasIn={
                            chartDataChooseParam?.aphFuelGasInletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.aphFuelGasInletTemp
                        }
                        gasOut={
                            chartDataChooseParam?.aphFuelGasOuletTemp ===
                            undefined
                                ? '-'
                                : chartDataChooseParam?.aphFuelGasOuletTemp
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default ChooseAnyParameter;
