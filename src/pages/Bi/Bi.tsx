import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth, db } from "../Auth/firebase"
import { type UserDetail } from "@/types";
import { Loader } from "lucide-react"

export default function Bi() {
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
  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    <div>
      {userDetails ? (
        <div>
          <div>
            <p>{userDetails.email}</p>
            <p>{userDetails.firstName}</p>
            <p>{userDetails.lastName}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 font-sans">
          <div className="flex gap-4 font-semibold">
            <Loader className="animate-spin" />
            Cargando...
          </div>
        </div>
      )}
    </div>
  )
}
