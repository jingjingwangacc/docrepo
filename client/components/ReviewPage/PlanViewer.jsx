import React from 'react';

const PlanViewer = props => {
  const plans = [];
  for (let i = 0; i < props.fileList.length; ++i) {
    plans.push((
      <div className='reviewOneFile'>
        <div className='reviewOneFileName'>
          <h3>{props.fileList[i].fileName}</h3>
        </div>
        <object className='reviewPdfViewer' data={"/" + props.fileList[i].pendingPath} type="application/pdf" />
      </div>
    ));
  }
  return (
    <div className='reviewPlans'>
      {plans}
    </div >
  );
};

export default PlanViewer;
