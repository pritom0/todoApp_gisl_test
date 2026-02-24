import { Todo } from "../page"

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
              <li key={todo.id} className="flex border-2">
                <div className="grow">
                  {todo.task}
                </div>
                <button className="grow-0 cursor-pointer" onClick={()=>deleteHandler(todo.id)}>
                  delete
                </button>
              </li>
            )
          }
        </div>
    </>
  )
}

// 