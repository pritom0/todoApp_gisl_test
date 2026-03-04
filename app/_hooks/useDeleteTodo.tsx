

import { api } from "@/utility/axiosLib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";

export default function useDeleteTodo(){
  const queryClient = useQueryClient();

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

  return {deleteMutation}
}

