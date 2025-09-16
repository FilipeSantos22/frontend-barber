"use server"

interface CriarAgendamentosParams {
    idServico: number;
    idBarbearia: number;
    idBarbeiro: number;
    idUsuario: number;
    data_hora: Date;
    descricao: string;
}

export const criarAgendamento = async (params: CriarAgendamentosParams) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Erro ao criar agendamento");
    }

    return response.json();
};