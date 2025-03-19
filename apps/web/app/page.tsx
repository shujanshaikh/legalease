
import { currentUser } from "@clerk/nextjs/server"
import LegalWebsite from "./components/dashboard"

export default async function Home() {
  const user = await currentUser()

  if (!user) return <div> <LegalWebsite /></div>

  return (
    <div >
       Main Page
      
    </div>
  )
}
