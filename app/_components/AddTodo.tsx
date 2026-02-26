import { ChangeEvent, FormEvent, useState } from "react";
import { Status } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { inputValidation } from "@/utility/stringLib";
import { toast } from "sonner";

interface addTodoProp {
  // onSubmit: (e:FormEvent)=>void;
  addTodo: string;
  addTodoHandler: (e:ChangeEvent<HTMLInputElement>) => void ;
  status: Status|undefined ;
  postTodo: (addTodo: string) => void;
}

// interface InputStatus {
//   message: string;
// }

export default function AddTodo({  addTodo, addTodoHandler, status, postTodo } :addTodoProp) {
  const [inputStatus, setInputStatus] = useState<string>('')

  function onSubmits(event:FormEvent) {
    event.preventDefault();

    if(inputValidation(addTodo).error) {
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
  }

  return (
    <>
      <form onSubmit={onSubmits}>
        <Input
          className=""
          type="text"
          value={addTodo}
          onChange={addTodoHandler}
          placeholder="type new task"
        />
        <Button className="mt-2" type="submit" disabled={status?.pending === "true"}>
          submit
        </Button>
      {
        inputStatus?
      <Alert className="max-w-md border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
        <AlertTriangleIcon />
        <AlertTitle>{inputStatus}</AlertTitle>
      </Alert> : null
      
      }

      </form>
    </>
  );
}


