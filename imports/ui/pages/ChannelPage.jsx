import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";

import Breadcrumb from "../components/Breadcrumb";
import TouchEvent from "../components/TouchEvent";
import DropDown from "../components/DropDown";
import Loader from "../components/Loader.jsx";
import GroupForm from "../components/GroupForm.jsx";
import ChatContainer from "../containers/ChatContainer.jsx";
import NotFound from "../pages/NotFound.jsx";
import UploadPicture from "../components/UploadPicture";
import ChannelInfo from "../components/ChannelInfo";
import { Toast } from "../helpers/Toast";
import { openModal } from "../helpers/Modal";

const LIMIT = 20;

export default class ChannelPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: LIMIT
    };

    this.renderAdminMenu = this.renderAdminMenu.bind(this);
    this.setMessageLimit = this.setMessageLimit.bind(this);
    this.closeAction = this.closeAction.bind(this);
    this.leaveAction = this.leaveAction.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.openPictureModal = this.openPictureModal.bind(this);
    this.openInfo = this.openInfo.bind(this);
  }

  componentDidMount() {
    const { channel } = this.props;
    if (channel) {
      Meteor.call('channels.setUserActive', channel._id)
    }
  }

  componentDidUnmount() {
    const { channel } = this.props;
    if (channel) {
      Meteor.call('channels.setUserInactive', channel._id)
    }
  }

  closeAction() {
    const { channel } = this.props;

    Meteor.call("channels.delete", channel._id, (err, res) => {
      if (!err) {
        Toast("Groupe supprimé.", "success");
        this.context.router.push("/my-groups");
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  leaveAction() {
    const { channel } = this.props;

    Meteor.call("channels.leave", channel._id, (err, res) => {
      if (!err) {
        Toast(`Vous avez quitté le groupe ${channel.name}.`, "success");
        this.context.router.push("/my-groups");
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  openInfo() {
    const {
      channel,
      group,
      users
    } = this.props;
    const component = (
      <ChannelInfo channel={channel} group={group} users={users} />
    );
    openModal(component, "Informations");
  }

  openEditModal() {
    const {
      channel
    } = this.props;

    const component = <GroupForm group={channel} />;
    openModal(component, `Editer le groupe ${channel.name}`);
  }

  openPictureModal() {
    const {
      channel
    } = this.props;

    const component = (
      <UploadPicture data={channel} method="channels.changePicture" />
    );
    openModal(component, `Modifier l'image du groupe ${channel.name}`);
  }

  setMessageLimit() {
    const { limit } = this.state;
    this.setState({
      limit: limit + LIMIT
    }, () => {
      console.log(this.state.limit)
    })
  }

  renderAdminMenu() {
    const { channel, user } = this.props;

    if (channel.author === user._id) {
      return (
        <ul>
          <li>
            <a className="drop-down-menu-link" onClick={this.openEditModal}>
              {" "}Modifier{" "}
            </a>
          </li>
          <li>
            <a className="drop-down-menu-link" onClick={this.openPictureModal}>
              {" "}Changer l'image{" "}
            </a>
          </li>
          <li>
            <a className="drop-down-menu-link" onClick={this.closeAction}>
              {" "}Supprimer{" "}
            </a>
          </li>
        </ul>
      );
    }
    return "";
  }

  render() {
    const {
      loading,
      channel,
      group,
      users,
      user
    } = this.props;
    const { limit } = this.state;

    return (
      <div className="screen-box">
        {channel
          ? <div>
              <Breadcrumb title={channel.name} hasBack>
                <DropDown>
                  <ul>
                    {this.renderAdminMenu()}
                    <li>
                      <a
                        className="drop-down-menu-link"
                        onClick={this.leaveAction}
                      >
                        {" "}Quitter{" "}
                      </a>
                    </li>
                  </ul>
                </DropDown>
                <TouchEvent
                  class="right-button touch-event"
                  onClick={this.openInfo}
                >
                  <i className="icon icon-info icon-reverse" />
                </TouchEvent>
              </Breadcrumb>
              <ChatContainer channel={channel} user={user} limit={limit} setMessageLimit={this.setMessageLimit} />
            </div>
          : <NotFound />}
      </div>
    );
  }
}

ChannelPage.propTypes = {
  channel: PropTypes.object,
  group: PropTypes.object
};

ChannelPage.contextTypes = {
  router: PropTypes.object
};

window.onbeforeunload = () => {
  const channels = Channels.find().fetch();

  channels.forEach(channel => {
    Meteor.call("channels.setUserInactive", channel._id);
  });
};
