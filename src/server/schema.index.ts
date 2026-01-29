import z from "zod"

export const todoSchema = z.object({
  content: z.string().trim().min(3).max(100),
});

export type TodoSchema = z.infer<typeof todoSchema>;
