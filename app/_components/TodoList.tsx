
import { Spinner } from "@/components/ui/spinner";
import Todo from "./Todo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useTodosQuery from "../_hooks/useTodosQuery";
import { useContext } from "react";
import { InitialTodoContext } from "../_contexts/InitialTodoProvider";


export default function TodoList(){
  const initialTodos = useContext(InitialTodoContext);
  const {data, isLoading, error} = useTodosQuery(initialTodos);

  if(error) return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : "Could not load todos. Please try again later."}
      </AlertDescription>
    </Alert>
  );
  if(data && "error" in data) return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {data.error}
      </AlertDescription>
    </Alert>
  );


  if(isLoading) return (
    <div className="flex justify-center p-10">
      <Spinner  />
    </div>
  )

  const todoList = Array.isArray (data)? data : [];
  // console.log(todoList, "error todoList", {data}, isLoading, error)

  // const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const sortedTodoList = todoList.sort((a,b) =>  Number(b.id) - Number(a.id))



  return (
    <>
        <div>
          {
            sortedTodoList.map(todo => 
                <Todo key={todo.id} {...{todo}} />
            )
          }
        </div>
    </>
  )
}

