import React            from 'react';

import GuildItem        from './GuildItem';
import ChannelItem      from './ChannelItem';
import HistoryItem      from './HistoryItem';
import UserItem         from './UserItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.getEmptyPhrase = this.getEmptyPhrase.bind(this);

  }

  renderItem(item, index) {
    const {
      user,
      type,
      unreadCounts,
      renderUnread,
      removeAdmin
    } = this.props;
    let count = 0;

    if (renderUnread && (type === 'channel' || type === 'conversation' || type === 'group')) {
      const unreadCount = unreadCounts.find(count => {
        if (count.channelId === item._id) {
          return true;
        }
        return false;
      });
      count = unreadCount ? unreadCount.count : 0;
    }

    switch (type) {
      case 'guild':
        return <GuildItem key={index} guild={item} user={user} />;
      case 'history':
        return <HistoryItem key={index} historyItem={item} />;
      case 'admin':
        return <UserItem
          key={index}
          user={item}
          removeAdmin={removeAdmin}
        />;
      case 'invitation':
        return <UserItem
          key={index}
          user={item}
          type={type}
          acceptInvite={this.props.acceptInvite}
          refuseInvite={this.props.refuseInvite}
        />;
      case 'createGroup':
        return <UserItem
          key={index}
          user={item}
          type={type}
          addToNewGroup={this.props.addToNewGroup}
          removeFromNewGroup={this.props.removeFromNewGroup}
        />
      case 'contact':
        return <UserItem
          key={index}
          user={item}
          type={type}
        />
      case 'manageGroup':
        return <UserItem
          key={index}
          user={item}
          type={type}
          addToGroup={this.props.addToGroup}
          removeFromGroup={this.props.removeFromGroup}
          currentState={this.props.currentState}
          teamMembers={this.props.teamMembers}
        />
      default:
        return <ChannelItem
          key={index}
          channel={item}
          unreadCount={count}
          renderUnread={renderUnread}
        />;
    }
  }

  getEmptyPhrase() {
    const { type } = this.props;

    switch (type) {
      case 'history':
        return "Historique vide."
      case 'channel':
        return "Aucune discussion en cours."
      case 'contact':
        return "Vous n'avez personne dans vos contacts. Invitez vos amis!"
      case 'invitation':
        return "Vous n'avez aucune invitation."
      case 'createGroup':
        return "Vous n'avez aucun contact a ajouter dans cette team. Invitez vos amis!"
      case 'manageGroup':
        return "Vous n'avez personne dans vos contacts. Invitez vos amis!"
      default:
        return "Il n'y a rien ici.";
    }
  }

  render() {
    const {
      data,
    } = this.props;

    return (
      (data && data.length) ?

        <div className="list">
          {data.map((item, index) => {
            return this.renderItem(item, index);
          })}
        </div>
      :
        <div className="list-empty">
          <p><i className="icon icon-sad"/>{this.getEmptyPhrase()}</p>
        </div>
    );
  }
}
