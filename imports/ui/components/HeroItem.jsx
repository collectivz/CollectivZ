import React from 'react';

import HeroModal from './HeroModal';
import { openModal } from '../helpers/Modal';

export default class HeroItem extends React.Component {

  constructor(props) {
    super(props);

    this.openHeroModal = this.openHeroModal.bind(this);
  }

  openHeroModal() {
    const { data } = this.props;
    const component = <HeroModal hero={data} />;

    openModal(component, data.name);
  }

  render() {
    const {
      data
    } = this.props;

    return (
      <div>
        <img src={data.image} onClick={this.openHeroModal}/>
        <p>{data.name}</p>
      </div>
    );
  }
}
