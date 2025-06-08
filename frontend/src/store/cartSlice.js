import { createSlice } from '@reduxjs/toolkit'

import {APIAuthenticated} from '../https'
import { STATUSES } from '../global/mic/statuses'


const cartSlice = createSlice({
    name : "cart",
    initialState :{
        item : [],
        status : STATUSES.SUCCESS
    },

    reducers : {
       setItem(state,action){
        state.item = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       }
       
    },
})

export const {setItem,setStatus} = cartSlice.actions 

export default cartSlice.reducer 

export function addToCart(productId){
    return async function addCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
       try {
        const response = await APIAuthenticated.post(`/cart/${productId}`)
        console.log("res", response.data.data);
       dispatch(setItem(response.data.data))
        dispatch(setStatus(STATUSES.SUCCESS));
         
       } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.ERROR));

       }
    }
}


export function fetchToCart(){
    return async function fetchToCartThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("/cart")
            console.log("cart data",response.data.data)
          dispatch(setItem(response.data.data))
          dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}