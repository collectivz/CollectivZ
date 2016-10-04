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
        <h3>{channel.name}</h3>
        {
          group._id !== channel._id ?
            <p>Appartient au groupe: {group.name}</p>
          : ''
        }
        <p>{channel.description}</p>
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
