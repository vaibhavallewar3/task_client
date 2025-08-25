import AllTasks from "../pages/Admin/AllTask";
import BlockTasks from "../pages/Admin/BlockTask";
import CreateTask from "../pages/Admin/Create";
import EditTask from "../pages/Admin/Edit";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import TaskDetail from "../pages/common/TaskDetail";
import MyTasks from "../pages/User/MyTask";


export const public_routes = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
];


export const admin_routes = [
    { path: '/tasks', element: <AllTasks /> },
    { path: '/block/tasks', element: <BlockTasks /> },
    { path: '/task/create', element: <CreateTask /> },
];


export const auth_routes = [
    { path: '/mytasks', element: <MyTasks /> },
    { path: '/task/:id', element: <TaskDetail /> },
    { path: '/task/edit/:id', element: <EditTask /> },
];

