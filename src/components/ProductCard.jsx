import { useNavigate } from "react-router-dom"

export default function ProductCard({ products,id }) {

    const navigate = useNavigate()
    return (
        <button
            type="button"
            className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            onClick={() => navigate(`/product/${id}`)}
            aria-label={`View ${products.title}, $${Number(products.price).toFixed(2)}`}
        >
            <div className="aspect-square w-full overflow-hidden bg-stone-100">
                <img src={products.thumbnail || products.images?.[0]} alt={products.title} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="flex w-full flex-1 flex-col p-3 sm:p-4">
                <p className="text-xs font-medium capitalize text-stone-500">{products.category}</p>
                <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-stone-900 sm:text-base">{products.title}</h2>
                <p className="mt-3 font-bold text-emerald-800">${Number(products.price).toFixed(2)}</p>
            </div>
        </button>
    )
}
