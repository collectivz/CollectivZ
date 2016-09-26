import React                  from 'react';
import { browserHistory }     from 'react-router';
import classNames             from 'classnames';

import TouchEvent             from './TouchEvent';

export default class DropDown extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      isOpen : false,
      isClicked: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  closeMenu() {
    this.setState({
      isOpen: false
    });
  }

  handleOpen(e) {
    e.nativeEvent.stopImmediatePropagation();

    const {
      isOpen
    } = this.state;

    this.setState({
      isOpen: !isOpen
    });

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
          <i className="icon icon-3x icon-three-dot"/>
        </div>
        {
          isOpen ?
            <div className="drop-down-menu">
              {children}
            </div>
          : ''
        }
      </div>
    );
  }
}
