import { Button } from "@/components/ui/button";
// import { Todo } from "../page";
import type { TodoType } from "../page";
import { toast } from "sonner";
import { useState } from "react";
import EditTodo from "./EditTodo";

interface TodoProp {
  todo: TodoType;
  deleteHandler: (id:string) => void;
}

export default function Todo({todo, deleteHandler}: TodoProp){
  const [editState, setEditState] = useState<boolean>(false)

  return (
    <>
        {
          editState? 
          <>
            <EditTodo todo={todo} setEditState={setEditState}/>
          </> :
          <li className="flex border-2 rounded-sm p-2">
            <div className="grow mr-6 m-2">
              {todo.task}
            </div>

            <Button className="grow-0 cursor-pointer mr-2"  variant={"destructive"}
              onClick={() =>
                      toast("Are you sure to delete?", {
                        action: {
                          label: "Yes",
                          onClick: () => deleteHandler(todo.id),
                        },
                        cancel: {
                          label: "No",
                          onClick: () => console.log("Cancelled"),
                        }
                      })
                    }
            >
              delete
            </Button>

            <Button variant={'secondary'} 
              onClick={()=>setEditState(true)}
            >
              Edit
            </Button>
          </li>
        }
    </>
  )
}

// edit -> 'editState' -> input> editState true, 
// Todo -> [editState] 
// - EditInput -> editStateAction,
// - - form -> editAction 
// - EditButton -> editStateAction
