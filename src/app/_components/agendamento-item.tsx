import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Agendamento {
    id: number; // id do user
    idBarbeiro: number;
    idBarbearia: number;
    idServico: number;
    data_hora: string;
    status: string;
    barbearia_imagem_url: string;
    descricao: string;
    barbearia_nome: string;
    servico_preco: number;
    servico_duracao_minutos: number;
    servico_nome: string;
}
interface AgendamentoItemProps {
  agendamento: Agendamento;
}

const AgendamentoItem = ({ agendamento }: AgendamentoItemProps) => {
    const date = new Date(agendamento.data_hora);
    const confirmado = isFuture(date) && agendamento.status != 'cancelado';
    return ( 
        <>
            <Card className='min-w-[90%]'>
                <CardContent className='flex justify-between p-0'>
                    <div className='flex flex-col gap-2 py-5 pl-5'>

                        <Badge className='w-fit' variant={confirmado ? 'default' : 'secondary'}>{confirmado ? 'Confirmado' : 'Finalizado'}</Badge>
                        <h3 className='semi-bold'>{agendamento.servico_nome}</h3>

                        <div className='flex items-center gap-2'>
                            <Avatar className='w-6 h-6'>
                                <AvatarImage src={agendamento.barbearia_imagem_url}></AvatarImage>
                            </Avatar>

                            <p className='text-sm'>{agendamento.barbearia_nome}</p>
                        </div>

                    </div>

                    <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                    <p className="text-sm capitalize">
                        {format(agendamento.data_hora, "MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-2xl">
                        {format(agendamento.data_hora, "dd", { locale: ptBR })}
                    </p>
                    <p className="text-sm">
                        {format(agendamento.data_hora, "HH:mm", { locale: ptBR })}
                    </p>
                    </div>
                </CardContent>
            </Card>
        </>
     );
}

export default AgendamentoItem;