import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, use, useContext, useState } from "react";
import { TodoContext } from "../_contexts/TodoContext";
import { TodoType } from "../page";
import { inputValidation } from "@/utility/stringLib";

export default function EditTodo({todo}:{todo:TodoType}){
  const [editedText, setEditedText] = useState<string>(todo.task)
  const context = useContext(TodoContext);
  if (!context) {
    return null; // or throw new Error("Context missing!")
  }
  const {editAction} = context

  function handleInputEdit(e:ChangeEvent<HTMLInputElement>) {
    setEditedText(e.target.value);
  }

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    if(inputValidation(editedText).error) {
      setInputStatus(inputValidation(addTodo).message)
      toast(inputValidation(addTodo).message)
    } else if(status?.pending === 'true') { // Redundant => disable submit on pending
      setInputStatus('Please wait for a request to complete first')
      console.log(status?.message,"###")
      toast('Please wait for a request to complete first')
    }
    else {
      postTodo(addTodo);
    }


    editAction(todo.id, editedText);
  }

  return (

    <form className="flex border-2 rounded-sm p-2" onSubmit={submitHandler} >
      <Input className="grow" 
        value={editedText}
        onChange={handleInputEdit}
      />

      <Button className="grow-0 cursor-pointer"  variant={"secondary"} type="submit">
        update
      </Button>

    </form>
  )
}