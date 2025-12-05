import { Outlet, useNavigate } from "react-router"
import { auth } from "@/pages/Auth/firebase"
import { useEffect, useState } from "react"
import type { User } from "firebase/auth";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUser(user);
        navigate("bi");
      } else {
        setUser(null);
      }
    })
  })

  return (

    <>
      <main className="flex flex-col gap-5 items-center justify-center min-h-screen dark:bg-gray-900 relative">
        <Outlet />
      </main>
    </>
  )
}

export default App