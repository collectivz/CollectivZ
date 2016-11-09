import React from 'react';

export default class FeedbackItem extends React.Component {
  render() {
    const {
      feedback
    } = this.props;

    return (
      feedback ?
      <div className="chat-special-bubble chat-special-bubble-poll">
        <div className="bubble-content">
          <div className="bubble-header">
            <h4><i className="icon icon-feedback-color icon-star"/>{feedback.username} à laissé un feedback sur cette action :</h4>
          </div>
          <div className="bubble-content-text">
            <h4>
              {`${feedback.username} a évalué le résultat de cette mission a ${feedback.rating}/5`}
            </h4>
            <p> {`${feedback.comment}`}</p>
            {feedback.userFeedbacks.length ?
              <div>
              Les contributeurs suivants ont également été évalués :
              {feedback.userFeedbacks.map((feedback, index) => {
                return (
                  <p key={index}>
                  {`${feedback.username}: ${feedback.rating}/5, "${feedback.comment}"`}
                  </p>
                );
              })}
              </div>
              : ''
            }
          </div>
        </div>
      </div>
      : null
    );
  }
}
