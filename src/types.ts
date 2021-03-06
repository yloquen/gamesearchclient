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