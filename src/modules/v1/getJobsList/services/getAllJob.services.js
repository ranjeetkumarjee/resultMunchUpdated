import { UniqueJob } from "../../createUniqueJob/model/createUniquejob.js";

// export async function getAllJobServices(query) {
//   try {
//     //  Safe Pagination Parsing
//     const page = Math.max(Number(query.page) || 1, 1);
//     const limit = Math.min(Number(query.limit) || 10, 100);
//     const skip = (page - 1) * limit;

//     // Base Filter
//     const filter = { isJob: true };

//     //  Search (safe regex)
//     // if (query.search && typeof query.search === "string") {
//     //   const search = query.search.trim();

//     //   filter.$or = [
//     //     { title: { $regex: search, $options: "i" } },
//     //     { boardName: { $regex: search, $options: "i" } },
//     //   ];
//     // }

//     // Board filter
//     // if (query.boardName && typeof query.boardName === "string") {
//     //   filter.boardName = {
//     //     $regex: query.boardName.trim(),
//     //     $options: "i",
//     //   };
//     // }

//     //  Safe Sorting
//     // const allowedSortFields = ["createdAt", "postDate", "title"];
//     // let sort = { createdAt: -1 };

//     // if (query.sortBy && allowedSortFields.includes(query.sortBy)) {
//     //   const order = query.order === "asc" ? 1 : -1;
//     //   sort = { [query.sortBy]: order };
//     // }

//     //  DB Query (parallel)
//     const [jobs, total] = await Promise.all([
//       UniqueJob.find(filter)
//         .select("title boardName postDate noOfVacancies")
//         .sort(sort)
//         .skip(skip)
//         .limit(limit)
//         .lean(),

//       UniqueJob.countDocuments(filter),
//     ]);

//     //  Pagination meta (safe)
//     const totalPages = Math.max(Math.ceil(total / limit), 1);

//     return {
//       success: true,
//       data: jobs,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages,
//         hasNextPage: page < totalPages,
//         hasPrevPage: page > 1,
//       },
//     };
//   } catch (error) {
//     console.error("getAllJobServices Error:", error);

//     //  Throw clean error to controller
//     throw new Error("Failed to fetch jobs");
//   }
// }

// import { UniqueJob } from "../../createUniqueJob/model/createUniquejob.js";

export async function getAllJobServices(query) {
  try {
    //   Safe pagination
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Number(query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    // Aggregation pipeline
    const result = await UniqueJob.aggregate([
      {
        $match: { isJob: true, isPublished: true }, // only published jobs are public
      },
      {
        $sort: { createdAt: -1 }, // latest first
      },
      {
        $project: {
          title: 1,
          label: 1,
          boardName: 1,
          postDate: 1,
          noOfVacancies: 1,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    //  Extract data
    const jobs = result[0]?.data || [];
    const total = result[0]?.totalCount[0]?.count || 0;

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return {
      success: true,
      data: jobs,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Aggregation Pagination Error:", error);
    throw new Error("Failed to fetch jobs");
  }
}
