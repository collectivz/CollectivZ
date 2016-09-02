import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { _ } from 'meteor/underscore';

export default class ChannelPageHeader extends Component {

  constructor(props) {
    super(props);

    this.isWorker = this.isWorker.bind(this);
    this.seekFeedback = this.seekFeedback.bind(this);
    this.becomeWorker = this.becomeWorker.bind(this);
    this.setAsFinished = this.setAsFinished.bind(this);
  }

  isWorker() {
    return _.contains(this.props.channel.workers, Meteor.userId());
  }

  seekFeedback() {
    Meteor.call('channels.seekFeedback', this.props.channel._id);
  }

  becomeWorker() {
    Meteor.call('channels.becomeWorker', this.props.channel._id);
  }

  setAsFinished() {
    Meteor.call('channels.setAsFinished', this.props.channel._id);
  }

  render() {
    const {
      channel,
      guild,
    } = this.props;

    return (
      <div className="top-nav">
        <Link className="tweakChevron" to={'/my-groups'}><i className="fa fa-chevron-left"></i></Link>
        <div className="title">
          <h2>{`groupe ${channel.name} de la guilde ${guild.name}`}</h2>
        </div>
        {channel.status ? <p>{channel.status} </p> : ''}
        {channel.reward ?
          <div>
            {channel.reward.experience ? <p> | XP : {channel.reward.experience} </p> : ''}
            {channel.reward.points ? <p> | CoinZ : {channel.reward.points}</p> : ''}
          </div>
          : ''
        }
        {channel.status === 'ongoing' ?
          this.isWorker() ?
            <button onClick={this.seekFeedback}>Marquer comme finie</button>
            : <button onClick={this.becomeWorker}>Travailler sur cette mission</button>
          : ''
        }
        <button onClick={this.setAsFinished}>Clore la mission</button>
      </div>
    );
  }
}
