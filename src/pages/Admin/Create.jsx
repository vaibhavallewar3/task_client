import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner, UncontrolledAlert } from 'reactstrap';
import LoaderComp from '../../components/Loader';
import { createTask, createTaskOpts } from '../../redux/task_action';

const CreateTask = () => {

    const disaptch = useDispatch();
    const navigate = useNavigate();
    const { message, error } = useSelector((state) => state.task);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [description, setDescription] = useState('');
    const [subTasks, setSubTasks] = useState([{ id: 1, title: '', status: '' }]);

    const [isLoad, startTrans] = useTransition();
    const [isLoading, startTransition] = useTransition();
    const [options, setOptions] = useState({ users: [], error: null });

    const loadOpts = () => {
        startTransition(async () => {
            const { error, users } = await createTaskOpts();
            setOptions({ error, users });
        });
    };

    const handleSubmit = () => {
        startTrans(async () => {
            await disaptch(createTask({ title, description, priority, status, assign_to: assignTo, sub_tasks: subTasks }));
        });
        navigate('/tasks');
    };

    useEffect(() => {
        loadOpts();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (<LoaderComp />) : (
                <div className='d-flex align-items-center justify-content-center' style={{ height: '90vh' }}>
                    <Form onSubmit={handleSubmit} className='w-50 rounded border border-3 p-4'>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input type='text' name='title' placeholder='TASK TITLE' required
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type='textarea' name='description' placeholder='TASK DESCRIPTION'
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>

                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Status</Label>
                                    <Input type='select' name='status' required
                                        value={status} onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">SELECT STATUS</option>
                                        {['to do', 'in progress', 'done'].map((item, idx) => (
                                            <option value={item} key={idx}>{item.toUpperCase()}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Priority</Label>
                                    <Input type='select' name='priority' required
                                        value={priority} onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="">SELECT PRIORITY</option>
                                        {['high', 'medium', 'low'].map((item, idx) => (
                                            <option value={item} key={idx}>{item.toUpperCase()}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label>Assign User</Label>
                                    <Input type='select' name='assign_to' required
                                        value={assignTo} onChange={(e) => setAssignTo(e.target.value)}
                                    >
                                        <option value="">SELECT ASSIGN TO</option>
                                        {options.users?.map((item, idx) => (
                                            <option value={item?.id} key={idx}>{item?.name?.toUpperCase()}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <div>
                            <Label>Sub Tasks</Label>

                            {subTasks.map((item, idx) => (
                                <Row key={idx}>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label>Title {idx + 1}</Label>
                                            <Input type='text' name={'sub_tasks.' + idx + '.title'} placeholder={'SUB TASK ' + (idx + 1) + ' TITLE'}
                                                value={item.title} onChange={(e) => {
                                                    const newTasks = [...subTasks];
                                                    newTasks[idx].title = e.target.value;
                                                    setSubTasks(newTasks);
                                                }} required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <FormGroup>
                                            <Label>Status {idx + 1}</Label>
                                            <Input type='select' name={'sub_tasks.' + idx + '.status'}
                                                value={item.status} onChange={(e) => {
                                                    const newTasks = [...subTasks];
                                                    newTasks[idx].status = e.target.value;
                                                    setSubTasks(newTasks);
                                                }} required
                                            >
                                                <option value="">SELECT SUB TASK STATUS {idx + 1}</option>
                                                {['to do', 'in progress', 'done'].map((item, idx) => (
                                                    <option value={item} key={idx}>{item.toUpperCase()}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={1} className='pe-2'>
                                        <FormGroup>
                                            <Label>.</Label>
                                            {idx === subTasks.length - 1 ? (
                                                <Button color='success' size='sm' type='button' onClick={() => setSubTasks([...subTasks, { id: idx + 1, title: '', status: '' }])}>ADD</Button>
                                            ) : (
                                                <Button color='danger' size='sm' type='button' onClick={() => setSubTasks(subTasks.filter((_, index) => index !== idx))}>DEL</Button>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button disabled={isLoad} color='primary' type='submit'>{isLoad && (<Spinner size={'sm'} />)} SUBMIT</Button>
                        </div>
                    </Form>
                </div>
            )}

            {error && (<UncontrolledAlert color='danger'>{error}</UncontrolledAlert>)}
            {message && (<UncontrolledAlert color='success'>{message}</UncontrolledAlert>)}
        </React.Fragment>
    )
};

export default CreateTask;
