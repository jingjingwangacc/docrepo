import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    submissionId: "",
    authorName: "",
    projectName: "",
    clientName: "",
    description: "",
    deadline: "",
    reviewerList: [],
    fileList: [],
    showFile: [],
    commentList: [],
    newComment: ""
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setSubmissionInfo: (state, { payload: newInfo }) => {
            Object.assign(state, newInfo);
            // Add the "showFile" state.
            for (let i = 0; i < state.fileList.length; ++i) {
                state.showFile[i] = false;
            }
        },
        toggleShowFile: (state, { payload: fileIndex }) => {
            console.log("Toggle: ", fileIndex);
            if (state.showFile[fileIndex]) {
                state.showFile[fileIndex] = false;
            } else {
                state.showFile[fileIndex] = true;
            }
        },
        setNewComment: (state, { payload: newComment }) => {
            state.newComment = newComment;
        }
    }
});

export const { setSubmissionInfo, toggleShowFile, setNewComment } = reviewSlice.actions

export default reviewSlice.reducer