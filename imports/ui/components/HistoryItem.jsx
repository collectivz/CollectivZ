import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class HistoryItem extends React.Component {

  render() {
    const { data } = this.props;

    return (
      <div className="list-item">
        <p><b>Nom de mission:</b> {data.name} évaluation: {data.actionRating}/5, commentaire : {data.actionComment}</p>
        <p><b>Evaluation personnelle:</b> {data.userRating}/5, commentaire : {data.userComment}</p>
      </div>
    );
  }
}

HistoryItem.propTypes = {
  data: PropTypes.object,
};
