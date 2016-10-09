import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import TouchEvent                               from './TouchEvent';
import { Router, Route, Link, browserHistory }  from 'react-router';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';

import { Toast }         from '../helpers/Toast';
import { openModal }         from '../helpers/Modal';

export default class CircleItem extends React.Component {

  constructor(props) {
      super(props);

      this.removeCircle = this.removeCircle.bind(this);
      this.createConversation = this.createConversation.bind(this);
      this.toggleConversationButton = this.toggleConversationButton.bind(this);
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
      } else {
        Toast('Conversation créée', "success");
        this.context.router.push(`/conversation/${res}`);
      }
    });
  }

  removeCircle(e) {
    e.preventDefault();
    const {
      data
    } = this.props;

    Meteor.call('circles.remove', data._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        Toast(`Le cercle a bien été supprimé.`, "success");
      }
    });
  }

  toggleConversationButton() {
    const {
      data
    } = this.props;
    const {
      router
    } = this.context;

    if (data.channel) {
      return (
        <button onClick={() => { router.push(`/conversation/${data.channel}`) }}>Voir conversation</button>
      );
    } else {
      return  <button onClick={this.createConversation}>Creer conversation</button>;
    }
  }

  render() {
    const {
      data,
      editCircle
    } = this.props;

    return (
      <div>
        <TouchEvent class="list-item touch-event">
          <h3>{data.name}</h3>
        </TouchEvent>
        <button onClick={this.removeCircle}>Supprimer</button>
        <button onClick={editCircle.bind(this, data)}>Modifier</button>
        {this.toggleConversationButton()}
      </div>
    );
  }
}

CircleItem.contextTypes = {
  router: PropTypes.object
};

// CircleItem.propTypes = {
//   data: PropTypes.object.isRequired,
// };
