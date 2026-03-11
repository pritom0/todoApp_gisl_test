import Link from "next/link";

export default async function ParallelRoute() {
  return (
    <div className="p-6 font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-4 border-b pb-2">Parallel Route Dashboard</h1>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 inline-block">
        <span className="text-gray-600">Access protected data: </span>
        <Link 
          href="/practice/resource" 
          className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
        >
          Go to Resource
        </Link>
      </div>

      <p className="mt-4 text-sm text-gray-400 italic">
        Current Mode: Development (Mock Auth)
      </p>
    </div>
  );
}

// import Link from "next/link";

// export default async function ParallelRoute(){

//   return (
//     <div>
//       ParallelRoute
//       <div> go to <Link href={'/practice/resource'}> resource </Link> </div>
//     </div>
//   )
// }