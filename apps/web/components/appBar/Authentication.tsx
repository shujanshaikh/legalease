import Link from "next/link";
import { useAuth } from "../../AuthContext";


export default function Authentication(){
    const { user, isSignedIn } = useAuth();
    return <div>
    <div className="hidden md:flex items-center space-x-4">
        {isSignedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-ivory">Welcome, {user?.email}</span>
            <button
              onClick={() => {
                localStorage.clear(); 
                window.location.reload(); 
              }}
              className="px-4 py-2 bg-accent text-white rounded-lg transition transform duration-100 hover:scale-105"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/signin"
              className="px-4 py-2 rounded-lg text-lg bg-accent text-dark transition transform duration-100 hover:scale-110"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-lg bg-accent text-dark transition transform duration-100 hover:scale-110"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      </div>
}