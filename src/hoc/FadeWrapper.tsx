import React, {CSSProperties} from "react";
import "/css/login.sass";
import {showLoginWindow} from "../features/user/userSlice";
import {connect, useDispatch} from "react-redux";
import {gsap} from "gsap";

export function getFadeWrapper(WrappedComponent)
{

    const mapDispatchToProps = (dispatch) =>
    {
        return { close: () => dispatch(showLoginWindow(false)) }
    };

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
            const animDur = 2;

            let wrapperStyle:CSSProperties =
            {
                animationName: "fade_in",
                animationDuration: animDur + "s"
            };

            if (this.state.closing)
            {
                 wrapperStyle =
                {
                    animationName: "fade_out",
                    animationDuration: animDur + "s"
                };

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