import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const modalsSlice = createSlice({
    name: 'modalgeneral',
    initialState,
    reducers: {
        setmodalgeneral: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { setmodalgeneral } = modalsSlice.actions;

export default modalsSlice.reducer;