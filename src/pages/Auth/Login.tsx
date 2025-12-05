import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router"
import { toast, Bounce } from 'react-toastify';
import { ResetPasswordDialog } from "../../components/ResetPasswordDialog";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/bi");
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      toast.error('Credenciales incorrectas', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (

    <>

      {/*       <picture>
        <img src="imagen-fondo.webp" alt="imagen del interior de la tienda" className="w-full absolute top-0 left-0 max-h-screen object-cover object-center -z-10" />
      </picture> */}
      <div className="w-full absolute top-0 left-0 max-h-screen h-screen -z-20">

        {/* Imagen de Fondo */}
        <img
          src="imagen-fondo.webp"
          alt="imagen del interior de la tienda"
          className="w-full h-full object-cover object-center"
        />

        {/* Capa de Color Negro Translucido */}
        {/* bg-black/50 significa color negro con 50% de opacidad */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* <img src="imagen-fondo.jpeg" alt="imagen del interior de la tienda"/> */}

      <picture>
        <img src="minersa.jpeg" alt="logo de Minersa" className="w-md select-none z-10" />
      </picture>

      {/* <div className="w-full h-[30vh] bg-blue-800 absolute bottom-0"></div> */}

      <Card className="rounded-none md:rounded-md shadow-sm px-2 w-full sm:w-md z-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y contraseña para acceder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">

            {/* Campo de Correo Electrónico */}
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo de Contraseña y Olvidó Contraseña */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <ResetPasswordDialog 
                  email={email}
                  onEmailChange={setEmail}
                />
              </div>
              <Input
                id="password"
                type="password"
                required
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botón de Inicio de Sesión */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </>
  );
};

