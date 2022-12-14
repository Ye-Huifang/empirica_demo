import React from "react";
import NineDots from "./NineDots";

export default class TaskResponse extends React.Component {
  handleCallback = (result) => {
    const { player } = this.props;
    player.round.set("value", result.complete);
    player.round.set("lines", result.lines);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderDots() {
    const { round } = this.props;
    return (
      <NineDots/>
    );
  }

  render() {
    const { player } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderDots()}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
