import React from 'react';
import {NavLink} from 'react-router-dom'
import {useKeycloak} from "@react-keycloak/web";
import {useSelector, useDispatch} from "react-redux";
import {setToken} from "../store/app/appSlice";

function Header(props) {
    const {keycloak, initialized} = useKeycloak();
    const tokens = useSelector(state => state.app.token);


    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('tokens');
        dispatch(setToken(null));
        keycloak.logout();
    };

    return (
        <header className="header">
            <NavLink className="nav-link" to="/home">Home</NavLink>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
            <NavLink className="nav-link" to="/auth">Auth</NavLink>

            <button onClick={handleLogout}>LOGOUT</button>
        </header>
    );
}

export default Header;