import React from 'react';

const PlanViewer = props => {
  const plans = [];
  for (let i = 0; i < props.fileURLs.length; ++i) {
    plans.push((
      <div>
        <object data={"/" + props.fileURLs[i]} type="application/pdf" />
      </div>
    ));
  }
  return (
    <div>
      <h2>Plan Viewer</h2>
      {plans}
    </div >
  );
};

export default PlanViewer;
