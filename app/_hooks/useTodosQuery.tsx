import {useQuery } from "@tanstack/react-query";
import { TodoType } from "../_components/TodoApp";
import axios from "axios";

export default function useTodosQuery(){
  const {data=[], isLoading=false, error} = 
    useQuery<TodoType[]|undefined,Error>({
      queryKey:['todos'], 
      queryFn, 
      meta: {
        errorMessage: 'Failed to load the task list',
      }
    }) 

  async function queryFn() {
    return (await axios.get("/api/todos")).data
  }

  return {data, isLoading, error}
}
