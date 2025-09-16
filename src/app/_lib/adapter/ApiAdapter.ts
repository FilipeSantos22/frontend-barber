import type { Adapter, AdapterUser } from "next-auth/adapters";
import api from "../../../services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ex: http://localhost:3001/api

export function ApiAdapter(): Adapter {
    return {
        async createUser(user: AdapterUser) {
            try {
                const payload = {
                    name: user.name,
                    email: user.email,
                    image: user.image, // se o back aceitar
                    tipo: "cliente", // ou "barbeiro", conforme a lógica
                };
                const { data } = await api.post(`${API_URL}/usuarios`, payload);

                return data as AdapterUser;

            } catch (error) {
                throw error;
            }
        },
        async getUser(id: string) {
            const { data } = await api.get(`${API_URL}/usuarios/${id}`);
            return data;
        },
        async getUserByEmail(email: string) {
           const url = `${API_URL}/usuarios?email=${encodeURIComponent(email)}`;
            try {
                const { data } = await api.get(url);
                return data?.[0] ?? null;
            } catch (error) {
                throw error;
            }
        },
        async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
            try {
                const { data } = await api.get(`${API_URL}/accounts`, {
                    params: { provider, providerAccountId }
                });
                return data?.user ?? null;
            } catch (error: any) {
                if (error?.response?.status === 404) {
                    return null; // não encontrou o usuário
                }
                throw error;
            }
        },
        async updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
            const { data } = await api.put(`${API_URL}/usuarios/${user.id}`, user);
            return data as AdapterUser;
        },
        async deleteUser(userId: string) {
            await api.delete(`${API_URL}/usuarios/${userId}`);
        },
        async linkAccount(account: Record<string, any>) {
            await api.post(`${API_URL}/accounts`, account);
        },
        async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
            await api.delete(`${API_URL}/accounts`, { data: { provider, providerAccountId } });
        },
        async createSession(session: Record<string, any>) {
            const { data } = await api.post(`${API_URL}/sessions`, session);
            if (typeof data.expires === "string") {
                data.expires = new Date(data.expires);
            }
            return data;
        },
        async getSessionAndUser(sessionToken: string) {
            const { data: session } = await api.get(`${API_URL}/sessions/${sessionToken}`);
            if (!session) return null;
            if (session && typeof session.expires === "string") {
                session.expires = new Date(session.expires);
            }
            // Buscar o usuário relacionado à sessão
            const { data: user } = await api.get(`${API_URL}/usuarios/${session.userId}`);
            console.log('Sessão e usuário obtidos:', { session, user });
            return { session, user };
        },
        async updateSession(session: Record<string, any>) {
            const { data } = await api.put(`${API_URL}/sessions/${session.sessionToken}`, session);
            return data;
        },
        async deleteSession(sessionToken: string) {
            await api.delete(`${API_URL}/sessions/${sessionToken}`);
        },
        async createVerificationToken(token: Record<string, any>) {
            const { data } = await api.post(`${API_URL}/verification_tokens`, token);
            return data;
        },
        async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
            const { data } = await api.post(`${API_URL}/verification_tokens/use`, { identifier, token });
            return data;
        },
    };
}