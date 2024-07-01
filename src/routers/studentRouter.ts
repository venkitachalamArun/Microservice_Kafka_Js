import express from "express";
import { StudentController } from "../controllers/studentsController";
import {
  StudentsMiddleware,
  StudentsUpdateMiddleware,
} from "../middlewares/studentMiddleware";

export class StudentRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.studentsRouter();
  }

  studentsRouter() {
    this.router.post("/", StudentsMiddleware, StudentController.CreateStudent);
    this.router.get("/", StudentController.getAllStudents);
    this.router.get("/:id", StudentController.getStudentById);
    this.router.put(
      "/:id",
      StudentsUpdateMiddleware,
      StudentController.updateStudent
    );
    this.router.delete("/:id", StudentController.deleteStudent);
  }
}
