import { Job } from "@prisma/client";
import JobListItem from "./JobListItem";

interface JobListInterface {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListInterface) {
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => {
        return <JobListItem job={job} key={job.id} />;
      })}
    </div>
  );
}
