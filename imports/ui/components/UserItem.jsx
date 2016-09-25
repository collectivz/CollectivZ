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
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/user/${user._id}`) } }>
          <img src={user.profile.avatar} alt="" />
          <div className="list-item-content">
              <p className="title">{user.username}</p>
          </div>
      </TouchEvent>
    );
  }
}
