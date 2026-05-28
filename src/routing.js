import express from "express";
const router = express.Router();
import { createJobController } from "./modules/v1/createUniqueJob/controller/jobCreate.controller.js";
import { getJobsController } from "./modules/v1/getJobsList/controller/getAllJobList.controller.js";

import { validate } from "./middlewares/validate.middleware.js";
// import { createJobSchema } from "./modules/v1/createUniqueJob/createUniquejob.validation.js";
import { createJobSchema } from "./modules/v1/createUniqueJob/createUniquejob.validation.js";
import { getAdmitCardListController } from "./modules/v1/getAdmitCardList/controller/getAdmitCardList.controller.js";
import { getResultListController } from "./modules/v1/getResultList/controller/getResultList.controller.js";
import { getDocumentListController } from "./modules/v1/getDocumentList/controller/getDocumentList.controller.js";
import { getAdmissionListController } from "./modules/v1/getAdmissionList/controller/admissionList.controller.js";
import { getAnswerKeyController } from "./modules/v1/getAnswerKey/controller/answerKey.controller.js";

router.post("/create-job", validate(createJobSchema), createJobController);
router.get("/get-all-jobs", getJobsController);
router.get("/get-admit-card", getAdmitCardListController);
router.get("/get-results", getResultListController);
router.get("/get-documents", getDocumentListController);
router.get("/get-answer-keys", getAnswerKeyController);
router.get("/get-admissions", getAdmissionListController);

export default router;
