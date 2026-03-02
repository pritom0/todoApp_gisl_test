"use client"

import { useEffect } from "react";
import TodoList from "./TodoList";
import { api } from "@/utility/axiosLib";
import { TodoContext } from "../_contexts/TodoContext";
import AddTodo from "./AddTodo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

// import TmpShadcn, { ButtonDemo } from "./_tmp/TmpShadcn";

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

// Home has TodoList and AddTodo component. Home holds todo List state and todo actions, home loads data

export default function TodoApp(){

  const {data=[], isLoading=false, error} = 
    useQuery({
      queryKey:['todos'], 
      queryFn, 
      meta: {
        errorMessage: 'Failed to load the task list',
      }
    }) 

  async function queryFn() {
    return (await api.get("")).data
  }

  const queryClient = useQueryClient();

  const createMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, TodoType, {previousTodos: TodoType[]|undefined}>({
    retry: 0,
    networkMode: 'always',
    mutationFn: async (newTodo:TodoType) =>{
      const response = await api.post("", newTodo)
      return response || [] ;
    },
    // onMutate(variables, context) {
    async onMutate(newTask) {
      // query.cancel, query.state.push(data,...old),toast("data is saving"),  return query.previous_state as fallback
      
      // queryClient.cancelQueries(['todos']);
      // queryClient.cancelQueries({queryKey:['todos']})
      await queryClient.cancelQueries({queryKey:['todos']})
      
      const previousTodos = queryClient.getQueryData<TodoType[]>(['todos']);
      // queryClient.setQueryData(['todos'], [{createdAt: new Date().toISOString(), task: newTask}, ...(old||[])])
      queryClient.setQueryData(
        ['todos'], 
        (old:TodoType[]) => 
          [
            {
              createdAt: new Date().toISOString(), 
              task: newTask.task, 
              id: Date.now().toString()
            }, 
            ...(old || [])
          ])
      toast("Saving your task...")
      console.log({previousTodos}, "test optimistic test")
      return {previousTodos}
    },
    async onSuccess(data) {
      console.log(data, "mutation on success log")
      await queryClient.invalidateQueries({queryKey:['todos']})
      toast("Submission successful!")
      // variable = resetFunction
    },
    async onError(error, variables, context) {
      if(context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }

      if(window.navigator.onLine===false) {
        toast("You are offline. Please check your internet!")
      }
      else {
        toast("The create operation failed! Try again!")
        console.log(error,"create error")
      }


    },
  })

  const editMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, TodoType,{previousState:TodoType[]|undefined}> ({
    retry: 0,
    networkMode: 'always',
    mutationFn: async (editedTodo:TodoType) =>{
      const response = await api.put(`/${editedTodo.id}`, editedTodo)
      return response;
    },
    onMutate: async (editedTodo) => {
      await queryClient.cancelQueries({queryKey: ['todos']});
      const previousState = queryClient.getQueryData<TodoType[]>(['todos'])
      queryClient.setQueryData(
        ['todos'],
        (old:TodoType[]) => old.map(todo => todo.id===editedTodo.id? editedTodo: todo)
      )
      toast("The item is updating...")
      return {previousState};
    },
    async onSuccess(data) {
      console.log(data, "mutation on success log")
      toast("update successful")
      await queryClient.invalidateQueries({queryKey:['todos']})
    },
    async onError(error, variables, context) {
      if(context?.previousState) {
        queryClient.setQueryData(['todos'], context.previousState)
      }
      if(window.navigator.onLine===false) {
        toast("You are offline. Please check your internet!")
      }
      else {
        toast("Update failed due to an error! Please try again!")
        console.log(error,"create error")
      }
    },
  })

  const deleteMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, TodoType, {previousState:TodoType[]|undefined}>({

    retry: 0,
    networkMode:'always',
    mutationFn: async (deletedTodo:TodoType) => {
      return await api.delete(`/${deletedTodo.id}`)
    },
    onMutate: async (deletedTodo) => {
      await queryClient.cancelQueries({queryKey: ['todos']});
      const previousState = queryClient.getQueryData<TodoType[]>(['todos'])
      queryClient.setQueryData(
        ['todos'],
        (old:TodoType[]) => old.filter(todo => todo.id!==deletedTodo.id)
      )
      toast("Deleting...")
      return {previousState};
    },
    async onSuccess(data) {
      console.log(data, "mutation on success log")
      toast("delete successful")
      await queryClient.invalidateQueries({queryKey:['todos']})
    },
    async onError(error, variables, context) {
      if(context?.previousState) {
        queryClient.setQueryData(['todos'], context.previousState)
      }

      if(window.navigator.onLine===false) {
        toast("You are offline. Please check your internet!")
      }
      else {
        toast("Update failed due to an error! Please try again!")
        console.log(error,"create error")
      }
    },
  })

  console.log(data, isLoading, error)

  // fetch data on site load
  useEffect(() => {
    if(error)
      toast('Failed to load the task list')
    console.log(error, "error#")
  },[error])

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
