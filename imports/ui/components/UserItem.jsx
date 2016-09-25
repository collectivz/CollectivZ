import React from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';

import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';

export default class UserItem extends React.Component {

  constructor(props) {
    super(props);

    this.toggleButton = this.toggleButton.bind(this);
  }

  onClick(dest) {
    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );
  }

  toggleButton() {
    const { type, user } = this.props;

    switch (type) {
      case 'invitation':
        return (
          <div>
            <button onClick={this.props.acceptInvite.bind(this, user._id)}>Accepter</button>
            <button onClick={this.props.refuseInvite.bind(this, user._id)}>Refuser</button>
          </div>
      )
      case 'createGroup':
        return (
          <div>
            <button onClick={this.props.addToNewGroup.bind(this, user._id)}>Ajouter</button>
            <button onClick={this.props.removeFromNewGroup.bind(this, user._id)}>Enlever</button>
          </div>
      )
      case 'manageGroup':
        if (_.contains(this.props.currentState.newGroup, user._id)) {
          return (
            <button onClick={this.props.removeFromGroup.bind(this, user._id)}>Enlever</button>
          )
        } else {
          return (
              <button onClick={this.props.addToGroup.bind(this, user._id)}>Ajouter</button>
          )
        }
      case 'contact':
        return (
          <button onClick={this.props.removeContact.bind(this, user._id)}>Supprimer</button>
        )
      default:
        return ;
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div className="list-item touch-event">
      <TouchEvent onClick={ () => { this.onClick(`/user/${user._id}`) } }>
          <img src={user.profile.avatar} alt="" />
      </TouchEvent>
          <div className="list-item-content">
              <p className="title">{user.username}</p>
          </div>
          {this.toggleButton()}
          <i className="icon icon-3x icon-chevron-right"/>
        </div>
    );
  }
}
