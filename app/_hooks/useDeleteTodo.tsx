

import { api } from "@/utility/axiosLib";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";
import { useBoundStore } from "../_store/stateStore";

export default function useDeleteTodo(){
  const queryClient = useQueryClient();

  const {progressQueueDown, progressQueueUp, finishProgressing} = useBoundStore(state => state.progressActions)
  const {progressDone, progressRemain} = useBoundStore(state => state)
  
  const deleteMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, TodoType, {previousState:TodoType[]|undefined}>({

    retry: 0,
    networkMode:'always',
    mutationFn: async (deletedTodo:TodoType) => {
      return await api.delete(`/${deletedTodo.id}`)
    },
    // optimistic delete
    onMutate: async () => {
      progressQueueUp(1);

    //   await queryClient.cancelQueries({queryKey: ['todos']});
      const previousState = queryClient.getQueryData<TodoType[]>(['todos'])
    //   queryClient.setQueryData(
    //     ['todos'],
    //     (old:TodoType[]) => old.filter(todo => todo.id!==deletedTodo.id)
    //   )
      return {previousState};
    },
    async onSuccess() {
      // console.log(data, "mutation on success log")
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
        toast("Delete failed due to an error! Please try again!")
        console.log(error,"create error")
      }
    },
    async onSettled() {
      progressQueueDown(1);
      if(progressDone+1 >= progressRemain) {
        setTimeout(finishProgressing, 2000);
      }
      else {
        // progressQueueDown(1);
      }
    }
    
  })

  return {deleteMutation}
}

