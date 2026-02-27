"use client"

import { useEffect, useState } from "react";
import TodoList from "./_components/TodoList";
import { api } from "@/utility/axiosLib";
import useTodoActions from "./_hooks/useTodoActions";
import AddTodo from "./_components/AddTodo";
import { TodoContext } from "./_contexts/TodoContext";
// import TmpShadcn, { ButtonDemo } from "./_tmp/TmpShadcn";

export type TodoType = {
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
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const {postTodo, deleteTodo, editAction} = useTodoActions({setTodoList})

  
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
          <TodoContext value={{editAction}}>
            <TodoList todoList={todoList} deleteHandler={deleteTodoHandler} />
          </TodoContext>

          <AddTodo postTodo={postTodo}/>
        </div>

        {/* <TmpShadcn /> */}

      </main>

    </>

  );
}

// state action flow: 
// task app
// - todoList: [todoList]
// - Add: action_add-[todoList]-[status]-action_add > break the loop: [status_after_add] [status_before_add]
// - delete: action_del-[todoList]-[status]
// - message: [status]
// - input_message: [input_status]

// TodoList - [todoList]
// AddTodo - add_action()

// delete, edit button, 
