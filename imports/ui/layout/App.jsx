import React from "react";
import { Meteor } from "meteor/meteor";

import Loader from "../components/Loader.jsx";
import AppNav from "../components/AppNav.jsx";
import ToastrStack from "../components/ToastrStack.jsx";
import ModalContainer from "../containers/ModalContainer.jsx";

export default class App extends React.Component {
  componentWillUpdate({ loading, user, children }) {
    if (!loading && user && !children) {
      this.context.router.push("/my-groups");
    } else if (!loading && !user) {
      this.context.router.push("/onboarding")
    }
  }

  render() {
    const {
      user,
      loading,
      children,
      location
    } = this.props;

    const clonedChildren = children &&
      React.cloneElement(children, {
        user,
        key: location.pathname
      });

    return (
      <div id="app-container">
        {loading ? <Loader /> : clonedChildren}
        <ToastrStack />
        <ModalContainer />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object
};
