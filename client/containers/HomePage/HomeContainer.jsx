import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserBar from '../../components/HomePage/UserBar';
import CreateNewButton from '../../components/HomePage/CreateNewButton';
import IncomingSubmission from '../../components/HomePage/IncomingSubmission';
import OutgoingReadySubmission from '../../components/HomePage/OutgoingReadySubmission';
import OutgoingPendingSubmission from '../../components/HomePage/OutgoingPendingSubmission';

const HomeContainer = (props) => {
    const pageState = useSelector(state => state.home);
    const dispatch = useDispatch();

    return (
        <div className="homeContainer">
            <UserBar />
            <CreateNewButton />
            <IncomingSubmission submissionList={pageState.incomingSubmissionList} />
            <OutgoingReadySubmission submissionList={pageState.outgoingReadySubmissionList} />
            <OutgoingPendingSubmission submissionList={pageState.outgoingPendingSubmissionList} />
        </div>
    );
};

export default HomeContainer;
