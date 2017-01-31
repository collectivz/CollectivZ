import React from 'react';
import Rating from 'react-rating';

export default class FeedbackItem extends React.Component {

  render() {
    const {
      feedback,
      channel,
    } = this.props;

    return (
      feedback ?
        <div className="chat-special-bubble chat-special-bubble-poll">
          <div className="bubble-content">
            <div className="bubble-header">
              <i className="icon icon-feedback-color icon-star" />
              <span><a href="">{feedback.username}</a> à laissé un feedback</span>
              <h5>{`${feedback.comment}`}</h5>
            </div>
            <div className="bubble-content-text">
              <h5>
                <Rating
                  readonly
                  initialRate={feedback.rating}
                  empty={<i className="icon icon-star" />}
                  full={<i className="icon icon-star" />}
                />
              </h5>
              {feedback.userFeedbacks.length ?
                <div>
                  <h5>Les contributeurs suivants ont également été évalués</h5>
                  {feedback.userFeedbacks.map((feedback, index) => (
                    <p key={index}>
                      <span className="b">{`${feedback.username} ${feedback.rating}/5`}</span>
                      {feedback.comment}
                    </p>
                ))}
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
