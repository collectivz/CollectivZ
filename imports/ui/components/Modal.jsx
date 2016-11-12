import React, {Component, PropTypes} from 'react';
import { browserHistory }     from 'react-router';
import classNames             from 'classnames';

import { closeModal } from '../helpers/Modal.js';

export default class Modal extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { isOpening : false, isOpen : false, isClosing: false };
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleDisplay() {

      this.setState( { isOpening : true } );

      setTimeout( () => {
        this.setState( { isOpen : true, isOpening: false } );
      }, 350);

    }

    handleClose() {

      this.setState( { isClosing : true } );
      setTimeout( () => {
        // this.props.closeModal();
        closeModal();
        this.setState( { isClosing: false, isOpen : false, isOpening: false } );
      }, 350);

    }

    componentDidMount() {
      if (this.props.displayCall)
        this.handleDisplay();
    }


  render() {

    const {
      children,
      color,
      displayCall,
      title
    } = this.props;

    const {
      isOpening,
      isClosing,
      isOpen
    } = this.state;

    return (
      <div className={classNames("modal", {"modal--opening": isOpening, "modal--open": isOpen, "modal--closing": isClosing})} >
        <div className="modal--overlay" onClick={ () => {this.handleClose()} }></div>
        <div className="modal--content">
          <div className="modal--content-wrapper">
            <div className="modal--header">
              <h4>{title}</h4>
              <div className="modal--close-button" onClick={ () => {this.handleClose()} }>
                <i className="icon icon-2x icon-cross"/>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}
