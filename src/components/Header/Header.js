import Link from "next/link"
import { useState } from "react"
import Navbar from "./Navbar"
import useUser from "../../context/userContext";


const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [settingsIsOpen, setSettingsIsOpen] = useState(false)
    const { user } = useUser()

    const handleMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    const handleSettings = () => {
        setSettingsIsOpen(!settingsIsOpen)
    }


    return (
        <header className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 shadow-md flex items-center" >

            {/* Logo */}
            <Link href="/">
                <a className="mr-auto flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">PetShop</span>
                </a>
            </Link>

            {/* NavBar */}
            <div className={`${menuIsOpen ? '' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                <Navbar />
            </div>

            {/* Profile */}
            <div onClick={handleSettings} className="cursor-pointer hidden justify-between items-center lg:flex lg:order-1 ml-auto" id="mobile-menu-2">
                <img className="ml-auto" src="/user.svg" width={42} alt="" />
            </div>

            {/* Hamburguesa */}
            <div>
                <button onClick={handleMenu} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Abrir menú</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>

            {/* User Settings */}
            <ul className={`hidden bg-white shadow-md absolute top-20 right-0 py-5 px-7 min-w-[300px] gap-3 flex-col ${settingsIsOpen ? 'lg:flex ' : ''} `}>

                {
                    user.name ? (
                        <>
                            <Link href="/profile">
                                <a >
                                    <li className="flex items-center gap-2">
                                        <span className="text-gray-500 font-semibold">{user.name}</span>
                                    </li>
                                </a>
                            </Link>

                            <Link href="/carrito">
                                <a>
                                    <li className="flex items-center gap-2">
                                        <span className="text-gray-500 font-semibold">Cart</span>
                                    </li>
                                </a>
                            </Link>

                            <Link href="/logout">
                                <a>
                                    <li className="flex items-center gap-2">
                                        <span className="text-gray-500 font-semibold">Logout</span>
                                    </li>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <li className="flex items-center ">
                                <Link href="/login">
                                    <a className="text-gray-500 font-semibold">Login</a>
                                </Link>
                            </li>

                            <li className="flex items-center ">
                                <Link href="/signup">
                                    <a className="text-gray-500 font-semibold">Register</a>
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>


        </header >
    )
}

export default Header