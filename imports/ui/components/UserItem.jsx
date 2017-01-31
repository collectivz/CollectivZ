import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import TouchEvent from './TouchEvent';
import classNames from 'classnames';
import { _ } from 'meteor/underscore';

export default class UserItem extends React.Component {

  constructor(props) {
    super(props);

    this.toggleButton = this.toggleButton.bind(this);
  }

  onClick(dest) {
    setTimeout(() => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350);
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
      removeAdmin,
      goToProfile,
    } = this.props;

    switch (type) {
      case 'invitation':
        return (
          <div className="merge">
            <button className="button success" onClick={acceptInvite.bind(this, data._id)}><i className="icon icon-check" /></button>
            <button className="button danger" onClick={refuseInvite.bind(this, data._id)}><i className="icon icon-cross" /></button>
          </div>
        );
      case 'createCircle':
        if (_.contains(circle, data._id)) {
          return (
            <button className="button only-icon danger" onClick={removeFromCircle.bind(this, data._id)}><i className="icon icon-cross" /></button>
          );
        }
        return (
          <button className="button only-icon success" onClick={addToCircle.bind(this, data._id)}><i className="icon icon-check" /></button>
        );

      case 'contact':
        return (
          <div>
            <button className="button only-icon success" onClick={goToProfile.bind(this, `/profile/${data._id}`)}>Voir le profil</button>
            <button className="button only-icon danger" onClick={removeContact.bind(this, data._id)}><i className="icon icon-cross" /></button>
          </div>
        );
      case 'admin':
        return (
          <button className="button only-icon danger" onClick={removeAdmin.bind(this, data._id)}>Rétrograder</button>
        );
      case 'invitationSent':
        return (
          <p>En attente...</p>
        );
      default:

    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="list-item">
        <TouchEvent onClick={() => { this.onClick(`/data/${user._id}`); }}>
          <img className="circle" src={data.imageUrl} alt="" />
        </TouchEvent>
        <div className="list-item-content">
          <p className="title">{data.username}</p>
          <p className="text type">{(data.hero && data.hero.title) ? data.hero.title : ''}</p>
        </div>
        <div className="list-item-action">
          {this.toggleButton()}
        </div>
      </div>
    );
  }
}

UserItem.contextTypes = {
  router: React.PropTypes.object,
};
