import React                      from 'react';
import { _ }                      from 'meteor/underscore';

import GuildUpdatePicture         from './GuildUpdatePicture.jsx';
import ChannelItem                from './ChannelItem.jsx';
import UserItem                   from './UserItem.jsx';


export default class GuildBody extends React.Component {

  render() {

    const { members, channels } = this.props;

    let sortedChannels = channels;
    if (sortedChannels.length > 1) {
      sortedChannels = sortedChannels.sort((a, b) => {
        return b.members.length - a.members.length;
      });
    }

    return (
      <div className="list">

        <div className="list-sub-menu">
            <i className="big-icon icon icon-users"/>
            <h5>Liste des membres</h5>
        </div>

        {members.map(member => {
          return (<UserItem user={member} key={member._id}/>);
        })}

        <div className="list-sub-menu">
            <i className="big-icon icon icon-bubble"/>
            <h5>Liste des actions en cours</h5>
        </div>

        {sortedChannels.length ?
          <div>
            {sortedChannels.map(channel => {
              return (<ChannelItem channel={channel} key={channel._id} />);
            })}
          </div>
        : <div className="list-empty">
            <p><i className="icon icon-sad"/> Aucune action en cours</p>
          </div>
        }
      </div>
    );
  }
}
