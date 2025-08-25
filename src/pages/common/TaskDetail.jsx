import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskById } from '../../redux/task_action';
import { useParams } from 'react-router-dom';
import LoaderComp from '../../components/Loader';

const TaskDetail = () => {

    const params = useParams();
    const disaptch = useDispatch();
    const { error, message, task } = useSelector((state) => state.task);
    const [isLoading, startTransition] = useTransition();

    const loadDetails = (task_id) => {
        startTransition(async () => {
            await disaptch(taskById(task_id));
        });
    };

    useEffect(() => {
        loadDetails(params.id);
    }, [params.id]);

    return (
        <React.Fragment>
            {isLoading ? (<LoaderComp />) : (
                <React.Fragment>
                    <h3 className="h3">{task?.title?.toUpperCase()}</h3>
                </React.Fragment>
            )}
        </React.Fragment>
    )
};

export default TaskDetail;
