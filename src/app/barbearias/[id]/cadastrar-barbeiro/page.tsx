"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Header from "@/app/_components/header";

const CadastrarBarbeiro = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    image: "",
    tipo: "barbeiro",
    emailVerified: null,
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
        // await criarUsuario(form);
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
            <h2 className="text-xl font-bold mb-4">Cadastrar novo barbeiro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
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
              {/* <div>
                <label className="block text-sm font-medium mb-1">Imagem (URL)</label>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div> */}
              {erro && <p className="text-red-500 text-sm">{erro}</p>}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CadastrarBarbeiro;