import { JobRepository } from "@/lib/repository/jobRepository";
import JobFilterSidebar from "@/components/lib/job/JobFilterSidebar";
import JobList from "@/components/lib/job/JobList";
import H1 from "@/components/ui/h1";

export default async function Home() {
  const { getAllByApproved } = JobRepository();
  const jobs = await getAllByApproved(true);
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobList jobs={jobs} />
      </section>
    </main>
  );
}
