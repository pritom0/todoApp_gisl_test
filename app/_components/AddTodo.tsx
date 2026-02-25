import { ChangeEvent, FormEvent } from "react";
import { Status } from "../page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface addTodoProp {
  onSubmit: (e:FormEvent)=>void;
  addTodo: string;
  addTodoHandler: (e:ChangeEvent<HTMLInputElement>) => void ;
  status: Status|undefined ;
}

export default function AddTodo({onSubmit , addTodo, addTodoHandler, status } :addTodoProp) {
  return (
    <>
      <form onSubmit={onSubmit}>
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

      </form>
    </>
  );
}
