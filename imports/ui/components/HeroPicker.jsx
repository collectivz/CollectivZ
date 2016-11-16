import React from 'react';

import { Heroes } from '../../api/heroes/heroes';

import Breadcrumb from './Breadcrumb';
import List from './List';
import HeroItem from './HeroItem';

export default class HeroPicker extends React.Component {

  render() {

    return (
      <div className="sub-container page">
        <Breadcrumb title="Mon héros" hasBack={true} />
        <div className="header">
          <i className="icon icon-hero"></i>
          <h4>Choisir son héros</h4>
        </div>
        <div className="hero-list content">
          <List
            data={Heroes}
            emptyListString="Aucun héros, ce qui est bizarre."
            >
            <HeroItem />
          </List>
        </div>
      </div>
    );
  }
}
