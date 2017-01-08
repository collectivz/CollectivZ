import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import UserHeader from '../components/UserHeader.jsx';
import Breadcrumb from '../components/Breadcrumb';
import AppNav from '../components/AppNav.jsx';
import Loader from '../components/Loader.jsx';
import TouchEvent from '../components/TouchEvent';

export default class ProfilePage extends Component {

  goTo(url) {
    setTimeout(() => {
      this.context.router.push(url);
    }, 350)
  }

  render() {

    const { user, groups, channels, currentUser, history } = this.props;
    let actionHistory = [];

    if (history) {
      actionHistory = history.actionHistory;
    }

    return (
      <div className="screen-box">
        {user ?
            <div className="screen-box">

              <Breadcrumb title={`Profil de ${user.username}`} hasBack={true} />

                {
                  children ?
                    children
                  :
                  <div className="sub-container">
                    <UserHeader user={user}/>
                    <div className='list'>
                      <TouchEvent class="touch-event" onClick={this.goTo.bind(this, '/my-profile/history')}>
                        <p>Mes informations personnelles</p>
                      </TouchEvent>
                    </div>
                  </div>
                }
              <AppNav user={currentUser} />
            </div>
          : <Loader />
        }
      </div>
      );
  }
}

ProfilePage.contextTypes = {
  router: React.PropTypes.object
};
