import React, {Component, PropTypes} from 'react';
import { browserHistory }     from 'react-router';
import classNames             from 'classnames';

export default class Modal extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { isOpening : false, isOpen : false, isClosing: false };
        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleDisplay() {

      this.props.onOpen();
      this.setState( { isOpening : true } );

      setTimeout( () => {
        this.setState( { isOpen : true, isOpening: false } );
      }, 350);

    }

    handleClose() {

      this.props.onClose();
      this.setState( { isClosing : true } );
      setTimeout( () => {
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
        <div className="modal--overlay"/>
        <div className="modal--content">
          <div className="modal--header">
            <h4>{title}</h4>
            <div className="modal--close-button" onClick={ () => {this.handleClose()} }>
              <i className="icon icon-2x icon-cross"/>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onOpen: PropTypes.func
}
