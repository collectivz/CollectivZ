import React from 'react';

import Breadcrumb from './Breadcrumb';
import List from './List';
import HeroItem from './HeroItem';

const HeroList = [
  { name: "zorro", title: "protecteur", description: "le dernier des dinosaures", image: '/img/zorro.jpg' },
  { name: "batman", title: "chauve-souris", description: "Egalement appelé pipistrelle", image: '/img/zorro.jpg' },
  { name: "Dr Queen", title: "femme-médecin", description: "Pour la parité", image: '/img/zorro.jpg' },
];

export default class HeroPicker extends React.Component {

  render() {

    return (
      <div className="sub-container">
        <Breadcrumb title="Mon héro" hasBack={true} />
        <List
          data={HeroList}
          emptyListString="Aucun héro, ce qui est bizarre."
        >
          <HeroItem />
        </List>
      </div>
    );
  }
}
