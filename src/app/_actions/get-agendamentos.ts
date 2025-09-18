"use server"
interface getAgendamentosProps {
    idBarbearia: number;
    idServico?: number;
    data_hora?: Date;
    idBarbeiro?: number;
}

export const getAgendamentos = async ({ idBarbearia, idServico, data_hora, idBarbeiro }: getAgendamentosProps) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos?idBarbearia=${idBarbearia}${idServico ? `&idServico=${idServico}` : ''}${data_hora ? `&data_hora=${data_hora.toISOString()}` : ''}${idBarbeiro ? `&idBarbeiro=${idBarbeiro}` : ''}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos");
    }
    return response.json();
};
