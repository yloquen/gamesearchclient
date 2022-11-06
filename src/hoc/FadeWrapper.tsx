import React, {CSSProperties, useState} from "react";
import "/css/login.sass";
import {showLoginWindow} from "../features/user/userSlice";
import {connect, useDispatch} from "react-redux";
import {gsap} from "gsap";


export function getFadeWrapperFuncComp(WrappedComponent, closeFunc:Function)
{
    return (props) =>
    {
        const [closing, setClosing] = useState(false);

        const animDur = .15;
        let wrapperStyle:CSSProperties =
            {
                position:"fixed",
                animationName: "fade_in",
                animationDuration: animDur + "s"
            };

        if (closing)
        {
            wrapperStyle.opacity = 0;
            wrapperStyle.animationName = "fade_out";

            gsap.delayedCall(animDur, () => { closeFunc() });
        }

        const {myProp, ...childProps} = props;

        return (<div style={wrapperStyle}>
            <WrappedComponent {...childProps} closeRequest={() => setClosing(true) }/>;
        </div>);
    }
}


export function getFadeWrapper(WrappedComponent, closeFunc:Function)
{
    const mapDispatchToProps = () => { return { close: closeFunc }};

    return connect(null, mapDispatchToProps)(class FadeWrapper extends React.Component<any, any>
    {
        private WrappedComponent:any;
        private ref:React.RefObject<HTMLDivElement>;


        constructor(props)
        {
            super(props);
            this.ref = React.createRef();

            this.state =
            {
                closing:false
            }
        }


        render()
        {
            const animDur = .15;

            let wrapperStyle:CSSProperties =
            {
                position:"fixed",
                animationName: "fade_in",
                animationDuration: animDur + "s"
            };

            if (this.state.closing)
            {
                wrapperStyle.opacity = 0;
                wrapperStyle.animationName = "fade_out";

                gsap.delayedCall(animDur, () =>
                {
                    this.props.close();
                });
            }

            return (<div ref={this.ref} style={wrapperStyle}>
                    <WrappedComponent closeRequest={this.closeRequest.bind(this)}/>;
                </div>);

        }


        closeRequest()
        {
            this.setState({closing:true});
        }

    });


}