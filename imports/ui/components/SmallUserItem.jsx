import React from 'react';

export default class SmallUserItem extends React.Component {
  render() {
    const {
      data
    } = this.props;

    return (
      <div>
        <img src={data.imageUrl} />
        <p>{data.username}</p>
      </div>
    );
  }
}
