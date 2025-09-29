"use client";
import { useState, useTransition, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Header from "@/app/_components/header";
import { createServico } from "@/services/servico";

const CadastrarServico = () => {
    const params = useParams();
    const idBarbearia = params.id;
    const router = useRouter();

    const [form, setForm] = useState({
        nome: "",
        preco: "",
        duracao_minutos: "",
        idBarbearia: idBarbearia || "",
    });

    const [erro, setErro] = useState("");
    const [isPending, startTransition] = useTransition();
    const precoInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Máscara para preço em Real Brasileiro
    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length === 0) value = "0";
        const floatValue = (parseInt(value, 10) / 100).toFixed(2);
        setForm({ ...form, preco: floatValue });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        startTransition(async () => {
            try {
                await createServico({
                    ...form,
                    preco: Number(form.preco),
                    duracao_minutos: Number(form.duracao_minutos),
                });
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
                        <h2 className="text-xl font-bold mb-4">Cadastrar novo Serviço</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nome do serviço</label>
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
                                <label className="block text-sm font-medium mb-1">Preço (R$)</label>
                                <input
                                    type="text"
                                    name="preco"
                                    value={Number(form.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    onChange={handlePrecoChange}
                                    ref={precoInputRef}
                                    required
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Duração (minutos)</label>
                                <input
                                    type="number"
                                    name="duracao_minutos"
                                    value={form.duracao_minutos}
                                    onChange={handleChange}
                                    required
                                    min={1}
                                    step={1}
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

export default CadastrarServico;
