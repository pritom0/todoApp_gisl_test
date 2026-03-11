import { sleep } from "@/utility/sleep"

export default async function AdminSection(){
  console.log("rendering admin section")
  await sleep(2000)
  return (
    <div>
      admin information
    </div>
  )
}