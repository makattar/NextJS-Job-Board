import JobFilter from "@/components/lib/job/JobFilter";
import JobList from "@/components/lib/job/JobList";
import H1 from "@/components/ui/h1";
import { jobFilterSchemaType } from "@/lib/validate";

interface HomePropsInterface {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, remote, type, location },
}: HomePropsInterface) {
  const jobFilterValues: jobFilterSchemaType = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>Developer jobs</H1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilter defaultValues={jobFilterValues} />
        <JobList filters={jobFilterValues} />
      </section>
    </main>
  );
}
