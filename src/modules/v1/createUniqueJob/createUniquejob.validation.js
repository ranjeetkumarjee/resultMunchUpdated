import { z } from "zod";

/**
 * Common Validators
 */

// Hex color validator
const colorSchema = z
  .string()
  .regex(/^#([0-9A-Fa-f]{6})$/, {
    message: "Invalid color format. Use hex like #000000",
  })
  .optional()
  .default("#000000");

// Required string helper
const requiredString = (field) =>
  z
    .string()
    .trim()
    .min(1, { message: `${field} is required` });

/**
 * Sub Schemas
 */

const importantDateSchema = z.object({
  label: requiredString("Important date label"),
  date: requiredString("Important date"),
  textColor: colorSchema,
});

const applicationFeeSchema = z.object({
  label: requiredString("Application fee label"),
  fee: requiredString("Application fee"),
  textColor: colorSchema,
});

const ageLimitSchema = z.object({
  label: requiredString("Age limit label"),
  value: requiredString("Age limit value"),
  textColor: colorSchema,
});

const postWithNoVacancySchema = z.object({
  PostLevel: requiredString("Post level"),
  noVaccancy: requiredString("Number of vacancies"),
  textColor: colorSchema,
});

const postWithEligibilitySchema = z.object({
  PostLevel: requiredString("Post level"),
  elligibility: requiredString("Eligibility"),
  textColor: colorSchema,
});

const headingLinkSchema = z.object({
  Level: requiredString("Heading level"),
  Link: z.string().url({ message: "Invalid URL" }),
  textColor: colorSchema,
});

/**
 * Main Schema
 */

export const createJobSchema = z.object({
  // 🔹 Flags
  isJob: z.boolean({
    required_error: "isJob is required",
  }),

  isDocument: z.boolean({
    required_error: "isDocument is required",
  }),

  isAdmission: z.boolean({
    required_error: "isAdmission is required",
  }),

  isAnswerKey: z.boolean({
    required_error: "isAnswerKey is required",
  }),

  isResultReleased: z.boolean({
    required_error: "isResultReleased is required",
  }),

  isAdmitCardReleased: z.boolean({
    required_error: "isAdmitCardReleased is required",
  }),

  // 🔹 Headings
  label: requiredString("Label"),
  documentHeading: requiredString("Document heading"),
  admissionHeading: requiredString("Admission heading"),
  answerKeyHeading: requiredString("Answer key heading"),
  resultHeading: requiredString("Result heading"),
  admitCardHeading: requiredString("Admit card heading"),

  // 🔹 Main Info
  title: requiredString("Title"),
  postDate: requiredString("Post date"),
  boardName: requiredString("Board name"),
  postName: requiredString("Post name"),

  noOfVacancies: requiredString("Number of vacancies"),

  startDate: requiredString("Start date"),
  endDate: requiredString("End date"),

  minAgeLimit: requiredString("Minimum age"),
  maxAgeLimit: requiredString("Maximum age"),
  ageRefDate: requiredString("Age reference date"),

  advertisementNo: requiredString("Advertisement number"),

  jobHeading: requiredString("Job heading"),

  // 🔹 Arrays
  importantDates: z
    .array(importantDateSchema)
    .min(1, "At least one important date is required"),

  applicationFees: z
    .array(applicationFeeSchema)
    .min(1, "At least one application fee is required"),

  ageLimits: z
    .array(ageLimitSchema)
    .min(1, "At least one age limit is required"),

  postsWithNoVaccancy: z
    .array(postWithNoVacancySchema)
    .min(1, "At least one vacancy entry is required"),

  postsWithElligibility: z
    .array(postWithEligibilitySchema)
    .min(1, "At least one eligibility entry is required"),

  headingLinks: z
    .array(headingLinkSchema)
    .min(1, "At least one heading link is required"),

  // 🔹 Optional fields
  admitCardHeader: z.string().optional().default(""),
  resultHeader: z.string().optional().default(""),
});
