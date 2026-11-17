import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, increaseQty, removeCart } from '../features/cartSlice';

export default function Cart() {
    const dispatch = useDispatch();
    const items = useSelector((s) => s.cart.items)
    const total = items.reduce((prev, item) => prev + item.price * item.quantity, 0)
    return (
        <div className='max-w-4xl mx-auto'>
            <h2 className="text-center pt-3">Cart Page</h2>
            <div className="border-2 p-4 rounded">
                {items.map((item) => (
                    <div key={item.id}>
                        <h3 className='text-2xl'>{item.title}</h3>
                        <p>price: {item.price}</p>
                        <p>Qty:{item.quantity}</p>
                        <div className="flex gap-3 py-3">
                            <button  className='rounded-lg border  px-4 bg-gray-300'  onClick={() => dispatch(increaseQty(item.id))}>+</button>
                            <button  className='rounded-lg border  px-4 bg-gray-300' onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                            <button className='rounded-lg border p-3 bg-gray-300'  onClick={() => dispatch(removeCart(item.id))}>Remove</button>
                        </div>
                    </div>
                ))}
                <h2>Total: {total}</h2>
            </div>
        </div>
    )
}
