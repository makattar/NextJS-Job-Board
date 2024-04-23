import { Job, Prisma } from "@prisma/client";
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

  const getDistinctLocationsByApproved = async (
    approved: boolean,
  ): Promise<string[]> => {
    const jobsWithLocations = await prisma.job.findMany({
      where: {
        location: {
          not: null,
        },
        approved: approved,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    });
    return jobsWithLocations.map((_) => String(_.location));
  };

  const getByPredicate = async (
    predicate: Prisma.JobWhereInput,
  ): Promise<Job[]> => {
    const jobs = await prisma.job.findMany({
      where: {
        ...predicate,
      },
    });
    return jobs;
  };
  return {
    getAllByApproved,
    getDistinctLocationsByApproved,
    getByPredicate,
  };
};
