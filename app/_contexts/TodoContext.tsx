import { createContext } from "react";

interface TodoContextType {
  editAction: (id: string, text: string) => Promise<boolean>
} 

export const TodoContext = createContext<TodoContextType|undefined>(undefined)
