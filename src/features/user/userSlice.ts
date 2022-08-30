import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameData, WikiData} from "../../types";
import {app} from "../../App";
import {fetchSearchResults} from "../search/searchSlice";

export const makeLoginRequest = createAsyncThunk('user/login', async (loginData:any) =>
{
    return app.controller.runQuery("POST", "/login", undefined, JSON.stringify(loginData));
});


const initialState =
{
    loginWindow:false,
    loggedIn:false,
    username:""
};


const userSlice = createSlice(
    {
        name:'user',
        initialState:initialState,
        reducers:
        {
            showLoginWindow(state, payload:PayloadAction<boolean>)
            {
                state.loginWindow = payload.payload;
            }
        },
        extraReducers(builder)
        {
            builder
                .addCase(makeLoginRequest.pending, (state, action) =>
                {

                })
                .addCase(makeLoginRequest.fulfilled, (state:any, action) =>
                {
                    // action.payload;
                })
        }
    });

export const { showLoginWindow } = userSlice.actions;
export default userSlice.reducer;