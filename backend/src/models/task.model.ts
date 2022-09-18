import { Schema } from "express-validator";

export const Importance = {
  LOW: "LOW",
  MID: "MID",
  HIGH: "HIGH",
} as const;

export type Importance = typeof Importance[keyof typeof Importance];

export interface Task {
  id?: number;
  name: string;
  description: string;
  importance: Importance;
  responsable: string;
  marked: boolean;
  date_created: Date;
  date_completed?: Date | null;
}

export const TaskSchema: Schema = {
  id: {
    // The location of the field, can be one or more of body, cookies, headers, params or query.
    // If omitted, all request locations will be checked
    in: ["params", "query"],
    errorMessage: "ID is wrong",
    isInt: true,
    // Sanitizers can go here as well
    toInt: true,
  },
  name: {
    notEmpty: {
      errorMessage: "this field should not be blank",
    },
  },
  description: {
    notEmpty: {
      errorMessage: "this field should not be blank",
    },
  },
  importance: {
    notEmpty: {
      errorMessage: "this field should not be blank",
    },
  },
  responsable: {
    notEmpty: {
      errorMessage: "this field should not be blank",
    },
    isEmail: {
      if: (value: string) => !!value,
      errorMessage: "this field should be an email",
    },
  },
};

export const CreateTaskSchema: Schema = Object.fromEntries(
  Object.entries(TaskSchema).filter(([key]) => key != "id")
);

export const PartialTaskSchema: Schema = Object.fromEntries(
  Object.entries(TaskSchema).map(([key, { notEmpty, ...data }]) => [key, data])
);
