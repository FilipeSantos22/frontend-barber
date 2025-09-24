import { isFuture } from "date-fns";

export function mergeAgendamentoBarbeariaServico(
  agendamentos: any[],
  barbearias: any[],
  servicos: any[]
) {
  const agendamentosComBarbeariaEServico = agendamentos.map((agendamento: any) => {
    const barbearia = barbearias.find(
      (b: any) => b.idBarbearia === agendamento.idBarbearia
    );
    const servico = servicos.find(
      (s: any) => s.idServico === agendamento.idServico
    );
    return {
      ...agendamento,
      barbearia,
      servico,
    };
  });

  const agendamentosConfirmados = agendamentosComBarbeariaEServico
    .filter(
      (agendamento: any) =>
        isFuture(new Date(agendamento.data_hora)) && agendamento.status !== 'cancelado'
    )
    .sort(
      (a: any, b: any) =>
        new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()
    );

  return {
    agendamentosComBarbeariaEServico,
    agendamentosConfirmados,
  };
}