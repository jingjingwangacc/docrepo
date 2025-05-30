import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreateNewButton from '../../components/HomePage/CreateNewButton';
import IncomingSubmission from '../../components/HomePage/IncomingSubmission';
import OutgoingReadySubmission from '../../components/HomePage/OutgoingReadySubmission';
import OutgoingPendingSubmission from '../../components/HomePage/OutgoingPendingSubmission';
import { setSubmissionLists } from '../../slice/homeSlice'
import { useHistory } from "react-router-dom";
import HeadBar from "../../components/HeadBar"

const HomeContainer = (props) => {
    const loginState = useSelector(state => state.login);
    const pageState = useSelector(state => state.home);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        console.log("Login state: ", loginState);
        if (!loginState.loggedIn) {
            // Not logged in, go to log in page.
            history.push('/login');
        }
        fetch('/api/submission/userrelated/' + loginState.userId)
            .then(res => res.json())
            .then(res => {
                console.log("Received submissions: ", res);

                // For outgoing submissions authored by this user,
                // group them by whether they are ready to submit.
                // Ready means "reviewer list == approved reviewer list".
                const outgoingReady = [];
                const outgoingPending = [];
                for (let i = 0; i < res.outgoingSubmissions.length; ++i) {
                    const submission = res.outgoingSubmissions[i];
                    if (submission.reviewerIds.length === submission.approvedReviewerIds.length) {
                        outgoingReady.push(submission);
                    } else {
                        outgoingPending.push(submission);
                    }
                }

                dispatch(setSubmissionLists({
                    incomingSubmissionList: res.incomingSubmissions,
                    outgoingReadySubmissionList: outgoingReady,
                    outgoingPendingSubmissionList: outgoingPending
                }));
            });
    }, []);

    const handleCreateNewClick = () => {
        history.push("/submit");
    }

    return (
        <div className="mainContainer">
            <HeadBar />
            <div className="homeContainer">
                <CreateNewButton handleCreateNewClick={handleCreateNewClick} />
                <IncomingSubmission submissionList={pageState.incomingSubmissionList} />
                <OutgoingReadySubmission submissionList={pageState.outgoingReadySubmissionList} />
                <OutgoingPendingSubmission submissionList={pageState.outgoingPendingSubmissionList} />
            </div>
        </div>
    );
};

export default HomeContainer;
