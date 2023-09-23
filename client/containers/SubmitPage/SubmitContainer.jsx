import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectInfo from '../../components/SubmitPage/ProjectInfo';
import Reviewer from '../../components/SubmitPage/Reviewer';
import ActionButtons from '../../components/SubmitPage/ActionButtons';
import {setProjectName, setClientName, setDescription, setDeadline, setReviewer, addReviewer, deleteReviewer } from '../../slice/slice';
// import from child components...

const SubmitContainer = () => {
    // add pertinent state here
    const pageState = useSelector(state => state.submit);
    const dispatch = useDispatch();

    const handleChangeProjectName = (e) => {
        dispatch(setProjectName(e.target.value));
    };

    const handleChangeClientName = (e) => {
        dispatch(setClientName(e.target.value));
    };

    const handleChangeDescription = (e) => {
        dispatch(setDescription(e.target.value));
    };

    const handleChangeDeadline = (e) => {
        dispatch(setDeadline(e.target.value));
    };

    const handleChangeReviewer = (e) => {
        dispatch(setReviewer(e.target.value));
    };

    const handleAddReviewer = () => {
        dispatch(addReviewer());
    };

    const handleDeleteReviewer = (index) => {
        dispatch(deleteReviewer(index));
    };

    const handleSubmit = () => {
        fetch('/api/submission', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: 1,
                projectName: pageState.projectName,
                clientName: pageState.clientName,
                deadline: pageState.deadline,
                submissionDescription: pageState.description,
                reviewerNameList: pageState.reviewerList
            
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    const handleCancel = () => {

    }


    return (
        <div className="mainContainer">
            <ProjectInfo
                projectName={pageState.projectName} handleChangeProjectName={handleChangeProjectName}
                clientName={pageState.clientName} handleChangeClientName={handleChangeClientName}
                description={pageState.description} handleChangeDescription={handleChangeDescription}
                deadline={pageState.deadline} handleChangeDeadline={handleChangeDeadline} />
            <Reviewer
            reviewerList={pageState.reviewerList}
            newReviewer={pageState.newReviewer}
            handleChangeReviewer={handleChangeReviewer}
            handleAddReviewer={handleAddReviewer}
            handleDeleteReviewer={handleDeleteReviewer}
            />
            <ActionButtons handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
};

export default SubmitContainer;
