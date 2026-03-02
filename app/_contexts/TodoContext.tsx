import { UseMutationResult } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { TodoType } from "../_components/TodoApp";
import { AxiosResponse } from "axios";

interface TodoContextType {
  isLoading: boolean;
  createMutation: UseMutationResult<
    AxiosResponse<TodoType[]|undefined>,                       
    Error,                                     
    TodoType,
    { previousTodos: TodoType[] | undefined }  
  >;
  editMutation: UseMutationResult<AxiosResponse<TodoType[]|undefined>, Error, TodoType,{previousState:TodoType[]|undefined}>;
  deleteMutation: UseMutationResult<AxiosResponse<TodoType[]|undefined>, Error, TodoType,{previousState:TodoType[]|undefined}>;
} 

export const TodoContext = createContext<TodoContextType|undefined>(undefined)

export function useTodoContext() {
  const context = useContext(TodoContext)
  if(context === undefined)
    // throw new Error('Context is undefined')
    throw new Error('useTodoContext must be used within a TodoContext.Provider')

  return context;
}
