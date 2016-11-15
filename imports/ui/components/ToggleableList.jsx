import React from 'react';
import classNames                       from 'classnames';

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
      let result = [];
      data.forEach((item, index) => {
        if (index < 2) {
          result.push(item);
        }
      });
      return result;
    }
  }

  render() {
    const {
      title,
      data,
      user,
      emptyListString
    } = this.props;

    let length = 0;
    if (data.length)
      length = data.length;

    return (
      <div>
        <div className="list-sub-menu small">
            <i className="big-icon icon icon-users"/>
            <h5>{`${title} (${length})`}</h5>
            <a className={classNames("list-sub-menu-toggle", {"active": this.state.open})} onClick={this.toggleList}>{this.actionName()}<i className="icon icon-chevron-right"></i></a>
        </div>
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
