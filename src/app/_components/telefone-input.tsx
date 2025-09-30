import { useState } from "react";

interface InputTelefoneProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: boolean;
}

function formatTelefoneMask(value: string) {
    const nums = value.replace(/\D/g, "");
    if (nums.length === 0) {
        return "";
    }
    if (nums.length <= 2) {
        return `(${nums}`;
    }
    if (nums.length <= 7) {
        return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    }
    if (nums.length <= 11) {
        return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
    }
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
}

export function InputTelefone({ value, onChange, className, placeholder }: InputTelefoneProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        onChange(raw);
    };

    return (
        <input
            type="tel"
            placeholder={placeholder ? "Telefone" : ""}
            value={formatTelefoneMask(value)}
            onChange={handleChange}
            maxLength={15}
            required
            className={className}
        />
    );
}