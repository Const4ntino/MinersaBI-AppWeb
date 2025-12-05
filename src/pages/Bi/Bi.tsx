import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth, db } from "../Auth/firebase"
import { type UserDetail } from "@/types";
import { Loader, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Bi() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetail | null>(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user != null) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data() as UserDetail);
          console.log(docSnap.data());
        } else {
          console.log("User does not exist");
        }
      } else {
        console.log("User is not logged in");
      }
    })
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <>
      {userDetails ? (
        <div className="flex flex-col gap-2 max-h-screen w-full md:py-8 md:px-20">
          <div className="flex justify-between pb-10">
            <div className="">
              <p className="text-3xl font-bold">Bienvenido</p>
              <p className="text-2xl font-semibold">{userDetails.firstName} {userDetails.lastName}</p>
            </div>
            <Button variant={"destructive"} className="w-fit" onClick={handleLogout}>
              Cerrar Sesión
              <LogOut />
            </Button>
          </div>
          <iframe title="Gestion de concimiento" className="w-full h-screen md:h-auto md:aspect-video" src="https://app.powerbi.com/view?r=eyJrIjoiZDVjOWQ5ZmUtYmFkNC00NjljLTkxYjItNmUyMWMzMjFjY2I5IiwidCI6IjVhYmVjNDkyLWNiNjEtNGJmZC1iODljLTdkY2Y4OTQyNTY4NiIsImMiOjR9" frameBorder="0" allowFullScreen></iframe>
        </div>
      ) : (
        <div className="">
          <div className="flex gap-4 font-semibold">
            <Loader className="animate-spin" />
            Cargando...
          </div>
        </div>
      )}
    </>
  )
}
