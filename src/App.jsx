import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import ProductDetails from "./pages/ProductDetails"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"

const App = () => {
  return (
    <div>
      {/* <h2 className="text-3xl text-white font-bold p-3 text-center bg-black">Hello React</h2> */}

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App