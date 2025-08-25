import React, { useEffect, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allBlockTasks, allTasks, deleteTask } from '../../redux/task_action';
import LoaderComp from '../../components/Loader';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const BlockTasks = () => {
    const disaptch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, startTrasition] = useTransition();
    const { error, message, tasks } = useSelector((state) => state.task);

    const loadTasks = async () => {
        startTrasition(() => {
            disaptch(allBlockTasks());
        });
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <React.Fragment>
            {isLoading ? (<LoaderComp />) : (
                <React.Fragment>
                    <div style={{ height: '90vh' }}>
                        {tasks?.length > 0 ? (
                            <Table hover striped responsive>
                                <thead>
                                    <th>SR</th>
                                    <th>TITLE</th>
                                    <th>STATUS</th>
                                    <th>PRIORITY</th>
                                    <th>SUB TASKS</th>
                                    <th>ACTION</th>
                                </thead>
                                <tbody>
                                    {tasks?.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item.title?.toUpperCase()}</td>
                                            <td>{item?.status?.toUpperCase()}</td>
                                            <td>{item?.priority?.toUpperCase()}</td>
                                            <td>{item?.sub_tasks?.length}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button onClick={() => navigate('/task/' + item?.id)} color='info' size='sm'>VIEW</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className='h-100 d-flex align-items-center justify-content-center'>
                                <h5 className="h5">TASKS NOT FOUND!</h5>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
};

export default BlockTasks;
