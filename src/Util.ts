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


export const useFade = (initialState:boolean, delay:number = 2, initialized:boolean = false):[any, CSSProperties, boolean] =>
{
    const [isVisible, setIsVisible] = useState(initialState);
    const [isInitialized, setIsInitialized] = useState(initialized);
    const [onCompleteCallback, setOnCompleteCallback] = useState(undefined);

    const toggle = (onCompleteCallback:Function = undefined) =>
    {
        setIsVisible(!isVisible);
        setIsInitialized(true);
        useEffect(()=>
        {
            gsap.delayedCall(2, onCompleteCallback);
        });
    };

    const style:CSSProperties =
    {
        opacity: isVisible ? "100%" : "0%"
    };

    if (isInitialized)
    {
        style.animationName = isVisible ? "fade_in" : "fade_out";
        style.animationDuration = delay + "s";
    }

/*
    if (onCompleteCallback)
    {
        useEffect(() =>
        {
            gsap.delayedCall(delay, () =>
            {
                alert("HEEHOO");
                onCompleteCallback()
            });
        });
    }*/

    return [toggle, style, isVisible];
};


export const useFade2 = (duration:number, initialState:boolean, initialized:boolean):any =>
{
    const [isVisible, setIsVisible] = useState(initialState);
    const [isInitialized, setIsInitialized] = useState(initialized);

    const style:CSSProperties =
    {
        opacity: isVisible ? "100%" : "0%"
    };

    if (isInitialized)
    {
        style.animationName = isVisible ? "fade_in" : "fade_out";
        style.animationDuration = duration + "s";
    }

    const setFade = (newState:boolean, callback?:Function) =>
    {
        setIsVisible(newState);
        setIsInitialized(true);
        if (callback)
        {
            gsap.delayedCall(duration, callback);
        }
    };

    const toggleFade = () =>
    {
        setFade(!isVisible);
    };

    return [style, setFade, toggleFade];
};