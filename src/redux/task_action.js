import Cookies from 'js-cookie';
import { createTaskFail, createTaskSuccess, deleteTaskFail, deleteTaskSuccess, editTaskFail, editTaskSuccess, getAllTasksFail, getAllTasksSuccess, getBlockTasksFail, getBlockTasksSuccess, getMyTasksFail, getMyTasksSuccess, getTaskFail, getTaskSuccess } from './task_reducer';


const BASE_URL = 'http://localhost:7800/api/v1';


export const allTasks = () => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/get', { headers: { 'Authorization': Authorization } });
        const { tasks } = await resp.json();

        dispatch(getAllTasksSuccess(tasks));
    } catch (error) {
        dispatch(getAllTasksFail(error.response.data.message));
    }
};


export const allBlockTasks = () => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/get/blocked', { headers: { 'Authorization': Authorization } });
        const { tasks } = await resp.json();

        dispatch(getBlockTasksSuccess(tasks));
    } catch (error) {
        dispatch(getBlockTasksFail(error.response.data.message));
    }
};


export const myTasks = () => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/get/my', { headers: { 'Authorization': Authorization } });
        const { tasks } = await resp.json();

        dispatch(getMyTasksSuccess(tasks));
    } catch (error) {
        dispatch(getMyTasksFail(error.response.data.message));
    }
};


export const taskById = (id) => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/get/' + id, { headers: { 'Authorization': Authorization } });
        const { task } = await resp.json();

        dispatch(getTaskSuccess(task));
    } catch (error) {
        dispatch(getTaskFail(error.response.data.message));
    }
};


export const createTask = (task_data) => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/create', {
            method: 'POST',
            body: JSON.stringify(task_data),
            headers: { 'Authorization': Authorization, 'content-type': 'application/json' },
        });
        const { message } = await resp.json();

        dispatch(createTaskSuccess(message));
    } catch (error) {
        dispatch(createTaskFail(error.response.data.message));
    }
};



export const editTask = (id, task_data) => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/edit/' + id, {
            method: 'PUT',
            body: JSON.stringify(task_data),
            headers: { 'Authorization': Authorization },
        });
        const { message } = await resp.json();

        dispatch(editTaskSuccess(message));
    } catch (error) {
        dispatch(editTaskFail(error.response.data.message));
    }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/delete/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': Authorization },
        });
        const { message } = await resp.json();

        dispatch(deleteTaskSuccess(message));
    } catch (error) {
        dispatch(deleteTaskFail(error.response.data.message));
    }
};


export const createTaskOpts = async () => {
    try {
        const Authorization = Cookies.get('auth_token');
        const resp = await fetch(BASE_URL + '/task/options/create', { headers: { 'Authorization': Authorization } });
        const { users } = await resp.json();

        return { users };
    } catch (error) {
        return { error: error.response.data.message };
    }
};

