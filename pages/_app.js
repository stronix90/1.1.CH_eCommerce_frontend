import "../styles/globals.css";

import App from "next/app";
import { CartProvider } from "../src/context/cartContext";
import { UserProvider } from "../src/context/userContext";

class MyApp extends App {
    
    render() {
        const { Component, pageProps } = this.props;
        return (
            <CartProvider>
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </CartProvider>
        );
    }
}

export default MyApp;
