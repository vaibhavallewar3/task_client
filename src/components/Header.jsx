import React, { useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, NavbarBrand } from 'reactstrap';
import { userLogout } from '../redux/user_action';

const HeaderComp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, startTrasition] = useTransition();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const handleLogout = () => {
        startTrasition(async () => {
            await dispatch(userLogout());
            navigate('/login');
        });
    };

    return (
        <React.Fragment>
            <Navbar color='info' className='mb-4'>
                <NavbarBrand href='/'>Task Mangement</NavbarBrand>

                <ul className='list-unstyled d-flex align-items-center justify-content-center mt-2'>
                    {user?.role === 'admin' && (
                        <React.Fragment>
                            <li className='mx-1'><Link to={'/tasks'} className=' text-decoration-none text-dark'>All Tasks</Link></li>
                            <li className='mx-1'><Link to={'/block/tasks'} className=' text-decoration-none text-dark'>Block Tasks</Link></li>
                            <li className='mx-1'><Link to={'/task/create'} className=' text-decoration-none text-dark'>Create Task</Link></li>
                        </React.Fragment>
                    )}

                    {user?.role === 'user' && (
                        <React.Fragment>
                            <li className='mx-1'><Link to={'/mytasks'} className=' text-decoration-none text-dark'>My Tasks</Link></li>
                        </React.Fragment>
                    )}
                </ul>

                {isAuthenticated ? (
                    <Button disabled={isLoading} onClick={handleLogout} color='primary' outline>LOGOUT</Button>
                ) : (
                    <Button disabled={isLoading} onClick={() => navigate('/login')} color='primary' outline>LOGIN</Button>
                )}
            </Navbar>
        </React.Fragment>
    )
};

export default HeaderComp;
