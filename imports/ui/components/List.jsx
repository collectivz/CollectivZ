import React            from 'react';

import GuildItem        from './GuildItem';
import ChannelItem      from './ChannelItem';
import HistoryItem      from './HistoryItem';

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.getEmptyPhrase = this.getEmptyPhrase.bind(this);
  }

  renderItem(item, index) {
    const { user, type } = this.props;

    switch (type) {
      case 'guild':
        return <GuildItem key={index} guild={item} user={user} />;
      case 'history':
        return <HistoryItem key={index} historyItem={item} />
      default:
        return <ChannelItem key={index} channel={item}  />;
    }
  }

  getEmptyPhrase() {
    const { type } = this.props;

    switch (type) {
      case 'guild':
        return "Il n'y a pas de groupe pour l'instant";
      case 'history':
        return "Historique vide."
      case 'channel':
        return "Aucune discussion en cours."
      default:
        return "Il n'y a rien ici.";
    }
  }

  render() {
    const {
      data,
      user
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
