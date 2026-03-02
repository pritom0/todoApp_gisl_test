
import { useTodoContext } from "../_contexts/TodoContext";
import Todo from "./Todo";
import { TodoType } from "./TodoApp";

interface TodoListProps {
  todoList: TodoType[]
}

export default function TodoList({todoList}: TodoListProps){
  const {deleteMutation} = useTodoContext();
  function deleteHandler(todo: TodoType) {
    deleteMutation.mutate(todo)
  }

  const isPending = (id:string) => deleteMutation.isPending && deleteMutation.variables.id===id


  const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  // const sortedTodoList = todoList.sort((a,b) => Number(b.id) - Number(a.id))
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

