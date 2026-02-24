"use client"

import { inputValidation } from "@/utility/stringLib";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { api } from "@/utility/axiosLib";
import useTodoActions from "./_hooks/useTodoActions";
import AddTodo from "./_components/AddTodo";

export type Todo = {
  task: string;
  id: string;
  createdAt: Date;
}

export interface Status {
  success?: string;
  pending?: string;
  message?: string;
}


export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState<string>('');
  const [status, setStatus] = useState<Status>();

  const {postTodo, deleteTodo} = useTodoActions({setTodoList, setStatus})

  
  useEffect(() => {
    async function loadTodoData() {
      try {
        const response = await api.get("")
        console.log(response, "##")
        setTodoList(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadTodoData();
  },[])

  function onSubmit(event:FormEvent) {
    event.preventDefault();

    if(inputValidation(addTodo).error) {
      setStatus(p=> ({...p, message:inputValidation(addTodo).message}))
      setStatus(p=> ({...p, success:'false'}))
    } else if(status?.pending === 'true') {
      setStatus(p=> ({...p, message:'Please wait for a request to complete first'}))
      setStatus(p=> ({...p, success:'false'}))
      console.log(status?.message,"###")
    }
    else {
      postTodo(addTodo,setAddTodo);
    }
  }

  function addTodoHandler(e:ChangeEvent<HTMLInputElement>) {
    setAddTodo(e.target.value);
    setStatus(p=> ({...p, success:''}))
  }

  function deleteTodoHandler(id:string) {
    const confirm = window.confirm("confirm delete operation")

    if(confirm) {
      deleteTodo(id);
    }
  }

  return (
    <>
    {"message" + status?.message}
    {"pending" + status?.pending}
    {"success" + status?.success}

      <main className="w-60">
        <h1 className="text-center">
          Todo app
        </h1>
        <TodoList todoList={todoList} deleteHandler={deleteTodoHandler} />

        <AddTodo onSubmit={onSubmit} addTodo={addTodo} addTodoHandler={addTodoHandler} status={status} />

      </main>
    </>

  );
}
