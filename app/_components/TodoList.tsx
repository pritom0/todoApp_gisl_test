import { Button } from "@/components/ui/button";
import { Todo } from "../page"
import { toast } from "sonner";

interface TodoListProps {
  deleteHandler: (id:string) => void;
  todoList: Todo[]
}

export default function TodoList({deleteHandler, todoList}: TodoListProps){


  return (
    <>
        <div>
          {
            todoList.map(todo => 
              <li key={todo.id} className="flex border-2 rounded-sm p-2">
                <div className="grow">
                  {todo.task}
                </div>
                {/* onClick={()=>deleteHandler(todo.id)} */}
                <Button className="grow-0 cursor-pointer"  variant={"destructive"}
                  onClick={() =>
                          toast("Are you sure to delete?", {
                            // description: "Sunday, December 03, 2023 at 9:00 AM",
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
              </li>
            )
          }
        </div>
    </>
  )
}

// 