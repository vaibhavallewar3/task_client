import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ is_admin = false, children }) => {

    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.user);

    if (!isAuthenticated) {
        navigate('/login');
    };

    if (is_admin && user?.role !== 'admin') {
        navigate('/login');
    };

    return <>{children}</>;
};

export default ProtectedRoute;
