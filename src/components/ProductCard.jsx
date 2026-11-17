import { useNavigate } from "react-router-dom"

export default function ProductCard({ products,id }) {

    const navigate = useNavigate()
    return (
        <div className='shadow shadow-gray-500 rounded-xl' onClick={() => navigate(`/product/${id}`)}>
            <img src={products.images[0]} alt={products.title} />
            <h2 className='text-center py-2 bg-amber-400'>{products.title}</h2>
            <p className="text-center font-bold bg-amber-900 text-white">$:{products.price}</p>
        </div>
    )
}
