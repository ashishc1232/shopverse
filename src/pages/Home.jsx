import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"
import heroImage from "../assets/hero.png"

const promises = [
    { title: "Picked with care", copy: "Useful, well-loved finds for the everyday." },
    { title: "Easy on your day", copy: "Simple browsing, clear prices, no fuss." },
    { title: "A little peace of mind", copy: "Free shipping and easy 30-day returns." },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        let active = true
        axios.get("https://dummyjson.com/products?limit=4&sortBy=rating&order=desc")
            .then((response) => {
                if (active) setProducts(response.data.products)
            })
            .catch((requestError) => {
                console.error(requestError)
                if (active) setError("Our featured collection couldn’t load just now. You can still browse the full shop.")
            })
        return () => { active = false }
    }, [])

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900">
            <div className="bg-stone-950 px-4 py-2 text-center text-xs font-semibold tracking-[0.12em] text-white">
                COMPLIMENTARY SHIPPING ON EVERY ORDER <span className="mx-2 text-stone-500">·</span> 30-DAY EASY RETURNS
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <section className="relative my-6 min-h-[420px] overflow-hidden rounded-[2rem] bg-emerald-950 sm:min-h-[500px]">
                    <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/85 to-emerald-950/15" />
                    <div className="relative flex min-h-[420px] max-w-2xl flex-col justify-center px-6 py-14 text-white sm:min-h-[500px] sm:px-12 lg:px-16">
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Thoughtful finds, everyday favorites</p>
                        <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Good things.<br />Better everyday.</h1>
                        <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50/80 sm:text-lg">Discover useful essentials and little upgrades, thoughtfully picked to make more of every day.</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/product" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-emerald-100">Explore the collection <span aria-hidden="true">→</span></Link>
                            <Link to="/about" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Our story</Link>
                        </div>
                    </div>
                    <div className="absolute bottom-8 right-8 hidden text-right sm:block">
                        <p className="text-6xl font-black text-white/20">01</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-emerald-100">Curated for you</p>
                    </div>
                </section>

                <section className="grid gap-4 py-8 sm:grid-cols-3">
                    {promises.map((promise, index) => (
                        <article key={promise.title} className="rounded-2xl border border-stone-200 bg-white p-5">
                            <span className="text-xs font-bold tracking-widest text-emerald-700">0{index + 1}</span>
                            <h2 className="mt-3 font-bold">{promise.title}</h2>
                            <p className="mt-1 text-sm leading-6 text-stone-500">{promise.copy}</p>
                        </article>
                    ))}
                </section>

                <section className="pb-14 pt-8">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Customer favorites</p>
                            <h2 className="mt-1 text-3xl font-bold tracking-tight">A few good things</h2>
                        </div>
                        <Link to="/product" className="shrink-0 text-sm font-semibold text-emerald-800 hover:text-emerald-950">Shop all <span aria-hidden="true">→</span></Link>
                    </div>
                    {error ? (
                        <p className="rounded-xl bg-white p-5 text-sm text-stone-600 ring-1 ring-stone-200">{error}</p>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {products.map((product) => <ProductCard key={product.id} id={product.id} products={product} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-label="Loading featured products">
                            {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-64 animate-pulse rounded-2xl bg-stone-200" />)}
                        </div>
                    )}
                </section>
            </div>
        </main>
    )
}
