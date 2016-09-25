import React from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';

import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';


export default class UserItem extends React.Component {

  onClick(dest) {
    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );
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
          {
            this.props.addToNewGroup ?
            <button onClick={this.props.addToNewGroup.bind(this, user._id)}>Ajouter</button>
            : ''
          }
          {
            this.props.removeFromNewGroup ?
            <button onClick={this.props.removeFromNewGroup.bind(this, user._id)}>Enlever</button>
            : ''
          }
          {
            this.props.acceptInvite ?
            <button onClick={this.props.acceptInvite.bind(this, user._id)}>Accepter</button>
            : ''
          }
          {
            this.props.refuseInvite ?
            <button onClick={this.props.refuseInvite.bind(this, user._id)}>Refuser</button>
            : ''
          }
          {
            this.props.removeAdmin ?
            <button onClick={this.props.removeAdmin.bind(this, user._id)}>Rétrograder</button>
            : ''
          }
          <i className="icon icon-3x icon-chevron-right"/>
        </div>
    );
  }
}
