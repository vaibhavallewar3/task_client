import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user_reducer';
import taskSlice from './task_reducer';


const store = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [taskSlice.name]: taskSlice.reducer,
    },
});


export default store;
