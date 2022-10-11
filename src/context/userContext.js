import Swal from 'sweetalert2';
import config from '../config/globalVariables';
import useCart from './cartContext';

const { createContext, useContext, useState, useEffect } = require('react');
const context = createContext();
const { Provider } = context;

export default function useUser() { return useContext(context) };

export function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const {setLocalCart } = useCart()

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, [])


    const logout = async () => {

        try {
            const url = `${config.server}/logout`;

            const loginOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                credentials: "include",
            }
            return fetch(url, loginOptions)
                .then(() => {
                    setUser({})
                    localStorage.removeItem('user');
                    setLocalCart()
                    return true
                })
                .catch(err => {
                    console.log(err)
                    return false
                })

        } catch (error) {
            console.log(error)
        }
    }

    const login = async (user) => {
        const loginOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify(user),
        }

        try {
            const res = await fetch(`${config.server}/login`, loginOptions)
            if (res.status !== 200) throw new Error("Error");

            const userData = await res.json()

            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))

            return true

        } catch (err) {
            Swal.fire({
                title: "Error al iniciar sesión",
                icon: "error",
                text: "Por favor, revise sus credenciales e intente nuevamente",
            })
            return false
        }
    }


    const contextValues = {
        user,
        login,
        logout,
    }

    return <Provider value={contextValues}>{children}</Provider>
}
