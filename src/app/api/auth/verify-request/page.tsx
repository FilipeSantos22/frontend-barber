import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

export default function VerifyRequestPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-zinc-900">
            <Header />
            <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold mb-4 text-primary dark:text-white">Verifique seu e-mail</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">
                        Enviamos um link de acesso para seu e-mail.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                        Por favor, confira sua caixa de entrada e também a pasta de spam.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}