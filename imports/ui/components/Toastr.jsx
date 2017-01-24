import React, { Component, PropTypes } from 'react';

import { browserHistory } from 'react-router';
import classNames from 'classnames';

export default class Toastr extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpening: false, isOpen: false, isClosing: false };
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleDisplay() {
    this.setState({ isOpening: true });

    setTimeout(() => {
      this.setState({ isOpen: true, isOpening: false });
    }, 350);

    setTimeout(() => {
      this.setState({ isClosing: true });
      setTimeout(() => {
        this.setState({ isOpen: false, isClosing: false });
      }, 350);
    }, 4500);
  }

  handleClose() {
    this.setState({ isClosing: true });
    setTimeout(() => {
      this.setState({ isClosing: false, isOpen: false, isOpening: false });
    }, 350);
  }

  componentDidMount() {
    if (this.props.displayCall) { this.handleDisplay(); }
  }

  render() {
    const {
      children,
      color,
      displayCall,
      content,
    } = this.props;

    const {
      isOpening,
      isClosing,
      isOpen,
    } = this.state;

    return (
      <div className={classNames('toastr', `toastr--${color}`, { 'toastr--opening': isOpening, 'toastr--open': isOpen, 'toastr--closing': isClosing })} >
        <div className="toastr--close-button" onClick={() => { this.handleClose(); }}>
          <i className="icon icon-2x icon-cross" />
        </div>
        <p>{content}</p>
      </div>
    );
  }
}


Toastr.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.string,
};
