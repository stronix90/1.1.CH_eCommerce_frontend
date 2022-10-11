import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/globalVariables";
import Counter from "../Counter";
import useCart from "../../context/cartContext";
import Link from "next/link";
import { useRouter } from 'next/router'
import Swal from "sweetalert2";
import H1 from "../atoms/H1";

const ProductDetails = ({ id }) => {
    const router = useRouter()
    const { updateProductInRemoteCart } = useCart();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [qty, setQty] = useState(0);

    const getProduct = async () => {

        try {
            const response = await axios.get(config.server + "/productos/" + id);
            setProduct(response.data);
            setLoading(false);
        }
        catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, [id]);


    const handleUpdateCart = () => {
        updateProductInRemoteCart(id, qty);
    }
    const updateQty = (qty) => setQty(qty);

    const handleDeleteProduct = async () => {

        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            text: "No será capaz de revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar producto'
        }).then(async (result) => {
            if (result.isConfirmed) {

                Swal.fire(
                    'Producto borrado!',
                    'el producto ha sido borrado con éxito',
                    'success'
                )

                const fetchOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json", },
                    credentials: "include",
                }

                await fetch(config.server + "/productos/" + id, fetchOptions);
                router.push("/");


            }
        })
    }


    return (
        <>
            {error && <p>Product not found</p>}

            {loading && <p>Loading...</p>}

            {
                !loading && !error && (
                    <section className="text-gray-700 body-font overflow-hidden bg-white/[.15] shadow rounded-xl">
                        <div className="container px-2 py-10 mx-auto relative">

                            <Link href={`/admin/products/${product.id}`}><a className="absolute top-2 right-12" title="Editar producto">✏️</a></Link>
                            <button onClick={handleDeleteProduct} className="absolute top-2 right-4" title="Borrar producto de la base de datos">X</button>

                            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                                <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded-md" src={product.thumbnail} />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-900" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-900" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-900" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-900" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-900" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <span className="text-gray-600 ml-3">4 Reviews</span>
                                        </span>
                                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-600">
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-2 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                            <a className="ml-2 text-gray-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                    <p className="leading-relaxed">{product.description}</p>

                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-600 mb-5"></div>

                                    <div className="flex items-center flex-wrap	justify-between	gap-5">
                                        <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                                        <Counter key={id} stock={product.stock} updateQty={updateQty} />
                                        <button onClick={handleUpdateCart} className="flex ml-auto text-white bg-indigo-900 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Agregar a carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );
};

export default ProductDetails;