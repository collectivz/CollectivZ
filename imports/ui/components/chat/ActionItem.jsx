import React from 'react';

import DropDownBottom from '../DropDownBottom';
import ActionEdit from './ActionEdit';
import AvatarRowContainer from '../../containers/AvatarRowContainer';
import { Toast }         from '../../helpers/Toast';
import { openModal }         from '../../helpers/Modal';

export default class ActionItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinChannel = this.joinChannel.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  joinChannel() {
    const {
      channel
    } = this.props;

    this.context.router.push(`/group/${channel._id}`);
  }

  openEdit() {
    const {
      channel
    } = this.props;
    const component = <ActionEdit channel={channel} />;
    openModal(component, "Modifier l'action");
  }

  deleteAction() {
    const {
      channel
    } = this.props;

    Meteor.call('channels.delete', channel._id);
  }

  render() {
    const {
      channel,
      user
    } = this.props;

    return (
      channel ?
      <div className="chat-special-bubble chat-special-bubble-mission">
          <div className="bubble-content">
              <div className="bubble-header">
                <i className="icon icon-action-color icon-action"/>
                <span><a href="">{user.username}</a> à ouvert une action</span>
                <h5>{channel.name}</h5>
                {
                  (channel.author === user._id || user.isAdmin) ?
                    <DropDownBottom>
                      <ul>
                        <li><a className="drop-down-menu-link" onClick={this.deleteAction}> Supprimer l'action </a></li>
                        <li><a className="drop-down-menu-link" onClick={this.openEdit}> Modifier l'action </a></li>
                      </ul>
                    </DropDownBottom>
                  : ''
                }
              </div>
              <div className="bubble-content-text">
                <p>
                  <span>{channel.description}</span>
                </p>
                <button className="button only-icon" onClick={this.joinChannel}><span>Rejoindre</span><i className="icon icon-chevron-right"></i></button>
                <AvatarRowContainer userIds={channel.members} />
              </div>
          </div>
      </div>
      : null
    );
  }
}

ActionItem.contextTypes = {
  router: React.PropTypes.object
};
