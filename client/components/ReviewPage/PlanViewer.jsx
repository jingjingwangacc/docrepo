import React from 'react';

const PlanViewer = props => {
  const plans = [];
  for (let i = 0; i < props.fileURLs.length; ++i) {
    plans.push((
      <div>
        <object className='reviewPdfViewer' data={"/" + props.fileURLs[i]} type="application/pdf" />
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
