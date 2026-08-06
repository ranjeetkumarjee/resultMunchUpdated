import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    // bcrypt hash — never store plain password
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "employee",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
