import { useState, type MouseEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router"
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");

      navigate("/bi");
    } catch (error) {
      console.log(error);
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

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleRecoverPassword = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast.error('Ingresa correctamente el email', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Se envió el correo');
        toast.success('Revise la bandeja de entrada de su correo electrónico', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
      });


  }

  return (

    <>
      {/* Encabezado de la Aplicación */}
      <picture>
        <img src="imagen-fondo.webp" alt="imagen del interior de la tienda" className="w-full absolute top-0 left-0 max-h-screen object-cover object-center -z-10" />
        {/* <img src="imagen-fondo.jpeg" alt="imagen del interior de la tienda"/> */}
      </picture>

      <picture>
        <img src="minersa.jpeg" alt="logo de Minersa" className="w-md select-none z-10" />
      </picture>

      <div className="w-full h-[30vh] bg-blue-800 absolute bottom-0"></div>

      <Card className="rounded-md shadow-sm px-2 w-full sm:w-md z-10">
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
                <a
                  href="#"
                  onClick={handleRecoverPassword}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors dark:text-gray-400 dark:hover:text-white"
                >
                  ¿Olvidaste tu contraseña?
                </a>
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
            <ToastContainer />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

