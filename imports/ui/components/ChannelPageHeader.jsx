import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class ChannelPageHeader extends Component {

  render() {
    const {
      channel,
      guild,
    } = this.props;

    return (
      <div className="top-nav">
        <Link to={'/my-groups'}><i className="fa fa-chevron-left"></i></Link>
        <div className="title">
          <h2>{`groupe ${channel.name} de la guilde ${guild.name}`}</h2>
        </div>
        {channel.status ? <p>{channel.status} </p> : ''}
        {channel.reward.experience ? <p> | XP : {channel.reward.experience} </p> : ''}
        {channel.reward.points ? <p> | CoinZ : {channel.reward.points}</p> : ''}
      </div>
    );
  }
}
