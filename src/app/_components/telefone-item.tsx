"use client"
import { SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface TelefoneItemProps {
    telefone: string;
}

const TelefoneItem = ({ telefone }: TelefoneItemProps) => {

    const copiarFoneClick = (telefone: string) => {
        navigator.clipboard.writeText(telefone);
        toast.success('Telefone copiado com sucesso!');
    };

    return (
    
        <div className="flex justify-between">
            <div className="flex items-center gap-2">
                <SmartphoneIcon />
                <p className="text-sm text-gray-600 ml-2">
                    {telefone || 'Telefone não disponível'}
                </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => copiarFoneClick(telefone)}>Copiar</Button>
        </div>
    
    );
};

export default TelefoneItem;