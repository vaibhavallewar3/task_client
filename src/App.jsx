import Cookies from 'js-cookie';
import React, { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { myProfile } from './redux/user_action';
import { admin_routes, auth_routes, public_routes } from './routes';
import ProtectedRoute from './routes/Protected';
import HeaderComp from './components/Header';
import LoaderComp from './components/Loader';

function App() {

  const disaptch = useDispatch();
  const Authorization = Cookies.get('auth_token');
  const [isLoading, startTrasition] = useTransition();
  const { error, message, isAuthenticated, user } = useSelector((state) => state.user);

  const defaultRoute = () => {
    if (user?.role === 'admin') return '/tasks';
    if (user?.role === 'user') return '/mytasks';

    return '/login';
  };

  const loadUser = () => {
    startTrasition(() => {
      disaptch(myProfile());
    });
  };

  useEffect(() => {
    if (Authorization) {
      loadUser();
    };
  }, [Authorization]);

  return (
    <React.Suspense fallback={<LoaderComp />}>
      <BrowserRouter>
        {isLoading ? 'Loading' : (
          <React.Fragment>
            <HeaderComp />

            <Routes>
              <Route path='/' element={<Navigate to={defaultRoute()} />} />

              {public_routes.map((item, idx) => (
                <Route path={item.path} element={item.element} key={idx} />
              ))}

              {auth_routes.map((item, idx) => (
                <Route path={item.path} key={idx}
                  element={<ProtectedRoute>{item.element}</ProtectedRoute>}
                />
              ))}

              {admin_routes.map((item, idx) => (
                <Route path={item.path} key={idx}
                  element={<ProtectedRoute is_admin={true}>{item.element}</ProtectedRoute>}
                />
              ))}
            </Routes>
          </React.Fragment>
        )}
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
