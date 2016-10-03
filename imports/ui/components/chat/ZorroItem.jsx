import React, { Component, PropTypes }    from 'react';
import ReactDOM                           from 'react-dom';
import { Meteor }                         from 'meteor/meteor';


export default class ZorroItem extends Component {

  constructor(props) {
    super(props);

    this.isMine = this.isMine.bind(this);
    this.userAvatar = this.userAvatar.bind(this);
    this.getName = this.getName.bind(this);
  }

  isMine () {
    if (this.props.message.author === 'self') {
      return 'chat-bubble chat-bubble-mine';
    } else {
      return 'chat-bubble chat-bubble-other';
    }
  }

  userAvatar() {
    if (this.props.message.author === 'self') {
      const user = Meteor.user();
      return user.profile.avatar;
    } else {
      return '/img/zorro.jpg'
    }
  }

  getName() {
    if (this.props.message.author === 'self') {
      const user = Meteor.user();
      return user.username;
    } else {
      return 'Zorro';
    }
  }

  render() {
    const {
      message,
      answerToZorro,
      choices
    } = this.props;

    return (
      <div className={this.isMine()}>
          <img src={this.userAvatar(message.author)}/>
          <div className="bubble-content">
              <div className="bubble-content-header">
                  <span className="name">{this.getName()}</span>
              </div>
              <p className="text">
                {message.text}
              </p>
              {
                message.author === 'Zorro' ?
                <form>
                  {choices.map((choice, index) => {
                    return (<button className="button primary" onClick={answerToZorro.bind(this, choice)} key={index}>{choice}</button>);
                  })}
                </form>
                :
                  ''
              }
          </div>
      </div>
    );
  }
}


ZorroItem.propTypes = {
  message: PropTypes.object.isRequired,
}
