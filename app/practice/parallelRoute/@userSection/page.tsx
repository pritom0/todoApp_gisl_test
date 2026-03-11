import { sleep } from "@/utility/sleep"

export default async function UserSection(){
  console.log("rendering user section")
  await sleep(2000)
  return (
    <div>
      user information
    </div>
  )
}