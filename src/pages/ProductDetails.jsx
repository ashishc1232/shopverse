
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

export default function ProductDetails() {
    const [data, setData] = useState(null);
    const [selectedImg, setSelectedImg] = useState(0);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await axios.get(`https://dummyjson.com/products/${id}`);
                setData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="text-xl font-semibold">Loading...</span>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="text-xl font-semibold text-red-500">Product not found.</span>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <button
                className="border p-2 px-4 mb-8 rounded-md bg-black text-white hover:bg-gray-800 transition"
                onClick={() => navigate("/product")}
            >
                &larr; Back to Products
            </button>
            <div className="flex flex-col md:flex-row gap-10 bg-white rounded-lg shadow-lg p-6">
                {/* Image Gallery */}
                <div className="flex flex-col items-center md:w-1/2">
                    <div className="border rounded-lg overflow-hidden mb-4 bg-gray-50">
                        <img
                            src={data.images && data.images[selectedImg]}
                            alt={data.title}
                            className="w-80 h-80 object-contain"
                        />
                    </div>
                    <div className="flex gap-2">
                        {data.images && data.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={data.title + ' thumbnail'}
                                className={`w-16 h-16 object-cover border rounded cursor-pointer ${selectedImg === idx ? 'ring-2 ring-amber-600' : ''}`}
                                onClick={() => setSelectedImg(idx)}
                            />
                        ))}
                    </div> 
                </div>
                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-4">
                    <span className="inline-block w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-800">{data.category}</span>
                    <h1 className="font-bold text-3xl md:text-4xl text-gray-900">{data.title}</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-amber-500 text-lg">{'★'.repeat(Math.round(data.rating))}{'☆'.repeat(5 - Math.round(data.rating))}</span>
                        <span className="text-gray-600 text-sm">({data.rating} / 5)</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-2xl font-bold text-emerald-800">${data.price}</span>
                        {data.discountPercentage && (
                            <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded text-xs">
                                {data.discountPercentage}% OFF
                            </span>
                        )}
                        <span className="text-gray-500 line-through">${(data.price / (1 - data.discountPercentage / 100)).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-700">
                        <span><b>Brand:</b> {data.brand}</span>
                        <span><b>Stock:</b> {data.stock > 0 ? data.stock : 'Out of stock'}</span>
                    </div>
                    <p className="py-2 max-w-xl text-gray-800 text-base">{data.description}</p>
                    <button
                        className="mt-4 rounded-lg bg-stone-950 p-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50"
                        onClick={() => dispatch(addToCart(data))}
                        disabled={data.stock === 0}
                    >
                        {data.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
