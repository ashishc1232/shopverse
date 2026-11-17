import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: []
} // step 1

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity += 1
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload)

        },

        increaseQty: (state,action) => {
            const item = state.items.find(i => i.id === action.payload)
            if (item) item.quantity += 1
        },
        decreaseQty: (state,action) => {
            const item = state.items.find(i => i.id === action.payload)
            if (item && item.quantity > 1) item.quantity -= 1
        },
        clearCart: (state) => {
            state = state.items = []
        }
    }
})
export const {addToCart,removeCart,increaseQty,decreaseQty,clearCart}=cartSlice.actions
export default cartSlice.reducer