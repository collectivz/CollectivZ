import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import TouchEvent                               from './TouchEvent';
import { Router, Route, Link, browserHistory }  from 'react-router';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';


export default class TeamItem extends React.Component {

  constructor(props) {
      super(props);

      this.removeTeam = this.removeTeam.bind(this);
  }

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  removeTeam(e) {
    e.preventDefault();
    teamId = this.props.teamSelected._id;
    Meteor.call('teams.remove', teamId);
  }

  render() {
    const {
      teamSelected
    } = this.props;

    return (
      <div>
        <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/team/${teamSelected._id}`) } }>
        {
          teamSelected.name ?
            <h3>{teamSelected.name}</h3>
            :
            <h3>Sans nom</h3>
        }
        </TouchEvent>
        <button onClick={this.removeTeam}>Supprimer</button>
      </div>
    );
  }
}

TeamItem.propTypes = {
  teamSelected: PropTypes.object.isRequired,
};
