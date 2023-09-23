import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projectName: "",
    clientName: "",
    description: "",
    deadline: "",
    reviewerList: [],
    newReviewer: "",
};
const submitSlice = createSlice({
    name: 'newSubmit',
    initialState,
    reducers: {
        setProjectName: (state, {payload: newProjectName}) => {
           state.projectName = newProjectName;
        //    console.log('called: ', newProjectName);
        },
        setClientName: (state, {payload: newClientName}) => {
            state.clientName = newClientName;
         },
         setDescription: (state, {payload: newDescription}) => {
            state.description = newDescription;
         },
         setDeadline: (state, {payload: newDeadline}) => {
            state.deadline = newDeadline;
         },
         setReviewer: (state, {payload: newReviewer}) => {
            state.newReviewer = newReviewer;
         },
         addReviewer: (state) => {
            state.reviewerList.push(state.newReviewer);
            state.newReviewer = "";
         },
    }
});

export const {setProjectName, setClientName, setDescription, setDeadline, setReviewer, addReviewer } = submitSlice.actions

export default submitSlice.reducer