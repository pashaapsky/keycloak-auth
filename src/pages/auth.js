import React from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {useFormik} from "formik";
import axios from "axios";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import {useKeycloak} from "@react-keycloak/web";
import {setToken} from "../store/app/appSlice";

import "../scss/auth/auth-form.scss"

function Auth(props) {
    const {keycloak, initialized} = useKeycloak();

    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name: '3010',
            password: '123456'
        },
        validate: (values) => {
            const errors = {};

            // if (!values.name) {
            //     errors.name = 'Поле не может быть пустым';
            // } else if (values.name.length < 4) {
            //     errors.name = 'Имя должно быть не менее 4 символов';
            // } else if (values.name.length > 20) {
            //     errors.name = 'Имя должно быть не более 20 символов';
            // }

            if (!values.password) {
                errors.password = 'Пароль не может быть пустым';
            } else if (values.password.length < 6) {
                errors.password = 'Пароль должен быть не менее 6 символов';
            }

            return errors;
        },
        onSubmit: async (values) => {
            const realm = keycloak.realm;
            const clientId = keycloak.clientId;
            const loginUri = process.env.REACT_APP_KEYCLOAK_URL + '/realms/' + realm + '/protocol/openid-connect/token';

            let data = new URLSearchParams({
                client_id: clientId,
                grant_type: "password",
                username: values.name,
                password: values.password
            });

            console.log('data:', data);

            const result = await axios.post(loginUri, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
                .then(res => res.data)
            ;

            if (result) {
                console.log('result: ', result);

                const tokens = {
                    refreshToken: result.refresh_token,
                    accessToken: result.access_token
                };

                localStorage.setItem('tokens', JSON.stringify(tokens));
                dispatch(setToken(tokens));
            }

            // history.push('/wallets');
        }
    });

    return (
        <div className="auth-wrapper">
            <form className="auth-form form" onSubmit={formik.handleSubmit}>
                <div className="heading-block">
                    <AccountBoxIcon className="auth-logo"/>
                    <h1>Авторизация</h1>
                </div>

                <div className="form__group">
                    <PersonIcon/>

                    <div className={`form-control ${formik.touched.name ? (formik.errors.name ? "error" : "success") : ""}`}>
                        <input className="form-input"
                            id="name"
                            placeholder="Введите имя"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />

                        {(formik.touched.name && formik.errors.name) ? (
                            <div className="form-error">{formik.errors.name}</div>
                        ) : null}
                    </div>
                </div>

                <div className="form__group">
                    <LockIcon/>

                    <div className={`form-control ${formik.touched.password ? (formik.errors.password ? "error" : "success") : ""}`}>
                        <input className="form-input"
                               id="password"
                               type="password"
                               placeholder="Введите пароль"
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.password}
                        />

                        {(formik.touched.password && formik.errors.password) ? (
                            <div className="form-error">{formik.errors.password}</div>
                        ) : null}
                    </div>
                </div>

                <div className="form__btn-group">
                    <button type="submit" className="auth-form-btn">Войти</button>

                    <button className="auth-form-btn" onClick={() => keycloak.login()}>Войти keycloak</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
