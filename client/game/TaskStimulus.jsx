import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    return (
      <div className="task-stimulus">
        <p>Please try to connect all the nine dots with at most four connected straight lines.</p>
        <p>Note that you cannot lift the pen.</p>
        <p>Press "Submit" to submit your result.</p>
      </div>
    );
  }
}
