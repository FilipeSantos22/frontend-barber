"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { format, set } from "date-fns";
import { Servico } from "../../types/Servico";
import { toast } from "sonner";
import { criarAgendamento } from "../_actions/criar-agendamento";



interface ServicoItemProps {
    servico: Servico;
    // barbearia: Pick<Barbearia, 'nome'>;
}

const ServicoItem = ({ servico }: ServicoItemProps) => {
    const preco = servico.preco !== null && servico.preco !== undefined
        ? Number(servico.preco).toFixed(2)
        : null;
    const TIME_LIST = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

    const handleDateSelect = (day: Date | undefined) => {
        setSelectedDay(day);
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    }

    const handleCriarAgendamento = async () => {

        try {
            if (!selectedDay || !selectedTime) {
                alert("Por favor, selecione uma data e horário.");
                return;
            }
            const hora = Number(selectedTime.split(':')[0]);
            const minutos = Number(selectedTime.split(':')[1]);

            const novaData = set(selectedDay, {
                minutes: minutos,
                hours: hora,
            })

            await criarAgendamento({
                idServico: servico.idServico,
                idBarbearia: servico.idBarbearia,
                idBarbeiro: 1,// temporários -> aqui tem que pegar o barbeiro selecionado
                id: 2, // temporario -> depois pegar do usuario logado
                data_hora: novaData,
                descricao: servico.nome,
            });
            toast.success("Agendamento criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
        }

    }
    return (
        <Card className="p-4 mb-3">
            <CardContent className="flex items-center gap-3 p-3">
                {/* VERIFICAR A NECESSIDADE DE INSERIR A IMAGEM DO SERVIÇO. SE SIM, INSERIR NOVA COLUNA NO DB */}
                {/*<div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]"><Image src={servico.imagem} alt={servico.nome} fill className="object-cover rounded-xl" /></div>*/}
                
                <div className="space-y-2">
                    
                    <h3 className="font-semibold text-sm">{servico.nome}</h3>
                    {servico.duracao_minutos && (
                        <p className="text-sm text-gray-400">
                            Duração: {servico.duracao_minutos} minutos
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 font-bold ">
                            {preco ? `R$ ${preco}` : 'A negociar'}
                        </p>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="secondary" className='ml-5' size="sm">
                                    Reservar
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="border-b border-solid py-5">
                                    <Calendar 
                                        mode="single"
                                        locale={ptBR}
                                        selected={selectedDay}
                                        onSelect={handleDateSelect}   
                                        styles={{
                                            head_cell: {
                                                width: "10%",
                                                textTransform: "capitalize",
                                            },
                                            cell: {
                                                width: "10%",
                                            },
                                            button: {
                                                width: "10%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            },
                                        }} 
                                    />
                                    
                                </div>

                                {selectedDay && ( 
                                    <div className="flex overflow-x-auto p-5 gap-3 [&::-webkit-scrollbar]:hidden border-b border-solid mb-5"> 
                                        {TIME_LIST.map((time) => (
                                            <Button 
                                                key={time}
                                                variant={time === selectedTime ? "default" : "outline"}
                                                className="mr-2 mb-2 rounded-full "
                                                onClick={() => handleTimeSelect(time)}
                                            >
                                                {time}
                                            </Button>
                                        ))}

                                    </div>
                                )}

                                {selectedTime && selectedDay && (
                                    <div className="div p-5">
                                        <Card className="">
                                            <CardContent className="p-3 space-y-3">
                                                <div className="div flex justify-between items-center">
                                                    <h2 className="font-bold"> {servico.nome}</h2>
                                                    <p className="text-sm font-bold">
                                                        {Intl.NumberFormat('pt-BR', { 
                                                            style: 'currency', 
                                                            currency: 'BRL' }).format(servico.preco || 0)}
                                                    </p>
                                                </div>

                                                <div className="div flex justify-between items-center">
                                                    <h2 className="text-sm text-gray-400">Data</h2>
                                                    <p className="text-sm">
                                                        {format(selectedDay, "d 'de'  MMMM", { locale: ptBR })} - {selectedTime}
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
                                    </div>
                                )}

                                <SheetFooter className="px-5 ">
                                    <SheetClose asChild>
                                        <Button type="submit" onClick={handleCriarAgendamento}>Confirmar</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServicoItem;