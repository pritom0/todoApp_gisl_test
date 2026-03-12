import { api } from "@/utility/axiosLib";
import { ImageResponse } from "next/og";

type IconProp = {
  params: Promise<{id: string}>;
}

export const contentType = 'image/jpeg'
export const alt = 'todo description'

export const size = { width: 1200, height: 630 }


export default async function Image({params} : IconProp){
  const {id} = await params;
  const todo = (await api.get(`/${id}`)).data
  return new ImageResponse (
(
      <div
        style={{
          background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 32, color: '#60a5fa', marginBottom: 20 }}>Todo Task #{id}</div>
        <div style={{ fontSize: 64, fontWeight: 'bold', textAlign: 'center', padding: '0 40px' }}>
          {todo.task}
        </div>
        <div style={{ fontSize: 24, marginTop: 40, color: '#9ca3af' }}>akpritomtech.vercel.app</div>
      </div>
    ),
    { ...size }  )
}