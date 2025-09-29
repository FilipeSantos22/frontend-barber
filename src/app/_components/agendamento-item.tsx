"use client"
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Image from 'next/image';
import TelefoneItem from './telefone-item';
import { Button } from './ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { deleteAgendamento } from '../_actions/delete-agendamento';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import ResumoAgendamento from './resumo-agendamendo';
import { getUserById } from "@/services/usuarios";

interface Agendamento {
    id: number; // id do user
    idBarbeiro: number;
    idAgendamento: number;
    idBarbearia: number;
    idServico: number;
    data_hora: string;
    status: string;
    descricao: string;
    barbearia: {
        idBarbearia: number;
        nome: string;
        endereco: string;
        telefone?: string;
        imagem_url: string;
    }
    servico: {
        idServico: number;
        nome: string;
        descricao: string;
        preco: number;
        duracao_minutos: number;
    }
}
interface AgendamentoItemProps {
  agendamento: Agendamento;
}

const AgendamentoItem = ({ agendamento }: AgendamentoItemProps) => {
    const date = new Date(agendamento.data_hora);
    const confirmado = isFuture(date) && agendamento.status != 'cancelado';
    const [open, setOpen] = useState(false);
    const [nomeBarbeiro, setNomeBarbeiro] = useState('');

    useEffect(() => {
        async function fetchNomeBarbeiro() {
            if (agendamento.idBarbeiro) {
                const nome = await getUserById(agendamento.idBarbeiro);
                setNomeBarbeiro(nome?.name ?? '');
            }
        }
        fetchNomeBarbeiro();
    }, [agendamento.idBarbeiro]);

    const handleDeleteAgendamento = async () => {
        try {
            await deleteAgendamento(agendamento.idAgendamento);
            setOpen(false);
            toast.success("Agendamento cancelado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar o agendamento:", error);
            toast.error("Erro ao cancelar o agendamento. Tente novamente.");
        }
    }

    const handleSheetOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
    }

    return ( 
        <Sheet open={open} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger className='w-full min-w-[90%]'>
                <Card className='min-w-[90%]'>
                    <CardContent className='flex justify-between p-0'>
                        <div className='flex flex-col gap-2 py-5 pl-5'>

                            <Badge className='w-fit' variant={confirmado ? 'default' : 'secondary'}>{confirmado ? 'Confirmado' : 'Finalizado'}</Badge>
                            <h3 className='w-fit'>{agendamento.servico.nome}</h3>

                            <div className='flex items-center gap-2'>
                                <Avatar className='w-6 h-6'>
                                    <AvatarImage src={agendamento.barbearia.imagem_url}></AvatarImage>
                                </Avatar>

                                <p className='text-sm'>{agendamento.barbearia.nome}</p>
                            </div>

                        </div>

                        <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                            <p className="text-sm capitalize">
                                {format(date, "MMMM", { locale: ptBR })}
                            </p>
                            <p className="text-2xl">
                                {format(date, "dd", { locale: ptBR })}
                            </p>
                            <p className="text-sm">
                                {format(date, "HH:mm", { locale: ptBR })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className='w-[90%]'>
               <SheetHeader>
                    <SheetTitle className='text-left'>
                        Informações do Agendamento
                    </SheetTitle>
               </SheetHeader>
               <div className='relative h-[180px] w-full flex items-end mt-6 overflow-hidden rounded-xl'>
                    <Image 
                        className='object-cover w-full h-full'   
                        src="/Barbearia-Card.png" 
                        alt={agendamento.barbearia.nome} 
                        fill
                    />
                    <Card className='z-50 w-full mb-3 mx-5 rounded-xl'>
                        <CardContent className='px-5 py-3 flex gap-3 items-center'>
                            <Avatar>
                                <AvatarImage src={agendamento.barbearia.imagem_url}></AvatarImage>
                            </Avatar>
                            <div>
                                <h3 className='font-bold'>{agendamento.barbearia.nome}</h3>
                                <h3 className='text-xs'>{agendamento.barbearia.endereco}</h3>
                            </div>
                        </CardContent>
                    </Card>
               </div>
               <div className='mt-6 w-[90%] align-items-center mx-auto rounded-xl'>
                    <Badge className='w-fit' variant={confirmado ? 'default' : 'secondary'}>{confirmado ? 'Confirmado' : 'Finalizado'}</Badge>
                    <div className="mt-3 mb-6">

                        <ResumoAgendamento
                            servico={{
                                nome: agendamento.servico.nome,
                                preco: agendamento.servico.preco,
                                nomeBarbearia: agendamento.barbearia.nome,
                                nomeBarbeiro: nomeBarbeiro
                            }}
                            selectedDay={date}
                            selectedTime={format(date, "HH:mm", { locale: ptBR })}
                        />
                    </div>
                    <h2 className='font-bold mb-2'>Contato da barbearia:</h2>
                    <TelefoneItem telefone={agendamento.barbearia.telefone ? agendamento.barbearia.telefone : ''} />
               </div>

              <SheetFooter className='mt-6'>
                <div className="flex items-center gap-3 w-full">
                    <SheetClose asChild>
                        <Button variant="outline" className='w-[48%]'>Voltar</Button>
                    </SheetClose>
                    {confirmado && (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className='w-[48%]'>Cancelar</Button>
                            </DialogTrigger>
                            <DialogContent className='w-[90%]'>
                                <DialogHeader>
                                    <DialogTitle>Você quer cancelar o agendamento?</DialogTitle>
                                    <DialogDescription>
                                        Esta ação não pode ser desfeita. Isso irá cancelar seu agendamento
                                        e remover seus dados de nossos servidores.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className='flex flex-row gap-3'>
                                    <DialogClose asChild>
                                        <Button variant="secondary" className='w-[48%]'>Voltar</Button>
                                    </DialogClose>
                                    <DialogClose className='w-[48%]' asChild>
                                        <Button variant="destructive" className='w-[48%]' onClick={handleDeleteAgendamento}>Confirmar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>                        
                    )}
                </div>
              </SheetFooter>
            </SheetContent>
        </Sheet>
     );
}

export default AgendamentoItem;