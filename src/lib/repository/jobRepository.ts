import { Job } from "@prisma/client";
import prisma from "../prisma";

export const JobRepository = () => {
  const getAllByApproved = async (approved: boolean): Promise<Job[]> => {
    const jobs = await prisma.job.findMany({
      where: {
        approved: approved,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return jobs;
  };

  return {
    getAllByApproved,
  };
};
