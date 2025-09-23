import api from "./api";

export async function getAgendamentos(search?: string) {
    const url = search ? `/agendamentos?search=${encodeURIComponent(search)}` : "/agendamentos";
    const { data } = await api.get(url);
    return data;
}

export async function createAgendamento(payload: any) {
    const { data } = await api.post("/agendamentos", payload);
    return data;
}

export async function getAgendamentoById(idAgendamento: number) {
    const { data } = await api.get(`/agendamentos/${idAgendamento}`);
    return data;
}
