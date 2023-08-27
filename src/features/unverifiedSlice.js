import { createSlice } from '@reduxjs/toolkit'

export const unverifiedSlice = createSlice({
  name: 'unverifiedSlice',
  initialState: [],
  reducers: {
    setData: (state,action) => {
      return action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setData } = unverifiedSlice.actions

export default unverifiedSlice.reducer