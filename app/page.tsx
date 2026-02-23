"use client"

import axios from "axios";
import { randomUUID } from "crypto";
// import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from "react";

type Todo = {
  task: string;
  id: string;
  createdAt: Date;
}

const url = "https://6375088248dfab73a4f034c4.mockapi.io/api/v1/todos"

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState<string>('');
  const [success, setSuccess] = useState<string>('')
  
  useEffect(() => {
    async function loadTodoData() {
      try {
        const response = await axios.get(url)
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
      try {
        const response = await axios({
          method:"post",
          baseURL: url,
          data: {
            // id: randomUUID(),
            // createdAt: Date.now(),
            task: addTodo
          }
        });

        console.log(response, "resp##")
        setTodoList(p => ([...p, response.data]))
        setSuccess("true")        
      } catch (error) {
        console.log(error)
        setSuccess('false')
      } finally {
        setAddTodo('')
      }

    }

    postTodo();
  }

  function addTodoHandler(e:ChangeEvent<HTMLInputElement>) {
    setAddTodo(e.target.value);
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
         const response = await axios.delete(`${url}/${id}`);
 
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
        <h1 className="ml-auto">
          Todo app
        </h1>
        <div>
          {
            todoList.map(todo => 
              <li key={todo.id} className="flex border-2">
                <div className="grow">
                  {todo.task}
                </div>
                <button className="grow-0 cursor-pointer" onClick={()=>deleteTodoHandler(todo.id)}>
                  delete
                </button>
              </li>
            )
          }
        </div>
        <form onSubmit={onSubmit}>
          <input className="bg-green-900" type="text" value={addTodo} onChange={addTodoHandler} placeholder="type new task" />
          <button type="submit">submit</button>
          {
            success==='true'? <p className="text-green-600">The task is added successfully</p> : (
              success==='false'? <p className="text-red-600">Failed to add the task</p> :
              <></>
            )
          }
          <p></p>
        </form>
      </main>
    </>

  );
}
