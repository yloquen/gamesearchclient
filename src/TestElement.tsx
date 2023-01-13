import {connect} from "react-redux";
import {RootState} from "./store/store";
import React from "react";
import { Component } from "react";
import { showLoginWindow } from "./features/user/userSlice";
import { store } from "./store/store";


/*const TestElement = (props) =>
{
    return (<div style={{display: "fixed", backgroundColor:"#f0f", zIndex:100}}>{JSON.stringify(props)}</div>);
};*/

class TestElement extends Component<any, any>
{



/*    render()
    {
        return (<div style={{display: "fixed", backgroundColor:"#f0f", zIndex:100}} onClick={this.props.showLogin} >
            {this.props.loggedIn + " "}
            {
                store.getState().user.loggedIn + " "
            }
        </div>);
    }*/

    render()
    {
        return (<div style={{display: "fixed", backgroundColor:"#f0f", zIndex:100}} >
            {/*{this.props.loggedIn + " "}*/}
            {
                store.getState().user.loggedIn + " "
            }
        </div>);
    }
}

/*export default connect(
    (state:RootState) => {return {loggedIn:state.user.loggedIn}},
    (dispatch) => { return { showLogin:() => dispatch(showLoginWindow(true))} })
    (TestElement);*/

export default TestElement;
