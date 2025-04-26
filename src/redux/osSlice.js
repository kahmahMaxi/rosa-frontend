import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const osmodalSlice = createSlice({
    name: 'osmodal',
    initialState,
    reducers: {
        openosModal: (state) => {
            state.value = true;
        },
        closeosModal: (state) => {
            state.value = null;
        },
    }
});

export const { openosModal, closeosModal } = osmodalSlice.actions;

export default osmodalSlice.reducer;