export type GameData =
{
    name:string,
    price:number,
    provider:string,
    link:string,
    img:string
};


export type PriceData =
{
    name:string,
    price:string
};


export type MainState =
{
    loading:boolean
    loaded:boolean
}