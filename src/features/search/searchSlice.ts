import {AsyncThunkAction, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GameData, WikiData} from "../../types";
import {runQuery} from "../../Comm";


export const fetchSearchResults = createAsyncThunk('search/request', async (queryString:string) =>
{
    return runQuery("GET", "/search", "q=" + encodeURIComponent(queryString)) as Promise<SearchResultsType>;
});

type SearchType =
{
    loading:boolean,
    loaded:boolean,
    searchResults:SearchResultsType|undefined,
    query:string
};

type SearchResultsType =
{
    gameData: any[],
    priceData: any[],
    wikiData: SearchResultsType|undefined,
    videoId: string
};

const initialState:SearchType =
{
    loading: false,
    loaded: false,
    searchResults:undefined,
    query:""
};

const searchSlice = createSlice(
    {
        name:'search',
        initialState:initialState,
        reducers:
        {
            resetSearch(state:SearchType)
            {
                state.loading = false;
                state.loaded = false;
                state.searchResults = undefined;
                state.query = "";
            },
            startSearch(state:SearchType)
            {
                state.loading = true;
            }
        },
        extraReducers(builder)
        {
            builder
                .addCase(fetchSearchResults.pending, (state) =>
                {
                    state.loading = true;
                    state.loaded = false;
                })
                .addCase(fetchSearchResults.fulfilled, (state:any, action:PayloadAction<SearchResultsType|undefined>) =>
                {
                    state.loading = false;
                    state.loaded = true;
                    state.searchResults = action.payload;

                    state.searchResults?.gameData?.sort((r1:GameData, r2:GameData) =>
                    {
                        return r1.price - r2.price
                    });
                })
        }
    });

export default searchSlice.reducer;
export const { resetSearch, startSearch } = searchSlice.actions;