
import { Spinner } from "@/components/ui/spinner";
import Todo from "./Todo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useTodosQuery from "../_hooks/useTodosQuery";


export default function TodoList(){

  const {data, isLoading, error} = useTodosQuery();
  const todoList = data || [];
  // console.log(todoList)


  // const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const sortedTodoList = todoList.sort((a,b) =>  Number(b.id) - Number(a.id))

  if(isLoading) return (
    <div className="flex justify-center p-10">
      <Spinner  />
    </div>
  )

  if(error) return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : "Could not load todos. Please try again later."}
      </AlertDescription>
    </Alert>
  );

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

