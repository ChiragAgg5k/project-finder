import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { likes } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const likeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(likes).values({
        projectId: input.projectId,
        userId: ctx.session.user.id,
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(likes)
        .where(
          and(
            eq(likes.projectId, input.projectId),
            eq(likes.userId, ctx.session.user.id),
          ),
        );
    }),

  liked: protectedProcedure
    .input(
      z.object({
        projectId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.projectId === undefined) {
        return false;
      }

      return (
        (await ctx.db.query.likes.findFirst({
          where: and(
            eq(likes.projectId, input.projectId),
            eq(likes.userId, ctx.session.user.id),
          ),
        })) !== undefined
      );
    }),

  likes: publicProcedure
    .input(
      z.object({
        projectId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.projectId === undefined) {
        return [];
      }

      return ctx.db.query.likes.findMany({
        where: eq(likes.projectId, input.projectId),
      });
    }),
});
