import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AppNav from './modules/appNav/AppNav.jsx';
import Login from './pages/Login.jsx';
import ChanContainer from './containers/ChanContainer.jsx';
import TimerMixin from 'react-timer-mixin';
import Loader from './modules/loader/Loader.jsx'

var Layout = React.createClass({
  mixins: [TimerMixin],
  getInitialState () {
    return {loading: false};
  },

  temper(username, pwd) {
    let that = this;
    Meteor.loginWithPassword(username, pwd, function(err) {
      if (err) {
        console.log(err);
      } else {
        that.setState({loading: true});
        that.setState({username: '', text: ''});
        that.setTimeout(function() {
          that.setState({loading: false});
        }, 2000);
      }
    });
  },
  render() {
    const childrenWithProps = React.cloneElement(this.props.children, this.props);
      return (
        <div>
          {this.state.loading ?
            <Loader/>
            :( this.props.user ?
              <div>
                <AppNav user={this.props.user}/>
                {childrenWithProps ? childrenWithProps : <ChanContainer/>}
              </div>
            : <Login temper={this.temper}/> )}
        </div>
      )
    }
});

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, Layout);
