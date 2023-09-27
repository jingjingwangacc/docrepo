import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProjectInfo from '../../components/SubmitPage/ProjectInfo';
import Reviewer from '../../components/SubmitPage/Reviewer';
import AddFile from '../../components/SubmitPage/AddFile';
import ActionButtons from '../../components/SubmitPage/ActionButtons';
import { setProjectName, setClientName, setDescription, setDeadline, setReviewer, addReviewer, deleteReviewer, addFile, setFileUploadCompleted, deleteFile } from '../../slice/submitSlice';

const SubmitContainer = () => {
    // add pertinent state here
    const pageState = useSelector(state => state.submit);
    const dispatch = useDispatch();

    const handleChangeProjectName = (e) => {
        dispatch(setProjectName(e.target.value));
    };

    const handleChangeClientName = (e) => {
        dispatch(setClientName(e.target.value));
    };

    const handleChangeDescription = (e) => {
        dispatch(setDescription(e.target.value));
    };

    const handleChangeDeadline = (e) => {
        dispatch(setDeadline(e.target.value));
    };

    const handleChangeReviewer = (e) => {
        dispatch(setReviewer(e.target.value));
    };

    const handleAddReviewer = () => {
        dispatch(addReviewer());
    };

    const handleDeleteReviewer = (index) => {
        dispatch(deleteReviewer(index));
    };

    const handleAddFile = (e) => {
        // 1. Get file object and its name.
        const fileObj = e.target.files[0];
        const fileName = fileObj.name;
        console.log(fileObj);
        console.log(fileName);

        // 2. Update state.
        dispatch(addFile(fileName));

        //3. Post to server
        let formData = new FormData();
        formData.append("file", fileObj);

        fetch('/api/file', {
            method: "POST",
            body: formData,
        })
            // 4. When upload completed, change state again
            .then(res => res.json())
            .then(res => {
                console.log("Completed: ", res);
                dispatch(setFileUploadCompleted(
                    {
                        fileName: fileName,
                        fileId: res.fileId
                    }));
            });

    }

    const handleDeleteFile = (index) => {
        dispatch(deleteFile(index));
    }

    const handleSubmit = () => {
        fetch('/api/submission', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: 1,
                projectName: pageState.projectName,
                clientName: pageState.clientName,
                deadline: pageState.deadline,
                submissionDescription: pageState.description,
                reviewerNameList: pageState.reviewerList,
                fileList: pageState.fileList
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    const handleCancel = () => {

    }


    return (
        <div className="submitContainer">
            <ProjectInfo
                projectName={pageState.projectName} handleChangeProjectName={handleChangeProjectName}
                clientName={pageState.clientName} handleChangeClientName={handleChangeClientName}
                description={pageState.description} handleChangeDescription={handleChangeDescription}
                deadline={pageState.deadline} handleChangeDeadline={handleChangeDeadline} />
            <Reviewer
                reviewerList={pageState.reviewerList}
                newReviewer={pageState.newReviewer}
                handleChangeReviewer={handleChangeReviewer}
                handleAddReviewer={handleAddReviewer}
                handleDeleteReviewer={handleDeleteReviewer}
            />
            <AddFile
                fileList={pageState.fileList}
                handleAddFile={handleAddFile}
                handleDeleteFile={handleDeleteFile}
            />
            <ActionButtons handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
};

export default SubmitContainer;
