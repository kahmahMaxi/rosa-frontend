import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
};

const sidebarSlice = createSlice({
    name: 'showsidebar',
    initialState,
    reducers: {
        openSidebar: (state) => {
            state.value = true;
        },
        closeSidebar: (state) => {
            state.value = null;
        },
    }
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;