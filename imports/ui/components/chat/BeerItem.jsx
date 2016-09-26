import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Toast }         from '../../helpers/Toast';
import BeerEdit         from './BeerEdit';
import DropDownBottom         from '../DropDownBottom';
import { openModal }         from '../../helpers/Modal';

export default class BeerItem extends React.Component {

  constructor(props) {
    super(props);

    this.joinBeer = this.joinBeer.bind(this);
    this.openEdit = this.openEdit.bind(this);
  }

  joinBeer() {
    Meteor.call('beers.join', this.props.beer._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger")
      } else {
        Toast("Vous avez rejoins l'événement.", "success");
      }
    });
  }

  openEdit() {
    const {
      beer
    } = this.props;
    const component = <BeerEdit beer={beer}/>;
    openModal(component, "Modifier l'événement.");
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
    const {
      beer,
      user
    } = this.props;

    return (
      <div className="chat-special-bubble chat-special-bubble-beer">
          <div className="bubble-content">
              <i className="big-icon icon icon-beer"/>
              <div className="bubble-header">
                  <i className="icon icon-beer"/>
                  <span>Nouvelle beerZ !</span>
                  <DropDownBottom>
                    {
                      (beer.author === user._id || user.isAdmin) ?
                        <ul>
                          <li><a className="drop-down-menu-link" onClick={this.deleteBeer}> Supprimer l'événement </a></li>
                          <li><a className="drop-down-menu-link" onClick={this.openEdit}> Modifier l'événement </a></li>
                        </ul>
                      : ''
                    }
                  </DropDownBottom>
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
