import React from 'react';

export default class FeedbackItem extends React.Component {
  render() {
    const {
      feedback
    } = this.props;

    return (
      <div className="actionz-item">
        {`${feedback.username} a évalué le résultat de cette mission a ${feedback.rating}/5, et a laissé comme commentaire : ${feedback.comment}.`}
      </div>
    );
  }
}
