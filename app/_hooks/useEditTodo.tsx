

import { api } from "@/utility/axiosLib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";

export default function useEditTodo(){


  const queryClient = useQueryClient();

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
    async onSuccess() {
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

  return {editMutation}
}
