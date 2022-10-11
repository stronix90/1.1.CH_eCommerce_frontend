import { createContext, useContext, useState } from "react";
import config from "../config/globalVariables";
import swal from "sweetalert2";
import axios from "axios";

const context = createContext();
const { Provider } = context;

const useCart = () => {
    return useContext(context);
};

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const setLocalCart = (cart) => {
        setCart(cart?.products ?? []);
        setTotal(cart?.total ?? 0);
    };

    const getRemoteCart = async () => {
        const cart = await axios.get(config.server + "/carrito", {
            withCredentials: true,
        });
        setLocalCart(cart.data);
    };

    const updateProductInRemoteCart = async (productId, qty) => {

        if (qty === 0) {
            const product = cart.find((product) => product.id === productId);
            if (!product) {
                swal.fire({
                    title: "Ingrese cantidad",
                    icon: "info",
                    text: "Por favor, ingrese una cantidad mayor a 0",
                })
                return
            };
        }

        axios
            .post(
                config.server + `/carrito/productos/${productId}`,
                { qty },
                { withCredentials: true }
            )
            .then((res) => {
                if (res) {
                    setLocalCart(res.data);
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 401:
                        swal.fire({
                            title: "Acceso no autorizado",
                            icon: "error",
                            html: "Por favor, <Link href='/login'><a>inicie sesión</a></Link> para continuar",
                        });
                        break;
                    case 404:
                        swal.fire({
                            title: "Recurso no encontrado",
                            icon: "error",
                            text: "No se ha encontrado el recurso. Por favor, contacte al administrador del sitio.",
                        });
                        break;

                    default:
                        swal.fire({
                            title: "Error",
                            icon: "error",
                            text: "Se ha producido un error inesperado",
                        });
                        break;
                }
            });
    };

    const finishPurchase = async (orderDetails) => {
        return axios
            .post(config.server + "/order", orderDetails, { withCredentials: true })
            .then((res) => {
                if (res) {
                    swal.fire({
                        title: "Compra realizada",
                        icon: "success",
                        html: `Su compra ha sido realizada con éxito<br/><br/>Conserve el código de compra:<br/><b>${res.data.orderId}</b>`,
                    });
                    setLocalCart([]);
                    return true
                }
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 400:
                        swal.fire({
                            title: "Error",
                            icon: "error",
                            text: "Por favor, complete todos los campos",
                        });
                        break;
                    case 401:
                        swal.fire({
                            title: "Acceso no autorizado",
                            icon: "error",
                            html: "Por favor, <Link href='/login'><a>inicie sesión</a></Link> para continuar",
                        });
                        break;
                    case 404:
                        swal.fire({
                            title: "Recurso no encontrado",
                            icon: "error",
                            text: "No se ha encontrado el recurso. Por favor, contacte al administrador del sitio.",
                        });
                        break;
                }
                return false
            });
    }


    const contextValues = {
        cart,
        getRemoteCart,
        setLocalCart,
        updateProductInRemoteCart,
        finishPurchase
    };

    return <Provider value={contextValues}>{children}</Provider>;
}

export default useCart;
