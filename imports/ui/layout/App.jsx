import React from 'react';
import { Meteor } from 'meteor/meteor';

import Login from '../components/Login.jsx';
import Loader from '../components/Loader.jsx';
import AppNav from '../components/AppNav.jsx';

export default class App extends React.Component {

  componentWillUpdate({ loading, user, children }) {
    if (!loading && user && !children) {
      this.context.router.push('/my-groups')
    }
  }

  render() {
    const {
      user,
      loading,
      children,
      location,
    } = this.props;

    const clonedChildren = children && React.cloneElement(children, {
      user,
      key: location.pathname,
    });

    return (
      <div id="app-container">
        {loading ? <Loader /> :
          user ?
          clonedChildren
          : <Login />
        }
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};
