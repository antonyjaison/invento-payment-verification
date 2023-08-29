import { createSlice } from "@reduxjs/toolkit";

export const verifiedSlice = createSlice({
    name: "verified",
    initialState:{
        filterData:[],
        initialdata:[]
    },
    reducers:{
        setData: (state, action) => {
            state.initialdata = action.payload;
        },
    }
})

export const { setData } = verifiedSlice.actions;

export default verifiedSlice.reducer;