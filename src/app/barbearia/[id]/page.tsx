import { Button } from "@/app/_components/ui/button";
import { getBarbeariaById } from "@/services/barbearia";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BarbeariaPageProps = {
  params: {
    id: string;
  };
};

const BarbeariaPage = async ({ params }: BarbeariaPageProps) => {
    let barbearia = null;
    try {
        barbearia = await getBarbeariaById(Number(params.id));
    } catch (error) {
        // Se for 404, barbearia permanece null
    }
    if (!barbearia) {
        return notFound();
    }

    return (
        <div>
            {/*IMAGEM*/}
            <div className="relative w-full h-[250px]">
                <Image
                    className="object-cover"
                    src={barbearia.imagem_url}
                    alt={barbearia.nome}
                    fill                
                />

                <Button size="icon" variant="secondary" className="absolute top-4 left-4 bg-white/30 hover:bg-white/50 backdrop-blur-sm" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Button size="icon" variant="secondary" className="absolute top-4 right-4 bg-white/30 hover:bg-white/50 backdrop-blur-sm">
                    <Link href="/menu">
                        <MenuIcon />
                    </Link>
                </Button>
            </div>

            <div className="p-5 border-b border-solid">
                <h1 className="text-xl font-bold mb-3">{barbearia.nome}</h1>
                <div className="flex items-center mb-2 gap-2">
                   <MapPinIcon className="text-primary" size={18} />
                   <p className="text-sm text-gray-500 ">{barbearia.endereco}</p>
                </div>

                <div className="flex items-center gap-1">
                   <StarIcon className="text-primary fill-primary" size={18}/>
                   <p className="text-sm text-gray-500 gap-2">5,0 (222 avaliações)</p>
                </div>
            </div>

            {/*DESCRIÇÃO*/}
            <div className="p-5 border-b border-solid space-y-3">
                <h2 className="text-xs font-bold uppercase text-gray-400 ">Sobre nós</h2>
                <p className="text-sm text-gray-600 text-justify">
                    {barbearia.descricao || 'Nenhuma descrição disponível.'}
                </p>
            </div>
        </div>
    );
};

export default BarbeariaPage;