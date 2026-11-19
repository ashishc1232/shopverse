import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import ProductDetails from "./pages/ProductDetails"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Checkout from "./pages/Checkout"
import Footer from "./components/Footer"

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
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App