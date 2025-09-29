"use client";
import { useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Header from "@/app/_components/header";
import { criarBarbeiro } from "@/services/usuarios";



const CadastrarBarbeiro = () => {
    const params = useParams();
    const idBarbearia = Array.isArray(params.id) ? params.id[0] : params.id;
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        tipo: "barbeiro",
        emailVerified: null,
        telefone: '',
        idBarbearia: idBarbearia || '',
    });

  const [erro, setErro] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    startTransition(async () => {
      try {
        await criarBarbeiro(form);
        router.back();
      } catch (err: any) {
        setErro(err.message || "Erro desconhecido");
      }
    });
  };

  return (
    <>
        <Header />
        <div className="p-5 flex justify-center">
        <Card className="w-full max-w-md">
            <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Cadastrar novo Barbeiro</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={form.telefone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    {erro && <p className="text-red-500 text-sm">{erro}</p>}
                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </form>
                <Button
                    type="button"
                    className="mt-4 w-full"
                    variant="secondary"
                    onClick={() => router.push(`/barbearias/${idBarbearia}`)}
                >
                    Voltar
                </Button>
            </CardContent>
        </Card>
        </div>
    </>
  );
};

export default CadastrarBarbeiro;