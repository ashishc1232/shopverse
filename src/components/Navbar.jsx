import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <nav className="bg-slate-100 shadow-xl text-black" >
                <div className="flex justify-between max-w-7xl mx-auto  p-3">
                    <div className="logo">
                        <img className="h-16 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vSMMIWWtFioElb3a2JK8wj-0NlL3EYbPlLa8jAgXX0INRUvBgyTySfQ&s" alt="" />
                    </div>
                    <ul className="hidden md:flex items-center  gap-4 font-medium text-xl">
                        <li><Link className="hover:bg-black hover:text-white p-3" to={"/product"}>Home</Link></li>
                        <li><Link className="hover:bg-black hover:text-white p-3" to={"/"}>Products</Link></li>
                        <li><Link className="hover:bg-black hover:text-white p-3" to={"/"}>About</Link></li>
                        <li><Link className="hover:bg-black hover:text-white p-3" to={"/cart"}>Cart</Link></li>
                    </ul>
                    <button className="md:hidden" onClick={() => setOpen(!open)}>
                        {
                            open ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />
                        }
                    </button>
                </div>
                {
                    open && (
                        <ul className="py-2 px-4">
                            <li className="py-2 text-xl"><Link to={""}>Home</Link></li>
                            <li className="py-2 text-xl"><Link to={""}>product</Link></li>
                            <li className="py-2 text-xl"><Link to={""}>Services</Link></li>
                            <li className="py-2 text-xl"><Link to={"/cart"}>Cart</Link></li>
                        </ul>
                    )
                }
            </nav>
        </div>
    )
}
