// export const validate = (schema) => (req, res, next) => {
//   try {
//     console.log("Validated Data:aaaaaaaaaaaa", req.body);
//     // parse & sanitize data
//     const validatedData = schema.parse(req.body);

//     console.log("Validated Data:bbbbbbbbbbbbbb", validatedData); // for debugging

//     // overwrite req with validated data
//     // req.body = validatedData.body || req.body;
//     // req.query = validatedData.query || req.query;
//     // req.params = validatedData.params || req.params;

//     next();
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "Validation failed",
//       errors: error?.errors?.map((err) => ({
//         field: err.path.join("."),
//         message: err.message,
//       })),
//     });
//   }
// };

// export const validate = (schema) => (req, res, next) => {
//   try {
//     //  Validate using safeParse (no exception throw)
//     const result = schema.safeParse({
//       body: req.body,
//       query: req.query,
//       params: req.params,
//     });

//     // Validation Failed
//     if (!result.success) {
//       const errors = result.error.errors.map((err) => ({
//         field: err.path.join("."), // e.g. body.title
//         message: err.message,
//       }));

//       // Clean field-wise object (best for frontend forms)
//       const errorMap = {};
//       errors.forEach((e) => {
//         errorMap[e.field] = e.message;
//       });

//       return res.status(400).json({
//         success: false,
//         message:
//           errors.length === 1
//             ? errors[0].message
//             : "Multiple validation errors occurred",
//         errors: errorMap, // best for UI binding
//         errorList: errors, // optional (debug / logs)
//       });
//     }

//     //  Overwrite request with validated/sanitized data
//     req.body = result.data.body || req.body;
//     req.query = result.data.query || req.query;
//     req.params = result.data.params || req.params;

//     next();
//   } catch (err) {
//     console.error("Validation Middleware Error:", err);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error during validation",
//     });
//   }
// };

export const validate = (schema) => (req, res, next) => {
  try {
    console.log("data:=============", req.body);
    const result = schema.safeParse(req.body);
    console.log("data:=============11111111111", result);
    //  Validation failed
    if (!result.success) {
      console.log("data:============22222222222=");
      const zodErrors = result.error?.errors || [];
      console.log("data:============333333333333=");
      const formattedErrors = zodErrors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      console.log("data:============4444444444444=");
      const errorMap = {};
      formattedErrors.forEach((e) => {
        errorMap[e.field] = e.message;
      });
      console.log("data:============5555555555555=");
      return res.status(400).json({
        success: false,
        message:
          formattedErrors.length === 1
            ? formattedErrors[0].message
            : "Validation failed",
        errors: errorMap,
      });
    }

    console.log("data:", result);

    //  Valid
    req.body = result.data;
    next();
  } catch (error) {
    console.error("Validation Middleware Error:", error);

    //  SAFE fallback (no crash)
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
