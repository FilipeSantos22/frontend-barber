// "use client"
import { getAgendamentoByIdUsuario } from "@/app/_actions/agendamentos";
import Header from "../_components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import AgendamentoItem from "../_components/agendamento-item";
import { isFuture } from "date-fns";
import { getBarbearias } from "@/services/barbearia";
import { getServicos } from "@/services/servico";
import { mergeAgendamentoBarbeariaServico } from "../_utils/mergeAgendamentos";

const Agendamentos = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return (
            <div className="p-5">
                <h1 className="text-xl font-bold">Você precisa estar logado para ver esta página</h1>
            </div>
        );
    }

    const barbearias = await getBarbearias();
    const servicos = await getServicos();
    const agendamentosRaw = await getAgendamentoByIdUsuario((session.user as any).id);
    const agendamentos = Array.isArray(agendamentosRaw) ? agendamentosRaw : [];

    const { agendamentosComBarbeariaEServico } = mergeAgendamentoBarbeariaServico(
        agendamentos,
        barbearias,
        servicos
    );

    const confirmados = agendamentosComBarbeariaEServico.filter(
        (agendamento: any) =>
            isFuture(new Date(agendamento.data_hora)) && agendamento.status !== 'cancelado'
    );
    const finalizados = agendamentosComBarbeariaEServico.filter(
        (agendamento: any) =>
            !isFuture(new Date(agendamento.data_hora)) || agendamento.status === 'cancelado'
    );

    return (
        <>
            <Header />
            <div className="p-5">
                <div className='flex flex-col gap-3'>
                    <h1 className="text-xl font-bold">Agendamentos</h1>

                    {confirmados.length > 0 && (
                        <>
                            <h2 className='mt-6 mb-3 text-xs font-bold uppercase text-gray-400'>Confirmados:</h2>
                            {confirmados.map((agendamento: any, idx: number) => (
                                <AgendamentoItem agendamento={agendamento} key={`${agendamento.id}-${idx}`} />
                            ))}
                        </>
                    )}

                    {finalizados.length > 0 && (
                        <>
                            <h2 className='mt-6 mb-3 text-xs font-bold uppercase text-gray-400'>Finalizados:</h2>
                            {finalizados.map((agendamento: any, idx: number) => (
                                <AgendamentoItem agendamento={agendamento} key={`${agendamento.id}-${idx}`} />
                            ))}
                        </>
                    )}

                    {confirmados.length === 0 && finalizados.length === 0 && (
                        <p className="text-gray-400">Nenhum agendamento encontrado.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Agendamentos;