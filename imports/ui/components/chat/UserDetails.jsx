import React from 'react';

export default class UserDetails extends React.Component {
  render() {
    const { author } = this.props;

    return (
      <div>
        <img src={author.imageUrl} />
      </div>
    );
  }
}
