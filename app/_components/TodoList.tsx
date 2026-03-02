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

  return (
    <>
        <div>
          {
            todoList.map(todo => 
                <Todo key={todo.id} {...{todo, deleteHandler, pending:isPending(todo.id)}} />
            )
          }
        </div>
    </>
  )
}

