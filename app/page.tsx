import Link from "next/link";
import TodoApp from "./_components/TodoApp";

export default function Home() {

  return (
    <>

      <div>
        <Link href={'/practice/parallelRoute'}>click to   Go to parallel route and middleware practice page</Link>
      </div>
      <TodoApp />

    </>

  );
}


