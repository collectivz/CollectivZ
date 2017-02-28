import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";

import UserHeader from "../components/UserHeader.jsx";
import Breadcrumb from "../components/Breadcrumb";
import AppNav from "../components/AppNav.jsx";
import Loader from "../components/Loader.jsx";
import { Toast } from "../helpers/Toast";
import TouchEvent from "../components/TouchEvent";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.chatWithUser = this.chatWithUser.bind(this);
  }

  goTo(url) {
    setTimeout(
      () => {
        this.context.router.push(url);
      },
      350
    );
  }

  chatWithUser() {
    const {
      user
    } = this.props;

    Meteor.call("channels.conversationCreate", [user._id], (err, res) => {
      if (!err) {
        this.context.router.push(`/conversation/${res}`);
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  render() {
    const {
      user,
      currentUser,
      repertory,
      groups,
      channels,
    } = this.props;
    return (
      user ?
        <div className="sub-container">
          <Breadcrumb title={`Profil de ${user.username}`} hasBack />
            <div className="profile">
                <div className="profile-header">
                    <div className="circle"><img className="photo" src="/img/no-user.png" /></div>
                    <h3 className="name">{user.username}</h3>
                    {
                      user.hero ?
                        <h5 className="attribute">{user.hero.title}</h5>
                      : ''
                    }
          <a className="private-message" onClick={this.chatWithUser}>Envoyer un message privé</a>
              </div>
            </div>
          {
            user.skills && user.skills.length > 0 ?
              <div className="competences">
                <h4><i className="icon icon-info"></i>Compétences</h4>
                {
                  user.skills.map(skill => {
                    return <div className="tag">{skill}</div>;
                  })
                }
              </div>
            : ''
          }
          <div className="statistics">
            {
              user.connections.beerCount ?
                <div className="statistic">
                  <i className="icon icon-event2"></i>
                  <span>{user.connections.beerCount}</span>
                  <span>Evenements</span>
                </div>
              : ''
            }
            {
              user.connections.pollCount ?
                <div className="statistic">
                  <i className="icon icon-pie-chart"></i>
                  <span>{user.connections.pollCount}</span>
                  <span>Sondages</span>
                </div>
              : ''
            }
            {
              channels.length > 0 ?
                <div className="statistic">
                  <i className="icon icon-action"></i>
                  <span>{channels.length}</span>
                  <span>Actions</span>
                </div>
              : ''
            }
            {
              groups.length > 0 ?
                <div className="statistic">
                  <i className="icon icon-users"></i>
                  <span>{groups.length}</span>
                  <span>Groupes</span>
                </div>
              : ''
            }
            {
              repertory.contacts.length > 0 ?
                <div className="statistic">
                  <i className="icon icon-user"></i>
                  <span>{repertory.contacts.length}</span>
                  <span>Contacts</span>
                </div>
              : ''
            }
          </div>
          <AppNav user={user} />
        </div>
        : null
  );
  }
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object
};
