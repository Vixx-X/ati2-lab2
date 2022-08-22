export enum ImportanceType {
  LOW = "Low",
  MID = "Mid",
  HIGH = "High",
}

export interface TaskFilterType {
  importance?: ImportanceType[] | string;
  marked?: boolean;
  date_start?: string;
  date_end?: string;
}

export interface TaskType {
  id?: number;
  name: string;
  description: string;
  importance: ImportanceType;
  marked: boolean;
  date_created?: string;
  date_completed?: string;
}