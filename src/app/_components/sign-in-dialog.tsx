import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";
import SignUpDialog from "./sign-up-dialog";
import ForgotPasswordDialog from "./esqueci-senha-dialog";
import { loginComEmailSenha } from "@/services/usuarios";

const SignInDialog = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const handleLoginWithGoogleClick = async () => {
        await signIn("google");
    };

    const handleLoginWithEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setLoading(true);
        try {
            const user = await loginComEmailSenha(email, senha);
            setLoading(false);
            if (!user?.id) {
                setErro("E-mail ou senha inválidos.");
                return;
            }
            // Salve o usuário em contexto/localStorage/redirecione
        } catch (err) {
            setErro("Erro ao tentar login.");
            setLoading(false);
        }
    };

    if (showSignUp) {
        return <SignUpDialog onClose={() => setShowSignUp(false)} />;
    }

    if (showForgot) {
        return <ForgotPasswordDialog onClose={() => setShowForgot(false)} />;
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleLoginWithEmail} className="mt-4 space-y-2">
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                {erro && <p className="text-red-500 text-sm">{erro}</p>}
                <div className="flex gap-2 mt-2 w-full flex-col">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </Button>
                    <div className="flex justify-between text-sm">
                        <button
                            type="button"
                            className=""
                            onClick={() => setShowSignUp(true)}
                        >
                            Cadastre-se
                        </button>
                        <button
                            type="button"
                            className=""
                            onClick={() => setShowForgot(true)}
                        >
                            Esqueci minha senha
                        </button>
                    </div>
                </div>
            </form>

            <Button variant="outline" className="w-full mt-3 gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                <Image src="/google-icon.svg" alt="Fazer login com o Google" width={18} height={18} className="mr-2" />
                Continuar com Google
            </Button>
        </>
    );
};

export default SignInDialog;