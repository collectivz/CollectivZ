import React            from 'react';

import GuildItem        from './GuildItem';
import ChannelItem      from './ChannelItem';
import HistoryItem      from './HistoryItem';
import UserItem         from './UserItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      newGroup: [],
    };

    this.renderItem = this.renderItem.bind(this);
    this.getEmptyPhrase = this.getEmptyPhrase.bind(this);
    this.addToNewGroup = this.addToNewGroup.bind(this);
    this.removeFromNewGroup = this.removeFromNewGroup.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
    this.resetNewGroup = this.resetNewGroup.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.refuseInvite = this.refuseInvite.bind(this);
    this.toggleCreateButton = this.toggleCreateButton.bind(this);
  }

  acceptInvite(userSelectedId) {
    Meteor.call('repertory.acceptInvite', userSelectedId);
  }

  refuseInvite(userSelectedId) {
    Meteor.call('repertory.refuseInvite', userSelectedId);
  }

  addToNewGroup(userSelectedId) {
    if (_.contains(this.state.newGroup, userSelectedId)) {
      console.log('Vous avez déjà ajouté cette personne.');
    } else {
      this.setState({
        newGroup: this.state.newGroup.concat(userSelectedId),
      });
    }
  }

  removeFromNewGroup(userSelectedId) {
    const index = this.state.newGroup.indexOf(userSelectedId);
    if (index >= 0) {
      let newGroup = this.state.newGroup;
      newGroup.splice(index, 1);
      this.setState({
        newGroup,
      });
    }
  }

  toggleCreateButton() {
    let state = this.state.newGroup;
    if (state.length > 0) {
      return (
        <div>
          <button onClick={this.createNewGroup}>Créer un nouveau groupe</button>
        </div>
      );
    } else {
      return ;
    }
  }

  createNewGroup(e) {
    e.preventDefault();
    Meteor.call('teams.insert', this.state.newGroup);
    this.setState({
      newGroup: [],
    });
  }

  resetNewGroup(e) {
    e.preventDefault();
    this.setState({
      newGroup: [],
    });
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
          acceptInvite={this.acceptInvite}
          refuseInvite={this.refuseInvite}
        />;
      case 'createGroup':
        return <UserItem
          key={index}
          user={item}
          addToNewGroup={this.addToNewGroup}
          removeFromNewGroup={this.removeFromNewGroup}
        />
      case 'contact':
        return <UserItem
          key={index}
          user={item}
        />
      case 'manageGroup':
        return <UserItem
          key={index}
          user={item}
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
          {this.toggleCreateButton()}
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
