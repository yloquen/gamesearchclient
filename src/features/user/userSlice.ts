import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameData, WikiData} from "../../types";

import {fetchSearchResults} from "../search/searchSlice";
import {runQuery} from "../../Comm";

export const makeLoginRequest = createAsyncThunk('user/login', async (loginData:any) =>
{
    return runQuery("POST", "/login", undefined, JSON.stringify(loginData));
});

export const makeRegisterRequest = createAsyncThunk('user/register', async (registerData:any) =>
{
    return runQuery("POST", "/register", undefined, JSON.stringify(registerData));
});

export const makeLogoutRequest = createAsyncThunk('user/logout', async () =>
{
    return runQuery("GET", "/logout");
});

export const makeSearchHistoryRequest = createAsyncThunk('user/search_history', async () =>
{
    return runQuery("GET", "/search_history");
});

export const addFavoriteRequest = createAsyncThunk('user/favorite', async (id:number) =>
{
    return runQuery("POST", "/favorite", undefined, JSON.stringify({id:id}));
});


const initialState =
{
    loginWindow:false,
    registerWindow:false,
    searchHistoryWindow:false,
    loggedIn:false,
    username:"",
    searchHistory:[]
};


const userSlice = createSlice(
{
    name:'user',
    initialState:initialState,
    reducers:
    {
        showLoginWindow(state, action:PayloadAction<boolean>)
        {
            state.loginWindow = action.payload;
        },
        showRegisterWindow(state, action:PayloadAction<boolean>)
        {
            state.registerWindow = action.payload;
        },
        showSearchHistoryWindow(state, action:PayloadAction<boolean>)
        {
            state.searchHistoryWindow = action.payload;
        }
    },
    extraReducers(builder)
    {
        builder
            .addCase(makeLoginRequest.pending, (state, action) =>
            {
                // unimplemented
            })
            .addCase(makeLoginRequest.fulfilled, (state:any, action:any) =>
            {
                if (action.payload?.email)
                {
                    state.loggedIn = true;
                    state.username = action.payload?.email;
                }
                else
                {
                    state.loggedIn = false;
                }
            })
            .addCase(makeRegisterRequest.fulfilled, (state:any, action:any) =>
            {
                if (action.payload?.email)
                {
                    state.loggedIn = true;
                    state.username = action.payload?.email;
                }
                else if (action.payload?.error)
                {
                    alert(action.payload.error);
                }
            })
            .addCase(makeLogoutRequest.fulfilled, (state:any, action:any) =>
            {
                state.loggedIn = false;
                state.username = "";
            })
            .addCase(makeSearchHistoryRequest.fulfilled, (state:any, action:any) =>
            {
                state.searchHistory = action.payload || [];
                if (state.searchHistory.length > 0)
                {
                    state.searchHistoryWindow = true;
                }
            })
            .addCase(addFavoriteRequest.fulfilled, (state:any, action:any) =>
            {

            })
    }
});

export const { showLoginWindow, showRegisterWindow, showSearchHistoryWindow } = userSlice.actions;
export default userSlice.reducer;