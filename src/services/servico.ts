import api from "./api";

export async function getServicos(search?: string) {
    const url = search ? `/servicos?search=${encodeURIComponent(search)}` : "/servicos";
    const { data } = await api.get(url);
    return data;
}

export async function createServico(payload: any) {
    const { data } = await api.post("/servicos", payload);
    return data;
}

export async function getServicoById(id: number) {
    const { data } = await api.get(`/servicos/${id}`);
    return data;
}

