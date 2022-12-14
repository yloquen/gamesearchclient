import * as React from "react";
import {LegacyRef, useEffect} from "react";
import {gsap, Linear} from "gsap";
import TweenTarget = gsap.TweenTarget;
import {CSSProperties} from "react";
import {useState} from "react";


export default class Util
{


    static createTweens(toVars:any[], fromVars:any[]):LegacyRef<any>
    {
        const ref = React.createRef();

        useEffect(() =>
        {
            toVars.forEach(toVar =>
            {
                gsap.to(ref.current as TweenTarget, toVar);
            });

            fromVars.forEach(fromVar =>
            {
                gsap.from(ref.current as TweenTarget, fromVar);
            });
        });

        return ref;
    }


}


export const useFade = (delay:number = .25):[any, CSSProperties, boolean] =>
{
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const toggle = () =>
    {
        setMenuIsOpen(!menuIsOpen);
        setIsInitialized(true);
    };

    const style:CSSProperties =
    {
        animationName: menuIsOpen ? "fade_in" : "fade_out",
        animationDuration: (isInitialized ? delay : 0) + "s",
        opacity: menuIsOpen ? "100%" : "0%"
    };

    return [toggle, style, menuIsOpen];
};