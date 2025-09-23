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
import { useState } from 'react';

interface Agendamento {
    id: number; // id do user
    idBarbeiro: number;
    idAgendamento: number;
    idBarbearia: number;
    idServico: number;
    data_hora: string;
    status: string;
    descricao: string;
    barbearia_imagem_url: string;
    barbearia_endereco: string;
    barbearia_telefone: string;
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
    const [open, setOpen] = useState(false);

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
                        alt={agendamento.barbearia_nome} 
                        fill
                    />
                    <Card className='z-50 w-full mb-3 mx-5 rounded-xl'>
                        <CardContent className='px-5 py-3 flex gap-3 items-center'>
                            <Avatar>
                                <AvatarImage src={agendamento.barbearia_imagem_url}></AvatarImage>
                            </Avatar>
                            <div>
                                <h3 className='font-bold'>{agendamento.barbearia_nome}</h3>
                                <h3 className='text-xs'>{agendamento.barbearia_endereco}</h3>
                            </div>
                        </CardContent>
                    </Card>
               </div>
               <div className='mt-6 w-[90%] align-items-center mx-auto rounded-xl'>
                    <Badge className='w-fit' variant={confirmado ? 'default' : 'secondary'}>{confirmado ? 'Confirmado' : 'Finalizado'}</Badge>

                    <Card className="mt-3 mb-6 ">
                        <CardContent className="p-3 space-y-3">
                            <div className="div flex justify-between items-center">
                                <h2 className="font-bold"> {agendamento.servico_nome}</h2>
                                <p className="text-sm font-bold">
                                    {Intl.NumberFormat('pt-BR', { 
                                        style: 'currency', 
                                        currency: 'BRL' }).format(agendamento.servico_preco || 0)}
                                </p>
                            </div>

                            <div className="div flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Data</h2>
                                <p className="text-sm">
                                    {format(agendamento.data_hora, "d 'de' MMMM", { locale: ptBR })}
                                </p>
                            </div>

                            <div className="div flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Horário</h2>
                                <p className="text-sm">
                                    {format(agendamento.data_hora, "HH:mm", { locale: ptBR })}
                                </p>
                            </div>

                            <div className="div flex justify-between items-center">
                                <h2 className="text-sm text-gray-400">Barbearia: </h2>
                                <p className="text-sm">
                                    {agendamento.barbearia_nome}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <TelefoneItem telefone={agendamento.barbearia_telefone} />
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