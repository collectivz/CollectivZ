import React from 'react';
import { browserHistory } from 'react-router';

import TouchEvent from './TouchEvent';
import DropDown from './DropDown';

export default class Breadcrumb extends React.Component {

  goBack() {
    setTimeout(() => {
      browserHistory.goBack();
    }, 350);
  }

  goToMainPage() {
    setTimeout(() => {
      this.context.router.push('/my-groups');
    }, 350);
  }

  render() {
    const {
      title,
      hasBack,
      children,
    } = this.props;

    return (
      <div className="breadcrumb">
        <TouchEvent class="back-button touch-event" onClick={this.goToMainPage.bind(this)}>
          <img src="/img/small_logo.svg" />
        </TouchEvent>
        {
          hasBack ?
            <TouchEvent class="back-button touch-event" onClick={this.goBack.bind(this)}>
              <i className="icon icon-3x icon-chevron-left" />
            </TouchEvent>
          : ''
        }
        <h4 className="text">{title}</h4>
        {
          children || ''
        }
        {/* <DropDown>
          <ul>
            <li><a className="drop-down-menu-link" href="#"> Editer l'action </a></li>
            <li><a className="drop-down-menu-link" href="#"> Fermer l'action </a></li>
            <li><a className="drop-down-menu-link" href="#"> Déplacer l'action </a></li>
          </ul>
        </DropDown> */}

      </div>
    );
  }
}

Breadcrumb.contextTypes = {
  router: React.PropTypes.object,
};
