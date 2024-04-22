export interface EditableRowProps {
    index: number;
}
export interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: any;
    dataIndex: any;
    record: any;
    dataType: string;
    dataSource: any;
    handleSave: (record: any, dataSource: any) => void;
}