import { createSlice } from "@reduxjs/toolkit";

export const verifiedSlice = createSlice({
    name: "verified",
    initialState:{
        filterData:[],
        initialdata:[],
        filterByNameData:[]
    },
    reducers:{
        setData: (state, action) => {
            state.initialdata = action.payload;
        },
        filterData: (state, action) => {
            const categoryToFilter = action.payload.id; // Get the category to filter by
            state.filterData = state.initialdata.filter(order => {
              const orderEvents = order.orderEvents;
              return orderEvents.some(event => event.event.eventType === categoryToFilter);
            });
        },
        filterByName: (state, action) => {
            const { searchName, eventType } = action.payload;
          
            state.filterData = state.initialdata.filter(data => {
              const lowercaseSearchName = searchName.toLowerCase();
              const startsWithLetter = data.name.toLowerCase().startsWith(lowercaseSearchName);    
              return (
                startsWithLetter &&
                data.orderEvents.some(event => event.event.eventType === eventType)
              );
            });
        },
    }
})

export const { setData,filterByName,filterData } = verifiedSlice.actions;

export default verifiedSlice.reducer;