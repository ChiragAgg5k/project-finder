import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { projects } from "@/server/db/schema";
import { v4 } from "uuid";
import {eq} from "drizzle-orm";

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
      const id = v4();
      await ctx.db.insert(projects).values({
        id: id,
        name: input.name,
        description: input.description,
        projectUrl: input.projectUrl,
        image: input.image,
        ownerId: input.ownerId,
      });

      return id;
    }),

    fetch: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });
    }),

    fetchAll: publicProcedure
        .query(async ({ ctx }) => {
            return ctx.db.query.projects.findMany();
        }
    ),
});
