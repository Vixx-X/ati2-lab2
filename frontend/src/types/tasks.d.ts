export enum ImportanceType {
  LOW = "LOW",
  MID = "MID",
  HIGH = "HIGH",
}

export interface TaskFilterType {
  importance?: ImportanceType[] | string;
  marked?: boolean;
  date_start?: string;
  date_end?: string;
  reset?: boolean;
}

export interface TaskType {
  id?: number;
  name: string;
  description: string;
  importance: ImportanceType;
  responsable: string;
  marked: boolean;
  date_created?: string;
  date_completed?: string;
}
