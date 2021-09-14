import * as React from "react";
import {Link} from "@material-ui/core";
import {pipe} from "fp-ts/function";
import {option} from "fp-ts";

const LoggedOutHeader = props => {
    return (
        <ul className="nav navbar-nav pull-xs-right">

            <li className="nav-item">
                <Link to="login" className="nav-link">
                    Sign in
                </Link>
            </li>

            <li className="nav-item">
                <Link to="register" className="nav-link">
                    Sign up
                </Link>
            </li>

        </ul>
    )
}

export const Header = props => pipe(
    option.fromNullable(props.currentUser),
    option.fold(
        () => (<LoggedOutHeader props={...props} />), 
            user => (<LoggedInHeader currentUser={user} props={...props} />),
        )
    );

const LoggedInHeader = props => {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    {props.currentUser}
                </li>

                <li className="nav-item">
                    <Link to="/" onClick={props.logout} className="nav-link">
                        LogOut
                    </Link>
                </li>

            </ul>
        );
};
