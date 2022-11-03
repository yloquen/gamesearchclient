import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";


export const store = configureStore({
    reducer:
    {
        search:searchReducer,
        user:userReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;