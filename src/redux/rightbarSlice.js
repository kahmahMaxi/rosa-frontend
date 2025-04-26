import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
};

const rightbarSlice = createSlice({
    name: 'showrightbar',
    initialState,
    reducers: {
        openRightbar: (state) => {
            state.value = true;
        },
        closeRightbar: (state) => {
            state.value = null;
        },
    }
});

export const { openRightbar, closeRightbar } = rightbarSlice.actions;

export default rightbarSlice.reducer;