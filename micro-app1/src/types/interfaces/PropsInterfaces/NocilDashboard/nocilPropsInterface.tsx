export interface DirectEfficiencyProps {
    heading: string;
}

export interface SteamRateProps {
    heading: string;
    data: any;
}

export interface BoilerutilisationProps {
    heading: string;
}

export interface AirToFuelRatioProps {
    heading: string;
}

export interface ExcessOxygenProps {
    heading: string;
    range?: [];
    value: string;
}

export interface ChooseAnyParameterProps {
    heading: string;
}

export interface CriticalParameterprops {
    CriticalParameter: string;
}

export interface ReductionInBoilerPlateProps {
    heading: string;
    heading1: string;
    subHeading: string;
}

export interface CoalInTakeProps {
    lineHeading: string;
    barHeading: string;
}

export interface TotalSteamGenerationProps {
    heading: string;
    subHeading: TotalSteamGenerationSubheading;
    percentage: number;
    coalHeading: string;
}

export interface TotalSteamGenerationSubheading {
    value: number;
    unit: string;
}

export interface SteamTemperatureProps {
    heading: string;
    subHeading?: string;
    value?: number;
    name: string;
    charts?: [chartObject, chartObject];
}

export interface SteamPressureProps {
    heading: string;
    pressureType?: number;
    value: number;
    chartData: [];
    unit?: string;
}
export interface EconomizerAndAPHProps {
    heading: string;
    subHeading?: string;
    charts?: [chartObject, chartObject];
}
export interface chartObject {
    label: string;
    value: Number;
}

export interface FeedWaterFlowProps {
    heading: string;
    subHeading?: string;
    name: string;
    charts?: [chartObject, chartObject];
}

export interface BoilerPowerConsumptionProps {
    heading: string;
}

export interface BoilerPowerConsumptionSubheading {
    value: string;
    name: string;
}

export interface AssumptionsAndFormulaeProps {
    assumptions?: string;
    formulae?: string;
}
