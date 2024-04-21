import { Job } from "@prisma/client";

interface JobListItemInterface {
  job: Job;
}

export default async function JobListItem({
  job: {
    id,
    title,
    createdAt,
    slug,
    type,
    location,
    locationType,
    description,
    salary,
    companyName,
    applicationEmail,
    applicationUrl,
    approved,
  },
}: JobListItemInterface) {
  return (
    <article className=" flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      {title}
    </article>
  );
}
