import React from 'react';

const ProjectInfo = props => {
  return (
    <div>
      <label>Project Info</label>
      <div>
        <label>Project Name</label>
        <input onChange={(e) => props.handleChangeProjectName(e)} value={props.projectName}></input>
      </div>
      <div>
        <label>Client Name</label>
        <input onChange={(e) => props.handleChangeClientName(e)} value={props.clientName}></input>
      </div>
      <div>
        <label>Description</label>
        <input onChange={(e) => props.handleChangeDescription(e)} value={props.description}></input>
      </div>
      <div>
        <label>Deadline</label>
        <input onChange={(e) => props.handleChangeDeadline(e)} value={props.deadline}></input>
      </div>

    </div >
  );
};

export default ProjectInfo;
