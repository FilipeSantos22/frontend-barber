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


    function filtrarAgendamentosUnicos(agendamentos: any[]) {
        const vistos = new Set();
        return agendamentos.filter((agendamento) => {
            // Cria uma chave única para cada serviço agendado pelo usuário no mesmo dia
            const chave = `${agendamento.idServico}-${agendamento.idBarbeiro}-${agendamento.idBarbearia}-${agendamento.data_hora}`;
            if (vistos.has(chave)) {
                return false;
            }

            // Só considera o primeiro horário (o menor) para cada serviço
            const mesmoServico = agendamentos.filter(a =>
                a.idServico === agendamento.idServico &&
                a.idBarbeiro === agendamento.idBarbeiro &&
                a.idBarbearia === agendamento.idBarbearia &&
                a.status === agendamento.status &&
                new Date(a.data_hora).toDateString() === new Date(agendamento.data_hora).toDateString()
            );

            const menorHorario = mesmoServico.reduce((menor, atual) =>
                new Date(atual.data_hora) < new Date(menor.data_hora) ? atual : menor
            , agendamento);

            const chaveMenor = `${menorHorario.idServico}-${menorHorario.idBarbeiro}-${menorHorario.idBarbearia}-${menorHorario.data_hora}`;
            vistos.add(chaveMenor);

            return agendamento === menorHorario;
        });
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
                            {filtrarAgendamentosUnicos(confirmados).map((agendamento: any, idx: number) => (
                                <AgendamentoItem agendamento={agendamento} key={`${agendamento.id}-${idx}`} />
                            ))}
                        </>
                    )}

                    {finalizados.length > 0 && (
                        <>
                            <h2 className='mt-6 mb-3 text-xs font-bold uppercase text-gray-400'>Finalizados:</h2>
                            {filtrarAgendamentosUnicos(finalizados).map((agendamento: any, idx: number) => (
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