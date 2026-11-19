import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, increaseQty, removeCart } from '../features/cartSlice';

export default function Cart() {
    const dispatch = useDispatch();
    const items = useSelector((s) => s.cart.items)
    const total = items.reduce((prev, item) => prev + item.price * item.quantity, 0)
    const formatPrice = (price) => `$${Number(price).toFixed(2)}`

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">Your shopping bag</p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Shopping cart</h1>
                    <p className="mt-2 text-slate-500">Review your items and get ready for something great.</p>
                </div>

                {items.length === 0 ? (
                    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl text-indigo-600" aria-hidden="true">🛍</div>
                        <h2 className="mt-5 text-xl font-semibold text-slate-900">Your cart is looking a little empty</h2>
                        <p className="mt-2 text-slate-500">Discover something you’ll love and it’ll show up here.</p>
                        <a href="/" className="mt-7 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Continue shopping
                        </a>
                    </section>
                ) : (
                    <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" aria-label="Cart items">
                            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
                                <h2 className="font-semibold text-slate-900">Items ({items.reduce((count, item) => count + item.quantity, 0)})</h2>
                                <span className="text-sm text-slate-500">Price</span>
                            </div>
                            <div className="divide-y divide-slate-100 px-5 sm:px-7">
                                {items.map((item) => (
                                    <article key={item.id} className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center">
                                        <div className="flex min-w-0 flex-1 items-center gap-4">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="h-24 w-24 shrink-0 rounded-xl bg-slate-100 object-cover" />
                                            ) : (
                                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-3xl text-slate-400" aria-hidden="true">◇</div>
                                            )}
                                            <div className="min-w-0">
                                                <h3 className="truncate text-lg font-semibold text-slate-900">{item.title}</h3>
                                                <p className="mt-1 text-sm text-slate-500">Ready to ship</p>
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(removeCart(item.id))}
                                                    className="mt-3 text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-rose-600 hover:decoration-rose-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between gap-5 sm:justify-end">
                                            <div className="inline-flex items-center rounded-lg border border-slate-200">
                                                <button
                                                    type="button"
                                                    aria-label={`Decrease quantity of ${item.title}`}
                                                    onClick={() => dispatch(decreaseQty(item.id))}
                                                    className="h-10 w-10 rounded-l-lg text-lg text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                                >−</button>
                                                <span className="min-w-10 px-2 text-center text-sm font-semibold text-slate-900" aria-live="polite">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    aria-label={`Increase quantity of ${item.title}`}
                                                    onClick={() => dispatch(increaseQty(item.id))}
                                                    className="h-10 w-10 rounded-r-lg text-lg text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                                >+</button>
                                            </div>
                                            <p className="w-24 text-right font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <div className="border-t border-slate-100 px-5 py-4 sm:px-7">
                                <a href="/" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700">← Continue shopping</a>
                            </div>
                        </section>

                        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6" aria-label="Order summary">
                            <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
                            <div className="mt-6 space-y-4 border-b border-slate-100 pb-6 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="font-medium text-emerald-600">Free</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Taxes</span>
                                    <span className="text-slate-500">Calculated at checkout</span>
                                </div>
                            </div>
                            <div className="flex justify-between py-5 text-base font-bold text-slate-900">
                                <span>Order total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <button type="button" className="w-full rounded-lg bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Proceed to checkout
                            </button>
                            <p className="mt-4 text-center text-xs leading-5 text-slate-500">Secure checkout · Free shipping on your order</p>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    )
}
