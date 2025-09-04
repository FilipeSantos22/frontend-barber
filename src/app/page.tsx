"use client"
import Header from './_components/header';
import { SearchIcon } from "lucide-react";
import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';
import { Badge } from './_components/ui/badge';
import { Avatar, AvatarImage } from './_components/ui/avatar';
import Image from "next/image";
import { Card, CardContent } from './_components/ui/card';
import { getBarbearias } from "../services/barbearia";
import { useEffect, useState } from 'react';
import BarbeariaItem from './_components/barbearia.item';

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

        <div className='flex items-center gap-2 mt-6'>
            <Input placeholder='Faça sua busca' />
            <Button>
                <SearchIcon />
            </Button>
        </div>

        <div className='relative w-full h-[150px] mt-6'>
            <Image src="/Banner01.png" alt="Agende conosco" fill className='object-cover rounded-xl' />
        </div>

        <h2 className='mt-6 mb-3 text-xs font-bold uppercase text-gray-400'>Agendamentos:</h2>
        <Card className=''>
            <CardContent className='flex justify-between p-0'>
                <div className='flex flex-col gap-2 py-5 pl-5'>
                    
                    <Badge className='w-fit'>Confirmado</Badge>
                    <h3 className='semi-bold'>Corte de Cabelo</h3>

                    <div className='flex items-center gap-2'>
                        <Avatar className='w-6 h-6'>
                            <AvatarImage src="/globe.svg"></AvatarImage>
                        </Avatar>
                    
                        <p className='text-sm'>Barbearia FGS</p>
                    </div>

                </div>

                <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
                    <p className='text-sm'>Setembro</p>
                    <p className='text-2xl'>02</p>
                    <p className='text-sm'>20:00</p>
                </div>
            </CardContent>
        </Card>
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
