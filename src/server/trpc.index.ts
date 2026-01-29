import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";
import prisma from "../lib/prisma";

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return await prisma.todos.findMany();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        await prisma.todos.create({
            data: {
                content: opts.input,
                done: false
            }
        });

        return true;
    }),
    setDone: publicProcedure.input(z.object({
        id: z.number(),
        done: z.boolean(),
    })).mutation(async (opts) => {
        await prisma.todos.update({
            where: {
                id: opts.input.id
            },
            data: {
                done: opts.input.done
            }
        });

        return true;
    }),
    deleteTodo: publicProcedure.input(z.object({
        id: z.number()
    })).mutation(async (opt) => {
        await prisma.todos.delete({
            where: {
                id: opt.input.id
            }
        });

        return true;
    })
});

export type AppRouter = typeof appRouter;
