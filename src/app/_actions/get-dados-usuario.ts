import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserById } from "@/services/usuarios";

type Usuario = {
    id: number;
    name: string;
    email: string;
    telefone?: string;
    // outros campos...
};

export function useUsuarioCompleto() {
    const { data } = useSession();
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        async function fetchUsuario() {
            const id = (data?.user as any)?.id;
            if (id) {
                const user = await getUserById(Number(id));
                setUsuario(user);
            }
        }
        fetchUsuario();
    }, [data?.user]);

    return usuario;
}