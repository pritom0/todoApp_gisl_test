
import { Dispatch, SetStateAction, useContext, } from "react";
import { TodoContext } from "../_contexts/TodoContext";

import TodoInputField from "./TodoInputField";
import { TodoType } from "./TodoApp";

interface EditTodoProps {
  todo: TodoType;
  setEditState: Dispatch<SetStateAction<boolean>>;
}

export default function EditTodo({todo, setEditState}:EditTodoProps){

  const context = useContext(TodoContext);
  if (!context) {
    return null;
  }
  const {editMutation} = context

  async function triggerAtSubmit(text:string, resetForm: ()=>void) {
    editMutation.mutate(
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

  const pending = editMutation.isPending && todo.id===editMutation.variables.id


  return (

    <TodoInputField {...{triggerAtSubmit,text:todo.task,reset, pending, success: editMutation.isSuccess, className:"w-full"}} />

    
  )
}
