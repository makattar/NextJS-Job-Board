import JobListItem from "@/components/lib/job/JobListItem";
import { JobRepository } from "@/lib/repository/jobRepository";

export default async function Home() {
  const { getAllByApproved } = JobRepository();
  const jobs = await getAllByApproved(true);
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl  ">
          Developer jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section>
        <div className="space-y-4">
          {jobs.map((job) => {
            return <JobListItem job={job} />;
          })}
        </div>
      </section>
    </main>
  );
}
