import { useEffect, useRef } from "react"
import useUser from "../src/context/userContext"
import { useRouter } from "next/router"
import { LayoutWithoutAside } from "../src/components/layout"
import H1 from "../src/components/atoms/H1"

export default function Logout() {
    const router = useRouter()
    const { user, logout } = useUser()
    const userHook = useRef(user.name);


    const handleLogout = async () => {

        try {
            await logout()
            const loginTimeout = setInterval(() => {
                router.push("/login")
                clearInterval(loginTimeout)
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleLogout()

    }, [])

    return (
        <LayoutWithoutAside>
            <H1>Adios {userHook.current}</H1>
        </LayoutWithoutAside>
    )
}