import api from "./api";

export async function getBarbearias(search?: string) {
    const url = search ? `/barbearias?search=${encodeURIComponent(search)}` : "/barbearias";
    const { data } = await api.get(url);
    return data;
}

export async function createBarbearia(payload: any) {
    const { data } = await api.post("/barbearias", payload);
    return data;
}

export async function getBarbeariaById(id: number) {
    const { data } = await api.get(`/barbearias/${id}`);
    return data;
}

export async function getServicosByBarbeariaId(id: number) {
    const { data } = await api.get(`/barbearias/${id}/servicos`);
    return data;
}
