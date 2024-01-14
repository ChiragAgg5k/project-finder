import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { projects } from "@/server/db/schema";
import { v4 } from "uuid";

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        projectUrl: z.string().url(),
        image: z.string().url(),
        ownerId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(projects).values({
        id: v4(),
        name: input.name,
        description: input.description,
        projectUrl: input.projectUrl,
        image: input.image,
        ownerId: input.ownerId,
      });
    }),
});
