import type { Adapter, AdapterUser } from "next-auth/adapters";
import api from "../../../services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ex: http://localhost:3001/api

export function ApiAdapter(): Adapter {
    return {
        async createUser(user) {
            const { data } = await api.post(`${API_URL}/usuarios`, user);
            return data as AdapterUser;
        },
        async getUser(id) {
            const { data } = await api.get(`${API_URL}/usuarios/${id}`);
            return data;
        },
        async getUserByEmail(email) {
            const { data } = await api.get(`${API_URL}/usuarios?email=${encodeURIComponent(email)}`);
            return data;
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const { data } = await api.get(`${API_URL}/accounts`, {
                params: { provider, providerAccountId }
            });
            return data?.user ?? null;
        },
        async updateUser(user) {
            const { data } = await api.put(`${API_URL}/usuarios/${user.id}`, user);
            return data;
        },
        async deleteUser(userId) {
            await api.delete(`${API_URL}/usuarios/${userId}`);
        },
        async linkAccount(account) {
            await api.post(`${API_URL}/accounts`, account);
        },
        async unlinkAccount({ provider, providerAccountId }) {
            await api.delete(`${API_URL}/accounts`, { data: { provider, providerAccountId } });
        },
        async createSession(session) {
            const { data } = await api.post(`${API_URL}/sessions`, session);
            return data;
        },
        async getSessionAndUser(sessionToken) {
            const { data } = await api.get(`${API_URL}/sessions/${sessionToken}`);
            return data;
        },
        async updateSession(session) {
            const { data } = await api.put(`${API_URL}/sessions/${session.sessionToken}`, session);
            return data;
        },
        async deleteSession(sessionToken) {
            await api.delete(`${API_URL}/sessions/${sessionToken}`);
        },
        async createVerificationToken(token) {
            const { data } = await api.post(`${API_URL}/verification_tokens`, token);
            return data;
        },
        async useVerificationToken({ identifier, token }) {
            const { data } = await api.post(`${API_URL}/verification_tokens/use`, { identifier, token });
            return data;
        },
    };
}