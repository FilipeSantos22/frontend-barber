import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card,CardContent, } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SideBar from "./sidebar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Link href="/">
          <Image src="/Logo.png" alt="Logo App" height={18} width={100}/>
        </Link>

        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SideBar />
        </Sheet>

      </CardContent>
    </Card>
  );
};

export default Header;
