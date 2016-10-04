import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import Breadcrumb                       from '../components/Breadcrumb';
import DropDown                         from '../components/DropDown';
import Loader                           from '../components/Loader.jsx';
import GroupForm                         from '../components/GroupForm.jsx';
import ChatContainer                    from '../containers/ChatContainer.jsx';
import NotFound                         from '../pages/NotFound.jsx';
import UploadPicture                    from '../components/UploadPicture';
import { Toast }         from '../helpers/Toast';
import { openModal }         from '../helpers/Modal';


export default class ChannelPage extends React.Component {

  constructor(props) {
    super(props);

    this.renderAdminMenu = this.renderAdminMenu.bind(this);
    this.closeAction = this.closeAction.bind(this);
    this.leaveAction = this.leaveAction.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.openPictureModal = this.openPictureModal.bind(this);
  }

  closeAction() {
    const { channel } = this.props;

    Meteor.call('channels.delete', channel._id, (err, res) => {
      if (!err) {
        Toast(`Groupe supprimé.`, "success");
        this.context.router.push('/my-groups');
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  leaveAction() {
    const { channel } = this.props;

    Meteor.call('channels.leave', channel._id, (err, res) => {
      if (!err) {
        Toast(`Vous avez quitté le groupe ${channel.name}.`, "success");
        this.context.router.push('/my-groups');
      } else {
        Toast(err.reason, 'danger');
      }
    });
  }

  openEditModal() {
    const {
      channel
    } = this.props;

    const component = <GroupForm group={channel}/>;
    openModal(component, `Editer le groupe ${channel.name}`);
  }

  openPictureModal() {
    const {
      channel
    } = this.props;

    const component = <UploadPicture data={channel} method='channels.changePicture' />;
    openModal(component, `Modifier l'image du groupe ${channel.name}`);
  }

  renderAdminMenu() {
    const { channel, user } = this.props;

    if (channel.author === user._id) {
      return (
        <ul>
          <li><a className="drop-down-menu-link" onClick={this.openEditModal}> Modifier </a></li>
          <li><a className="drop-down-menu-link" onClick={this.openPictureModal}> Changer l'image </a></li>
          <li><a className="drop-down-menu-link" onClick={this.closeAction}> Supprimer </a></li>
        </ul>
      );
    } else {
      return ('');
    }
  }

  render() {

    const { loading, channel, group, user } = this.props;

    return (

      <div className="screen-box">
        {
          loading ?
           <Loader />
          :
            channel ?
              <div>
                <Breadcrumb title={channel.name} hasBack={true}>
                  <DropDown>
                    <ul>
                      {this.renderAdminMenu()}
                      <li><a className="drop-down-menu-link" onClick={this.leaveAction}> Quitter </a></li>
                    </ul>
                  </DropDown>
                </Breadcrumb>
                <ChatContainer channel={channel} user={user}/>
              </div>
            : <NotFound />
        }
      </div>
    );
  }
}

ChannelPage.propTypes = {
  channel: PropTypes.object,
  group: PropTypes.object,
};

ChannelPage.contextTypes = {
  router: PropTypes.object
};
