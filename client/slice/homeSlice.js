import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loaded: false,
    userId: -1,
    userName: "",
    incomingSubmissionList: [],
    outgoingReadySubmissionList: [],
    outgoingPendingSubmissionList: []
};
const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSubmissionLists: (state, { payload: submissionLists }) => {
            if (submissionLists.incomingSubmissionList) {
                incomingSubmissionList = submissionLists.incomingSubmissionList;
            }
            if (submissionLists.outgoingReadySubmissionList) {
                outgoingReadySubmissionList = submissionLists.outgoingReadySubmissionList;
            }
            if (submissionList.outgoingPendingSubmissionList) {
                outgoingPendingSubmissionList = submissionList.outgoingPendingSubmissionList;
            }
        },
    }
});

export const { setSubmissionLists } = homeSlice.actions

export default homeSlice.reducer