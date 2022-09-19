import prisma from "../../prisma/prisma-client";
import { Task } from "../models/task.model";
import taskSelector from "../selectors/task.selector";

interface Filter {
  marked?: string;
  date_start?: string;
  date_end?: string;
  importance?: string;
}

interface Ordering {
  ordering?: string;
}

interface Request {
  limit?: string;
  offset?: string;
}

export type TaskQuery = Request & Filter & Ordering;

export const getTasks = async (query: TaskQuery): Promise<any> => {
  let filter = {};
  const { marked, date_start, date_end, importance } = query;
  if (marked) {
    filter = { ...filter, marked: marked === "true" };
  }
  if (date_start) {
    filter = { ...filter, date_created: { gte: new Date(date_start) } };
  }
  if (date_end) {
    filter = { ...filter, date_created: { gte: new Date(date_end) } };
  }
  if (importance) {
    filter = {
      ...filter,
      importance: { in: importance.toUpperCase().split(",") },
    };
  }
  let order = {};
  const { ordering } = query;
  if (ordering) {
    const orderingField = ordering[0] == "-" ? ordering.slice(1) : ordering;
    order = {
      [orderingField]: ordering[0] == "-" ? "desc" : "asc",
    };
  }
  const { limit, offset } = query;
  return await prisma.$transaction([
    prisma.task.count({
      where: filter,
    }),
    prisma.task.findMany({
      where: filter,
      select: taskSelector,
      orderBy: order,
      skip: offset ? Number(offset) : 0,
      take: limit ? Number(limit) : 25,
    }),
  ]);
};

export const getTask = async (id: number): Promise<Task | null> => {
  return await prisma.task.findUnique({
    where: { id },
    select: taskSelector,
  });
};

export const createTask = async (data: Task): Promise<Task> => {
  return await prisma.task.create({
    data,
    select: taskSelector,
  });
};

export const updateTask = async (id: number, data: Task): Promise<Task> => {
  return await prisma.task.update({
    where: { id },
    data,
    select: taskSelector,
  });
};

export const deleteTask = async (id: number): Promise<Task> => {
  return await prisma.task.delete({
    where: { id },
  });
};
