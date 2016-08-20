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
    const beer = Beers.findOne(this.props.beerId);
    return (
      <div>
        <div>Occasion:  {beer.occasion}</div>
        <div>Date:  {beer.date}</div>
        <div>Place:  {beer.place}</div>
        <button onClick={this.joinBeer}>Participer</button>
      </div>
    );
  }
}
