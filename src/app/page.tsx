import Header from './_components/header';
import { Button } from './_components/ui/button';
import Image from "next/image";
import { getBarbearias } from "../services/barbearia";
import BarbeariaItem from './_components/barbearia.item';
import { PesquisaRapida } from './_constants/pesquisar';
import AgendamentoItem from './_components/agendamento-item';
import Search from './_components/search';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './_lib/auth';
import { getAgendamentoById } from '@/services/agendamentos';
import { isFuture } from 'date-fns';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Home = async () => {
    const session = await getServerSession(authOptions);
    const barbeariasPopulares = session?.user ? await getBarbearias() : [];
    // const agendamentos = session?.user ? await getAgendamentoById((session?.user as any).id) : [];
    const agendamentosRaw = session?.user ? await getAgendamentoById((session?.user as any).id) : [];
    const agendamentos = Array.isArray(agendamentosRaw) ? agendamentosRaw : [];
    const agendamentosConfirmados = agendamentos
        .filter(
            (agendamento: any) =>
                isFuture(new Date(agendamento.data_hora)) && agendamento.status !== 'cancelado'
        )
        .sort(
            (a: any, b: any) =>
                new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()
        );

    return (

        <div>
            <Header />
            <div className='p-5 '>

                <h2 className='text-xl font-bold'>Olá, {session?.user?.name || 'Bem vindo'}!</h2>
                {/* <p>Terça-feira, 02 de Setembro</p> */}
                <p>
                    <span>{format(new Date(), "EEEE, dd", { locale: ptBR })}</span>
                    <span> de {format(new Date(), "MMMM", { locale: ptBR })}</span>

                </p>
                
                {/* BUSCA */}
                <div className='mt-6'>
                    <Search />
                </div>

                {/* PESQUISA RÁPIDA */}
                <div className='flex gap-3 mt-6'>
                    {
                        PesquisaRapida.map((option, index) => (
                            <Button className='gap-2' variant='secondary' asChild key={index}>
                                <Link href={'/barbearias?search=' + option.title.toLowerCase()} >
                                    <Image src={option.imagemUrl} alt={option.title} className='' width={16} height={16} />
                                    {option.title}
                                </Link>
                            </Button>
                        ))
                    }

                </div>

                {/* IMAGEM */}
                <div className='relative w-full h-[150px] mt-6'>
                    <Image src="/Banner01.png" alt="Agende conosco" fill className='rounded-xl' />
                </div>

                {/* AGENDAMENTOS */}
                {/* TODO: separar agendamentos em confirmados e finalizados NO BANCO DE DADOS TAMBÉM */}
                {agendamentosConfirmados.length > 0 && (
                    <>
                        <h1 className='mt-6 mb-3 text-xl font-bold '>Agendamentos:</h1>
                        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                            {agendamentosConfirmados.map((agendamento: any, idx: any) => (
                                <AgendamentoItem agendamento={agendamento} key={`${agendamento.id}-${idx}`} />
                            ))}
                        </div>
                    </>
                )}

                {/* RECOMENDADOS */}
                <h2 className='mt-6 mb-3 text-xl font-bold '>Recomendados:</h2>
                <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden mt-4'>
                    {barbeariasPopulares.map((b: any) => (
                        <BarbeariaItem key={b.idBarbearia} barbearia={b} />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Home;