import ServicoItem from "@/app/_components/servico-item";
import SideBar from "@/app/_components/sidebar";
import TelefoneItem from "@/app/_components/telefone-item";
import { Barbearia } from "../../../types/Barbearia";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { getBarbeariaById, getServicosByBarbeariaId } from "@/services/barbearia";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { getUserById } from "@/services/usuarios";

type BarbeariaPageProps = {
  params: Promise<{ id: string }>;
};

const fetchBarbeariaData = async (id: string, session: any) => {
    let usuario = null;
    let barbearia: Barbearia | null = null;
    let servicosBarbearia = [];
    try {
        if (session?.user) {
            const userId = (session.user as any)?.id;
            if (userId) {
                usuario = await getUserById(Number(userId));
            }
        }
        barbearia = await getBarbeariaById(Number(id));
        servicosBarbearia = await getServicosByBarbeariaId(Number(id));
        servicosBarbearia = servicosBarbearia.map((servico: any) => ({
            ...servico,
            nomeBarbearia: barbearia?.nome,
        }));
    } catch (error) {
        // Se for 404, barbearia permanece null
    }
    return { usuario, barbearia, servicosBarbearia };
};

const BarbeariaPage = async (props: BarbeariaPageProps) => {
    const session = await getServerSession(authOptions);
    const awaitedParams = await props.params;
    const { usuario, barbearia, servicosBarbearia } = await fetchBarbeariaData(awaitedParams.id, session);
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
                {/*DESCRIÇÃO*/}
                <div className="pt-3 space-y-3">
                    <h2 className="text-xs font-bold uppercase text-gray-400 ">Sobre nós</h2>
                    <p className="text-sm text-gray-600 text-justify">
                        {barbearia.descricao || 'Nenhuma descrição disponível.'}
                    </p>
                </div>

            </div>

            {usuario && usuario.tipo === 'admin' && (
                    <div className="p-5 border-b border-solid space-y-3">
                        <h2 className="text-xs font-bold uppercase text-gray-400 ">Gerenciar</h2>
                        <div className="flex ml-auto">
                            <div className="pr-2">
                                <Link href={`/barbearias/${barbearia.idBarbearia}/cadastrar-barbeiro`}>
                                        <Button variant="secondary">Novo Barbeiro</Button>
                                </Link>
                            </div>
                            <div className="pl-2">
                                <Link href={`/barbearias/${barbearia.idBarbearia}/cadastrar-servico`}>
                                    <Button variant="secondary">Novo Serviço</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                )}

            

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