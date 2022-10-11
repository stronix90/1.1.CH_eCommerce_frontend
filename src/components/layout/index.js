import Header from "../Header/Header"
import Footer from "../Footer"

export function LayoutWithAside({ children }) {
    return (
        <div className="containerWithAside container">
            <Header />
            <>
                {children}
            </>
            <Footer/>
        </div>
    )
}

export function LayoutWithoutAside({ children }) {

    return (
        <div className="containerWithoutAside container">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}