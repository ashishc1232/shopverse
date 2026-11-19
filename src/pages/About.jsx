import { Link } from "react-router-dom"

const values = [
    { title: "Useful by design", copy: "We believe the best finds earn their place in your everyday routine. Our collection brings together practical essentials and thoughtful little upgrades." },
    { title: "A simpler way to shop", copy: "Clear product details, straightforward prices, and a welcoming experience help you choose with confidence—without the noise." },
    { title: "Here when you need us", copy: "From easy returns to friendly support, we want every part of your Shopverse experience to feel considered." },
]

export default function About() {
    return (
        <main className="min-h-screen bg-stone-50 px-4 py-12 text-stone-900 sm:px-6 lg:py-16">
            <div className="mx-auto max-w-5xl">
                <section className="rounded-[2rem] bg-emerald-950 px-6 py-14 text-white sm:px-12 sm:py-20">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">A little about us</p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Good finds for wherever life takes you.</h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-emerald-50/80 sm:text-lg">
                        Shopverse is a welcoming place to discover the everyday essentials and unexpected favorites that make life feel a little easier and a lot more yours.
                    </p>
                </section>

                <section className="grid gap-10 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Our point of view</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight">Shopping should feel simple—and a little inspiring.</h2>
                    </div>
                    <div className="space-y-4 text-base leading-7 text-stone-600">
                        <p>We created Shopverse around a simple idea: finding something you love should be the easy part. That means a carefully presented collection, useful details, and a smooth journey from browsing to checkout.</p>
                        <p>We’re always growing and improving. This storefront is a demo experience, and the sample catalog and checkout are provided for demonstration purposes.</p>
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-3">
                    {values.map((value, index) => (
                        <article key={value.title} className="rounded-2xl border border-stone-200 bg-white p-6">
                            <span className="text-xs font-bold tracking-widest text-emerald-700">0{index + 1}</span>
                            <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-stone-600">{value.copy}</p>
                        </article>
                    ))}
                </section>

                <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-stone-100 p-7 sm:flex-row sm:items-center sm:p-9">
                    <div>
                        <h2 className="text-2xl font-bold">Ready to find your next favorite?</h2>
                        <p className="mt-2 text-sm text-stone-600">Explore the collection and see what catches your eye.</p>
                    </div>
                    <Link to="/product" className="shrink-0 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">Browse the shop <span aria-hidden="true">→</span></Link>
                </section>
            </div>
        </main>
    )
}
