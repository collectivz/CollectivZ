import React from 'react';

export default class BeerItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinBeer = this.joinBeer.bind(this);
  }

  joinBeer() {
    Meteor.call('beers.join', this.props.beerId);
  }

  render() {
    return (
      <button onClick={this.joinBeer}>Participer</button>
    );
  }
}
