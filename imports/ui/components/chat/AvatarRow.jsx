import React from 'react';

export default class AvatarRow extends React.Component {
  render() {
    const {
      avatars
    } = this.props;
    return (
      <div className="user-tag">
        {
          avatars.map((avatar, index) => {
            return (<img src={avatar} key={index}/>);
          })
        }
      </div>
    );
  }
}
