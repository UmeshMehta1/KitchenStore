import { createSlice } from '@reduxjs/toolkit'

import {API} from '../https'
import { STATUSES } from '../global/mic/statuses'


const productSlice = createSlice({
    name : "product",
    initialState :{
        data : [],
        status : STATUSES.SUCCESS,
        selectedProduct : {}
    },

    reducers : {
       setProducts(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       },
       setselectedProduct(state,action){
        state.selectedProduct = action.payload
       }
    },
})

export const {setProducts,setStatus,setselectedProduct} = productSlice.actions 

export default productSlice.reducer 

export function fetchProducts(){
    return async function fetchProductsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get("/products")
            console.log(response.data)
            dispatch(setProducts(response?.data?.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.error(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function fetchProductDetails(productId){
    return async function fetchProductDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await API.get(`/products/${productId}`)
            // console.log("resp data sp",response.data.data)
            dispatch(setselectedProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}