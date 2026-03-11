"use client"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

export default function Setting(){
    console.log("rendering setting section")
    const urlSegment = useSelectedLayoutSegment("NavSection")
    console.log("rendering ", urlSegment)

  return (
    <div>
      {urlSegment}
      <Link href={"/practice/parallelRoute/"}> settings page. Go back</Link>
      <input type="text" />
    </div>
  )
}