import { useRouter } from "next/router";
import { useState } from "react";
import H1 from "../src/components/atoms/H1";
import { LayoutWithoutAside } from "../src/components/layout";
import useCart from "../src/context/cartContext";


export default function Order() {
    const { finishPurchase } = useCart();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        deliveryAddress: "",
        deliveryDate: "",
    });

    const handleSubmission = async (e) => {
        e.preventDefault();

        const response = await finishPurchase(formData)
        if (response) router.push("/")
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <LayoutWithoutAside>
            <H1>Finalizar compra</H1>
            <section>
                <form
                    onSubmit={handleSubmission}
                    className='flex flex-col gap-1'
                >
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        onChange={handleChange}
                    />

                    <label htmlFor='deliveryAddress'>Dirección de envío</label>
                    <input
                        type='text'
                        name='deliveryAddress'
                        id='deliveryAddress'
                        onChange={handleChange}
                    />

                    <label htmlFor='deliveryDate'>Fecha de envío</label>
                    <input
                        type='date'
                        name='deliveryDate'
                        id='deliveryDate'
                        onChange={handleChange}
                    />

                    <button type='submit'> Finalizar compra </button>
                </form>
            </section>
        </LayoutWithoutAside>
    );
}