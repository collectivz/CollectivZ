import React from 'react';

import { Heroes } from '../../api/heroes/heroes';

import Breadcrumb from './Breadcrumb';
import List from './List';
import HeroItem from './HeroItem';

export default class HeroPicker extends React.Component {

  render() {

    return (
      <div className="sub-container">
        <Breadcrumb title="Mon héro" hasBack={true} />
        <List
          data={Heroes}
          emptyListString="Aucun héro, ce qui est bizarre."
        >
          <HeroItem />
        </List>
      </div>
    );
  }
}
