import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import './GuildPage.css';

class GuildPage extends React.Component {
  render() {
    return (
      <div className="view-container">
        <div className='has-user-header'>
          guild page :
          {this.props.guild.name}
        </div>
      </div>
      );
  }
};

GuildPage.propTypes = {
  guild: PropTypes.object.isRequired
}

export default GuildPage;
