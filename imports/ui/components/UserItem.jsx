import React from 'react';
import { Router, Route, Link, browserHistory }  from 'react-router';

import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';

export default class dataItem extends React.Component {

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
    const { type, data } = this.props;

    switch (type) {
      case 'invitation':
        return (
          <div>
            <button onClick={this.props.acceptInvite.bind(this, data._id)}>Accepter</button>
            <button onClick={this.props.refuseInvite.bind(this, data._id)}>Refdata</button>
          </div>
      )
      case 'createGroup':
        return (
          <div>
            <button onClick={this.props.addToNewGroup.bind(this, data._id)}>Ajouter</button>
            <button onClick={this.props.removeFromNewGroup.bind(this, data._id)}>Enlever</button>
          </div>
      )
      case 'manageGroup':
        if (_.contains(this.props.currentState.newGroup, data._id)) {
          return (
            <button onClick={this.props.removeFromGroup.bind(this, data._id)}>Enlever</button>
          )
        } else {
          return (
              <button onClick={this.props.addToGroup.bind(this, data._id)}>Ajouter</button>
          )
        }
      case 'contact':
        return (
          <button onClick={this.props.removeContact.bind(this, data._id)}>Supprimer</button>
        )
      case 'admin':
        return (
          <button onClick={this.props.removeAdmin.bind(this, data._id)}>Rétrograder</button>
        );
      default:
        return ;
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div className="list-item touch-event">
      <TouchEvent onClick={ () => { this.onClick(`/data/${data._id}`) } }>
          <img src={data.profile.avatar} alt="" />
      </TouchEvent>
          <div className="list-item-content">
              <p className="title">{data.username}</p>
          </div>
          {this.toggleButton()}
        </div>
    );
  }
}
