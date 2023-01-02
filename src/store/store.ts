import {configureStore, getDefaultMiddleware, combineReducers} from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";
import monitorReducersEnhancer from "../enhamcers/monitorReducer";
import { compose, applyMiddleware } from "@reduxjs/toolkit";
import loggerMiddleware from "../middleware/logger";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export default function configureAppStore(preloadedState) {
    return configureStore({
        reducer:{
            search: searchReducer,
            user: userReducer
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
        //middleware: [loggerMiddleware, ...getDefaultMiddleware()],
        preloadedState,
        enhancers: [monitorReducersEnhancer as any]
    });
}

export const store = configureAppStore({});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
