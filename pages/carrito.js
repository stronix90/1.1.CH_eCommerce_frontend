import Link from "next/link";
import H1 from "../src/components/atoms/H1";
import Cart from "../src/components/Cart";
import { LayoutWithoutAside } from "../src/components/layout";

export default function carrito() {
    return (
        <LayoutWithoutAside>
            <section className="w-full">
                <H1 className="text-center">Carrito</H1>
                <Cart />
            </section>
            <Link href='/finalizar-compra' ><button>Finalizar compra</button></Link>
        </LayoutWithoutAside>
    )
}