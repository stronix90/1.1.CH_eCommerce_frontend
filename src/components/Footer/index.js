import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-800">
            <h2 className="font-bold text-center">Opciones de administrador</h2>
            <ul className="text-white text-center py-1">
                <Link href="/admin/products">
                    <li>Crear producto</li>
                </Link>
            </ul>
        </footer>
    )
}