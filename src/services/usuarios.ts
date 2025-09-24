import api from "./api";

export async function getUser() {
    const url = "/usuarios";
    const { data } = await api.get(url);
    return data;
}

export async function getUserById(id: number) {
    const url = `/usuarios/${id}`;
    const { data } = await api.get(url);
    return data;
}

export async function criarUsuario(payload: any) {
    const { data } = await api.post("/usuarios", payload);
    return data;
}