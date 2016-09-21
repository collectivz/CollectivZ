import React                  from 'react';
import { browserHistory }     from 'react-router';
import classNames             from 'classnames';

import TouchEvent             from './TouchEvent';

export default class Breacrumb extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { isOpen : false, isClicked: false };
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        
        if (this.state.isOpen == true)
          this.setState( { isOpen : false } );
        else
          this.setState( { isOpen : true } );

        this.setState( { isClicked : true } );
        setTimeout( () => {
            this.setState( { isClicked : false } );
        }, 300);

    }

  render() {

    const {
      children
    } = this.props;

    const {
      isOpen,
      isClicked
    } = this.state;


    return (
      <div className= {classNames("drop-down", {"drop-down--open": isOpen})} >
        <div className={classNames("touch-event", {"touch-active": isClicked})}  onClick={this.handleOpen.bind(this)}>
          <i className="icon icon-3x icon-menu"/>
        </div>
        <div className="drop-down-menu">
          {children}
        </div>
      </div>
    );
  }
}
