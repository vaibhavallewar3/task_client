import Cookies from 'js-cookie';
import { loadUserFail, loadUserSuccess, userLoginFail, userLoginSuccess, userLogoutFail, userLogoutSuccess, userRegisterFail, userRegisterSuccess } from "./user_reducer";

const BASE_URL = 'http://localhost:7800/api/v1';

export const userLogin = (email, password, navigate) => async (dispatch) => {
    try {
        const resp = await fetch(BASE_URL + '/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'content-type': 'application/json' },
        });
        const { message, token, role } = await resp.json();
        Cookies.set('auth_token', token, { expires: 1, sameSite: 'none', secure: true });

        if (role === 'admin') {
            navigate('/tasks');
        } else if (role === 'user') {
            navigate('/mytasks');
        };

        dispatch(userLoginSuccess(message));
    } catch (error) {
        Cookies.remove('auth_token');
        dispatch(userLoginFail(error.response.data.message));
    }
};


export const userRegister = (user_data) => async (dispatch) => {
    try {
        console.log(user_data);
        const resp = await fetch(BASE_URL + '/user/register', {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: { 'content-type': 'application/json' },
        });
        const { message } = await resp.json();

        dispatch(userRegisterSuccess(message));
    } catch (error) {
        dispatch(userRegisterFail(error.response.data.message));
    }
};



export const myProfile = () => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/user/myprofile', { headers: { 'Authorization': Authorization } });
        const { user } = await resp.json();

        dispatch(loadUserSuccess(user));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};


export const userLogout = () => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/user/logout', { headers: { 'Authorization': Authorization } });
        const { message } = await resp.json();

        dispatch(userLogoutSuccess(message));
    } catch (error) {
        dispatch(userLogoutFail(error.response.data.message));
    }
};

