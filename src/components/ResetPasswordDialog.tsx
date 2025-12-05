// src/components/ResetPasswordDialog.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast, Bounce } from 'react-toastify';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../pages/Auth/firebase";
import { Loader } from "lucide-react";

interface ResetPasswordDialogProps {
  email: string;
  onEmailChange: (email: string) => void;
}

export function ResetPasswordDialog({ email, onEmailChange }: ResetPasswordDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Por favor ingresa tu correo electrónico', {
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
      return;
    }

    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success(`Se ha enviado un correo a ${email} con las instrucciones para restablecer tu contraseña`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsOpen(false);
    } catch (error: any) {
      console.error("Error al enviar el correo:", error);
      toast.error(error.message || 'Ocurrió un error al enviar el correo', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800">
          ¿Olvidaste tu contraseña?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Restablecer contraseña</DialogTitle>
          <DialogDescription>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Correo
            </Label>
            <Input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
              className="col-span-3"
              placeholder="ejemplo@minersa.com"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleResetPassword} disabled={isLoading || !email}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar enlace"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}