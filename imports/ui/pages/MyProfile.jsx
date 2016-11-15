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
    }, 350);
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

                      <TouchEvent class="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/infos')}>
                        <div className="circle"><i className="icon icon-info info-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Mes informations personnelles</p>
                        </div>
                        <i className="icon icon-chevron-right"></i>
                      </TouchEvent>

                      {/*
                      <TouchEvent class="list-item small touch-event">
                        <div className="circle"><i className="icon icon-grade grade-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Ma réputation <span className="value">20</span></p>
                        </div>
                      </TouchEvent>
                        <TouchEvent class="list-item small touch-event">
                        <div className="circle"><i className="icon icon-euro money-color"></i></div>
                        <div className="list-item-content">
                        <p className="title">Mon budget <span className="value">{(user.coinz) ? user.coinz + " €" : "Non déclaré"}</span></p>
                        </div>
                        </TouchEvent>
                      */}

                      <TouchEvent class="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/hero')}>
                        <div className="circle"><i className="icon icon-hero hero-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Mon héro <span className="value">{(user.hero && user.hero.title) ? user.hero.title : "Non déclaré"}</span></p>
                        </div>
                        <i className="icon icon-chevron-right"></i>
                      </TouchEvent>

                      <TouchEvent class="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/skills')}>
                        <div className="circle"><i className="icon icon-tools tools-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Mes compétences <span className="value">{(user.skills) ? user.skills.length : "Non déclaré"}</span></p>
                        </div>
                        <i className="icon icon-chevron-right"></i>
                      </TouchEvent>

                      <TouchEvent class="list-item small touch-event" onClick={this.goTo.bind(this, '/my-groups')}>
                        <div className="circle"><i className="icon icon-action action-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Mes actions en cours</p>
                        </div>
                        <i className="icon icon-chevron-right"></i>
                      </TouchEvent>

                      <TouchEvent class="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/history')}>
                        <div className="circle"><i className="icon icon-badge badge-color"></i></div>
                        <div className="list-item-content">
                          <p className="title">Mes accomplissements</p>
                        </div>
                        <i className="icon icon-chevron-right"></i>
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
