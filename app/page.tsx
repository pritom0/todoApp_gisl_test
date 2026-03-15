import Link from "next/link";
import TodoApp from "./_components/TodoApp";
import TodoProvider from "./_contexts/InitialTodoProvider";

export async function getTodosServer() {
  try {
    const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'localhost:3000';
    const protocol = domain.includes('localhost') ? 'http' : 'https';
    
    const res = await fetch(`${protocol}://${domain}/api/todos`, { 
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10000) // Replaces your Axios timeout
    });

    return await res.json();
  } catch (error) {
    console.error("Build-time fetch skipped:", error);
    return []; // Returns empty list so the build doesn't crash
  }
}

export default async function Home() {
  
  const initialTodos = await getTodosServer();

  return (
    <>

      <div>
        <Link href={'/practice/parallelRoute'}>click to   Go to parallel route and middleware practice page</Link>
      </div>

      <TodoProvider initialData={initialTodos}>
        <TodoApp />
      </TodoProvider>

    </>

  );
}


