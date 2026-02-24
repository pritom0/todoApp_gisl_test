import { ChangeEvent, FormEvent } from "react";
import { Status } from "../page";

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
        <input
          className="bg-green-900"
          type="text"
          value={addTodo}
          onChange={addTodoHandler}
          placeholder="type new task"
        />
        <button type="submit" disabled={status?.pending === "true"}>
          submit
        </button>
        {status?.success === "true" ? (
          <p className="text-green-600">{status?.message}</p>
        ) : status?.success === "false" ? (
          <p className="text-red-600">{status?.message}</p>
        ) : null}
        <p></p>
      </form>
    </>
  );
}
