
import useDeleteTodo from "../_hooks/useDeleteTodo";
import useTodoQuery from "../_hooks/useTodoQuery";
import Todo from "./Todo";
import { TodoType } from "./TodoApp";


export default function TodoList(){

  const {data} = useTodoQuery();
  const todoList = data || [];

  const {deleteMutation} = useDeleteTodo();
  function deleteHandler(todo: TodoType) {
    deleteMutation.mutate(todo)
  }

  const isPending = (id:string) => deleteMutation.isPending && deleteMutation.variables.id===id

  const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <>
        <div>
          {
            sortedTodoList.map(todo => 
                <Todo key={todo.id} {...{todo, deleteHandler, pending:isPending(todo.id)}} />
            )
          }
        </div>
    </>
  )
}

