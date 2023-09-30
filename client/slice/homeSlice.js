import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomingSubmissionList: [],
    outgoingReadySubmissionList: [],
    outgoingPendingSubmissionList: []
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSubmissionLists: (state, { payload: submissionLists }) => {
            state.incomingSubmissionList = submissionLists.incomingSubmissionList;
            state.outgoingReadySubmissionList = submissionLists.outgoingReadySubmissionList;
            state.outgoingPendingSubmissionList = submissionLists.outgoingPendingSubmissionList;
        },
    }
});

export const { setSubmissionLists } = homeSlice.actions

export default homeSlice.reducer