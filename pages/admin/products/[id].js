import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateProduct from "../../../src/components/admin/products/CreateProduct";
import H1 from "../../../src/components/atoms/H1";
import { LayoutWithoutAside } from "../../../src/components/layout";
import config from "../../../src/config/globalVariables";

export default function EditProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    const router = useRouter();
    const { id } = router.query;

    const getProduct = async () => {
        const products = await axios.get(config.server + "/productos/" + id);
        setProduct(products.data);
        setLoading(false);
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    return (
        <LayoutWithoutAside>
            {loading ?
                (
                    <H1>Cargando...</H1>
                ):(
                    product.title ?
                        (
                            <CreateProduct product={product} />
                        ) : (
                            <H1>Producto no encontrado</H1>
            ))}

        </LayoutWithoutAside>
    )
}