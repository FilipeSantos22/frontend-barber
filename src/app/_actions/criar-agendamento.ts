"use server"
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../_lib/auth";

interface CriarAgendamentosParams {
    idServico: number;
    idBarbearia: number;
    idBarbeiro: number | null;
    data_hora: Date;
    descricao: string;
}

export const criarAgendamento = async (params: CriarAgendamentosParams) => {

    const user = await getServerSession(authOptions);

    if (!user) {
        throw new Error("Usuário não autenticado");
    }
    const data = {...params, id: (user.user as any).id };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    revalidatePath("barbearias/{id}");

    if (!response.ok) {
        throw new Error("Erro ao criar agendamento");
    }

    return response.json();
};