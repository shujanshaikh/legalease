
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await currentUser()

  if (!user) return <div className="flex justify-center items-center p-6">Not signed in</div>

  return (
    <div className="flex justify-center items-center p-6">
      <h1>Welcome to Legalease </h1>
      
    </div>
  )
}
