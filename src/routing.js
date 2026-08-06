import express from "express";
const router = express.Router();

import { validate } from "./middlewares/validate.middleware.js";
import { authenticate, authorizeRoles } from "./middlewares/auth.middleware.js";
import { createJobSchema } from "./modules/v1/createUniqueJob/createUniquejob.validation.js";

// Public / existing
import { createJobController } from "./modules/v1/createUniqueJob/controller/jobCreate.controller.js";
import { getJobsController } from "./modules/v1/getJobsList/controller/getAllJobList.controller.js";
import { getJobByIdController } from "./modules/v1/getJobById/controller/getJobById.controller.js";
import { getAdmitCardListController } from "./modules/v1/getAdmitCardList/controller/getAdmitCardList.controller.js";
import { getResultListController } from "./modules/v1/getResultList/controller/getResultList.controller.js";
import { getDocumentListController } from "./modules/v1/getDocumentList/controller/getDocumentList.controller.js";
import { getAdmissionListController } from "./modules/v1/getAdmissionList/controller/admissionList.controller.js";
import { getAnswerKeyController } from "./modules/v1/getAnswerKey/controller/answerKey.controller.js";

// Auth
import { loginController } from "./modules/v1/auth/controller/auth.controller.js";

// Admin -> employees
import {
  createEmployeeController,
  getEmployeesController,
  deleteEmployeeController,
} from "./modules/v1/employee/controller/employee.controller.js";

// Job management (employee/admin)
import {
  createJobController as manageCreateJobController,
  updateJobController,
  publishJobController,
  hideJobController,
  deleteJobController,
  getManageJobsController,
} from "./modules/v1/manageJob/controller/manageJob.controller.js";

/* ----------------------------- AUTH ----------------------------- */
router.post("/auth/login", loginController);

/* -------------------------- ADMIN ONLY -------------------------- */
router.post(
  "/admin/employees",
  authenticate,
  authorizeRoles("admin"),
  createEmployeeController,
);
router.get(
  "/admin/employees",
  authenticate,
  authorizeRoles("admin"),
  getEmployeesController,
);
router.delete(
  "/admin/employees/:id",
  authenticate,
  authorizeRoles("admin"),
  deleteEmployeeController,
);

/* ------------------ JOB MANAGEMENT (admin + employee) ------------------ */
router.get(
  "/jobs/mine",
  authenticate,
  authorizeRoles("admin", "employee"),
  getManageJobsController,
);
router.post(
  "/jobs",
  authenticate,
  authorizeRoles("admin", "employee"),
  validate(createJobSchema),
  manageCreateJobController,
);
router.put(
  "/jobs/:id",
  authenticate,
  authorizeRoles("admin", "employee"),
  validate(createJobSchema),
  updateJobController,
);
router.patch(
  "/jobs/:id/publish",
  authenticate,
  authorizeRoles("admin", "employee"),
  publishJobController,
);
router.patch(
  "/jobs/:id/hide",
  authenticate,
  authorizeRoles("admin", "employee"),
  hideJobController,
);
router.delete(
  "/jobs/:id",
  authenticate,
  authorizeRoles("admin", "employee"),
  deleteJobController,
);

/* ----------------------------- PUBLIC ----------------------------- */
router.post("/create-job", validate(createJobSchema), createJobController);
router.get("/get-all-jobs", getJobsController);
router.get("/get-job/:id", getJobByIdController);
router.get("/get-admit-card", getAdmitCardListController);
router.get("/get-results", getResultListController);
router.get("/get-documents", getDocumentListController);
router.get("/get-answer-keys", getAnswerKeyController);
router.get("/get-admissions", getAdmissionListController);

export default router;
