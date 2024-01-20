import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "@/server/api/routers/user";
import { projectRouter } from "@/server/api/routers/project";
import {commentRouter} from "@/server/api/routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  project: projectRouter,
  comment: commentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
