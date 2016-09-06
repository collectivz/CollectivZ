import React from 'react';
import { Link } from 'react-router';

import './ChannelItem.css';

export default class UserItem extends React.Component {
  render() {
    const {
      user
    } = this.props;

    return (
      <div className="item-avatar item-icon-right item item-complex item-right-editable">
        <Link className="item-content" to={`/user/${user._id}`}>
          <img src={user.profile.avatar} alt="/img/no-user.png" />
          <h2>{user.username}</h2>
          <i className="fa fa-chevron-right fa-accessory"></i>
        </Link>
      </div>
    );
  }
}
