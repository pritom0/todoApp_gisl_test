
import { Dispatch, SetStateAction, useContext, } from "react";
import { TodoContext } from "../_contexts/TodoContext";

import TodoInputField from "./TodoInputField";
import { TodoType } from "./TodoApp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { api } from "@/utility/axiosLib";
import { toast } from "sonner";

interface EditTodoProps {
  todo: TodoType;
  setEditState: Dispatch<SetStateAction<boolean>>;
}

export default function EditTodo({todo, setEditState}:EditTodoProps){

  const queryClient = useQueryClient()
  ///////////////// update Mutation
  const editMutation2 = useMutation<AxiosResponse<TodoType[]|undefined>, Error, TodoType,{previousState:TodoType[]|undefined}> ({
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



  const context = useContext(TodoContext);
  if (!context) {
    return null;
  }
  // const {editMutation} = context

  async function triggerAtSubmit(text:string, resetForm: ()=>void) {
    editMutation2.mutate(
      {...todo, task: text}, 
      {
        onSuccess() {
          resetForm();
        },
      })
  }

  function reset() {
    setEditState(false)
  }

  const pending = editMutation2.isPending && todo.id===editMutation2.variables.id


  return (

    <TodoInputField {...{triggerAtSubmit,text:todo.task,reset, pending, success: editMutation2.isSuccess, className:"w-full"}} />

    
  )
}
