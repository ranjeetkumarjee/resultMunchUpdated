import mongoose from "mongoose";
import { required } from "zod/mini";

const importantDateSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: "#000000",
    },
  },
  { _id: false }, // no need separate _id for each item
);

const ApplicationFeeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: "#000000",
    },
  },
  { _id: false },
);

const AgeLimitSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      default: "#000000",
    },
  },
  { _id: false }, // no need separate _id for each item
);

const PostyWithNoVaccancySchema = new mongoose.Schema({
  PostLevel: {
    type: String,
    required: true, // e.g. "Application Start"
  },
  noVaccancy: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "#000000",
  },
});

const PostyWithElligibilitySchema = new mongoose.Schema({
  PostLevel: {
    type: String,
    required: true,
  },
  elligibility: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "#000000",
  },
});

const HeadingLinkSchema = new mongoose.Schema({
  Level: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    default: "#000000",
  },
});

const UniquejobSchema = new mongoose.Schema(
  {
    // Publish state: false = draft/hidden, true = visible to public
    isPublished: {
      type: Boolean,
      default: false,
    },
    // Who created the job ("admin" or the employee's userId)
    createdBy: {
      type: String,
    },
    isJob: {
      type: Boolean,
    },
    label: {
      type: String,
    },
    isDocument: {
      type: Boolean,
      
    },
    documentHeading: {
      type: String,
     
    },
    isAdmission: {
      type: Boolean,
      
    },
    admissionHeading: {
      type: String,
     
    },
    isAnswerKey: {
      type: Boolean,
     
    },
    answerKeyHeading: {
      type: String,
     
    },
    isResultReleased: {
      type: Boolean,
     
    },
    resultHeading: {
      type: String,
     
    },
    isAdmitCardReleased: {
      type: Boolean,
      
    },
    admitCardHeading: {
      type: String,
     
    },
    title: {
      type: String,
      required: true,
    },
    postDate: {
      type: String,
      required: true,
    },
    boardName: {
      type: String,
      required: true,
    },
    postName: {
      type: String,
      required: true,
    },

    noOfVacancies: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    minAgeLimit: {
      type: String,
      required: true,
    },
    maxAgeLimit: {
      type: String,
      required: true,
    },
    ageRefDate: {
      type: String,
      required: true,
    },
    advertisementNo: {
      type: String,
      required: true,
    },
    importantDates: [importantDateSchema],
    applicationFees: [ApplicationFeeSchema],
    ageLimits: [AgeLimitSchema],
    postsWithNoVaccancy: [PostyWithNoVaccancySchema],
    postsWithElligibility: [PostyWithElligibilitySchema],
    headingLinks: [HeadingLinkSchema],
  },
  { timestamps: true },
);

export const UniqueJob = mongoose.model("UniqueJob", UniquejobSchema);
