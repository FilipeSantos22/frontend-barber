"use client";

import Image from "next/image";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { PesquisaRapida } from "../_constants/pesquisar";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";

const SideBar = () => {

    const { data } = useSession();

    const handleLoginWithGoogleClick = async () => {
        await signIn("google");
    }

    const handleLogoutClick = async () => {
        await signOut();
    }

    return ( 

            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="py-5 justify-between flex items-center border-b border-solid gap-3">

                    {data?.user ? (
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={data?.user?.image ?? ""} alt="User Avatar" />
                            </Avatar>

                            <div> 
                                <p className="font-bold">{data?.user?.name}</p>
                                <p className="text-xs">{data?.user?.email}</p>
                            </div>
                        </div>
                ) : (
                    <> 
                        <h2 className="font-bold ">Olá, faça o seu login!</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[95%]">
                                <DialogHeader>
                                    <DialogTitle>Faça seu login na plataforma</DialogTitle>
                                    <DialogDescription>
                                        Conecte-se usando sua conta do Google.
                                    </DialogDescription>
                                    </DialogHeader>
                                    <Button variant={"outline"} className="w-full mt-3 gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
                                        <Image src="/google-icon.svg" alt="Fazer login com o Google" width={18} height={18} className="mr-2" />
                                        Continuar com Google
                                    </Button>
                            </DialogContent>
                        </Dialog>
                    </>)}
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
                    <Button className="justify-start" variant='ghost' onClick={handleLogoutClick}>
                        <LogOutIcon /> Sair da conta</Button>
                </div>
            </SheetContent>
    );
}
 
export default SideBar;