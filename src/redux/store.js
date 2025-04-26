// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './userSlice'

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//     }
// })


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import scanReducer from './scanSlice';
import sidebarReducer from './sidebarSlice';
import rightbarReducer from './rightbarSlice';
import gtstatusReducer from './gtstatusSlice';
import gtmessageReducer from './gtmsgSlice';
import loadingReducer from './loadingSlice';
import moodmodalReducer from './moodmodalSlice';
import osmodalReducer from './osSlice';
import moodaddReducer from './moodaddSlice';
import modalReducer from './modalsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        scanstatus: scanReducer,
        showsidebar: sidebarReducer,
        showrightbar: rightbarReducer,
        gtstatus: gtstatusReducer,
        gtmessage: gtmessageReducer,
        globalloading: loadingReducer,
        showmodal: moodmodalReducer,
        osmodal: osmodalReducer,
        moodadd: moodaddReducer,
        modalgeneral: modalReducer,
    }
});

// Removed TypeScript-specific type exports
export default store;
