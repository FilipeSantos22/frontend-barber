import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {

    
    const handleLoginWithGoogleClick = async () => {
        await signIn("google");
    }
    return ( 

        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do Google.
                </DialogDescription>
            </DialogHeader>
            <Button variant={"outline"} className="w-full mt-3 gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                <Image src="/google-icon.svg" alt="Fazer login com o Google" width={18} height={18} className="mr-2" />
                Continuar com Google
            </Button>
        </>
    );
}
 
export default SignInDialog;