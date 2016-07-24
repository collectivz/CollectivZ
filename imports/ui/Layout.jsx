import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AppNav from './modules/appNav/AppNav.jsx';
import Login from './pages/Login.jsx';
import ChanContainer from './containers/ChanContainer.jsx';

export default class Layout extends Component {

render() {
    return (
      <div>
        {this.props.user ?
          <div>
          <AppNav user={this.props.user}/>
          {this.props.children ? this.props.children : <ChanContainer/>}
          </div> : <Login/> }
      </div>
    )
  }
}

export default createContainer(() => {

  return {
    user: Meteor.user(),
  };
}, Layout);
