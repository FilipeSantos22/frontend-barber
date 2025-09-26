import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader, DialogTitle } from "./ui/dialog";

const SignInDialog = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginWithGoogleClick = async () => {
        await signIn("google");
    };

      const handleLoginWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("email", { email });
        // O NextAuth vai enviar o link mágico para o e-mail informado
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleLoginWithEmail}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2 mb-3"
                />
                <Button type="submit" className="w-full" disabled={loading}>
                        {"Entrar com E-mail"}
                </Button>
            </form>

            <Button variant="outline" className="w-full mt-3 gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                <Image src="/google-icon.svg" alt="Fazer login com o Google" width={18} height={18} className="mr-2" />
                Continuar com Google
            </Button>
        </>
    );
};

export default SignInDialog;