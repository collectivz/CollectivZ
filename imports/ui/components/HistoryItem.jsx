import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

export default class HistoryItem extends React.Component {
  render() {
    const {
      historyItem
    } = this.props;

    return (
      <div>
        <h2>Nom de mission: {historyItem.name} Note moyenne de la mission: {historyItem.rating}</h2>
      </div>
    );
  }
}

HistoryItem.propTypes = {
  historyItem: PropTypes.object.isRequired,
};
