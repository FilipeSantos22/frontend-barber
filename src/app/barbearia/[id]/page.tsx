import ServicoItem from "@/app/_components/servico-item";
import SideBar from "@/app/_components/sidebar";
import TelefoneItem from "@/app/_components/telefone-item";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { getBarbeariaById, getServicosByBarbeariaId } from "@/services/barbearia";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BarbeariaPageProps = {
  params: Promise<{ id: string }>;
};

const BarbeariaPage = async (props: BarbeariaPageProps) => {
    const awaitedParams = await props.params;
    let barbearia = null;
    let servicosBarbearia = null;
    try {
        barbearia = await getBarbeariaById(Number(awaitedParams.id));
        servicosBarbearia = await getServicosByBarbeariaId(Number(awaitedParams.id));
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
                    priority
                />
                <Button size="icon" variant="secondary" className="absolute top-4 left-4 ">
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="secondary" className="absolute top-4 right-4 ">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SideBar />
                </Sheet>

                {/* <SideBarButton /> */}
            </div>

            {/*TÍTULO*/}
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

            {/*SERVIÇOS*/}
            <div className="p-5 space-y-3 border-b border-solid ">
                <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
                <div className="space-y-3">
                    {servicosBarbearia?.map((servico: any) => (
                        <div key={servico.idServico} className="flex justify-between items-center mb-4">
                            <div>
                                <ServicoItem servico={servico} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*CONTATO*/}
            <div className="p-5 space-y-3">
                <h2 className="text-xs font-bold uppercase text-gray-400 ">Contato</h2>
                {barbearia.telefone && (
                    <TelefoneItem telefone={barbearia.telefone} />
                )}
            </div>
        </div>
    );
};

export default BarbeariaPage;