import {createTRPCRouter, publicProcedure} from "@/server/api/trpc";
import {z} from "zod";
import {users} from "@/server/db/schema";
import {eq} from "drizzle-orm";

export const userRouter = createTRPCRouter(
    {
        fetch: publicProcedure.input(z.object({
            userId: z.string().uuid(),
        })).query(async ({ctx, input}) => {
            return ctx.db
                .select()
                .from(users)
                .where(eq(users.id, input.userId))
                .limit(1);
        }
        ),
    }
)
