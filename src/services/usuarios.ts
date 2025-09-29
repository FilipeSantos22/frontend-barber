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

export async function criarBarbeiro({ name, email, telefone, idBarbearia, tipo }: { name: string; email: string; telefone: string; idBarbearia: string; tipo?: string }) {
    const payload = { name, email, telefone, idBarbearia, tipo };
    const { data } = await api.post("/usuarios", payload);
    return data;
}

// export async function recuperarSenha(email: string) {
//     const { data } = await api.post(`/recuperar-senha`, { email });
//     return data;
// }

export async function cadastrarUsuario({ name, email, telefone }: { name: string; email: string; telefone: string }) {
    const { data } = await api.post("/usuarios", { name, email, telefone, tipo: "cliente" });
    return data;
}

export async function atualizarDadosUsuario(id: number, { name, telefone, email }: { name: string; telefone: string; email: string }) {
    const { data } = await api.put(`/usuarios/${id}`, { name, telefone, email });
    return data;
}