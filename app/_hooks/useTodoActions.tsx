import { api } from "@/utility/axiosLib";
import { Dispatch, SetStateAction, useState } from "react";
import { Status, Todo } from "../page";
import { toast } from "sonner";

interface UseTodoActionsProp {
  // setTodoList: (todoList:Todo[])=>Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  setStatus: Dispatch<SetStateAction<Status|undefined>>;
  setAddTodo: Dispatch<SetStateAction<string>>;
}

export default function useTodoActions({ setTodoList, setStatus, setAddTodo }: UseTodoActionsProp) {

  async function postTodo(
    addTodo: string,
  ) {
    setStatus((p) => ({ ...p, pending: "true" }));

    try {
      const response = await api.post("/", {
        task: addTodo,
      });

      setTodoList((p) => [...p, response.data]);

      setStatus({
        message: "The task is added successfully",
        success: "true",
        pending: "false",
      });

      toast('The task is added successfully')

    } catch (error) {
      console.log(error);
      setStatus({
        message: "Failed to add the task",
        success: "false",
        pending: "false",
      });

      toast('Failed to add the task')
    } finally {
      setAddTodo("");
    }
  }

  async function deleteTodo(id:string) {
    try {
      const response = await api.delete(`/${id}`);

      console.log(response, "resp##");
      setTodoList((p) => p.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return { postTodo, deleteTodo };
}
