import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function ProductPage() {
    const [data, setData] = useState([])
    let fetchData = async () => {
        try {
            let response = await axios.get("https://dummyjson.com/products")
            //  setData(response.data)
            console.log(response.data.products)
            setData(response.data.products)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='container mx-auto '>
            <h2 className='text-center font-bold text-3xl py-3'>ProductPage</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ">
                {
                    data.map((item) => (
                        <ProductCard key={item.id} id={item.id} products={item} />
                    ))
                }
            </div>
        </div>
    )
}
