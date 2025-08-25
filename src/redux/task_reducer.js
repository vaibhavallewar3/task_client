import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tasks: [],
    task: null,
    error: null,
    message: null,
};


const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getAllTasksSuccess: (state, action) => {
            state.tasks = action.payload;
        },
        getAllTasksFail: (state, action) => {
            state.error = action.payload;
        },

        getBlockTasksSuccess: (state, action) => {
            state.tasks = action.payload;
        },
        getBlockTasksFail: (state, action) => {
            state.error = action.payload;
        },

        getMyTasksSuccess: (state, action) => {
            state.tasks = action.payload;
        },
        getMyTasksFail: (state, action) => {
            state.error = action.payload;
        },

        getTaskSuccess: (state, action) => {
            state.task = action.payload;
        },
        getTaskFail: (state, action) => {
            state.error = action.payload;
        },

        createTaskSuccess: (state, action) => {
            state.message = action.payload;
        },
        createTaskFail: (state, action) => {
            state.error = action.payload;
        },

        editTaskSuccess: (state, action) => {
            state.message = action.payload;
        },
        editTaskFail: (state, action) => {
            state.error = action.payload;
        },

        deleteTaskSuccess: (state, action) => {
            state.message = action.payload;
        },
        deleteTaskFail: (state, action) => {
            state.error = action.payload;
        },

        clearErrors: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
});


export const {
    getAllTasksFail, getAllTasksSuccess, getBlockTasksFail, getBlockTasksSuccess, getMyTasksFail,
    getMyTasksSuccess, getTaskFail, getTaskSuccess, createTaskFail, createTaskSuccess, editTaskFail,
    editTaskSuccess, deleteTaskFail, deleteTaskSuccessd, deleteTaskSuccess, clearErrors, clearMessage,
} = taskSlice.actions;

export default taskSlice;
