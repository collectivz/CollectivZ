import React from "react";
import { browserHistory } from "react-router";
import classNames from "classnames";

import TouchEvent from "./TouchEvent";

export default class DropDownBottom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeMenu);
  }

  closeMenu() {
    this.setState({
      isOpen: false
    });
  }

  toggleMenu(e) {
    e.nativeEvent.stopImmediatePropagation();
    const {
      isOpen
    } = this.state;

    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const {
      children
    } = this.props;

    const {
      isOpen
    } = this.state;

    return (
      <div>
        <div className="bubble-content-admin" onClick={this.toggleMenu}>
          <i className="icon icon-3x icon-three-dot" />
        </div>
        <div
          className={classNames("drop-down-bottom", {
            "drop-down-bottom--open": isOpen
          })}
        >
          <div className="drop-down-overlay" />
          {children}
        </div>
      </div>
    );
  }
}
