import { TodoType } from "@/app/_components/TodoApp";
import { api } from "@/utility/axiosLib";
import { Metadata } from "next";
import { cache } from "react";

type TodoDetailProp = {
  params: Promise<{id: string}>;
}

// const getTodo = cache(async (id:string): Promise<TodoType> => (await axios.get(`http://localhost:3000/api/todo/${id}`)).data)
const getTodo = cache(async (id:string): Promise<TodoType> => (await api.get(`${id}`)).data)

// export const meta = {
//   title: 
// }

export async function generateMetadata({params}: TodoDetailProp): Promise<Metadata> {
  const {id} = await params;
  const {task} = await getTodo(id)
  return {
    title: task,
    description: task + task
  }
}

export default async function TodoDetail({params}: TodoDetailProp){
  const {id} = await params;
  const {task} = await getTodo(id)

  return (
    <div>
      title: {task}
      <div>
        description: {task + task}
      </div>
    </div>
  )
}