

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import { TodoType } from "../_components/TodoApp";
import { useBoundStore } from "../_store/stateStore";
import { sleep } from "@/utility/sleep";

// const generateId = () => Date.now().toString()
export default function useCreateTodo(){
  const queryClient = useQueryClient();

  const {progressQueueDown, progressQueueUp, finishProgressing} = useBoundStore(state => state.progressActions)
  const {progressDone, progressRemain} = useBoundStore(state => state)

  const createMutation = useMutation<AxiosResponse<TodoType[]|undefined>, Error, {task: string; id: string}, {previousTodos: TodoType[]|undefined}>({
    retry: 0,
    networkMode: 'always',
    mutationKey: ['todos', 'createTodo'],
    mutationFn: async ({task}) =>{
      if(task === 'slowest' && process.env.NODE_ENV==='development') await sleep(6000)
      const response = await axios.post("/api/todos", {task})
      return response || [] ;
    },
    async onMutate({task, id}) {

      progressQueueUp(1);

      await queryClient.cancelQueries({queryKey:['todos']})
      
      const previousTodos = queryClient.getQueryData<TodoType[]>(['todos']);

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
      // console.log({previousTodos}, "test optimistic test")
      return {previousTodos}
    },
    async onSuccess() {

      await queryClient.invalidateQueries({queryKey:['todos']})
      toast("Submission successful!")

    },
    async onError(error, _, context) {
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
    async onSettled() {
      // when success or error triggers progress proceeds
      progressQueueDown(1);

      // if(progressDone+1 === progressRemain) { // multiple mutations makes remain<done sometimes
      if(progressDone+1 >= progressRemain) {
        setTimeout(finishProgressing, 2000);
      } 
      else {
        // progressQueueDown(1);
      }
    }
  })

  return {createMutation}
}
