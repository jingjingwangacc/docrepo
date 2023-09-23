import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasicInfo from '../../components/ReviewPage/BasicInfo';
import ProjectInfo from '../../components/ReviewPage/ProjectInfo';
import Reviewer from '../../components/ReviewPage/Reviewer';
import PlanViewer from '../../components/ReviewPage/PlanViewer';
import Comment from '../../components/ReviewPage/Comment';
import ActionButtons from '../../components/ReviewPage/ActionButtons';
import { setSubmissionInfo } from '../../slice/reviewSlice';
// import from child components...

const ReviewContainer = (props) => {
    // add pertinent state here
    const pageState = useSelector(state => state.review);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pageState.loaded) {
            return;
        }
        fetch('/api/submission/' + props.match.params.id)
            .then(res => res.json())
            .then(res => {
                console.log("Received submission data: ", res);
                dispatch(setSubmissionInfo({
                    submissionId: res.submissionId,
                    authorName: res.authorName,
                    projectName: res.projectName,
                    clientName: res.clientName,
                    description: res.submissionDescription,
                    deadline: res.deadline,
                    reviewerList: res.reviewerNames,
                }));
            });
    })

    const handleComment = () => {
        dispatch(addComment());
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
            <BasicInfo
                submissionId={pageState.submissionId}
                authorName={pageState.authorName} />
            <ProjectInfo
                projectName={pageState.projectName}
                clientName={pageState.clientName}
                description={pageState.description}
                deadline={pageState.deadline} />
            <Reviewer reviewerList={pageState.reviewerList} />
            <PlanViewer />
            <Comment />
        </div>
    );
};

export default ReviewContainer;
