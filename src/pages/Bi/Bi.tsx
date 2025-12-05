import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { auth, db } from "../Auth/firebase"
import { type UserDetail } from "@/types";
import { Loader, LogOut } from "lucide-react"
import { UserSettingsDialog } from "@/components/UserSettingsDialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        navigate("/")
      }
    })
  }

  async function handleLogout() {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      navigate("/");
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
        // 1. Contenedor principal: usa 'h-screen' en lugar de 'min-h-screen'
        <div className="flex flex-col gap-2 h-screen w-full bg-gray-100">

          {/* Encabezado de la Aplicación (Altura Fija) */}
          <div className="flex justify-between p-5 bg-black text-white items-center">
            <div className="">
              <p className="text-3xl font-bold">Bienvenido</p>
              <p className="text-2xl font-semibold">{userDetails.firstName} {userDetails.lastName}</p>
            </div>
            <div className="flex flex-col gap-2">
              {userDetails && (
                <UserSettingsDialog
                  userDetails={{
                    firstName: userDetails.firstName,
                    lastName: userDetails.lastName,
                    email: auth.currentUser?.email || ''
                  }}
                  onUpdate={fetchUserData}
                />
              )}
              <Button variant={"destructive"} className="w-fit" onClick={handleLogout}>
                Cerrar Sesión
                <LogOut />
              </Button>
            </div>
          </div>

          {/* 2. Contenedor Tabs: Usa 'flex-1' para ocupar el espacio restante, y 'h-0' o 'h-full' para resolver el cálculo de altura */}
          {/* He elegido 'flex-1' y la clase 'h-full' en el TabsContent para asegurar el cálculo de altura del iframe. 
         Si h-full no funciona, prueba con 'h-0' en el div de Tabs para permitir que flex-1 lo calcule correctamente. */}
          <Tabs defaultValue="ventas" className="flex-1 w-full flex flex-col lg:px-20">

            {/* Lista de Pestañas (Altura Fija) */}
            <TabsList className="w-full flex-wrap h-auto">
              <TabsTrigger value="ventas">Dashboard de Ventas</TabsTrigger>
              <TabsTrigger value="ejecutivo">Dashboard Ejecutivo / Inventario</TabsTrigger>
            </TabsList>

            {/* 3. Contenido de Pestañas: Debe usar 'flex-1' o 'h-full' para ocupar el espacio restante. 
           Uso 'h-full' para asegurar que el contenido se extienda. Además, lo declaro como flex. */}
            <TabsContent value="ventas" className="flex-1 p-0 h-auto sm:h-full">

              {/* 4. El Iframe: Debe tener explícitamente 'h-full' y 'w-full' para llenar su contenedor padre. */}
              <iframe
                title="Gestion de concimiento"
                className="w-full h-full border-none" //
                src="https://app.powerbi.com/view?r=eyJrIjoiZDVjOWQ5ZmUtYmFkNC00NjljLTkxYjItNmUyMWMzMjFjY2I5IiwidCI6IjVhYmVjNDkyLWNiNjEtNGJmZC1iODljLTdkY2Y4OTQyNTY4NiIsImMiOjR9"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </TabsContent>

            <TabsContent value="ejecutivo">
              <iframe title="EJECUTIVO" className="w-full h-full border-none" src="https://app.powerbi.com/view?r=eyJrIjoiYWEwOTJiY2UtNzA4YS00NGQxLTg2M2UtNGJjMDM2ODUxNTM5IiwidCI6IjVhYmVjNDkyLWNiNjEtNGJmZC1iODljLTdkY2Y4OTQyNTY4NiIsImMiOjR9" frameBorder="0" allowFullScreen></iframe>
            </TabsContent>
          </Tabs>
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
