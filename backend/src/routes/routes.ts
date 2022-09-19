import { Router } from "express";
import taskController from "../controllers/task.controller";

const api = Router().use(taskController);

export default Router().use("/api/", api);
