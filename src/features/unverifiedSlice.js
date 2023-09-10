import { createSlice } from '@reduxjs/toolkit';
import format from 'date-fns/format';

export const unverifiedSlice = createSlice({
  name: 'unverifiedSlice',
  initialState: {
    filterData:[],
    initialdata:[],
    filterByNameData:[]
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
    filterByName: (state, action) => {
      const { searchName, eventType } = action.payload;
    
      state.filterData = state.initialdata.filter(data => {
        const lowercaseSearchName = searchName.toLowerCase();
        const startsWithLetter = data.name.toLowerCase().startsWith(lowercaseSearchName) || data.email.toLowerCase().startsWith(lowercaseSearchName) ||
          format(new Date(data.createdAt),'dd-MM-yyyy').startsWith(lowercaseSearchName) || (data.referalCode && data.referalCode.startsWith(searchName)) ||
          data.orderEvents.some(e => e.uniqueId?.startsWith(searchName))
        return (
          startsWithLetter &&
          data.orderEvents.some(event => event.event.eventType === eventType)
        );
      });
    },
  }
});

// Action creators are generated for each case reducer function
export const { setData, filterData,removeVerifiedData,filterByName } = unverifiedSlice.actions;

export default unverifiedSlice.reducer;
