

import { api } from "@/utility/axiosLib";
import {useQuery } from "@tanstack/react-query";
import { TodoType } from "../_components/TodoApp";

export default function useTodoQuery(){
  const {data=[], isLoading=false, error} = 
    useQuery<TodoType[]|undefined,Error>({
      queryKey:['todos'], 
      queryFn, 
      meta: {
        errorMessage: 'Failed to load the task list',
      }
    }) 

  async function queryFn() {
    return (await api.get("")).data
  }

  return {data, isLoading, error}
}
