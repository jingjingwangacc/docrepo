import React from 'react';

const AddFile = props => {
    const fileList = [];
    for (let i = 0; i < props.fileList.length; i++) {
        fileList.push((
            <div className='submitFile'>
                <label>{props.fileList[i].fileName}</label>
                <div className='submitFileStateAndButton'>
                    <label className='submitFileState'>{props.fileList[i].uploadCompleted ? "[Uploaded]" : "[Uploading...]"}</label>
                    <button className='removeButton' onClick={() => props.handleDeleteFile(i)}>X</button>
                </div>
            </div>));
    }
    return (
        <div className='submitComponent'>
            <div className="submitTitle">
                <label className='submitTitleLabel'>Files to Submit</label>
            </div>
            <label className='fileUpload'>
                <input className='fileUploadButton' type="file" onChange={(e) => props.handleAddFile(e)}></input>
                Upload File
            </label>
            <div className='submitFileList'>
                {fileList}
            </div>

        </div >
    );
};

export default AddFile;
