import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
};

const gtmessageSlice = createSlice({
    name: 'gtmessage',
    initialState,
    reducers: {
        setgtMessage: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { setgtMessage } = gtmessageSlice.actions;

export default gtmessageSlice.reducer;