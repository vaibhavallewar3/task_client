import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row, Form, UncontrolledAlert } from 'reactstrap';
import { userRegister } from '../../redux/user_action';
import { clearErrors, clearMessage } from '../../redux/user_reducer';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, startTrasition] = useTransition();
    const { error, message, isAuthenticated } = useSelector(state => state.user);

    const handleRegister = (e) => {
        e.preventDefault();
        startTrasition(() => {
            dispatch(userRegister({ name, email, password, role, gender, address }));
        });
    };

    useEffect(() => {
        if (message) {
            navigate('/login');
            dispatch(clearMessage());
        };
        if (error) {
            dispatch(clearErrors());
        };
    }, [message, error, navigate, dispatch]);

    return (
        <React.Fragment>
            <Container fluid>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <Card className='w-50'>
                        <CardBody>
                            <h5 className="h5 text-center">REGISTER</h5>
                            <Form onSubmit={handleRegister}>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input type='text' name='name' placeholder='NAME'
                                        value={name} onChange={(e) => setName(e.target.value)}
                                    />
                                </FormGroup>

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

                                <FormGroup>
                                    <Label>Address</Label>
                                    <Input type='text' name='address' placeholder='ADDRESS'
                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                    />
                                </FormGroup>

                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Gender</Label>
                                            <Input type='select' name='gender'
                                                value={gender} onChange={(e) => setGender(e.target.value)}
                                            >
                                                <option value="">SELECT GENDER</option>
                                                {['male', 'female'].map((item, idx) => (
                                                    <option value={item} key={idx}>{item.toUpperCase()}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Role</Label>
                                            <Input type='select' name='role'
                                                value={role} onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="">SELECT ROLE</option>
                                                {['admin', 'user'].map((item, idx) => (
                                                    <option value={item} key={idx}>{item.toUpperCase()}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    <Button disabled={isLoading} type='submit' color='primary'>SUBMIT</Button>
                                </div>

                                <div className="text-end">
                                    <Link to={'/login'}>LOGIN</Link>
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

export default Register;
