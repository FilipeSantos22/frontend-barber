import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage } from './ui/avatar';

const AgendamentoItem = () => {
    return ( 
        <>
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
        </>
     );
}

export default AgendamentoItem;