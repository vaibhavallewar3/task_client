import React from 'react';
import { Spinner } from 'reactstrap';

const LoaderComp = () => {
    return (
        <React.Fragment>
            <div style={{ height: '90vh' }} className='d-flex align-items-center justify-content-center'>
                <Spinner
                    color='info' style={{ width: '5vmax', height: '5vmax' }}
                />
            </div>
        </React.Fragment>
    )
};

export default LoaderComp;
