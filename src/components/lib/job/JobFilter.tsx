import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes } from "@/lib/constant/job-types";
import { JobRepository } from "@/lib/repository/jobRepository";
import {
  jobFilterSchema,
  jobFilterSchemaType,
  validateSchema,
} from "@/lib/validate";
import { redirect } from "next/navigation";
import FormSubmitButton from "../common/FormSubmitButton";

interface JobFilterSidebarInterface {
  defaultValues: jobFilterSchemaType;
}

async function filterJobs(formData: FormData) {
  "use server";
  const values = Object.fromEntries(formData.entries());
  const { isOk, data: parsedValues } = validateSchema(values, jobFilterSchema);
  if (isOk) {
    const { q, type, location, remote } = parsedValues;
    const searchParams = new URLSearchParams({
      ...(q && { q: q.trim() }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
    });
    redirect(`/?${searchParams.toString()}`);
  }
}

export default async function JobFilter({
  defaultValues,
}: JobFilterSidebarInterface) {
  const { getDistinctLocationsByApproved } = JobRepository();
  const distinctLocations = await getDistinctLocationsByApproved(true);

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Location</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value={""}>All Types</option>
              {jobTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value={""}>All Locations</option>
              {distinctLocations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
