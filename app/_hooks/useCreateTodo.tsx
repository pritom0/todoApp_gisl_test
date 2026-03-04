

import { api } from "@/utility/axiosLib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";

export default function useCreateTodo(){
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

  return {createMutation}
}
