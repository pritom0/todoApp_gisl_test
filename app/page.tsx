"use client"

import { inputValidation } from "@/utility/stringLib";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { api } from "@/utility/axiosLib";
import useTodoActions from "./_hooks/useTodoActions";
import AddTodo from "./_components/AddTodo";
import TmpShadcn, { ButtonDemo } from "./_tmp/TmpShadcn";
import { toast } from "sonner";

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
      toast(inputValidation(addTodo).message)
    } else if(status?.pending === 'true') {
      setStatus(p=> ({...p, message:'Please wait for a request to complete first'}))
      setStatus(p=> ({...p, success:'false'}))
      console.log(status?.message,"###")
      toast('Please wait for a request to complete first')
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
    deleteTodo(id);
  }

  return (
    <>


      <main className=" min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-center">
            Todo app
          </h1>
          <TodoList todoList={todoList} deleteHandler={deleteTodoHandler} />

          <AddTodo onSubmit={onSubmit} addTodo={addTodo} addTodoHandler={addTodoHandler} status={status} />
        </div>

      </main>

    </>

  );
}
