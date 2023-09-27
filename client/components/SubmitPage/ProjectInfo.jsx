import React from 'react';

const ProjectInfo = props => {
  return (
    <div className='submitComponent'>
      <div className="submitTitle">
        <label className='submitTitleLabel'>Project Info</label>
      </div>
      <div className='labeledInput'>
        <label className='submitLabel'>Project Name</label>
        <input className='submitInput' onChange={(e) => props.handleChangeProjectName(e)} value={props.projectName}></input>
      </div>
      <div className='labeledInput'>
        <label className='submitLabel'>Client Name</label>
        <input className='submitInput' onChange={(e) => props.handleChangeClientName(e)} value={props.clientName}></input>
      </div>
      <div className='labeledInput'>
        <label className='submitLabel'>Description</label>
        <input className='submitInput' onChange={(e) => props.handleChangeDescription(e)} value={props.description}></input>
      </div>
      <div className='labeledInput'>
        <label className='submitLabel'>Deadline</label>
        <input className='submitInput' onChange={(e) => props.handleChangeDeadline(e)} value={props.deadline}></input>
      </div>

    </div >
  );
};

export default ProjectInfo;
