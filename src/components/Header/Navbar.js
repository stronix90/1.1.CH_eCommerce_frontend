import Link from "next/link";
import useUser from "../../context/userContext";

const Navbar = () => {
    const { user } = useUser()

    return (
        <nav className="bg-white shadow-md absolute top-20 right-0 py-5 px-7 min-w-[300px] lg:shadow-none lg:relative lg:top-0 z-50">
            <ul className="flex gap-6 flex-col lg:flex-row">

                {
                    user.name ? (
                        <>
                            <Link href="/profile">
                                <a >
                                    <li className="lg:hidden flex items-center gap-2">
                                        <img src="/user.svg" width={42} alt="" />
                                        <span className="text-gray-500 font-semibold">{user.name}</span>
                                    </li>
                                </a>
                            </Link>

                            <Link href="/carrito">
                                <a>
                                    <li className="lg:hidden flex items-center gap-2">
                                        <img src="/cart.svg" width={42} alt="" />
                                        <span className="text-gray-500 font-semibold">Cart</span>
                                    </li>
                                </a>
                            </Link>

                            <Link href="/logout">
                                <a>
                                    <li className="lg:hidden flex items-center gap-2">
                                        <img src="/logout.svg" width={42} alt="" />
                                        <span className="text-gray-500 font-semibold">Logout</span>
                                    </li>
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <li className="lg:hidden flex items-center ">
                                <Link href="/login">
                                    <a className="text-gray-500 font-semibold">Login</a>
                                </Link>
                            </li>

                            <li className="lg:hidden flex items-center ">
                                <Link href="/signup">
                                    <a className="text-gray-500 font-semibold">Register</a>
                                </Link>
                            </li>
                        </>
                    )
                }
                <hr />
                <li>
                    <Link href="/category/juguetes">Juguetes</Link>
                </li>
                <li>
                    <Link href="/category/golosinas">Golosinas</Link>
                </li>
                <li>
                    <Link href="/category/rascadores">Rascadores</Link>
                </li>
                <li>
                    <Link href="/category/bandejas_sanitarias">Bandejas sanitarias</Link>
                </li>
                <li>
                    <Link href="/category/comederos">Comederos</Link>
                </li>
                <li>
                    <Link href="/category/otros">Otros</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;


/*
if (usuario) {
    userName
    logout
}
else {
    login
    register
}


*/