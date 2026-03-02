"use client"

import TodoList from "./TodoList";
import { TodoContext } from "../_contexts/TodoContext";
import AddTodo from "./AddTodo";
import useTodoQueries from "../_hooks/useTodoQueries";

export type TodoType = {
  task: string;
  id: string;
  createdAt: string;
}

export interface Status {
  success?: string;
  pending?: string;
  message?: string;
}

export default function TodoApp(){

  const {data, isLoading, error, createMutation, editMutation, deleteMutation } = useTodoQueries()


  console.log(data, isLoading, error)

  return (
    <>
      <main className=" min-h-screen bg-background p-4 md:p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <h1 className="text-center">
            Todo app
          </h1>
          <TodoContext value={{isLoading, createMutation, editMutation, deleteMutation}}>
            <TodoList todoList={data}  />
            <AddTodo />

          </TodoContext>
        </div>
      </main>
    </>
  )
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
