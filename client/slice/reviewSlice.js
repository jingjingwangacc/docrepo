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
    fileList: [],
    showFile: [],
    comments: []
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
            state.loaded = true;
        },
        toggleShowFile: (state, { payload: fileIndex }) => {
            if (state.fileList[fileIndex].show) {
                state.fileList[fileIndex].show = false;
            } else {
                state.fileList[fileIndex].show = true;
            }
        }
    }
});

export const { setSubmissionInfo, toggleShowFile } = reviewSlice.actions

export default reviewSlice.reducer