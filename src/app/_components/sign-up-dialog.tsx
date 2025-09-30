// import { useState } from "react";
// import { Button } from "./ui/button";
// import { DialogHeader, DialogTitle } from "./ui/dialog";
// import { cadastrarUsuario } from "@/services/usuarios";
// import { InputTelefone } from "./telefone-input";

// const SignUpDialog = ({ onClose }: { onClose: () => void }) => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [telefone, setTelefone] = useState("");
//     const [erro, setErro] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSignUp = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setErro("");
//         setLoading(true);
//         try {
//             await cadastrarUsuario({ name: name, email, telefone });
//             onClose();
//         } catch (err: any) {
//             setErro(err.message || "Erro desconhecido");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <DialogHeader>
//                 <DialogTitle>Cadastre-se na plataforma</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSignUp} className="mt-4 space-y-2">
//                 <input
//                     type="text"
//                     placeholder="Nome"
//                     value={name}
//                     onChange={e => setName(e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                 />
//                 <input
//                     type="email"
//                     placeholder="E-mail"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     required
//                     className="w-full border rounded px-3 py-2"
//                 />
//                 <InputTelefone
//                     value={telefone}
//                     onChange={setTelefone}
//                     className="w-full border rounded px-3 py-2"
//                     placeholder={false}
//                 />
//                 {erro && <p className="text-red-500 text-sm">{erro}</p>}
//                 <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? "Cadastrando..." : "Cadastrar"}
//                 </Button>
//                 <Button type="button" variant="ghost" className="w-full mt-2" onClick={onClose}>
//                     Voltar para login
//                 </Button>
//             </form>
//         </>
//     );
// };

// export default SignUpDialog;