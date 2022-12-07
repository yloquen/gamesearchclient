import * as React from 'react'
import {ChangeEventHandler, CSSProperties, ForwardedRef, MouseEventHandler} from "react";
import "/css/common.sass";



export function DefaultButton(props:{onClick:MouseEventHandler<HTMLButtonElement>, children:string, style?:CSSProperties})
{
    return (<button className={"default_button"} onClick={props.onClick} style={props.style}>
        {props.children}
    </button>);

}


type LabelledInputPropsType =
{
    id:string,
    children:string,
    type:string,
    className?:string,
    onChange?:ChangeEventHandler<HTMLInputElement>,
    isValid?:boolean
};


export const LabelledInput = React.forwardRef((props:LabelledInputPropsType, ref:ForwardedRef<HTMLInputElement>) =>
{
    const style:CSSProperties =
    {
        display:"flex",
        flexDirection:"row",
        justifyItems: "center",
        alignItems:"center"
        // backgroundColor:"#f0f"
    };

    let validImg;
    if (props.hasOwnProperty("isValid"))
    {
        const imgSrc = props.isValid ? "./assets/green_check.png" : "./assets/red_cross.png";
        const alt = props.isValid ? "valid" : "invalid";

        const style:CSSProperties =
        {
            paddingLeft: "0.2em",
            height: "50%"
        };

        validImg = <img alt={alt} src={imgSrc} style={style} className="text_input_validator"/>;
    }

    return (<label htmlFor={props.id} style={style}>
            <span className="label">
                {props.children}
            </span>
        <input ref={ref} type={props.type} className="text_input" id={props.id} onChange={props?.onChange}/>
        {validImg}
    </label>);
});