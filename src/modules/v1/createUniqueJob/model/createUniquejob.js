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
    isJob: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isDocument: {
      type: Boolean,
      required: true,
    },
    documentHeading: {
      type: String,
      required: true,
    },
    isAdmission: {
      type: Boolean,
      required: true,
    },
    admissionHeading: {
      type: String,
      required: true,
    },
    isAnswerKey: {
      type: Boolean,
      required: true,
    },
    answerKeyHeading: {
      type: String,
      required: true,
    },
    isResultReleased: {
      type: Boolean,
      required: true,
    },
    resultHeading: {
      type: String,
      required: true,
    },
    isAdmitCardReleased: {
      type: Boolean,
      required: true,
    },
    admitCardHeading: {
      type: String,
      required: true,
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
    jobHeading: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const UniqueJob = mongoose.model("UniqueJob", UniquejobSchema);
