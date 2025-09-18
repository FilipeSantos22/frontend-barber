"use client"
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation"; 
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const formSchema = z.object({
    search: z.string().min(1).trim(),
})

const Search = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: "",
        },
    })
    const router = useRouter();

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbearias?search=${data.search}`);
    }

    return ( 
    

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2">
                <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                    <FormItem className="w-full flex items-center">
                    <FormControl>
                        <Input placeholder="Faça sua busca..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">
                        <SearchIcon />
                </Button>
            </form>
        </Form>

     );
}
 
export default Search;