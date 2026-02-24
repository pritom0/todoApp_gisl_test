"use client"

import { inputValidation } from "@/utility/stringLib";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { api } from "@/utility/axiosLib";

export type Todo = {
  task: string;
  id: string;
  createdAt: Date;
}

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState<string>('');
  const [success, setSuccess] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [pending, setPending] = useState<string>('')

  
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



    async function postTodo() {
      setPending('true')
      try {
        const response = await api.post("/",{
            task: addTodo
        });

        console.log(response, "resp##")
        setTodoList(p => ([...p, response.data]))
        setMessage("The task is added successfully")
        setSuccess('true')
        setPending('false')
      } catch (error) {
        console.log(error)
        setMessage('Failed to add the task')
        setSuccess('false')
        setPending('false')
      } finally {
        setAddTodo('')
      }

    }

    if(inputValidation(addTodo).error) {
      setMessage(inputValidation(addTodo).message)
      setSuccess('false')
    } else if(pending === 'true') {
      setMessage('Please wait for a request to complete first')
      setSuccess('false')
      console.log(message,"###")
    }
    else {
      postTodo();
    }
  }

  function addTodoHandler(e:ChangeEvent<HTMLInputElement>) {
    setAddTodo(e.target.value);
    setSuccess('')
  }

  function deleteTodoHandler(id:string) {
    const confirm = window.confirm("confirm delete operation")
      async function deleteTodo() {
       try {
         // const response = await axios({
         //   method:"delete",
         //   baseURL: url,
         //   data: {
         //     id,
         //   }
         // });
         const response = await api.delete(`/${id}`);
 
         console.log(response, "resp##")
         setTodoList(p => p.filter(todo => todo.id!==id))
       } catch (error) {
         console.log(error)
       } finally {
       }
      }

    if(confirm) {
      deleteTodo();
    }
  }

  return (
    <>
      <main className="w-60">
        <h1 className="text-center">
          Todo app
        </h1>
        <TodoList todoList={todoList} deleteHandler={deleteTodoHandler} />

        {/* <AddTodo onSubmit={onSubmit} addTodo={addTodo} addTodoHandler={addTodoHandler} pending={pending} success={success} message={message} /> */}

        <form onSubmit={onSubmit}>
          <input className="bg-green-900" type="text" value={addTodo} onChange={addTodoHandler} placeholder="type new task" />
          <button type="submit" disabled={pending==='true'}>submit</button>
          {
            success==='true'? <p className="text-green-600">{message}</p> :
            success==='false'? (<p className="text-red-600">{message}</p>) : null 
          }
          <p></p>
        </form>
      </main>
    </>

  );
}

// seperate submit, delete using custom hooks that return message, error, pending
