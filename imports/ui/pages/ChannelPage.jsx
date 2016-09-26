import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import Breadcrumb                       from '../components/Breadcrumb';
import DropDown                         from '../components/DropDown';
import Loader                           from '../components/Loader.jsx';
import ChatContainer                    from '../containers/ChatContainer.jsx';
import NotFound                         from '../pages/NotFound.jsx';
import { Toast }         from '../helpers/Toast';


export default class ChannelPage extends React.Component {

  constructor(props) {
    super(props);

    this.renderAdminMenu = this.renderAdminMenu.bind(this);
    this.closeAction = this.closeAction.bind(this);
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

  renderAdminMenu() {
    const { channel, guild, user } = this.props;

    if (channel.author === user._id || guild.author === user._id) {
      return (
        <ul>
          <li><a className="drop-down-menu-link"> Editer </a></li>
          <li><a className="drop-down-menu-link" onClick={this.closeAction}> Supprimer </a></li>
        </ul>
      );
    } else {
      return ('');
    }
  }

  render() {

    const { loading, channel, guild, user } = this.props;

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
  guild: PropTypes.object,
};

ChannelPage.contextTypes = {
  router: PropTypes.object
};
