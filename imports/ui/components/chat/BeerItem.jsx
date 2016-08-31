import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import './BeerItem.css'

export default class BeerItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinBeer = this.joinBeer.bind(this);
  }

  joinBeer() {
    Meteor.call('beers.join', this.props.beer._id);
  }

  showMembers() {
    const { members } = this.props;
    const membersNodes = members.map(function(member) {
      return (
        <div key={member._id}>
          {member.username}
        </div>
      );
    }, this);
    return membersNodes;
  }

  participate () {
    const { beer } = this.props;
    if (beer && _.contains(beer.members, Meteor.userId())) {
      return (
        <div>Vous et {beer.members.length - 1} autres personne(s) participent {this.showMembers()}</div>
      );
    }
    else {
      return (
        <div>
          <div>{beer.members.length} personne(s) participent</div>
          <button onClick={this.joinBeer}>Participer</button>
        </div>
      );
    }
  }

  render() {
    const { beer } = this.props;

    return (
      <div className="actionz-item">
        <div className="actionz-pie">
          <i className="fa fa-calendar"></i>
        </div>
        <div>
          <h4>Nouvelle Beerz !</h4>
          <p className="beerz-title">Occasion:  {beer.occasion}</p>
          <p><span className="strong">Date </span>:  {beer.date}</p>
          <p><span className="strong">Lieu </span>:  {beer.place}</p>
        </div>
        {this.participate()}
      </div>
    );
  }
}
