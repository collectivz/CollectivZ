import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import TouchEvent                               from './TouchEvent';
import { Router, Route, Link, browserHistory }  from 'react-router';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';


export default class TeamItem extends React.Component {

  constructor(props) {
      super(props);

      this.removeTeam = this.removeTeam.bind(this);
      this.createConversation = this.createConversation.bind(this);
      this.toggleButton = this.toggleButton.bind(this);
  }

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  createConversation(e) {
    e.preventDefault();
    Meteor.call('channels.conversationCreate', this.props.teamSelected.members, this.props.teamSelected._id);
  }

  removeTeam(e) {
    e.preventDefault();
    teamId = this.props.teamSelected._id;
    Meteor.call('teams.remove', teamId);
  }

  toggleButton() {
    if (this.props.teamSelected.channel) {
      return (
        <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/conversation/${this.props.teamSelected.channel}`) } }>
          <button>Voir conversation</button>
        </TouchEvent>
      )
    } else {
      return  <button onClick={this.createConversation}>Creer conversation</button>;
    }
  }

  render() {
    const {
      teamSelected
    } = this.props;

    return (
      <div>
        <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/team/${teamSelected._id}`) } }>
        {
          teamSelected.name ?
            <h3>{teamSelected.name}</h3>
            :
            <h3>Sans nom</h3>
        }
        </TouchEvent>
        <button onClick={this.removeTeam}>Supprimer</button>
        {this.toggleButton()}
      </div>
    );
  }
}

TeamItem.propTypes = {
  teamSelected: PropTypes.object.isRequired,
};
