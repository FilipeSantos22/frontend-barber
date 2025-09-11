import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { PesquisaRapida } from "../_constants/pesquisar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";

const SideBar = () => {
    return ( 

            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="py-5 flex items-center border-b border-solid gap-3">
                    <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User Avatar" />
                    </Avatar>

                    <div>
                        <p className="font-bold">Filipe Gomes</p>
                        <p className="text-xs">filipe@example.com</p>
                    </div>
                </div>

                {/* Conteúdo do menu */}
                <div className="flex flex-col gap-2 mt-4 py-5 border-b border-solid ">
                    
                    <SheetClose asChild>
                        <Button variant="ghost" size="lg" className="w-full gap-2 justify-start" >
                            <Link href="/">
                                <HomeIcon size={18} />
                                Inicio
                            </Link>
                        </Button>
                    </SheetClose>
                    <Button variant="ghost" size="lg" className="w-full gap-2 justify-start">
                        <Link href="/agendamento">
                            <CalendarIcon size={18} /> Agendamento
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col gap-2 mt-4 py-5 border-b border-solid ">
                    {PesquisaRapida.map((option, index) => (
                        <Button key={index} className='gap-2 w-full justify-start' variant='ghost' >
                            <Image src={option.imagemUrl} alt={option.title} className='' width={16} height={16} />
                            {option.title}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col gap-2 mt-4 py-5">
                    <Button className="justify-start" variant='ghost'>
                        <LogOutIcon /> Sair da conta</Button>
                </div>
            </SheetContent>
     );
}
 
export default SideBar;