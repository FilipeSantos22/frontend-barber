"use client"
import Header from './_components/header';
import { SearchIcon } from "lucide-react";
import { Button } from './_components/ui/button';
import { Input } from './_components/ui/input';
import Image from "next/image";

export default function Home() {
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
      </div>
    </div>

  );
}
