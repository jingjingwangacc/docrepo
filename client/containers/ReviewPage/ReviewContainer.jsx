import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasicInfo from '../../components/ReviewPage/BasicInfo';
import ProjectInfo from '../../components/ReviewPage/ProjectInfo';
import Reviewer from '../../components/ReviewPage/Reviewer';
import PlanViewer from '../../components/ReviewPage/PlanViewer';
import Comment from '../../components/ReviewPage/Comment';
import ActionButtons from '../../components/ReviewPage/ActionButtons';
import { setSubmissionInfo, toggleShowFile, setNewComment } from '../../slice/reviewSlice';

const ReviewContainer = (props) => {
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
                    fileList: res.fileList,
                    commentList: res.commentList
                }));
            });
    })

    const handleSetNewComment = (e) => {
        dispatch(setNewComment(e.target.value));
    };

    const handleAddNewComment = () => {
        fetch('/api/comment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: 1,
                submissionId : pageState.submissionId,
                comment: pageState.newComment,
                resolved: false,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // Clear the new comment box.
                dispatch(setNewComment(''));
                // Render the updated submission with the new comment.
                // (backend returns the updated submission object)
                dispatch(setSubmissionInfo({
                    commentList: res.submission.commentList
                }));
            })
    }

    const handleToggle = (fileIndex) => {
        dispatch(toggleShowFile(fileIndex));
    }

    return (
        <div className='reviewContainer'>
            <BasicInfo
                submissionId={pageState.submissionId}
                authorName={pageState.authorName} />
            <div className='reviewProject'>
                <ProjectInfo
                    projectName={pageState.projectName}
                    clientName={pageState.clientName}
                    description={pageState.description}
                    deadline={pageState.deadline} />
                <Reviewer reviewerList={pageState.reviewerList} />
            </div>
            <PlanViewer
                fileList={pageState.fileList}
                showFile={pageState.showFile}
                handleToggle={handleToggle} />
            <Comment
                commentList={pageState.commentList}
                newComment={pageState.newComment}
                handleSetNewComment={handleSetNewComment}
                handleAddNewComment={handleAddNewComment} />
        </div>
    );
};

export default ReviewContainer;
