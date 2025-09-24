import Image from 'next/image';
import { Card, CardContent } from '../_components/ui/card';
import { Badge } from '../_components/ui/badge';
import { Button } from './ui/button';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

type Barbearia = {
  idBarbearia: number;
  nome: string;
  endereco: string;
  telefone?: string;
  imagem_url: string;
};

interface BarbeariaItemProps {
  barbearia: Barbearia;
}

const BarbeariaItem = ({ barbearia }: BarbeariaItemProps) => {
  return (

    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-2 ">
        <div className='relative h-[159px] w-full'>
            <Image fill
              sizes="(max-width: 600px) 100vw, 167px"
              src={barbearia.imagem_url}
              alt={barbearia.nome}
              className="object-cover rounded-2xl"
            />

            <Badge className='absolute top-2 left-2 space-x-1' variant="secondary" >
               <StarIcon size={12} className='fill-primary text-primary'/>
               <p className='text-xs font-semibold'>5,0</p>
            </Badge>

        </div>

        <div className='py-3 px-1'>
          <h2 className="font-semibold truncate">{barbearia.nome}</h2>
          <p className="text-sm text-gray-400 truncate">{barbearia.endereco}</p>
          {barbearia.telefone && (
            <p className="text-sm text-gray-500">Tel: {barbearia.telefone}</p>
          )}
          <Button variant="secondary" className='w-full mt-3' asChild>
              <Link href={`/barbearias/${barbearia.idBarbearia}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>

  );
};

export default BarbeariaItem;