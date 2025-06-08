import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import authReducer from './authSlice'
import cartSlice from './cartSlice'
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartSlice
    
  },
})

