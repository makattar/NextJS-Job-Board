import { jobFilterSchemaType } from "@/lib/validate";
import JobListItem from "./JobListItem";
import { JobRepository } from "@/lib/repository/jobRepository";
import { Prisma } from "@prisma/client";

interface JobListInterface {
  filters: jobFilterSchemaType;
}

export default async function JobList({
  filters: { q, type, location, remote },
}: JobListInterface) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          {
            companyName: {
              search: searchString,
            },
          },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };
  const { getByPredicate } = JobRepository();
  const jobs = await getByPredicate(where);

  return (
    <div className="grow space-y-4">
      {jobs.map((job) => {
        return <JobListItem job={job} key={job.id} />;
      })}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found.Try adjusting the search filters.
        </p>
      )}
    </div>
  );
}
