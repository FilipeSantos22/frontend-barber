"use client"
import Header from './_components/header';
import { SearchIcon } from "lucide-react";
import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';
import Image from "next/image";
import { Card, CardContent } from './_components/ui/card';
import { getBarbearias } from "../services/barbearia";
import { useEffect, useState } from 'react';
import BarbeariaItem from './_components/barbearia.item';
import { PesquisaRapida } from './_constants/pesquisar';
import AgendamentoItem from './_components/agendamento-item';

export default function Home() {
  const [barbearias, setBarbearias] = useState<any[]>([]);

  useEffect(() => {
    getBarbearias().then(setBarbearias);
  }, []);

  return (

    <div>
        <Header />
        <div className='p-5 '>
            
            <h2 className='text-xl font-bold'>Olá, Filipe!</h2>
            <p>Terça-feira, 02 de Setembro</p>
            
            {/* BUSCA */}
            <div className='flex items-center gap-2 mt-6'>
                <Input placeholder='Faça sua busca' />
                <Button>
                    <SearchIcon />
                </Button>
            </div>

            {/* PESQUISA RÁPIDA */}
            <div className='flex gap-3 mt-6'>
                {
                    PesquisaRapida.map((option, index) => (
                        <Button key={index} className='gap-2' variant='secondary' >
                            <Image src={option.imagemUrl} alt={option.title} className='' width={16} height={16} />
                            {option.title}
                        </Button>
                    ))
                }

            </div>

            {/* IMAGEM */}
            <div className='relative w-full h-[150px] mt-6'>
                <Image src="/Banner01.png" alt="Agende conosco" fill className='object-cover rounded-xl' />
            </div>

            {/* AGENDAMENTOS */}
            <AgendamentoItem />

            {/* RECOMENDADOS */}
            <h2 className='mt-6 mb-3 text-xs font-bold uppercase text-gray-400'>Recomendados:</h2>
            <div className='flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden mt-6'>
                {barbearias.map(b => (
                    <BarbeariaItem key={b.idBarbearia} barbearia={b} />
                ))}
            </div>
        </div>
    </div>

  );
}
