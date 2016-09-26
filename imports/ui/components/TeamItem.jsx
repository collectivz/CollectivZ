import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import TouchEvent                               from './TouchEvent';
import { Router, Route, Link, browserHistory }  from 'react-router';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';

import { Toast }         from '../helpers/Toast';

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
    const {
      data
    } = this.props;

    Meteor.call('channels.conversationCreate', data.members, data._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  removeTeam(e) {
    e.preventDefault();
    const {
      data
    } = this.props;

    Meteor.call('teams.remove', data._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast(`Le cercle a bien été supprimé.`);
      }
    });
  }

  toggleButton() {
    const {
      data
    } = this.props;

    if (data.channel) {
      return (
        <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/conversation/${data.channel}`) } }>
          <button>Voir conversation</button>
        </TouchEvent>
      )
    } else {
      return  <button onClick={this.createConversation}>Creer conversation</button>;
    }
  }

  render() {
    const {
      data
    } = this.props;

    return (
      <div>
        <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/team/${data._id}`) } }>
        {
          data.name ?
            <h3>{data.name}</h3>
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

// TeamItem.propTypes = {
//   data: PropTypes.object.isRequired,
// };
