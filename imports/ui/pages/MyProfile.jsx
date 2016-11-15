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

                      <div className="list-item small touch-event">
                        <img className="circle" src="/img/icons/cross.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Ma réputation <span className="value">20</span></p>
                        </div>
                      </div>

                      <div className="list-item small touch-event">
                        <img className="circle" src="/img/icons/euro.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mon budget <span className="value">20 €</span></p>
                        </div>
                      </div>

                      <div className="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/infos')}>
                        <img className="circle" src="/img/icons/cross.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mes informations personnelles</p>
                        </div>
                      </div>

                      <div className="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/hero')}>
                        <img className="circle" src="/img/icons/cross.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mon héro</p>
                        </div>
                      </div>

                      <div className="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/skills')}>
                        <img className="circle" src="/img/icons/cross.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mes compétences</p>
                        </div>
                      </div>

                      <div className="list-item small touch-event" >
                        <img className="circle" src="/img/icons/action.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mes actions en cours</p>
                        </div>
                      </div>

                      <div className="list-item small touch-event">
                        <img className="circle" src="/img/icons/users.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mes groupes</p>
                        </div>
                      </div>

                      <div className="list-item small touch-event" onClick={this.goTo.bind(this, '/my-profile/history')}>
                        <img className="circle" src="/img/icons/cross.svg" alt="" />
                        <div className="list-item-content">
                          <p className="title">Mes accomplissements</p>
                        </div>
                      </div>

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
