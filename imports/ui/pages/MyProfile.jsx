import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';

import UserHeader                       from '../components/UserHeader.jsx';
import ChannelItem                       from '../components/ChannelItem.jsx';
import HistoryItem                       from '../components/HistoryItem.jsx';
import AppNav                           from '../components/AppNav.jsx';
import Breadcrumb                       from '../components/Breadcrumb.jsx';
import List                             from '../components/List';
import PasswordEdit                    from '../components/PasswordEdit.jsx';
import UploadPicture                    from '../components/UploadPicture.jsx';
import UsernameEdit                    from '../components/UsernameEdit.jsx';
import { openModal }                    from '../helpers/Modal.js';
import TouchEvent from '../components/TouchEvent';

export default class MyProfile extends Component {

  constructor(props) {
    super(props);

    this.renderChild = this.renderChild.bind(this);
  }

  logout() {
    Meteor.logout();
  }

  goTo(url) {
    setTimeout(() => {
      this.context.router.push(url);
    }, 350)
  }

  renderChild() {
    const {
      children,
      history,
      ...props
    } = this.props;
    if (history) {
      props.actionHistory = history.actionHistory
    }

    return children && React.cloneElement(children, props);
  }

  render() {

    const {
      user,
      groups,
      channels,
      history,
      children
    } = this.props;
    let actionHistory = [];

    if (history) {
      actionHistory = history.actionHistory;
    }

    console.log(user);

    return (
      <div className="screen-box">
        {user ?
            <div className="screen-box">


                {
                  children ?
                    this.renderChild()
                  :
                  <div className="sub-container">
                    <Breadcrumb title={`Profil`} hasBack={false}>
                      <TouchEvent class="right-button touch-event" onClick={this.logout}>
                        <i className="icon icon-exit" />
                      </TouchEvent>
                    </Breadcrumb>
                    <UserHeader user={user}/>
                    <div className='list'>
                      <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/my-profile/infos')}>
                        <p>Mes informations personnelles</p>
                      </TouchEvent>
                      <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/my-profile/skills')}>
                        <p>Mes compétences</p>
                      </TouchEvent>
                      <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/my-profile/history')}>
                        <p>Mes accomplissements</p>
                      </TouchEvent>
                      <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/my-profile/hero')}>
                        <p>Mon héro</p>
                      </TouchEvent>
                      <TouchEvent class="touch-event" onClick={this.logout}>
                        <p>Se déconnecter</p>
                      </TouchEvent>
                    </div>
                  </div>
                }
              <AppNav user={user} />
            </div>
          : <Loader />
        }
      </div>
      );
  }
}

MyProfile.contextTypes = {
  router: React.PropTypes.object
};
