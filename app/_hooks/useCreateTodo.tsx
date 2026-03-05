

import { api } from "@/utility/axiosLib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";

// const generateId = () => Date.now().toString()
export default function useCreateTodo(){
  const queryClient = useQueryClient();
  // const tempId = generateId();
  const createMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, {task: string; id: string}, {previousTodos: TodoType[]|undefined}>({
    retry: 0,
    networkMode: 'always',
    mutationKey: ['todos', 'createTodo'],
    mutationFn: async ({task}) =>{
      const response = await api.post("", {task})
      return response || [] ;
    },
    // onMutate(variables, context) {
    async onMutate({task, id}) {
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
              task, 
              id
            }, 
            ...(old || [])
          ])
      toast("Saving your task...")
      console.log({previousTodos}, "test optimistic test")
      return {previousTodos}
    },
    async onSuccess() {
      // console.log(data, "mutation on success log")
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
