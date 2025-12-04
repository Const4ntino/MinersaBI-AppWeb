import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { redirect, useNavigate } from "react-router"

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
    }
  };


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 font-sans">

      <div className="w-full max-w-md">

        {/* Encabezado de la Aplicación */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            MINERSA
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Inteligencia de Negocios
          </p>
        </div>

        {/* Tarjeta de Login (Card de shadcn/ui) */}
        <Card className="rounded-xl shadow-sm px-2">
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
                    onClick={(e) => { e.preventDefault(); console.log('Solicitud de recuperación de contraseña.'); }}
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

