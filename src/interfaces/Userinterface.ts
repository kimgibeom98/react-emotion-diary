interface DataInfo {
    id: number;
    date: number;
    content: string;
    emotion: number;
}

interface DataType {
    type: string;
    data: DataInfo;
}

interface DataTarget {
    type: string;
    targetId: number;
}

interface FunType {
    onCreate(emotion: number, content: string, date: string): void;
    onEdit(targetId: number, date: string, content: string, emotion: number): void;
    onRemove(targetId: number): void;
}

interface EditDitail {
    isEdit: boolean;
    originData: DataInfo;
}
export type { DataInfo, DataType, DataTarget, FunType, EditDitail };