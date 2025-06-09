import { createSlice } from '@reduxjs/toolkit'

import {API, APIAuthenticated} from '../https'
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
       },
       updateItem(state,action){
            const index = state.item.findIndex(item=>item.product._id === action.payload.productId)
            if(index !== -1){
                state.item[index].quantity = action.payload.quantity
            }
        },

        deleteItem(state,action){
            const index = state.item.findIndex(item=>item.product._id=== action.payload.productId)
            state.item.splice(index,1);
        },
        emptycart(state){
            state.item=[]
        }
       
    },
})

export const {setItem,setStatus,updateItem,deleteItem,emptycart} = cartSlice.actions 

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

export function udpateCartItem(productId,quantity){
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/cart/${productId}`,{quantity})
            console.log(response)
            dispatch(updateItem({productId,quantity}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function deleteCartItem(productId){
    return async function deleteCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
             await APIAuthenticated.delete(`/cart/${productId}`);
            dispatch(deleteItem({productId}))
            dispatch(setStatus())
        } catch (error) {
            console.log(error);
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateCartItem(productId, quantity){
    return async function updateCartItemThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
             await APIAuthenticated.patch(`/cart/${productId, quantity}`)
            dispatch(updateCartItem({productId,quantity}))
        } catch (error) {
            console.log(error)
            dispatch(STATUSES.ERROR)
        }
    }
}