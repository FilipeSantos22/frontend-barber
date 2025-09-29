"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { ptBR } from "date-fns/locale";
import { set } from "date-fns";
import { Servico } from "../../types/Servico";
import { toast } from "sonner";
import { criarAgendamento } from "../_actions/criar-agendamento";
import { useSession } from "next-auth/react";
import { getAgendamentos } from "../_actions/agendamentos";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import ResumoAgendamento from "./resumo-agendamendo";
import { useRouter } from "next/navigation";
import PreencherDadosDialog from "./preencher-dados-dialog";
import { getUser, getUserById } from "@/services/usuarios";
import BarbeiroSelector from "./barbeiro-selector";


interface ServicoItemProps {
    servico: Servico;
}

const ServicoItem = ({ servico }: ServicoItemProps) => {

    const router = useRouter();
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
    const [preencherDadosIsOpen, setPreencherDadosIsOpen] = useState(false);
    const { data } = useSession();
    const preco = servico.preco !== null && servico.preco !== undefined
        ? Number(servico.preco).toFixed(2)
        : null;

    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [diaAgendamento, setDiaAgendamento] = useState<{ horario: string }[]>([]);
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
    const [usuarioCompleto, setUsuarioCompleto] = useState<any>(null);
    const [barbeiros, setBarbeiros] = useState<any[]>([]);
    const [barbeiroSelecionado, setBarbeiroSelecionado] = useState<number | null>(null);

    useEffect(() => {
        if (!selectedDay || !barbeiroSelecionado) {
            setDiaAgendamento([]);
            return;
        }
        
        const params = {
            idBarbearia: servico.idBarbearia,
            idServico: servico.idServico,
            data_hora: selectedDay,
            idBarbeiro: barbeiroSelecionado
        };
        const fetch = async () => {
            const agendamentos = await getAgendamentos(params);
            setDiaAgendamento(agendamentos ?? []);
        }
        fetch();
    }, [servico.idBarbearia, servico.idServico, selectedDay]);

    useEffect(() => {
        async function fetchBarbeiros() {
            // Busca todos os barbeiros da barbearia
            const todosUsuarios = await getUser();
            const barbeirosDaBarbearia = todosUsuarios.filter((u: any) => u.tipo === "barbeiro" && u.idBarbearia === servico.idBarbearia);
            setBarbeiros(barbeirosDaBarbearia);
        }
        fetchBarbeiros();
    }, [servico.idBarbearia]);

    const handleBookingClick = async () => {
        let usuario = null;
        const id = (data?.user as any)?.id;
        if (id) {
            usuario = await getUserById(Number(id));
        }
        setUsuarioCompleto(usuario);
        if (!usuario) {
            return setSignInDialogIsOpen(true);
        }
        // Verifica se falta nome ou telefone
        if (!usuario.name || !usuario.telefone) {
            setPreencherDadosIsOpen(true);
            return;
        }
        setBookingSheetIsOpen(true);
    }

    const handleSheetOpenChange = () => {
        setSelectedDay(undefined);
        setSelectedTime(undefined);
        setDiaAgendamento([]);
        setBookingSheetIsOpen(false);
    }

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
                idBarbeiro: barbeiroSelecionado,
                data_hora: novaData,
                descricao: servico.nome,
            });
            handleSheetOpenChange();
            toast.success("Agendamento criado com sucesso!", {
                action: {
                    label: 'Ver agendamentos',
                    onClick: () => {
                        router.push('/agendamentos');
                    }
                }
            });
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            toast.error("Erro ao criar agendamento. Por favor, tente novamente.");
        }

    }

    const handleDadosPreenchidos = () => {
        setPreencherDadosIsOpen(false);
        setBookingSheetIsOpen(true);
    };

    useEffect(() => {
        if (!selectedDay || !barbeiroSelecionado) return;
        const params = {
            idBarbearia: servico.idBarbearia,
            idServico: servico.idServico,
            data_hora: selectedDay,
            idBarbeiro: barbeiroSelecionado
        };
        const fetch = async () => {
            const agendamentos = await getAgendamentos(params);
            setDiaAgendamento(agendamentos ?? []);
        }
        fetch();
    }, [servico.idBarbearia, servico.idServico, selectedDay, barbeiroSelecionado]);

    return (
        <>
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
                            <Sheet open={bookingSheetIsOpen} onOpenChange={handleSheetOpenChange}>
                                <Button variant="secondary" className='ml-5' size="sm" onClick={handleBookingClick}>
                                    Reservar
                                </Button>
                                
                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="border-b border-solid py-5">
                                        <Calendar 
                                            mode="single"
                                            locale={ptBR}
                                            selected={selectedDay}
                                            onSelect={handleDateSelect}
                                            hidden={{ before: new Date() }}
                                        />
                                        
                                    </div>

                                    {selectedDay && (
                                        <BarbeiroSelector
                                            barbeiros={barbeiros}
                                            barbeiroSelecionado={barbeiroSelecionado}
                                            onSelect={setBarbeiroSelecionado}
                                        />
                                    )}

                                    {selectedDay && barbeiroSelecionado && (
                                        <div className="flex items-center overflow-x-auto overflow-y-hidden p-5 gap-3 [&::-webkit-scrollbar]:hidden border-b border-solid mb-5 h-40">
                                            {(diaAgendamento ?? []).map((item: { horario: string }) => (
                                                <Button
                                                    key={item.horario}
                                                    variant={item.horario === selectedTime ? "default" : "outline"}
                                                    className="mr-2 mb-2 rounded-full"
                                                    onClick={() => handleTimeSelect(item.horario)}
                                                >
                                                    {item.horario.slice(0, 5)}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    {selectedTime && selectedDay && (
                                        <div className="">
                                            <ResumoAgendamento
                                                servico={{
                                                    nome: servico.nome,
                                                    preco: servico.preco,
                                                    nomeBarbearia: servico.nomeBarbearia,
                                                    nomeBarbeiro: barbeiros.find(b => b.id === barbeiroSelecionado)?.name ?? ""
                                                }}
                                                selectedDay={selectedDay}
                                                selectedTime={selectedTime.slice(0, 5)}
                                            />
                                        </div>
                                    )}
                                    <SheetFooter className="px-5 ">
                                        <Button type="submit" onClick={handleCriarAgendamento} disabled={!selectedTime || !selectedDay}>Confirmar</Button>
                                        
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>

                    </div>
                </CardContent>
            </Card>


            <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
                <DialogContent className="w-[90%]">
                    <SignInDialog />
                </DialogContent>
            </Dialog>

            <Dialog open={preencherDadosIsOpen} onOpenChange={setPreencherDadosIsOpen}>
                <DialogContent className="w-[90%]">
                    <PreencherDadosDialog
                        id={usuarioCompleto?.id}
                        nomeAtual={usuarioCompleto?.name ?? ""}
                        telefoneAtual={usuarioCompleto?.telefone ?? ""}
                        emailAtual={data?.user?.email ?? ""}
                        onClose={() => setPreencherDadosIsOpen(false)}
                        onSuccess={handleDadosPreenchidos}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
 
export default ServicoItem;