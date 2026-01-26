import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface CartItem {
id: number
name: string
price: number
image?: string
qty: number
}


interface CartState {
items: CartItem[]
}


const initialState: CartState = {
items: [],
}


const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart(state, action: PayloadAction<CartItem>) {
const existing = state.items.find(i => i.id === action.payload.id)
if (existing) {
existing.qty += action.payload.qty
} else {
state.items.push(action.payload)
}
},
updateQty(state, action: PayloadAction<{ id: number; qty: number }>) {
const item = state.items.find(i => i.id === action.payload.id)
if (item) item.qty = action.payload.qty
},
removeFromCart(state, action: PayloadAction<number>) {
state.items = state.items.filter(i => i.id !== action.payload)
},
clearCart(state) {
state.items = []
},
},
})


export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
