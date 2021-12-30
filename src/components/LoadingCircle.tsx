import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util from "../Util";

export default function LoadingCircle(props:any)
{
    const ref = Util.createTweens(
            [{ duration:2, ease:Linear.easeNone, rotation:360, repeat:10 }],
            [{ duration:.2, alpha:0 }]);

    const style:React.CSSProperties =
        {
            width:"7vw",
            height:"7vw",
            position:"fixed",
            left:"50vw",
            top:"50vh",
            transform:"translate(-50%, -50%); rotate(180deg)",
            filter:"hue-rotate(222deg) grayscale(80%) brightness(180%)"
        };

    return (<img ref={ref} src="./assets/loading_circle.png" style={style}/>);
}