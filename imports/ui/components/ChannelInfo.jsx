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
        <p>{(channel.description) ? channel.description : "Ce groupe n'a pas de description." }</p>
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
