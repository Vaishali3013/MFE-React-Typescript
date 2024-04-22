export interface SolidGuageProps {
    height: string;
    data: Number;
    name: string;
    unit: string;
}
export interface GaugeChartProps {
    value: any;
    label: String;
    plotBands: any;
    labelDistance?: number;
    yLabel?: number;
    size?:string;
    fontSize?:string;
    tooltipFontSize?:string;
    centerValues?:string[];
    dataLabelsFontSize?:string;
}
export interface LineCoulumnChartProps {
    dataIntake?: any;
    dataProd?: any;
    dateRange: string;
    barClickEventHandler?: any;
    lineClickEventHandler?: any;
}
export interface DonutChartProps {
    chartingInfo?: any;
    legendEnabled?: boolean;
    fontSizeTitleText?: string;
    colorLegends1?: string;
    colorLegends2?: string;
    colorTitle?: string;
    yTitle?: number;
    xTitle?: number;
    fixedTo?: number;
    chartWidth?: number;
    pieCenter?: string[];
    size?:number;
    data?: number[];
    unit?: string;
}

export interface DonutChartObject {
    label?: string;
    timeStamp?: Number;
}
export interface BulletChartProps {
    value: Number;
    category: String;
    y: Number;
    unit: string;
    plotBands: any;
}
export interface SynchronizedChartProps {
    heading: string;
    chartColor: chartColorObject;
}
interface chartColorObject {
    gradientColor: GradientColor;
    gradientStops: GradientStop[];
    gradientStroke: string;
}
interface GradientStop {
    0: number;
    1: string;
}

interface GradientColor {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface singleAxisGaugeProps {
    value: number;
    unit: string;
    label: string;
}
export interface Range {
    from: number;
    to: number;
    color?: string;
    thickness?: number;
}

export interface RangeCategory {
    good: Range[];
    bad: Range[];
    worst: Range[];
}

export interface RangesData {
    ranges: RangeCategory[];
}
