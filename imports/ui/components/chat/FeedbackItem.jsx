import React from 'react';

export default class FeedbackItem extends React.Component {
  render() {
    const {
      feedback
    } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-poll">
        <div className="bubble-content">
          <i className="big-icon icon icon-star"/>
          <div className="bubble-header">
            <i className="icon icon-star"/>
            <span>Nouveau FeedbackZ !</span>
          </div>
          {`${feedback.username} a évalué le résultat de cette mission a ${feedback.rating}/5, et a laissé comme commentaire : ${feedback.comment}.`} <br />
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
    );
  }
}
