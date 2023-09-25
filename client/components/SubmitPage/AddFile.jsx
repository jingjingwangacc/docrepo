import React from 'react';

const AddFile = props => {
    const fileList = [];
    for (let i = 0; i < props.fileList.length; i++) {
        fileList.push((
            <div>
                <label>{props.fileList[i].fileName}</label>
                <label>{props.fileList[i].uploadCompleted ? "[Uploaded]" : "[Uploading...]"}</label>
                <button onClick={() => props.handleDeleteFile(i)}>-</button>
            </div>));
    }
    return (
        <div>
            <label>Files to submit:</label>
            <div>
                <input type="file" onChange={(e) => props.handleAddFile(e)}></input>
            </div>
            <div>
                {fileList}
            </div>

        </div >
    );
};

export default AddFile;
