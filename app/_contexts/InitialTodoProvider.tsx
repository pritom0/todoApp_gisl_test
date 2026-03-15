"use client";

import { createContext } from "react";
import { TodoApiResponse } from "../_hooks/useTodosQuery";

// We export the context so hooks can use it
export const InitialTodoContext = createContext<TodoApiResponse | undefined>(undefined);

// We export the Provider as a default function
export default function TodoProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode; 
  initialData: TodoApiResponse 
}) {
  return (
    <InitialTodoContext.Provider value={initialData}>
      {children}
    </InitialTodoContext.Provider>
  );
}

