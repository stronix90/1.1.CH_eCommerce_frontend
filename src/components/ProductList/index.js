import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/globalVariables";
import ProductItem from "./ProductItem";

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const url = category ? config.server + `/productos/category/${category}` : config.server + "/productos"
        const products = await axios.get(url);
        setProducts(products.data);
    };

    useEffect(() => {
        getProducts();
    }, [category]);

    return (
        <section className="px-5 w-full">
            <h2 className="text-3xl font-bold mt-6 mb-3">Productos</h2>

            {products.length === 0 ?
                (
                    <h3 className="text-2xl font-bold mt-6 mb-3 text-center">No hay productos</h3>
                ) : (
                    <div className="grid grid-flow-row gap-10 text-neutral-50 grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                )}
        </section>
    );
};

export default ProductList;
