import {type ReactNode } from "react";

export interface ReasonCodeTableRowType {
    [x: string]: ReactNode;
    key: string;
    stoppageId:string;
    reasonCode?:any;
    startTime:any;
    endTime:any;
    duration:any
}