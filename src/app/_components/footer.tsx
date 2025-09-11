import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return (
        <footer>
            <Card>
                <CardContent className='py-6 px-6'>
                    <p className='text-sm text-gray-400 '>copyright @ 2025 <span className='font-bold'>App Barber</span></p>
                </CardContent>
            </Card>
        </footer>
    );
}

export default Footer;