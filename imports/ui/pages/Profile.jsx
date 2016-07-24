import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default React.createClass({
  handleThatEvent: function(e){
    e.preventDefault();
    Meteor.logout();
  },
  render: function(){
    return (
      <div className="view-container">
      <p>fzeafzaefzaezfea</p>
       <button onClick={this.handleThatEvent}>logout</button>
      </div>
      );
  }
});
