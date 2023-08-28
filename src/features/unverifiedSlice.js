import { createSlice } from '@reduxjs/toolkit';

export const unverifiedSlice = createSlice({
  name: 'unverifiedSlice',
  initialState: {
    filterData:[],
    initialdata:[]
  },
  reducers: {
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
    removeVerifiedData: (state, action) => {
      state.initialdata = state.initialdata.filter(data => {
        return data._id !== action.payload;
      })
      state.filterData = state.filterData.filter(data => {
        return data._id !== action.payload;
      });
    },
    
  }
});

// Action creators are generated for each case reducer function
export const { setData, filterData,removeVerifiedData } = unverifiedSlice.actions;

export default unverifiedSlice.reducer;
