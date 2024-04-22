export interface TableState {
    columns: any[];
    data: any[];
}

export interface ShiftConfigTypes {
    key: string;
    dayName: string;
    action: any;
    name: string;
    startTime: string;
    endTime: string;
    duration: any;
    active: boolean;
    defaultValue?:string;
}

export interface DayConfigTypes {
    key: number;
    name: string;
    startTime: any;
    endTime: any;
    validFrom: any;
    validTill: any;
}

export interface CardProps {
    icon: React.ReactNode;
    label: string;
    clickHandler: any;
    configType: string;
}

export interface SelectProps {
    defaultValue: string;
    options: any;
    label: string;
}
