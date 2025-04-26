import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const loadingSlice = createSlice({
    name: 'globalloading',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.value = true;
        },
        stopLoading: (state) => {
            state.value = null;
        },
    }
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;