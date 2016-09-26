import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Toast }         from '../../helpers/Toast';

export default class BeerItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinBeer = this.joinBeer.bind(this);
  }

  joinBeer() {
    Meteor.call('beers.join', this.props.beer._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger")
      }
    });
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
        <div className="beer-participate">
          <div className="tag">
            <i className="icon icon-users"/>
            <span>{beer.members.length - 1}</span>
          </div>
          <div className="tag">
            <span>Vous participez !</span>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="beer-participate">
          <div className="tag">
            <i className="icon icon-users"/>
            <span>{beer.members.length}</span>
          </div>
          <hr className="invisble"/>
          <button className="primary button" onClick={this.joinBeer}>Participer</button>
        </div>
      );
    }
  }

  render() {
    const { beer } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-beer">
          <div className="bubble-content">
              <i className="big-icon icon icon-beer"/>
              <div className="bubble-header">
                  <i className="icon icon-beer"/>
                  <span>Nouvelle beerZ !</span>
              </div>
              <h3>{beer.occasion}</h3>
              <p><i className="icon icon-calendar-full"/>  {beer.date}</p>
              <p><i className="icon icon-earth"/>  {beer.place}</p>

              {this.participate()}
          </div>
      </div>
    );
  }
}
