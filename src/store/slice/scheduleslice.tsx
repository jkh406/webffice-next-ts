import { createSlice } from '@reduxjs/toolkit'

export const initialState: any = {
  kkanaData: [],
}

export const kkanaSlice = createSlice({
  name: 'GlobalHeader',
  initialState,
  reducers: {
    kkanaReducer: (state, action) => {
      state.testValue = action.payload
    },
  },
})

export const { kkanaReducer } = kkanaSlice.actions

export const kkanaCounter = (value: number) => {
  return (dispatch: any): void => {
    dispatch(kkanaReducer(value+1))
  }
}

export default kkanaSlice.reducer