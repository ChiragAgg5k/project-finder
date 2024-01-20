import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";
import { users } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  fetch: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });
    }),

  incrementTrialUsed: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .update(users)
      .set({
        trialUsed: sql<string>`${users.trialUsed} + 1`,
      })
      .where(eq(users.id, ctx.session.user.id));
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        interests: z.string(),
        skills: z.string(),
        rating: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          interests: input.interests,
          skills: input.skills,
          rating: input.rating,
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
});
