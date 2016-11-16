import React from 'react';

import SmallUserItem from './SmallUserItem';
import List from './List';

export default class ChannelInfo extends React.Component {
  render() {
    const {
      group,
      channel,
      users
    } = this.props;

    return (
      <div>
        {
          group._id !== channel._id ?
          <p className="sub-title"><span>Groupe</span> {group.name}</p>
          : ''
        }
        <h4>{channel.name}</h4>
        {(channel.description) ? <p>{channel.description}</p> : <p className="grey-text">Ce groupe n'a pas de description.</p> }
        <div className="list-sub-menu small white">
            <i className="big-icon icon icon-members"/>
            <h5>Liste des membres</h5>
        </div>

        <List
          data={users}
          emptyListString="Aucun membre dans ce groupe."
        >
          <SmallUserItem />
        </List>
      </div>
    );
  }
}
