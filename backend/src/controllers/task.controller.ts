import { NextFunction, Request, Response, Router } from "express";
import { getNext, getPrev } from "../utils/pagination";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.service";
import { map2task } from "../mappings/task.mapping";
import { checkSchema } from "express-validator";
import {
  CreateTaskSchema,
  PartialTaskSchema,
  TaskSchema,
} from "../models/task.model";
import assertErrors from "../utils/assertErrors";
import HttpException from "../models/http-exception.model";

const router = Router();

/**
 * Get list of tasks
 * @route {GET} /api/tasks
 * @queryparam offset number of tasks dismissed from the first one
 * @queryparam limit number of tasks returned
 * @queryparam ordering
 * @returns tasks: list of articles
 */
router.get(
  "/tasks/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const [count, tasks] = await getTasks(query);
      const next = getNext(req, count);
      const prev = getPrev(req, count);
      res.json({ count, next, prev, results: tasks });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Get detail of task
 * @route {GET} /api/tasks/:id/
 * @param id id of the task
 * @returns task
 */
router.get(
  "/tasks/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const task = await getTask(Number(id));
      if (task === null)
        throw new HttpException(404, { detail: "resource not found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Post a task
 * @route {POST} /api/tasks/
 * @returns task
 */
router.post(
  "/tasks/",
  checkSchema(CreateTaskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await assertErrors(req);
      const task = await createTask(map2task(req.body));
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Put (update) a task
 * @route {PUT} /api/tasks/:id/
 * @param id id of the task
 * @returns task
 */
router.put(
  "/tasks/:id/",
  checkSchema(TaskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await assertErrors(req);
      const { id } = req.params;
      const task = await updateTask(Number(id), map2task(req.body));
      if (task === null)
        throw new HttpException(404, { detail: "resource not found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Patch (partial update) a task
 * @route {PATCH} /api/tasks/:id/
 * @param id id of the task
 * @returns task
 */
router.patch(
  "/tasks/:id/",
  checkSchema(PartialTaskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await assertErrors(req);
      const { id } = req.params;
      const task = await updateTask(Number(id), map2task(req.body));
      if (task === null)
        throw new HttpException(404, { detail: "resource not found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Delete a task
 * @route {DELETE} /api/tasks/:id/
 * @param id id of the task
 */
router.delete(
  "/tasks/:id/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const task = await deleteTask(Number(id));
      if (task === null)
        throw new HttpException(404, { detail: "resource not found" });
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
