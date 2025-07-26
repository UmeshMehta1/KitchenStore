import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import authReducer from './authSlice'
import cartSlice from './cartSlice'
import checkoutSlice from './checkoutSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartSlice,
    checkout: checkoutSlice
  },
})

