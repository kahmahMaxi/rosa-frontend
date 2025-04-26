import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const scanSlice = createSlice({
    name: 'scanstaus',
    initialState,
    reducers: {
        startScan: (state) => {
            state.value = true;
        },
        stopScan: (state) => {
            state.value = null;
        },
    }
});

export const { startScan, stopScan } = scanSlice.actions;

export default scanSlice.reducer;