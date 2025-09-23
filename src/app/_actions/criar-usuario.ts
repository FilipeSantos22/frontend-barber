"use server"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../_lib/auth";


interface CriarUsuarioParams {
    name: string;
    email: string;
    image?: string;
    idBarbearia: number;
    senha: string;
    tipo?: string;
    emailVerified?: null;
}

export const criarUsuario = async (params: CriarUsuarioParams) => {
    const data = {
        ...params,
        tipo: params.tipo ?? "barbeiro",
        emailVerified: null,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidatePath(`/barbearias/${params.idBarbearia}`); // ajuste o path se necessário

    if (!response.ok) {
        throw new Error("Erro ao criar usuário");
    }

    return response.json();
};