import { useId, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../features/cartSlice"

const formatPrice = (price) => `$${Number(price).toFixed(2)}`

export default function Checkout() {
    const dispatch = useDispatch()
    const checkoutId = useId()
    const items = useSelector((state) => state.cart.items)
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const [paymentMethod, setPaymentMethod] = useState("demo-card")
    const [isProcessing, setIsProcessing] = useState(false)
    const [order, setOrder] = useState(null)

    if (items.length === 0 && !order) return <Navigate to="/cart" replace />

    const placeOrder = async (event) => {
        event.preventDefault()
        if (isProcessing) return

        setIsProcessing(true)
        const orderItems = items.map((item) => ({ ...item }))
        await new Promise((resolve) => window.setTimeout(resolve, 900))
        setOrder({
            id: `SV-DEMO-${checkoutId.replace(/[^a-z0-9]/gi, "").toUpperCase()}`,
            items: orderItems,
            total: subtotal,
            paymentMethod,
        })
        dispatch(clearCart())
        setIsProcessing(false)
    }

    if (order) {
        return (
            <main className="min-h-[70vh] bg-stone-50 px-4 py-14 sm:px-6">
                <section className="mx-auto max-w-xl rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-800" aria-hidden="true">✓</div>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Demo order complete</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-950">Thanks for your order!</h1>
                    <p className="mt-3 text-sm leading-6 text-stone-600">Your simulated {order.paymentMethod === "demo-card" ? "card payment was approved" : "cash-on-delivery order was placed"}. No real payment was taken.</p>
                    <div className="mt-7 rounded-2xl bg-stone-50 p-5 text-left">
                        <div className="flex justify-between gap-4 text-sm"><span className="text-stone-500">Demo order number</span><span className="font-semibold text-stone-900">{order.id}</span></div>
                        <div className="mt-3 flex justify-between gap-4 text-sm"><span className="text-stone-500">Items</span><span className="font-semibold text-stone-900">{order.items.reduce((count, item) => count + item.quantity, 0)}</span></div>
                        <div className="mt-3 flex justify-between gap-4 border-t border-stone-200 pt-3 text-sm"><span className="font-semibold text-stone-900">Order total</span><span className="font-bold text-stone-900">{formatPrice(order.total)}</span></div>
                    </div>
                    <Link to="/product" className="mt-7 inline-flex rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">Continue shopping</Link>
                </section>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-stone-50 px-4 py-10 sm:px-6 lg:py-14">
            <div className="mx-auto max-w-6xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Almost yours</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Checkout</h1>
                <p className="mt-2 text-sm text-stone-600">This is a demo checkout. No real payment details or money are involved.</p>

                <form onSubmit={placeOrder} className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-bold text-stone-950">Delivery details</h2>
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                <label className="text-sm font-medium text-stone-700">Full name
                                    <input required autoComplete="name" name="name" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="Alex Morgan" />
                                </label>
                                <label className="text-sm font-medium text-stone-700">Email
                                    <input required type="email" autoComplete="email" name="email" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="you@example.com" />
                                </label>
                                <label className="text-sm font-medium text-stone-700 sm:col-span-2">Street address
                                    <input required autoComplete="street-address" name="address" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="123 Market Street" />
                                </label>
                                <label className="text-sm font-medium text-stone-700">City
                                    <input required autoComplete="address-level2" name="city" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="Your city" />
                                </label>
                                <label className="text-sm font-medium text-stone-700">Postal code
                                    <input required autoComplete="postal-code" name="postalCode" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="Postal code" />
                                </label>
                            </div>
                        </section>

                        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                            <h2 className="text-lg font-bold text-stone-950">Demo payment method</h2>
                            <p className="mt-1 text-sm text-stone-500">Choose how you’d like to simulate this order.</p>
                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                {[
                                    { value: "demo-card", title: "Demo card", detail: "Simulate an approved card payment" },
                                    { value: "cash-on-delivery", title: "Cash on delivery", detail: "Place a demo order with no online charge" },
                                ].map((method) => (
                                    <label key={method.value} className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod === method.value ? "border-emerald-700 bg-emerald-50" : "border-stone-200 hover:border-stone-400"}`}>
                                        <input type="radio" name="paymentMethod" value={method.value} checked={paymentMethod === method.value} onChange={(event) => setPaymentMethod(event.target.value)} className="mr-2 accent-emerald-800" />
                                        <span className="font-semibold text-stone-900">{method.title}</span>
                                        <span className="mt-1 block pl-6 text-xs leading-5 text-stone-500">{method.detail}</span>
                                    </label>
                                ))}
                            </div>
                            <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">Demo only: do not enter card numbers. This page does not connect to a payment provider or store payment information.</p>
                        </section>
                    </div>

                    <aside className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-28" aria-label="Order summary">
                        <h2 className="text-lg font-bold text-stone-950">Order summary</h2>
                        <div className="mt-5 max-h-64 space-y-4 overflow-auto border-b border-stone-100 pb-5">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between gap-4 text-sm">
                                    <span className="text-stone-600">{item.title} <span className="text-stone-400">× {item.quantity}</span></span>
                                    <span className="shrink-0 font-medium text-stone-900">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-stone-600"><span>Shipping</span><span className="font-medium text-emerald-700">Free</span></div>
                        <div className="mt-4 flex justify-between border-t border-stone-100 pt-4 font-bold text-stone-950"><span>Total</span><span>{formatPrice(subtotal)}</span></div>
                        <button type="submit" disabled={isProcessing} className="mt-6 w-full rounded-full bg-stone-950 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-70">
                            {isProcessing ? "Processing demo order…" : paymentMethod === "demo-card" ? "Simulate payment" : "Place demo order"}
                        </button>
                        <Link to="/cart" className="mt-4 block text-center text-sm font-medium text-stone-500 hover:text-stone-900">← Back to cart</Link>
                    </aside>
                </form>
            </div>
        </main>
    )
}
