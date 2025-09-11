import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export type Servico = {
    idServico: number;
    nome: string;
    duracao_minutos?: number | null;
    preco?: number | null;
    idBarbearia: number; // FK
    data_criacao?: string | null;
    data_atualizacao?: string | null;
    excluido?: boolean;
};

interface ServicoItemProps {
    servico: Servico;
}

const ServicoItem = ({ servico }: ServicoItemProps) => {
    const preco = servico.preco !== null && servico.preco !== undefined
        ? Number(servico.preco).toFixed(2)
        : null;

    return (
        <Card className="p-4 mb-3">
            <CardContent className="flex items-center gap-3 p-3">
                {/* VERIFICAR A NECESSIDADE DE INSERIR A IMAGEM DO SERVIÇO. SE SIM, INSERIR NOVA COLUNA NO DB */}
                {/*<div className="relative min-h-[110px] max-h-[110px] min-w-[110px] max-w-[110px]"><Image src={servico.imagem} alt={servico.nome} fill className="object-cover rounded-xl" /></div>*/}
                
                <div className="space-y-2">
                    
                    <h3 className="font-semibold text-sm">{servico.nome}</h3>
                    {servico.duracao_minutos && (
                        <p className="text-sm text-gray-400">
                            Duração: {servico.duracao_minutos} minutos
                        </p>
                    )}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 font-bold ">
                            {preco ? `R$ ${preco}` : 'A negociar'}
                        </p>
                        <Button variant="secondary" className='ml-5' size="sm">Reservar</Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
 
export default ServicoItem;