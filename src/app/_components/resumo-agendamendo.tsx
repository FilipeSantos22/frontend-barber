import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";

interface ResumoAgendamentoProps {
    
    servico: {
        nome: string;
        preco: string | number | null | undefined;
        nomeBarbearia: string;
        nomeBarbeiro?: string;
    };
    selectedDay: Date;
    selectedTime: string;
}

const ResumoAgendamento = ({ servico, selectedDay, selectedTime }: ResumoAgendamentoProps) => {
    return ( 
        <>
            <Card className="">
                <CardContent className="p-3 space-y-3">
                    <div className="div flex justify-between items-center">
                        <h2 className="font-bold"> {servico.nome}</h2>
                        <p className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' }).format(Number(servico.preco ?? 0))}
                        </p>
                    </div>

                    <div className="div flex justify-between items-center">
                        <h2 className="text-sm text-gray-400">Barbeiro</h2>
                        <p className="text-sm">
                            {servico.nomeBarbeiro || 'Escolha um barbeiro'}
                        </p>
                    </div>

                    <div className="div flex justify-between items-center">
                        <h2 className="text-sm text-gray-400">Data</h2>
                        <p className="text-sm">
                            {selectedDay ? (
                                <>
                                    {format(new Date(selectedDay), "d 'de'  MMMM", { locale: ptBR })}
                                </>
                            ) : (
                                selectedTime
                            )}
                        </p>
                    </div>

                    <div className="div flex justify-between items-center">
                        <h2 className="text-sm text-gray-400">Horário</h2>
                        <p className="text-sm">
                            {selectedTime}
                        </p>
                    </div>

                    <div className="div flex justify-between items-center">
                        <h2 className="text-sm text-gray-400">Barbearia: </h2>
                        <p className="text-sm">
                            {servico.nomeBarbearia}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
     );
}

export default ResumoAgendamento;