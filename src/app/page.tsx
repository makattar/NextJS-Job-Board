import JobListItem from "@/components/lib/job/JobListItem";
import { JobRepository } from "@/lib/repository/jobRepository";

export default async function Home() {
  const { getAllByApproved } = JobRepository();
  const jobs = await getAllByApproved(true);
  return (
    <main>
      {jobs.map((job) => {
        return <JobListItem job={job} />;
      })}
    </main>
  );
}
