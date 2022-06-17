import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GameData, WikiData} from "../../types";
import {app} from "../../App";

export const fetchSearchResults = createAsyncThunk('search/request', async (queryString:string) =>
{
    return app.controller.runQuery(queryString);
});

type SearchType =
{
    loading:boolean,
    loaded:boolean,
    searchResults:SearchResultsType
};

type SearchResultsType =
{
    gameData: any[],
    priceData: any[],
    wikiData: any,
    videoId: string
};

const initialState:SearchType =
{
    loading: false,
    loaded: false,
    searchResults:undefined
};

const searchSlice = createSlice(
    {
        name:'search',
        initialState:initialState,
        reducers:
        {

        },
        extraReducers(builder)
        {
            builder
                .addCase(fetchSearchResults.pending, (state, action) =>
                {
                    state.loading = true;
                    state.loaded = false;
                })
                .addCase(fetchSearchResults.fulfilled, (state:any, action) =>
                {
                    state.loading = false;
                    state.loaded = true;
                    state.searchResults = action.payload;
                })
        }
    });

export default searchSlice.reducer;