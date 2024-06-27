import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUser:any = createAsyncThunk("users/getAllUser", 
    async ()=>{
        let res = await axios.get("http://localhost:8080/users");
        return res.data
})
const useReducer = createSlice({
    name:"user",
    initialState:{
        users:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUser.pending,(state,action)=>{
            // trong trạng thái cho call api
        })
        .addCase(getAllUser.fulfilled,(state,action)=>{
            // trong trạng thái lấy dữ liệu thành công
            state.users=action.payload
        })
        .addCase(getAllUser.rejected,(state,action)=>{
            // nếu lấy dữ liệu thất bại
        })
    }
})
export default useReducer.reducer;