import React from 'react';

const ProjectInfo = props => {
  return (
    <div className='reviewProjectInfo'>
      <label className='reviewLabel1'>Project Info</label>
      <div>
        <label reviewLabel2>Project Name: </label>
        <span>{props.projectName}</span>
      </div>
      <div>
        <label>Client Name: </label>
        <span>{props.clientName}</span>
      </div>
      <div>
        <label>Description: </label>
        <span>{props.description}</span>
      </div>
      <div>
        <label>Deadline: </label>
        <span>{props.deadline}</span>
      </div>

    </div >
  );
};

export default ProjectInfo;
