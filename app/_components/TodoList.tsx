import { TodoType } from "../page"
import Todo from "./Todo";

interface TodoListProps {
  deleteHandler: (id:string) => void;
  todoList: TodoType[]
}

export default function TodoList({deleteHandler, todoList}: TodoListProps){

  const sortedTodoList = todoList.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return (
    <>
        <div>
          {
            sortedTodoList.map(todo => 
                <Todo key={todo.id} {...{todo, deleteHandler}} />
            )
          }
        </div>
    </>
  )
}

