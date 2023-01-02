import {GameData} from "../types";
import Util from "../Util";
import {useDispatch} from "react-redux";
import C_Config from "../const/C_Config";
import {addFavoriteRequest} from "../features/user/userSlice";
import * as React from "react";

export function SearchResult(props:{result:GameData, index:number})
{
    const ref = Util.createTweens([], [{ duration:.5, alpha:0, delay:props.index * .1 }]);

    const result:GameData = props.result;

    const dispatch = useDispatch();

    const imgUrl = result.img.length > 0 ? (C_Config.IMG_URL + result.img) : "./assets/no_product_image.png";

    return (<div ref={ref} className="result_container bordered_field break_line">
        <img className="result_image" src={imgUrl}/>
        <div className="result_name">
            <a href={result.link} target="_blank">{result.name}</a>
        </div>
        <div className="result_price">
            {result.price?.toFixed(2)}
            <div style={{height:"0.25vw"}}/>
            <img className="result_provider" src={"./assets/providers/" + result.provider.toLocaleLowerCase() + ".png"} />
        </div>
        <div className="fav_but" onClick={() =>
        {
            dispatch(addFavoriteRequest(result.id) as any);
        }}/>
    </div>);
}