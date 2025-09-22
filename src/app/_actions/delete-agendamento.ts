"use server"

import { revalidatePath } from "next/cache";

export const deleteAgendamento = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agendamentos/${id}`, {
        method: 'DELETE',
    });
    revalidatePath("agendamentos");
};