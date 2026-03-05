
import { toast } from "sonner";
import { useState } from "react";
import EditTodo from "./EditTodo";
import { TodoType } from "./TodoApp";
import SpinnerButton from "./SpinnerButton";
import useDeleteTodo from "../_hooks/useDeleteTodo";
import { useMutationState } from "@tanstack/react-query";

interface TodoProp {
  todo: TodoType;
}

export default function Todo({todo}: TodoProp){
  // edit onclick switches todo item into input item
  const [editState, setEditState] = useState<boolean>(false) 

  const {deleteMutation} = useDeleteTodo();
  function deleteHandler(todo: TodoType) {
    deleteMutation.mutate(todo)
  }

  // const {createMutation} = useCreateTodo();
  // const isCreating = createMutation.isPending;

  const pendingMutations = useMutationState({
    filters: {mutationKey:['todos', 'createTodo'], status: "pending"},
    select: (mutation) => mutation.state.variables as {task: string; id: string}
  }) // .some(todo.task)

  const isCurrentlyCreating = pendingMutations.some(vars => vars?.id === todo.id);

  // console.log({isCurrentlyCreating, pendingMutations, todo:todo.task})
  console.log("deleteMutation.variables", deleteMutation.variables)

  const isPending = (id:string) => deleteMutation.isPending && deleteMutation.variables.id===id


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


            <SpinnerButton className="grow-0 cursor-pointer mr-2"  variant={"destructive"}
              disabled={isPending(todo.id) || isCurrentlyCreating}
              isLoading={isPending(todo.id) || isCurrentlyCreating}

              onClick={() =>
                      toast("Are you sure to delete?", {
                        action: {
                          label: "Yes",
                          onClick: () => deleteHandler(todo),
                        },
                        cancel: {
                          label: "No",
                          onClick: () => console.log("Cancelled"),
                        }
                      })
                    }
            >
              delete
            </SpinnerButton>

            <SpinnerButton variant={'secondary'} 
              onClick={()=>setEditState(true)}
              disabled={isPending(todo.id) || isCurrentlyCreating}
              // isLoading={isPending(todo.id) || isCurrentlyCreating}
            >
              Edit
            </SpinnerButton>
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

