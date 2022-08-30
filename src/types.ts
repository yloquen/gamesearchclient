import {URLSearchParamsInit} from "react-router-dom";

export type GameData =
{
    name:string,
    price:number,
    provider:string,
    link:string,
    img:string
};


export type MainState =
{
    loading:boolean
    loaded:boolean
}


export type WikiData =
{
    link:string,
    imgURL:string,
    textInfo:{name:string, value:string}[]
};


export type UseSearchParamsType = readonly [URLSearchParams, (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: any;
} | undefined) => void];