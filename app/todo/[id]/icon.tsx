// app/todo/[id]/icon.tsx
import { api } from "@/utility/axiosLib";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const todo = (await api.get(`/${id}`)).data


  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20, // Small enough to fit in 32px
          background: '#60a5fa',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '4px',
          fontWeight: 'bold',
        }}
      >
        {id}
        {/* {todo.task} */}
      </div>
    ),
    { ...size }
  )
}