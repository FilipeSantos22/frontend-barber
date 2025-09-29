"use server"
import api from "./api";


interface getAgendamentosProps {
    idBarbearia: number;
    idServico?: number;
    data_hora?: Date;
    idBarbeiro?: number | null;
}

export const getAgendamentos = async ({ idBarbearia, idServico, data_hora, idBarbeiro }: getAgendamentosProps) => {

    const response = await api.get(`/agendamentos?idBarbearia=${idBarbearia}${idServico ? `&idServico=${idServico}` : ''}${data_hora ? `&data_hora=${data_hora.toISOString()}` : ''}${idBarbeiro ? `&idBarbeiro=${idBarbeiro}` : ''}`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error("Erro ao buscar agendamentos");
    }
    return response.data;
};


export async function createAgendamento(payload: any) {
    const { data } = await api.post("/agendamentos", payload);
    return data;
}

export async function getAgendamentoByIdUsuario(id: number) {
    const { data } = await api.get(`/agendamentos/usuario/${id}`);
    return data;
}