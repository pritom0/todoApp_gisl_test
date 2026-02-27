import { api } from "@/utility/axiosLib";
import { Dispatch, SetStateAction, useState } from "react";
import { Status, TodoType } from "../page";
import { toast } from "sonner";

interface UseTodoActionsProp {
  // setTodoList: (todoList:Todo[])=>Todo[];
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
}

export default function useTodoActions({ setTodoList }: UseTodoActionsProp) {

  async function postTodo(
    addTodo: string,
  ) {

    try {
      const response = await api.post("/", {
        task: addTodo,
      });

      setTodoList((p) => [...p, response.data]);

      toast('The task is added successfully')
      return  true;

    } catch (error) {
      console.log(error);

      toast('Failed to add the task')

      return false;
    } finally {
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

  async function editAction(id:string, text: string) {

    try {
      const response = await api.put(`/${id}`, {
        task: text,
      });

      setTodoList((p) => p.map(todo => todo.id === id? response.data: todo));

      toast('The task is edited successfully')
      return true;

    } catch (error) {
      console.log(error);

      toast('Failed to edit the task')
      return false
    } finally {

    }


  }

  return { postTodo, deleteTodo, editAction };
}

// edit submit => pending : true, editAction(id, text) success? (setTodoList(), setStatus(true), toast): (setStatus(false), toast), 
// pending: false, 
