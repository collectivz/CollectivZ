import React                  from 'react';
import { browserHistory }     from 'react-router';

import TouchEvent             from './TouchEvent';
import DropDown               from './DropDown';

export default class Breacrumb extends React.Component {

  onClick() {
    setTimeout( () => {
      browserHistory.goBack();
    }, 350 );
  }

  render() {
    const {
      title,
      hasBack,
      children
    } = this.props;

    return (
      <div className="breadcrumb">
        {
          hasBack ?
            <TouchEvent class="back-button touch-event" onClick={this.onClick.bind(this)}>
              <i className="icon icon-3x icon-chevron-left"/>
            </TouchEvent>
          : ''
        }
	      <h4 className="text">{title}</h4>
        {
          children ?
            children
          : ''
        }
        <DropDown>
          <ul>
            <li><a className="drop-down-menu-link" href="#"> Editer l'action </a></li>
            <li><a className="drop-down-menu-link" href="#"> Fermer l'action </a></li>
            <li><a className="drop-down-menu-link" href="#"> Déplacer l'action </a></li>
          </ul>
        </DropDown>
      </div>
    );
  }
}
