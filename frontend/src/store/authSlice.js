import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../global/mic/statuses'
import { API } from '../https'
import axios from 'axios'


const authSlice = createSlice({
    name: "auth",

    initialState:{
        data:[],
        token:"",
        status:STATUSES.SUCCESS,
        forgetPasswordData:{
            email:null,
            status:STATUSES.LOADING
        }

    },

    reducers:{
        setUser(state,action){
            state.data=action.payload
        },

        setToken(state,action){
            state.token=action.payload
        },

        setStatus(state,action){
            state.status=action.payload
        },

        logOut(state){
           state.data=[];
           state.token=null;
           state.status=STATUSES.SUCCESS;
        },

        setEmail(state, action){
            state.forgetPasswordData.email=action.payload
        },

        setForgetPasswordStatus(state,action){
            state.forgetPasswordData.status=action.payload
        }
    }
})

export const {setUser, setEmail, setForgetPasswordStatus, setToken, setStatus, logOut}= authSlice.actions
export default authSlice.reducer


export function registerUser(data){
    console.log("register user",data)
    return async function registerUserThunk(dispatch){
     
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",data)
            console.log(response.data.data)
          
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))

        try {
            const response = await API.post("/auth/login",data)
            console.log(response.data.data)
            dispatch(setUser(response.data.data))
            dispatch(setToken(response.data.token))
            dispatch(setStatus(STATUSES.SUCCESS))
            if(response.status===200 && response.data.token){
                localStorage.setItem("token", response.data.token)
                window.location.href="/"
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}