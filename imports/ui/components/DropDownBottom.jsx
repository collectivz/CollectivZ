import React                  from 'react';
import { browserHistory }     from 'react-router';
import classNames             from 'classnames';

import TouchEvent             from './TouchEvent';

export default class DropDownBottom extends React.Component {

    constructor( props ) {
        super( props );
    }

  render() {

    const {
      children
    } = this.props;

    let isOpen = true;

    return (
      <div className= {classNames("drop-down-bottom", {"drop-down-bottom--open": isOpen})} >
          {children}
      </div>
    );
  }
}
