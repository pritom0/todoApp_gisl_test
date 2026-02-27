import { TodoType } from "../page"
import Todo from "./Todo";

interface TodoListProps {
  deleteHandler: (id:string) => void;
  todoList: TodoType[]
}

export default function TodoList({deleteHandler, todoList}: TodoListProps){

  return (
    <>
        <div>
          {
            todoList.map(todo => 
                <Todo key={todo.id} {...{todo, deleteHandler}} />
            )
          }
        </div>
    </>
  )
}

