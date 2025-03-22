import Link from "next/link";

export default function Authbuttons(){
    return <div>
        {signedIn?<div className="flex items-center space-x-4 min-w-[160px]">
    <Link href="/signin" className="px-4 py-2 rounded-lg text-lg bg-accent text-dark transition transform duration-100 hover:scale-110">
      Sign In
    </Link>
    <Link href="/signup" className="px-4 py-2 rounded-lg text-lg bg-accent text-dark transition transform duration-100 hover:scale-110">
      Sign Up
    </Link>
</div> : <div>{email}</div>
}
</div>
}
