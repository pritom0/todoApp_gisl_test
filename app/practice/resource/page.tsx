import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default async function Resource() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation / Back Button */}
        <Link 
          href="/practice/parallelRoute" 
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors mb-6 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Go back to Dashboard
        </Link>

        {/* Resource Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800 capitalize">
              Protected Resource
            </h1>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Lock size={12} /> Verified
            </span>
          </div>

          <div className="p-8">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-700 text-sm">
                This content is only visible because your <strong>Middleware</strong> successfully verified your session token.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                Welcome to the restricted resource area. Here you can place 
                your premium content, documentation, or admin tools.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                  <p className="font-semibold text-gray-700">Access Granted</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-bold text-gray-400 uppercase">Route Type</span>
                  <p className="font-semibold text-gray-700">Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";

// export default async function resource(){

//   return (
//     <div>
//       resrource
//       <div>
//         <Link href={'/practice/parallelRoute'}> go back </Link>

//       </div>
//     </div>
//   )
// }
