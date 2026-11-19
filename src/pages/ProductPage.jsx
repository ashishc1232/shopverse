import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function ProductPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [search, setSearch] = useState('')
    const [activeCategory, setActiveCategory] = useState('All')
    const [sortBy, setSortBy] = useState('featured')

    useEffect(() => {
        let active = true
        axios.get("https://dummyjson.com/products")
            .then((response) => {
                if (active) setData(response.data.products)
            })
            .catch((error) => {
                console.error(error)
                if (active) setError('We couldn’t load the products. Please try again.')
            })
            .finally(() => {
                if (active) setLoading(false)
            })
        return () => { active = false }
    }, [])

    const categories = ['All', ...new Set(data.map((item) => item.category))]
    const visibleProducts = data
        .filter((item) => activeCategory === 'All' || item.category === activeCategory)
        .filter((item) => `${item.title} ${item.category} ${item.brand || ''}`.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price
            if (sortBy === 'price-high') return b.price - a.price
            if (sortBy === 'rating') return b.rating - a.rating
            return 0
        })

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <section id="products" className="pb-14 pt-5">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">The collection</p>
                            <h1 className="mt-1 text-3xl font-bold tracking-tight">Find your next favorite</h1>
                        </div>
                        <p className="text-sm text-stone-500">{loading ? 'Finding good things…' : `${visibleProducts.length} products to explore`}</p>
                    </div>

                    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter by category">
                            {categories.map((category) => (
                                <button key={category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium capitalize transition ${activeCategory === category ? 'bg-stone-900 text-white' : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:ring-stone-400'}`}>
                                    {category}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-stone-200 focus-within:ring-emerald-700 md:w-56 md:flex-none">
                                <span aria-hidden="true" className="text-stone-400">⌕</span>
                                <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400" aria-label="Search products" />
                            </label>
                            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-full bg-white px-4 py-2.5 text-sm text-stone-700 ring-1 ring-stone-200 outline-none focus:ring-emerald-700" aria-label="Sort products">
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: low to high</option>
                                <option value="price-high">Price: high to low</option>
                                <option value="rating">Top rated</option>
                            </select>
                        </div>
                    </div>

                    {error ? (
                        <div className="rounded-2xl bg-white py-16 text-center text-stone-600 ring-1 ring-stone-200">{error}</div>
                    ) : loading ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-72 animate-pulse rounded-2xl bg-stone-200" />)}
                        </div>
                    ) : visibleProducts.length ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                            {visibleProducts.map((item) => <ProductCard key={item.id} id={item.id} products={item} />)}
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white py-16 text-center ring-1 ring-stone-200">
                            <p className="text-lg font-semibold">No products found</p>
                            <p className="mt-1 text-sm text-stone-500">Try another search or category.</p>
                        </div>
                    )}
                </section>

            </div>
        </main>
    )
}
