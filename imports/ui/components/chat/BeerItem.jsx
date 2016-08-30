import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

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
      <div>
        <div>Occasion:  {beer.occasion}</div>
        <div>Date:  {beer.date}</div>
        <div>Lieu:  {beer.place}</div>
        {this.participate()}
      </div>
    );
  }
}
