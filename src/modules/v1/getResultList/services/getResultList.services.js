import { UniqueJob } from "../../createUniqueJob/model/createUniquejob.js";

export async function getResultListServices(query) {
  try {
    //   Safe pagination
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Number(query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    // Aggregation pipeline
    const result = await UniqueJob.aggregate([
      {
        $match: { isJob: true }, // only jobs
      },
      //   {
      //     $sort: { createdAt: -1 }, // latest first
      //   },
      {
        $project: {
          resultHeading: 1,
          label: 1,
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
