"use client"

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { toast } from "sonner";

export default function QUeryProvider({children}:React.PropsWithChildren){
  const [queryClient] = useState(()=>new QueryClient({
    queryCache: new QueryCache({
      onError(error, query) {
        if(query.meta?.errorMessage) {
          toast.error(query.meta.errorMessage as string)
        }
      }
    }),
    defaultOptions: {
      queries: {
        staleTime: 60*1000
      }
    }
  }))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}