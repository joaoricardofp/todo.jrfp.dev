import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server/trpc.index";

export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url:"/api/trpc"
        }),
    ],
});
