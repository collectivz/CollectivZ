import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

// import { Chans } from '../../api/channels.js';
import SubChannelItem from '../subChannelItem/SubChannelItem.jsx';
import BeerItem from '../beerItem/BeerItem.jsx';
import './MsgItem.css';

export default class MsgItem extends Component {

  constructor(props) {
    super(props);

  }

  isMine () {

    if (Meteor.userId() === this.props.msg.author) {
      return 'message message-mine';
    } else {
      return 'message message-other';
    }
  }

  userAvatar(userId) {
    let user;
    if (userId === Meteor.userId) {
      user = Meteor.user();
    } else {
      user = Meteor.users.findOne(userId);
    }
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/no-user.png'
    }

  }

  renderType() {
    switch(this.props.msg.type) {
      case 'channel':
        return (<SubChannelItem url={this.props.msg.url}/>);
      case 'beer':
        return (<BeerItem beerId={this.props.msg.beerId}/>);
      case 'poll':
        return (<PollItem pollId={this.props.msg.beerId}/>);
      default:
        break;
    }
  }

  render() {
    return (
      <div className="message-wrapper">
        <div className={this.isMine()}>
          <div className="message-header">
            <span className="message-user">
              { this.props.msg.type
                ? 'Zorro'
                : Meteor.users.findOne(this.props.msg.author).username }
            </span>
          </div>
          <div className="text">
              <p>{this.props.msg.text}</p>
            { this.props.msg.type
              ? this.renderType()
              : ''}

          </div>
          <span className="picture">
            <img src={ this.props.msg.type
                        ? '/img/zorro.jpg'
                        : this.userAvatar(this.props.msg.author)
                      } alt="" />
          </span>
        </div>
      </div>
    );
  }
}

MsgItem.propTypes = {
  msg: PropTypes.object.isRequired,
}
