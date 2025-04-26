import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
};

const moodaddSlice = createSlice({
    name: 'moodadd',
    initialState,
    reducers: {
        setmoodadd: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { setmoodadd } = moodaddSlice.actions;

export default moodaddSlice.reducer;