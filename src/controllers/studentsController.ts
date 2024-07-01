import express, { Request, Response } from "express";
import { AppDataSource } from "../datasources/datasource";
import { Students } from "../models/students";
import { Profile } from "../models/profile";

export class StudentController {
  static async CreateStudent(req: Request, res: Response) {
    // const repo = AppDataSource.getRepository(Students);
    const entity = AppDataSource.manager;
    const { name, age, email, dob, bio } = req.body;

    try {
      /*getRepo concept
      await repo.save(student);
      return res.status(200).json({
        status: "Successfully created the students",
        data: student,
      });*/

      //Entity manager concept for multiple entity
      await entity.transaction(async (transactionEntityManager) => {
        const profile = new Profile();
        profile.dob = dob;
        profile.bio = bio;

        const student = new Students();
        student.name = name;
        student.age = age;
        student.email = email;
        student.profile = profile;

        await transactionEntityManager.save(profile);
        await transactionEntityManager.save(student);
      });
      return res.status(200).json({
        status: "Successfully created the students",
        data: { name, age, email, dob, bio },
      });
    } catch (err: any) {
      return res.status(500).json({ message: "Error creating user" });
    }
  }

  static async getAllStudents(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Students);
    try {
      const student = await repo.find();
      console.log("Students data from get", student);
      return res.status(200).json({
        status: "Successfully retrived the students data",
        data: student,
      });
    } catch (err: any) {
      return res.status(500).json({ message: "Error fetching Students" });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Students);
    const id = parseInt(req.params.id);

    try {
      const studentDetail = repo.findOneBy({ id: id });
      if (!studentDetail) {
        return res.status(404).json({
          message: "Student is not found",
        });
      }
      console.log("Students data found from ID", studentDetail);
      return res.status(200).json({
        status: "Students detail fetched successfully",
        data: studentDetail,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Error fetching Student",
      });
    }
  }

  static async updateStudent(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Students);
    const id = parseInt(req.params.id);
    try {
      const student = await repo.findOneBy({ id: id });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      repo.merge(student, req.body);
      const updatedStudent = await repo.save(student);
      console.log("Student data after update", updatedStudent);
      return res.status(200).json({
        status: "Successfully updated the student data",
        data: updatedStudent,
      });
    } catch (error: any) {
      return res.status(500).json({ message: "Error updating Student" });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Students);
    const id = parseInt(req.params.id);
    try {
      const student = await repo.findOneBy({ id: id });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      await repo.remove(student);
      console.log("Student data after deletion", student);
      return res.status(200).json({
        status: "Successfully deleted the student",
        data: student,
      });
    } catch (err: any) {
      return res.status(500).json({ message: "Error deleting Student" });
    }
  }
}
