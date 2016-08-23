import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import './GuildInput.css';

export default class GuildInput extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const guildName = this.refs.guildName.value;

    if (guildName) {
      Meteor.call('guilds.insert', guildName);
      this.refs.guildName.value = '';
    }
  }

  render () {
    return (
      <div className="view-container has-top-nav">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Nom de la guilde"
            ref="guildName"
          />
          <input type="submit" value="Creer une guilde" />
        </form>
      </div>
    );
  }
}
