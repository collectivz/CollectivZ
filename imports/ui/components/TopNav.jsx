import React, { Component, PropTypes }    from 'react';
import classNames                         from 'classnames';

import TouchEvent                         from './TouchEvent';
import ChevronBack  from './ChevronBack';

export default class TopNav extends Component {

  logout(){
    setTimeout( () => {
      Meteor.logout();
    }, 350);
  }

  render() {
    return (
      <div className="breadcrumb">
        <ChevronBack />
        <h4 className="text">{this.props.text}</h4>
        {/* <TouchEvent class="logout-button touch-event" onClick={ this.logout }>
          <i className="icon icon-3x icon-exit"/>
        </TouchEvent> */}
      </div>
    );
  }

}

TopNav.propTypes = {
  text: PropTypes.string.isRequired,
}
