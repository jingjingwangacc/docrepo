import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BasicInfo from '../../components/ReviewPage/BasicInfo';
import ProjectInfo from '../../components/ReviewPage/ProjectInfo';
import Reviewer from '../../components/ReviewPage/Reviewer';
import PlanViewer from '../../components/ReviewPage/PlanViewer';
import Comment from '../../components/ReviewPage/Comment';
import ActionButtons from '../../components/ReviewPage/ActionButtons';
import { setSubmissionInfo, toggleShowFile, setNewComment } from '../../slice/reviewSlice';
import HeadBar from "../../components/HeadBar"
import { useHistory } from "react-router-dom";

const ReviewContainer = (props) => {
    const loginState = useSelector(state => state.login);
    const pageState = useSelector(state => state.review);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!loginState.loggedIn) {
            // Not logged in, go to log in page.
            history.push('/login');
        }
        const submissionId = props.match.params.id;
        fetch('/api/submission/' + submissionId)
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
    }, []);

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
                userId: loginState.userId,
                submissionId: pageState.submissionId,
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
        <div className="mainContainer">
            <HeadBar />
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
        </div>
    );
};

export default ReviewContainer;
