import * as React from 'react'
import {ForwardedRef, MouseEventHandler} from "react";
import "/css/common.sass";

export function DefaultButton(props:{onClick:MouseEventHandler<HTMLButtonElement>, children:string, className?:string})
{
    return (<button className={"default_button"} onClick={props.onClick}>
        {props.children}
    </button>);

}


export const LabelledInput = React.forwardRef((props:{id:string, children:string, type:string, className?:string}, ref:ForwardedRef<HTMLInputElement>) =>
{
    return (<label htmlFor={props.id} className={props.className}>
            <span className="label">
                {props.children}
            </span>
        <input ref={ref} type={props.type} className="text_input" id={props.id}/>
    </label>);
});