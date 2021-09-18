import { Link } from 'react-router';
import React from 'react';
import agent from "../agent";
import {connect} from "react-redux";
import {LOGOUT} from "../constants/actionTypes";

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => {
        dispatch({ type: LOGOUT, payload: agent.Auth.logout() })
    },
});

class Header extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        {this.props.appName}
                    </Link>

                    <Header currentUser={this.props.currentUser} logout={this.props.onClickLogout}/>
                </div>
            </nav>
        );
    }
}

export default connect(() => ({}), mapDispatchToProps)(Header);
