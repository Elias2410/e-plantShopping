// CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const item = {...action.payload, quantity:1}
      state.items.push(item)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item)=> item.name !== action.payload)
    },
    updateQuantity: (state, action) => {
      const {index, type} = action.payload
      if (type === 'increment'){
        state.items[index].quantity += 1
      } else if (type === 'decrement'){
        state.items[index].quantity -= 1
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
