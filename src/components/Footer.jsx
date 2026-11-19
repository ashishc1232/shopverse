import { Link } from "react-router-dom"

const currentYear = new Date().getFullYear()

export default function Footer() {
    return (
        <footer className="border-t border-stone-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <div>
                    <Link to="/" className="text-xl font-black tracking-tight text-stone-950">shop<span className="text-emerald-700">verse.</span></Link>
                    <p className="mt-1 text-stone-500">Good finds for wherever life takes you.</p>
                </div>
                <nav className="flex flex-wrap gap-x-6 gap-y-2 text-stone-600" aria-label="Footer navigation">
                    <Link to="/product" className="hover:text-emerald-800">Shop</Link>
                    <Link to="/about" className="hover:text-emerald-800">Our story</Link>
                    <Link to="/cart" className="hover:text-emerald-800">Shopping bag</Link>
                </nav>
                <p className="text-xs leading-5 text-stone-500">Demo storefront · No real payment processing<br />© {currentYear} Shopverse</p>
            </div>
        </footer>
    )
}
