import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type IPAPIResponse } from "@/types/api-response.types";

export const seminarRouter = createTRPCRouter({
  getList: publicProcedure.query(async () => {
    const response = await fetch(`${env.BACKEND_URL}/seminars`);

    if (!response.ok) {
      throw new Error("Failed to fetch seminars");
    }

    const { success, data } = (await response.json()) as IPAPIResponse;

    if (!success) {
      throw new Error("Failed to fetch seminars");
    }

    return data.seminars;
  }),
});
