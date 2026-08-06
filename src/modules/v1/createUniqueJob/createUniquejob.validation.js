import { z } from "zod";

/**
 * Helpers
 */
const requiredString = (field) =>
  z
    .string({
      required_error: `${field} is required.`,
      invalid_type_error: `${field} must be a string.`,
    })
    .trim()
    .min(1, `${field} cannot be empty.`);

const optionalString = (field) =>
  z
    .string({
      invalid_type_error: `${field} must be a string.`,
    })
    .trim()
    .optional();

const colorSchema = z
  .string({
    invalid_type_error: "Text color must be a string.",
  })
  .regex(/^#([0-9A-Fa-f]{6})$/, {
    message: "Text color must be a valid hex color (e.g. #000000).",
  })
  .optional()
  .default("#000000");

/**
 * Main Schema
 */
export const createJobSchema = z
  .object({
    // Flags
    isJob: z.boolean().optional(),

    isDocument: z.boolean().optional(),

    isAdmission: z.boolean().optional(),

    isAnswerKey: z.boolean().optional(),

    isResultReleased: z.boolean().optional(),

    isAdmitCardReleased: z.boolean().optional(),

    // Headings
    label: optionalString("Label"),

    documentHeading: optionalString("Document Heading"),

    admissionHeading: optionalString("Admission Heading"),

    answerKeyHeading: optionalString("Answer Key Heading"),

    resultHeading: optionalString("Result Heading"),

    admitCardHeading: optionalString("Admit Card Heading"),

    // Main Information
    title: requiredString("Title"),

    postDate: requiredString("Post Date"),

    boardName: requiredString("Board Name"),

    postName: requiredString("Post Name"),

    noOfVacancies: requiredString("Number Of Vacancies"),

    startDate: requiredString("Application Start Date"),

    endDate: requiredString("Application End Date"),

    minAgeLimit: requiredString("Minimum Age Limit"),

    maxAgeLimit: requiredString("Maximum Age Limit"),

    ageRefDate: requiredString("Age Reference Date"),

    advertisementNo: requiredString("Advertisement Number"),

    // Important Dates
    importantDates: z
      .array(
        z.object({
          label: requiredString("Important Date Label"),
          date: requiredString("Important Date"),
          textColor: colorSchema,
        })
      )
      .default([]),

    // Application Fees
    applicationFees: z
      .array(
        z.object({
          label: requiredString("Application Fee Label"),
          fee: requiredString("Application Fee"),
          textColor: colorSchema,
        })
      )
      .default([]),

    // Age Limits
    ageLimits: z
      .array(
        z.object({
          label: requiredString("Age Limit Label"),
          value: requiredString("Age Limit Value"),
          textColor: colorSchema,
        })
      )
      .default([]),

    // Vacancy Details
    postsWithNoVaccancy: z
      .array(
        z.object({
          PostLevel: requiredString("Post Level"),
          noVaccancy: requiredString("Number Of Vacancies"),
          textColor: colorSchema,
        })
      )
      .default([]),

    // Eligibility Details
    postsWithElligibility: z
      .array(
        z.object({
          PostLevel: requiredString("Post Level"),
          elligibility: requiredString("Eligibility Criteria"),
          textColor: colorSchema,
        })
      )
      .default([]),

    // Heading Links
    headingLinks: z
      .array(
        z.object({
          Level: requiredString("Heading Level"),
          Link: z
            .string({
              required_error: "Link URL is required.",
              invalid_type_error: "Link URL must be a string.",
            })
            .url("Please provide a valid URL."),
          textColor: colorSchema,
        })
      )
      .default([]),
  })
  .superRefine((data, ctx) => {
    if (data.isDocument && !data.documentHeading?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["documentHeading"],
        message:
          "Document Heading is required when Document status is enabled.",
      });
    }

    if (data.isAdmission && !data.admissionHeading?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["admissionHeading"],
        message:
          "Admission Heading is required when Admission status is enabled.",
      });
    }

    if (data.isAnswerKey && !data.answerKeyHeading?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["answerKeyHeading"],
        message:
          "Answer Key Heading is required when Answer Key status is enabled.",
      });
    }

    if (data.isResultReleased && !data.resultHeading?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["resultHeading"],
        message:
          "Result Heading is required when Result Released status is enabled.",
      });
    }

    if (data.isAdmitCardReleased && !data.admitCardHeading?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["admitCardHeading"],
        message:
          "Admit Card Heading is required when Admit Card Released status is enabled.",
      });
    }
  });