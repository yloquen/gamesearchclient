import * as React from 'react'
import {useEffect} from "react";
import {gsap, Linear} from "gsap";
import TweenTarget = gsap.TweenTarget;
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
            transform:"translate(-50%, -50%)",
            filter:"brightness(70%)",
            opacity:0.5
        };

    return (<img ref={ref} src="./assets/loading_circle.png" style={style}/>);
}