import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util from "../Util";

const LoadingCircle = (props:any) =>
{
    const ref = Util.createTweens(
            [{ duration:2, ease:Linear.easeNone, rotation:360, repeat:100 }],
            []);

    const style:React.CSSProperties =
        {
            width:"7vw",
            height:"7vw",
            position:"fixed",
            left:"50vw",
            top:"50vh",
            transform: "translate(-50%, -50%)",
            filter:"hue-rotate(222deg) grayscale(80%) brightness(180%)"
        };

    return (<img ref={ref} src="./assets/loading_circle.png" style={style}/>);
};

export default LoadingCircle;