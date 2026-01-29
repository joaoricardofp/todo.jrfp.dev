"use client"

import React, { useState } from "react";
import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/server";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { CirclePlusIcon, Trash2Icon, ListCheckIcon } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, TodoSchema } from "@/server/schema.index";
import { Spinner } from "@/components/ui/spinner";
import { Item, ItemActions, ItemContent, ItemGroup, ItemSeparator, ItemTitle } from "@/components/ui/item";
import { Checkbox } from "@/components/ui/checkbox";

export default function TodoList({ initialTodos }: { initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>> }){
    const getTodos = trpc.getTodos.useQuery(undefined, {
        initialData: initialTodos,
        refetchOnMount: false,
        refetchOnReconnect: false
    });
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });
    const setDone = trpc.setDone.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });
    const deleteTodo = trpc.deleteTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<TodoSchema>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            content: ""
        }
    });

    const onSubmit = async (value: TodoSchema) => {
        setIsLoading(true);
        try {
            addTodo.mutate(value.content);
        } catch {
            return;
        } finally {
            setIsLoading(false);
        }
    }
    return(
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
                <a href="/" className="flex flex-col items-center gap-2 font-medium">
                    <div className="flex size-8 items-center justify-center rounded-md">
                        <ListCheckIcon className="size-6" />
                    </div>
                    <span className="sr-only">
                        To-do List
                    </span>
                </a>
                <h1 className="text-xl font-bold">
                    To-do List
                </h1>
            </div>
            <Form {...form}>
                <form className="flex-col flex space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <ButtonGroup className="w-full">
                                        <Input id="content" type="text" placeholder="Add to-do" {...field} />
                                        <Button type="submit" variant="outline" disabled={isLoading}>
                                            {isLoading ? <Spinner /> : <CirclePlusIcon aria-label="Add to-do" />}
                                        </Button>
                                    </ButtonGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <ItemGroup>
                {getTodos?.data?.map((todo, index) => (
                    <React.Fragment key={todo.id}>
                        <Item>
                            <Checkbox id={`check-${todo.id}`} onClick={async () => {
                                setDone.mutate({
                                    id: todo.id,
                                    done: todo.done ? false : true,
                                });
                            }} defaultChecked={!!todo.done} />
                            <ItemContent>
                                <ItemTitle className={cn("no-underline", !!todo.done ? "line-through text-accent" : "")}>
                                    {todo.content}
                                </ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <Button variant="ghost" size="icon" onClick={async () => {
                                    deleteTodo.mutate({
                                        id: todo.id
                                    });
                                }} aria-label="Delete from to-do">
                                    <Trash2Icon className="text-red-600" />
                                </Button>
                            </ItemActions>
                        </Item>
                        {index !== getTodos.data.length - 1 && <ItemSeparator />}
                    </React.Fragment>
                ))}
            </ItemGroup>
        </div>
    )
}
