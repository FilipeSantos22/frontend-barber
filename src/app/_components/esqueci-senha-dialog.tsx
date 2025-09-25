import { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader, DialogTitle } from "./ui/dialog";

const EsqueciSenhaDialog = ({ onClose }: { onClose: () => void }) => {
    const [email, setEmail] = useState("");
    const [erro, setErro] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setSuccess("");
        setLoading(true);
        try {
            // Troque a URL abaixo para o endpoint correto da sua API
            const res = await fetch("/api/usuarios/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error("Erro ao solicitar recuperação de senha");
            setSuccess("Se o e-mail existir, você receberá instruções para redefinir sua senha.");
        } catch (err: any) {
            setErro(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Recuperar senha</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                {erro && <p className="text-red-500 text-sm">{erro}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </Button>
                <Button type="button" variant="ghost" className="w-full mt-2" onClick={onClose}>
                    Voltar para login
                </Button>
            </form>
        </>
    );
};

export default EsqueciSenhaDialog;