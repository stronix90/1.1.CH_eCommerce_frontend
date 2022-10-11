import { useRouter } from "next/router";
import Cart from "../../src/components/Cart";
import Header from "../../src/components/Header/Header";
import { LayoutWithAside } from "../../src/components/layout";
import ProductDetails from "../../src/components/ProductDetails";

const Product = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <LayoutWithAside>
            <main>
                <ProductDetails key={id} id={id} />
            </main>
            <aside>
                <Cart />
            </aside>
        </LayoutWithAside>
    );
};

export default Product;
