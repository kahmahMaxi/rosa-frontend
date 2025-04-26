import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const gtstatusSlice = createSlice({
    name: 'gtstatus',
    initialState,
    reducers: {
        gtSuccess: (state) => {
            state.value = 'success';
        },
        gtError: (state) => {
            state.value = 'error';
        },
        gtNeutral: (state) => {
            state.value = 'neutral';
        },
        setgtNull: (state) => {
            state.value = null;
        },
    }
});

export const { gtSuccess, gtError, gtNeutral, setgtNull } = gtstatusSlice.actions;

export default gtstatusSlice.reducer;