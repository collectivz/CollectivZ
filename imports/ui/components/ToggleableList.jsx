import React from 'react';

import List from './List';
import ChannelItemContainer from '../containers/ChannelItemContainer';

export default class ToggleableList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleList = this.toggleList.bind(this);
    this.actionName = this.actionName.bind(this);
    this.getData = this.getData.bind(this);
  }

  toggleList() {
    const {
      open
    } = this.state;

    this.setState({
      open: !open
    });
  }

  actionName() {
    const {
      open
    } = this.state;

    return open ? 'Voir moins' : 'Tout voir';
  }

  getData() {
    const {
      data
    } = this.props;
    const {
      open
    } = this.state;

    if (open) {
      return data;
    } else {
      return [data[0], data[1]];
    }
  }

  render() {
    const {
      title,
      data,
      user,
      emptyListString
    } = this.props;

    return (
      <div>
        <p>{`${title} (${data.length})`}</p>
        <a onClick={this.toggleList}>{this.actionName()}</a>
        <List
          data={this.getData()}
          type="channel"
          emptyListString={emptyListString}
          user={user}
          renderUnread={true}
          renderMargin={false}
        >
          <ChannelItemContainer />
        </List>
      </div>
    );
  }
}
