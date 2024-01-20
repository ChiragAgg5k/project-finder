import {createTRPCRouter, protectedProcedure, publicProcedure} from "@/server/api/trpc";
import { z } from "zod";
import { comments } from "@/server/db/schema";
import { v4 } from "uuid";
import { eq } from "drizzle-orm";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        projectId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const commentId = v4();

      await ctx.db.insert(comments).values({
        id: commentId,
        content: input.comment,
        projectId: input.projectId,
        userId: ctx.session.user.id,
      });

      return commentId;
    }),

  fetchAll: publicProcedure
    .input(
      z.object({
        projectId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.comments.findMany({
        where: eq(comments.projectId, input.projectId),
          with:{
            user: true
          }
      });
    }),
});
