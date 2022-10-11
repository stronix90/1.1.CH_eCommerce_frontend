import Head from "next/head";
import { useRouter } from "next/router";
import Cart from "../../src/components/Cart";
import Chat from "../../src/components/Chat";
import { LayoutWithAside } from "../../src/components/layout";
import ProductList from "../../src/components/ProductList";

export default function Home() {
    const router = useRouter();
    const { category } = router.query;

    return (
        <>
            {category && (
                <>
                    <Head>
                        <title>eCommerce - Stronix Corp.</title>
                        <meta
                            name='eCommerce con toda la variedad de productos que necesitas'
                            content='eCommerce con toda la variedad de productos que necesitas'
                        />
                        <link rel='icon' href='/favicon.ico' />
                    </Head>

                    <LayoutWithAside>
                        <main>
                            <ProductList category={category} />
                        </main>
                        <aside>
                            <h2 className="text-3xl font-bold mt-6 mb-3">Carrito</h2>
                            <Cart />
                            <Chat/>
                        </aside>
                    </LayoutWithAside>
                </>
            )}
        </>
    );
}
