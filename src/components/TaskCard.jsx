import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardFooter } from 'reactstrap';

const TaskCardComp = ({ id, title, status, priority, sub_tasks }) => {

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Card style={{ width: '20vmax' }} className='m-2'>
                <CardBody>
                    <h5 className="h5">{title?.toUpperCase()}</h5>
                    <Badge color='success' className='mx-2'>{status?.toUpperCase()}</Badge>
                    <Badge color='info' className='mx-2'>{priority?.toUpperCase()}</Badge>

                    <p>Sub Task: {sub_tasks}</p>
                </CardBody>

                <CardFooter className='text-center'>
                    <Button onClick={() => navigate('/task/' + id)} color='info'>View</Button>
                </CardFooter>
            </Card>
        </React.Fragment>
    )
};

export default TaskCardComp;
