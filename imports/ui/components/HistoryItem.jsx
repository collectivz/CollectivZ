import React, { Component, PropTypes }  from 'react';
import { Meteor }                       from 'meteor/meteor';
import { Link }                         from 'react-router';

export default class HistoryItem extends React.Component {

  render() {

    const { data } = this.props;

    return (
      <div>
        <h2>Nom de mission: {data.name} évaluation: {data.actionRating}/5, commentaire : {data.actionComment}</h2>
        <h2>Evaluation personnelle: {data.userRating}/5, commentaire : {data.userComment}</h2>
      </div>
    );
  }
}

HistoryItem.propTypes = {
  data: PropTypes.object,
};
