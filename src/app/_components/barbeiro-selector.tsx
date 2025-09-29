import { Button } from "./ui/button";
import Image from "next/image";

interface BarbeiroSelectorProps {
  barbeiros: Array<{ id: number; name: string; image?: string }>;
  barbeiroSelecionado: number | null;
  onSelect: (id: number) => void;
}

const BarbeiroSelector = ({ barbeiros, barbeiroSelecionado, onSelect }: BarbeiroSelectorProps) => {
  if (!barbeiros || barbeiros.length === 0) return null;
  return (
    <div className="mb-1 p-5 py-0">
      <h2 className="font-bold mb-3">Escolha o barbeiro:</h2>
      <div className="flex gap-6 flex-wrap justify-start">
        {barbeiros.map((barbeiro) => (
          <div key={barbeiro.id} className="flex flex-col items-center">
            <span className={`text-xs font-semibold mb-2 ${barbeiroSelecionado === barbeiro.id ? 'text-primary' : 'text-gray-500'}`}>{barbeiro.name}</span>
            <Button
              variant={barbeiroSelecionado === barbeiro.id ? "default" : "outline"}
              className="rounded-full p-0 w-16 h-16 flex items-center justify-center"
              onClick={() => onSelect(barbeiro.id)}
            >
              {barbeiro.image ? (
                <Image
                  src={barbeiro.image}
                  alt={barbeiro.name}
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="rounded-full bg-gray-200 w-14 h-14 flex items-center justify-center text-lg">
                  {barbeiro.name[0]}
                </div>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarbeiroSelector;
