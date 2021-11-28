import * as React from "react";
import {LegacyRef, useEffect} from "react";
import {gsap, Linear} from "gsap";
import TweenTarget = gsap.TweenTarget;


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