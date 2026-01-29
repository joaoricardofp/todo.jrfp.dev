import TodoList from "./_components/todos";
import { serverClient } from "./_trpc/server";

export default async function Home() {
    const todos = await serverClient.getTodos();
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-md">
                <TodoList initialTodos={todos} />
            </div>
        </div>
    );
}
