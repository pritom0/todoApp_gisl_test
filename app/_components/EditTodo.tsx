import { Dispatch, SetStateAction, useContext, } from "react";
import { TodoContext } from "../_contexts/TodoContext";
import { TodoType } from "../page";
import TodoInputField from "./TodoInputField";

interface EditTodoProps {
  todo: TodoType;
  setEditState: Dispatch<SetStateAction<boolean>>;
}

export default function EditTodo({todo, setEditState}:EditTodoProps){

  const context = useContext(TodoContext);
  if (!context) {
    return null; // or throw new Error("Context missing!")
  }
  const {editAction} = context

  async function triggerAtSubmit(text:string) {
    return await editAction(todo.id, text)
  }

  function reset() {
    setEditState(false)
  }


  return (
    <TodoInputField {...{triggerAtSubmit,text:todo.task,reset}} />
  )
}