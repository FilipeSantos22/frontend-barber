import { useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { atualizarDadosUsuario } from "@/services/usuarios";

interface PreencherDadosDialogProps {
    id?: number;
    nomeAtual?: string;
    telefoneAtual?: string;
    emailAtual?: string;
    onClose: () => void;
    onSuccess: () => void;
}

const PreencherDadosDialog = ({ id, nomeAtual, telefoneAtual, emailAtual, onClose, onSuccess }: PreencherDadosDialogProps) => {
    const [nome, setNome] = useState(nomeAtual || "");
    const [telefone, setTelefone] = useState(telefoneAtual || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            return; // Evita chamada com id indefinido
        }
        setLoading(true);
        await atualizarDadosUsuario(id, { name: nome, telefone, email: emailAtual || "" });
        setLoading(false);
        onSuccess();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogHeader>
                <DialogTitle>Complete seus dados</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
                <input
                    type="tel"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
            </Button>
        </form>
    );
};

export default PreencherDadosDialog;