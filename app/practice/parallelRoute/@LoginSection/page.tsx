"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginSection() {
  const [text, setText] = useState<string>("")
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (role: string) => {
      return await axios.post("/practice/parallelRoute/loginAction", { role })
    },
    onSuccess: () => {
      // 1. Tell React Query the 'session' or 'user' data is now old
      queryClient.invalidateQueries({ queryKey: ["session"] })
      
      // 2. Refresh the server-side data (Parallel Routes)
      router.refresh()
      
      // 3. Clear the input if you want, or redirect
      setText("")
    }
  })

  return (
    <div className="p-4 border rounded shadow-sm">
      <input 
        type="text" 
        className="border p-2 mr-2"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="type admin or user"
        disabled={isPending}
      />
      <button 
        onClick={() => mutate(text)}
        disabled={isPending}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isPending ? "Logging in..." : "Login Submit"}
      </button>
    </div>
  )
}