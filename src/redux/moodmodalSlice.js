import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

const moodmodalSlice = createSlice({
    name: 'showmodal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.value = true;
        },
        closeModal: (state) => {
            state.value = null;
        },
    }
});

export const { openModal, closeModal } = moodmodalSlice.actions;

export default moodmodalSlice.reducer;