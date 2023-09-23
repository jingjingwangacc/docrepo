import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loaded: false,
    submissionId: "",
    authorName: "",
    projectName: "",
    clientName: "",
    description: "",
    deadline: "",
    reviewerList: [],
    comments: []
};
const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setSubmissionInfo: (state, { payload: newInfo }) => {
            Object.assign(state, newInfo);
            state.loaded = true;
        },
    }
});

export const { setSubmissionInfo } = reviewSlice.actions

export default reviewSlice.reducer