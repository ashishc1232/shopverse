import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';

export default function ProductDetails() {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let fetchData = async () => {
        try {
            let response = await axios.get(`https://dummyjson.com/products/${id}`)
            setData(response.data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='max-w-4xl mx-auto'>
            <button className='border p-2 px-4 my-3 rounded-md bg-black text-white' onClick={() => navigate("/product")}>Back</button>
            <img src={data.images} className='w-56' alt={data.title} />
            <span className='bg-red-500 p-2 my-4 text-white'>{data.category}</span>
            <h3 className='font-bold text-3xl py-2'>{data.title}</h3>
            <p className='py-4 max-w-md'>{data.description}</p>
            <button className='border p-2 bg-amber-700 text-white'
             onClick={() => dispatch(addToCart(data))}>Add To Cart</button>
        </div>
    )
}
