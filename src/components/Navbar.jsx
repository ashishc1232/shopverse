import { useState } from "react"
import { MdClose, MdMenu, MdShoppingBag } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

const links = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Shop" },
    { to: "/about", label: "Our story" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const items = useSelector((state) => state.cart.items)
    const totalQty = items.reduce((total, item) => total + item.quantity, 0)
    const linkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-semibold transition ${isActive ? "bg-emerald-50 text-emerald-800" : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"}`

    return (
        <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <Link to="/" className="text-2xl font-black tracking-tight text-stone-950" aria-label="Shopverse home">
                    shop<span className="text-emerald-700">verse.</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        to="/cart"
                        className="relative inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                        <MdShoppingBag aria-hidden="true" className="text-lg" />
                        <span className="hidden sm:inline">Bag</span>
                        <span className="sr-only">Shopping cart</span>
                        {totalQty > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-xs font-bold text-stone-950" aria-label={`${totalQty} items in cart`}>
                                {totalQty}
                            </span>
                        )}
                    </Link>
                    <button
                        type="button"
                        className="rounded-full p-2 text-stone-700 hover:bg-stone-100 md:hidden"
                        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
                    </button>
                </div>
            </div>

            {open && (
                <nav className="border-t border-stone-100 px-4 py-3 md:hidden" aria-label="Mobile navigation">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">
                        {links.map((link) => (
                            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={linkClass} onClick={() => setOpen(false)}>
                                {link.label}
                            </NavLink>
                        ))}
                        <NavLink to="/cart" className={linkClass} onClick={() => setOpen(false)}>Shopping bag</NavLink>
                    </div>
                </nav>
            )}
        </header>
    )
}
