import { Prisma } from "@prisma/client";

export const taskSelector = Prisma.validator<Prisma.TaskSelect>()({
  id: true,
  name: true,
  description: true,
  importance: true,
  responsable: true,
  marked: true,
  date_created: true,
  date_completed: true,
});

export default taskSelector;
