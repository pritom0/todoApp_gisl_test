import { sleep } from "@/utility/sleep";
import Link from "next/link";

export default async function NavSections(){
  console.log("rendering nav section")
  await sleep(3000);
  return (
    <div>
      Nav sections
      <Link href={"/practice/parallelRoute/settings"}> <p>settings</p> </Link>
    </div>
  )
}