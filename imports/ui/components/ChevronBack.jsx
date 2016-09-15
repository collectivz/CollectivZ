import React                  from 'react';
import { browserHistory }     from 'react-router';

import TouchEvent from './TouchEvent';

export default class ChevronBack extends React.Component {

  onClick() {
    setTimeout( () => {
      browserHistory.goBack();
    }, 350 );
  }

  render() {
    return (
      <TouchEvent class="back-button touch-event" onClick={this.onClick.bind(this)}>
        <i className="icon icon-3x icon-chevron-left"/>
      </TouchEvent>
    );
  }
}
