"use server"
import { getServerSession } from "next-auth";
import api from "./api";
import { authOptions } from "../_lib/auth";
import { revalidatePath } from "next/cache";


interface getAgendamentosProps {
    idBarbearia: number;
    data_hora?: Date;
    idBarbeiro?: number | null;
}

interface CriarAgendamentosParams {
    idServico: number;
    idBarbearia: number;
    idBarbeiro: number | null;
    data_hora: Date;
    descricao: string;
    duracao_minutos: number | null;
}

export const getAgendamentos = async ({ idBarbearia, data_hora, idBarbeiro }: getAgendamentosProps) => {

    const response = await api.get(`/agendamentos?idBarbearia=${idBarbearia}${data_hora ? `&data_hora=${data_hora.toISOString()}` : ''}${idBarbeiro ? `&idBarbeiro=${idBarbeiro}` : ''}`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error("Erro ao buscar agendamentos");
    }
    return response.data;
};

export const criarAgendamento = async (params: CriarAgendamentosParams) => {

    const user = await getServerSession(authOptions);

    if (!user) {
        throw new Error("Usuário não autenticado");
    }
    const data = {...params, id: (user.user as any).id };

    const response = await api.post(`/agendamentos`, data);

    revalidatePath(`barbearias/${params.idBarbearia}`);

    if (response.status < 200 || response.status >= 300) {
        throw new Error("Erro ao criar agendamento");
    }

    return response.data;
};

export async function getAgendamentoByIdUsuario(id: number) {
    const { data } = await api.get(`/agendamentos/usuario/${id}`);
    return data;
}