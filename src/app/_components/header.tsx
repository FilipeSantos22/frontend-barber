import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card,CardAction,CardContent,CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card";
import Image from "next/image";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 justify-between items-center flex flex-row">
        <Image src="/Logo.png" alt="Logo App" height={18} width={100}/>

        <Button size="icon" variant="outline">
            <MenuIcon />
        </Button>

      </CardContent>
    </Card>
  );
};

export default Header;
