import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { projects } from "@/server/db/schema";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";
import { Octokit } from "octokit";
import { env } from "@/env";

const octokit = new Octokit({
  auth: env.GITHUB_ACCESS_TOKEN,
});

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        projectUrl: z.string().url(),
        image: z.string().url(),
        ownerId: z.string().uuid(),
        tags: z.string(),
        type: z.string(),
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
        tags: input.tags,
        ownerId: input.ownerId,
        type: input.type,
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

  fetchAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.projects.findMany();
  }),

  fetchGithubTrending: publicProcedure.query(async ({ ctx }) => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    const result = await octokit.request("GET /search/repositories", {
      q: `created:>${dateString}`,
      sort: "stars",
      order: "desc",
      per_page: 36,
    });

    return result.data.items;
  }),

  fetchGithubSearch: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.query === "") return;

      const result = await octokit.request("GET /search/repositories", {
        q: input.query,
        sort: "stars",
        order: "desc",
        per_page: 6,
      });

      return result.data.items;
    }),

  incrementLikes: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        currentLikes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(projects)
        .set({
          likes: input.currentLikes + 1,
        })
        .where(eq(projects.id, input.id));
    }),
});
