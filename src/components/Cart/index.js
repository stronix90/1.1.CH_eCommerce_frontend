import styles from "./index.module.css";
import useCart from "../../context/cartContext";
import { useEffect } from "react";


const Cart = () => {
    const { cart, updateProductInRemoteCart, getRemoteCart } = useCart();

    useEffect(() => {
        getRemoteCart()
    }, [])

    const handleDeleteProducto = (productId) => {
        updateProductInRemoteCart(productId, 0);
    }

    return (
        <ul className="max-w-3xl m-auto">
            {cart?.map((product) => (
                <li key={product.id}>
                    <div className={styles.cartItem}>
                        <div className='cart-item-actions'>
                            <button className='btn btn-danger' onClick={() => handleDeleteProducto(product.id, 0)}>
                                {" "}
                                🗑{" "}
                            </button>
                        </div>
                        <div className={styles.cartItemInfo}>
                            <p>{product.title}</p>
                            <p>
                                <small>
                                    {product.quantity} x $
                                    {product.price}
                                </small>
                            </p>
                        </div>
                        <div className='subtotal'>
                            <p>${product.quantity * product.price}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default Cart;
