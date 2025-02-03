import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  type IPAPIResponseAll,
  type IPAPIResponseLastUpdated,
  type IPAPIResponse,
} from "@/types/api-response.types";
import { z } from "zod";

export const seminarRouter = createTRPCRouter({
  getList: publicProcedure.query(async () => {
    const response = await fetch(`${env.BACKEND_URL}/seminars/all`);

    if (!response.ok) {
      throw new Error("Failed to fetch seminars");
    }

    const { success, data } = (await response.json()) as IPAPIResponseAll;

    if (!success) {
      throw new Error("Failed to fetch seminars");
    }

    return {
      seminars: data.seminars,
    };
  }),

  paginate: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input: { page, limit } }) => {
      const response = await fetch(
        `${env.BACKEND_URL}/seminars?page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch seminars");
      }

      const { success, data, meta } = (await response.json()) as IPAPIResponse;

      if (!success) {
        throw new Error("Failed to fetch seminars");
      }

      return {
        data: data.seminars,
        meta,
      };
    }),

  getLastUpdated: publicProcedure.query(async () => {
    const response = await fetch(`${env.BACKEND_URL}/seminars/last-updated`);

    if (!response.ok) {
      throw new Error("Failed to fetch last updated");
    }

    const { success, data } =
      (await response.json()) as IPAPIResponseLastUpdated;

    if (!success) {
      throw new Error("Failed to fetch last updated");
    }

    return data.lastUpdated;
  }),
});
