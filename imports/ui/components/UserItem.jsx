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
    const {
      type,
      data,
      circle,
      acceptInvite,
      refuseInvite,
      removeFromCircle,
      addToCircle,
      removeContact,
      removeAdmin
    } = this.props;

    switch (type) {
      case 'invitation':
        return (
          <div>
            <button className="button success" onClick={acceptInvite.bind(this, data._id)}>Accepter</button>
            <button className="button danger" onClick={refuseInvite.bind(this, data._id)}>Refuser</button>
          </div>
      )
      case 'createCircle':
        if (_.contains(circle, data._id)) {
          return (
            <button className="button danger" onClick={removeFromCircle.bind(this, data._id)}>Enlever</button>
          )
        } else {
          return (
            <button className="button success" onClick={addToCircle.bind(this, data._id)}>Ajouter</button>
          )
        }
      case 'contact':
        return (
          <button className="button danger" onClick={removeContact.bind(this, data._id)}>Supprimer</button>
        )
      case 'admin':
        return (
          <button className="button danger" onClick={removeAdmin.bind(this, data._id)}>Rétrograder</button>
        );
      case 'invitationSent':
        return (
          <p>Invitation en attente...</p>
        );
      default:
        return ;
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="list-item">
        <TouchEvent onClick={ () => { this.onClick(`/data/${user._id}`) } }>
            <img className="circle" src={data.imageUrl} alt="" />
        </TouchEvent>
        <div className="list-item-content">
            <p className="title">{data.username}</p>
        </div>
        <div className="list-item-action">
        {this.toggleButton()}
        </div>
      </div>
    );
  }
}
