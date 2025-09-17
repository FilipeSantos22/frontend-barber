import { getBarbearias } from "@/services/barbearia";
import BarbeariaItem from "../_components/barbearia.item";
import Header from "../_components/header";
import Search from "../_components/search";
export const dynamic = "force-dynamic";

interface BarbeariasPageProps {
    searchParams: {
        search?: string;
    }
}

const BarbeariasPage = async ({ searchParams }: BarbeariasPageProps) => {

    const barbearias = await getBarbearias(searchParams.search);

    return (
        <div>
            <Header />
            <div className="my-6 px-5 ">
                <Search />
            </div>
            <div className="px-5">
                <h2 className='my-6 mb-3 text-xs font-bold uppercase text-gray-400'>Resultados para: &quot;{searchParams?.search}&quot;</h2>
                
                <div className="grid grid-cols-2 gap-4">
                    {barbearias.map((barbearia: any, idx: number) => (
                        <BarbeariaItem key={barbearia.id ?? idx} barbearia={barbearia} />
                    ))}
                </div>
            </div>

        </div>
    );
}
 
export default BarbeariasPage;