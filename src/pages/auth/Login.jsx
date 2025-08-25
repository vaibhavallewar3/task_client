import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Container, Form, FormGroup, Input, Label, UncontrolledAlert } from 'reactstrap';
import { myProfile, userLogin } from '../../redux/user_action';
import { clearErrors, clearMessage } from '../../redux/user_reducer';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, startTrasition] = useTransition();
    const { error, message, isAuthenticated } = useSelector(state => state.user);

    const handleLogin = (e) => {
        e.preventDefault();

        startTrasition(() => {
            dispatch(userLogin(email, password, navigate));
        });
    };

    const loadUser = () => {
        startTrasition(() => {
            dispatch(myProfile());
        });
    };

    useEffect(() => {
        if (message) {
            loadUser();
            dispatch(clearMessage());
        };
        if (error) {
            dispatch(clearErrors());
        };
    }, [message, error, dispatch]);

    return (
        <React.Fragment>
            <Container fluid>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <Card className='w-50'>
                        <CardBody>
                            <h5 className="h5 text-center">LOGIN</h5>
                            <Form onSubmit={handleLogin}>
                                <FormGroup>
                                    <Label>Mail ID</Label>
                                    <Input type='email' name='email' placeholder='MAIL ID'
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type='password' name='password' placeholder='PASSWORD'
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormGroup>

                                <div className="text-center">
                                    <Button disabled={isLoading} type='submit' color='primary'>SUBMIT</Button>
                                </div>

                                <div className="text-end">
                                    <Link to={'/register'}>REGISTER</Link>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Container>

            {error && (<UncontrolledAlert color='danger'>{error}</UncontrolledAlert>)}
            {message && (<UncontrolledAlert color='success'>{message}</UncontrolledAlert>)}
        </React.Fragment>
    )
};

export default Login;
