import React, { Component }                     from 'react';
import { Meteor }                               from 'meteor/meteor';
import { Router, Route, Link, browserHistory }  from 'react-router';
import { _ }                                    from 'meteor/underscore';

import TouchEvent                               from './TouchEvent';
import classNames                               from 'classnames';

export default class ConversationPageHeader extends Component {

  logout(){
    setTimeout( () => {
      Meteor.logout();
    }, 350);
  }

  onClick(dest) {
    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );
  }

  render() {

    const { channel } = this.props;

    return (
      <div className="breadcrumb">
        <TouchEvent class="back-button touch-event" onClick={ () => { this.onClick('/my-groups') } }>
          <i className="icon icon-3x icon-chevron-left"/>
        </TouchEvent>
        <h4 className="text">{`${channel.name}`}</h4>
        <TouchEvent class="logout-button touch-event" onClick={ this.logout }>
          <i className="icon icon-3x icon-exit"/>
        </TouchEvent>
      </div>
    );
  }
}
