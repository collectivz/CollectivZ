import React, { Component, PropTypes }          from 'react';
import { Meteor }                               from 'meteor/meteor';
import TouchEvent                               from './../TouchEvent';
import { Router, Route, Link, browserHistory }  from 'react-router';
import classNames                               from 'classnames';
import { _ }                                    from 'meteor/underscore';


export default class TeamItem extends React.Component {

  onClick(dest) {

    setTimeout( () => {
      if (dest) {
        browserHistory.push(dest);
      }
    }, 350 );

  }

  render() {
    const {
      teamSelected
    } = this.props;

    return (
      <TouchEvent class="list-item touch-event" onClick={ () => { this.onClick(`/team/${teamSelected._id}`) } }>
      <div>
        <h2>normalement le nom de la team</h2>
      </div>
      </TouchEvent>
    );
  }
}

TeamItem.propTypes = {
  teamSelected: PropTypes.object.isRequired,
};
